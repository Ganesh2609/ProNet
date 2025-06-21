import React from 'react';
import { FaPencilAlt, FaPlus, FaUniversity } from 'react-icons/fa';
import { formatDateRange } from '../../utils/formatDate';

const Education = ({ education = [], isOwnProfile, onEdit }) => {
  const handleEdit = (edu) => {
    onEdit('education', edu);
  };

  const handleAddNew = () => {
    onEdit('education');
  };

  return (
    <div className="profile-education">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Education</h2>
        {isOwnProfile && (
          <div className="profile-section-edit" onClick={handleAddNew}>
            <FaPlus />
          </div>
        )}
      </div>

      {education.length === 0 ? (
        <div className="profile-section-empty">
          <p>No education information to show</p>
          {isOwnProfile && (
            <button 
              className="profile-action-btn profile-action-secondary"
              onClick={handleAddNew}
            >
              <FaPlus className="profile-action-icon" />
              Add education
            </button>
          )}
        </div>
      ) : (
        education.map((edu) => (
          <div className="education-item" key={edu.id}>
            <div className="education-logo-container">
              <div className="education-logo">
                <FaUniversity />
              </div>
            </div>
            
            <div className="education-info">
              <h3 className="education-school">{edu.school}</h3>
              <p className="education-degree">{edu.degree}</p>
              <p className="education-field">{edu.fieldOfStudy}</p>
              <p className="education-date">
                {formatDateRange(edu.startDate, edu.endDate)}
              </p>
              {edu.description && (
                <p className="education-description">{edu.description}</p>
              )}
            </div>
            
            {isOwnProfile && (
              <div className="education-edit" onClick={() => handleEdit(edu)}>
                <FaPencilAlt />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Education;