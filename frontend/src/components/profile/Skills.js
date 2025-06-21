import React, { useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

const Skills = ({ skills = [], isOwnProfile, onEdit }) => {
  const [showAll, setShowAll] = useState(false);
  
  const handleEdit = () => {
    onEdit('skills', { skills });
  };
  
  const handleAddNew = () => {
    onEdit('skills', { skills });
  };
  
  const displaySkills = showAll ? skills : skills.slice(0, 5);
  
  return (
    <div className="profile-skills">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Skills</h2>
        {isOwnProfile && (
          <div className="profile-section-edit" onClick={handleEdit}>
            <FaPencilAlt />
          </div>
        )}
      </div>
      
      {skills.length === 0 ? (
        <div className="profile-section-empty">
          <p>No skills information to show</p>
          {isOwnProfile && (
            <button 
              className="profile-action-btn profile-action-secondary"
              onClick={handleAddNew}
            >
              <FaPlus className="profile-action-icon" />
              Add skills
            </button>
          )}
        </div>
      ) : (
        <>
          {displaySkills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <h3 className="skill-name">{skill}</h3>
              <p className="skill-endorsements">
                {Math.floor(Math.random() * 50)} endorsements
              </p>
            </div>
          ))}
          
          {skills.length > 5 && (
            <div 
              className="skills-show-more"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less' : `Show all ${skills.length} skills`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Skills;