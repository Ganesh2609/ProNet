import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaUsers, FaBriefcase } from 'react-icons/fa';

const Sidebar = ({ currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="sidebar">
      <div className="card mb-3">
        <div className="sidebar-profile-background"></div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-image-container">
            <img 
              src={currentUser.profilePicture || "/assets/images/default-profile.png"} 
              alt={`${currentUser.firstName} ${currentUser.lastName}`} 
              className="sidebar-profile-image" 
            />
          </div>
          
          <Link to={`/profile/${currentUser.id}`} className="sidebar-profile-name">
            {currentUser.firstName} {currentUser.lastName}
          </Link>
          
          <p className="sidebar-profile-headline">
            {currentUser.headline}
          </p>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <p className="sidebar-stat-title">Profile views</p>
            <p className="sidebar-stat-value">132</p>
          </div>
          <div className="sidebar-stat">
            <p className="sidebar-stat-title">Connection strength</p>
            <p className="sidebar-stat-value">Very strong</p>
          </div>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-premium">
          <p>Access exclusive tools & insights</p>
          <Link to="/premium" className="sidebar-premium-link">Try Premium for free</Link>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-items">
          <div className="sidebar-item">
            <FaBookmark className="sidebar-item-icon" />
            <span>My items</span>
          </div>
        </div>
      </div>
      
      <div className="card mb-3">
        <div className="sidebar-group-header">
          <h2 className="sidebar-group-title">Groups</h2>
          <div className="sidebar-group-actions">
            <Link to="/groups" className="sidebar-group-link">See all</Link>
          </div>
        </div>
        
        <div className="sidebar-groups">
          <div className="sidebar-group-item">
            <FaUsers className="sidebar-group-icon" />
            <span>Frontend Developers</span>
          </div>
          <div className="sidebar-group-item">
            <FaUsers className="sidebar-group-icon" />
            <span>UX/UI Design Network</span>
          </div>
          <div className="sidebar-group-item">
            <FaUsers className="sidebar-group-icon" />
            <span>React Developers</span>
          </div>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-events">
          <div className="sidebar-event-header">
            <h2 className="sidebar-event-title">Events</h2>
            <div className="sidebar-event-actions">
              <Link to="/events" className="sidebar-event-link">See all</Link>
            </div>
          </div>
          
          <div className="sidebar-event-item">
            <div className="sidebar-event-date">May 15</div>
            <div className="sidebar-event-info">
              <div className="sidebar-event-name">Tech Conference 2023</div>
              <div className="sidebar-event-location">San Francisco, CA</div>
            </div>
          </div>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-followed-hashtags">
          <div className="sidebar-hashtag-header">
            <h2 className="sidebar-hashtag-title">Followed Hashtags</h2>
            <div className="sidebar-hashtag-actions">
              <Link to="/hashtags" className="sidebar-hashtag-link">See all</Link>
            </div>
          </div>
          
          <div className="sidebar-hashtags">
            <div className="sidebar-hashtag">#programming</div>
            <div className="sidebar-hashtag">#javascript</div>
            <div className="sidebar-hashtag">#reactjs</div>
            <div className="sidebar-hashtag">#webdevelopment</div>
          </div>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="sidebar-discover">
          <h2 className="sidebar-discover-title">Discover more</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;