import React from 'react';
import { FaPencilAlt, FaPlus, FaBriefcase } from 'react-icons/fa';
import { formatDateRange, calculateDuration } from '../../utils/formatDate';
import { DEFAULT_COMPANY_LOGO } from '../../utils/constants';

const Experience = ({ experience = [], isOwnProfile, onEdit }) => {
  const handleEdit = (exp) => {
    onEdit('experience', exp);
  };

  const handleAddNew = () => {
    onEdit('experience');
  };

  return (
    <div className="profile-experience">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Experience</h2>
        {isOwnProfile && (
          <div className="profile-section-edit" onClick={handleAddNew}>
            <FaPlus />
          </div>
        )}
      </div>

      {experience.length === 0 ? (
        <div className="profile-section-empty">
          <p>No experience information to show</p>
          {isOwnProfile && (
            <button 
              className="profile-action-btn profile-action-secondary"
              onClick={handleAddNew}
            >
              <FaPlus className="profile-action-icon" />
              Add experience
            </button>
          )}
        </div>
      ) : (
        experience.map((exp) => (
          <div className="experience-item" key={exp.id}>
            <div className="experience-logo-container">
              <div className="experience-logo">
                <FaBriefcase />
              </div>
            </div>
            
            <div className="experience-info">
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-company">{exp.companyName}</p>
              <p className="experience-date">
                {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                {' · '}
                {calculateDuration(exp.startDate, exp.currentlyWorking ? null : exp.endDate)}
              </p>
              <p className="experience-location">{exp.location}</p>
              {exp.description && (
                <p className="experience-description">{exp.description}</p>
              )}
            </div>
            
            {isOwnProfile && (
              <div className="experience-edit" onClick={() => handleEdit(exp)}>
                <FaPencilAlt />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Experience;