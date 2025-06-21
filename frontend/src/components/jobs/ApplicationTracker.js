import React, { useState } from 'react';
import { formatRelativeDate } from '../../utils/formatDate';
import { DEFAULT_COMPANY_LOGO } from '../../utils/constants';

const ApplicationTracker = ({ applications, currentUser }) => {
  const [activeTab, setActiveTab] = useState('applied');
  
  if (!applications || applications.length === 0) {
    return null;
  }

  // Filter applications based on active tab
  const filteredApplications = applications.filter(app => {
    if (activeTab === 'applied') {
      return app.applicationStatus === 'applied';
    } else if (activeTab === 'saved') {
      return app.applicationStatus === 'saved';
    } else if (activeTab === 'interviewing') {
      return app.applicationStatus === 'interviewing';
    }
    return true;
  });

  return (
    <div className="application-tracker">
      <div className="application-tracker-header">
        <h2 className="application-tracker-title">Job Tracker</h2>
      </div>
      
      <div className="application-tabs">
        <div 
          className={`application-tab ${activeTab === 'applied' ? 'active' : ''}`}
          onClick={() => setActiveTab('applied')}
        >
          Applied ({applications.filter(app => app.applicationStatus === 'applied').length})
        </div>
        
        <div 
          className={`application-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved (0)
        </div>
        
        <div 
          className={`application-tab ${activeTab === 'interviewing' ? 'active' : ''}`}
          onClick={() => setActiveTab('interviewing')}
        >
          Interviewing (0)
        </div>
      </div>
      
      {filteredApplications.length === 0 ? (
        <div className="application-empty">
          {activeTab === 'applied' ? (
            "You haven't applied to any jobs yet."
          ) : activeTab === 'saved' ? (
            "You haven't saved any jobs yet."
          ) : (
            "You don't have any interviews scheduled."
          )}
        </div>
      ) : (
        <div className="application-list">
          {filteredApplications.map(application => (
            <div className="application-item" key={application.id}>
              <div className="application-item-logo">
                <img 
                  src={application.company?.logo || DEFAULT_COMPANY_LOGO} 
                  alt={application.company?.name} 
                />
              </div>
              
              <div className="application-item-info">
                <div className="application-item-title">{application.title}</div>
                <div className="application-item-company">{application.company?.name}</div>
                <div>
                  <span className="application-item-status">
                    {application.applicationStatus.charAt(0).toUpperCase() + application.applicationStatus.slice(1)}
                  </span>
                  <span className="application-item-date">
                    {formatRelativeDate(application.appliedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;