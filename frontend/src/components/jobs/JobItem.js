import React from 'react';
import { FaRegBookmark, FaMapMarkerAlt } from 'react-icons/fa';
import { formatRelativeDate } from '../../utils/formatDate';
import { DEFAULT_COMPANY_LOGO } from '../../utils/constants';

const JobItem = ({ job, onClick, isApplied }) => {
  const formatSalary = (salary) => {
    if (!salary) return null;
    
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} a year`;
  };

  return (
    <div className="job-item" onClick={onClick}>
      <div className="job-item-header">
        <div className="job-item-logo">
          <img 
            src={job.company?.logo || DEFAULT_COMPANY_LOGO} 
            alt={job.company?.name} 
          />
        </div>
        
        <div>
          <h3 className="job-item-title">{job.title}</h3>
          <div className="job-item-company">{job.company?.name}</div>
          <div className="job-item-location">
            <FaMapMarkerAlt /> {job.location}
          </div>
          <div className="job-item-date">
            {formatRelativeDate(job.postedAt * 1000)}
          </div>
        </div>
      </div>
      
      <div className="job-item-details">
        {job.salary && (
          <div className="job-item-salary">
            {formatSalary(job.salary)}
          </div>
        )}
        
        <div className="job-item-description">
          {job.description}
        </div>
        
        {job.skills && job.skills.length > 0 && (
          <div className="job-item-skills">
            {job.skills.slice(0, 3).map((skill, index) => (
              <div key={index} className="job-item-skill">{skill}</div>
            ))}
            {job.skills.length > 3 && (
              <div className="job-item-skill">+{job.skills.length - 3} more</div>
            )}
          </div>
        )}
      </div>
      
      <div className="job-item-footer">
        <div className="job-item-actions">
          {isApplied ? (
            <button 
              className="job-item-button job-item-button-primary"
              onClick={(e) => {
                e.stopPropagation();
                // In a real app, this might navigate to an application status page
                console.log('View application');
              }}
            >
              Applied
            </button>
          ) : (
            <button 
              className="job-item-button job-item-button-primary"
              onClick={(e) => {
                e.stopPropagation();
                // This will show the job modal, so no need to do anything here
              }}
            >
              Apply
            </button>
          )}
          
          {!isApplied && (
            <button 
              className="job-item-button job-item-button-secondary"
              onClick={(e) => {
                e.stopPropagation();
                // In a real app, this would submit an application with the resume on file
                console.log('Easy Apply');
              }}
            >
              Easy Apply
            </button>
          )}
        </div>
        
        <div 
          className="job-item-save"
          onClick={(e) => {
            e.stopPropagation();
            // In a real app, this would save the job
            console.log('Save job');
          }}
        >
          <FaRegBookmark className="job-item-save-icon" />
          Save
        </div>
      </div>
    </div>
  );
};

export default JobItem;