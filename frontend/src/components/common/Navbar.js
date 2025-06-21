import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBriefcase, FaComments, FaBell, FaSearch, FaCaretDown } from 'react-icons/fa';
import { fetchConnectionRequests, fetchUserConversations } from '../../services/api';
import { logout } from '../../services/auth';
import '../../styles/navbar.css';

const Navbar = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          // Fetch connection requests
          const requests = await fetchConnectionRequests(currentUser.id);
          setConnectionRequests(requests);
          
          // Fetch conversations to count unread messages
          const conversations = await fetchUserConversations(currentUser.id);
          const unreadCount = conversations.reduce((count, conv) => count + conv.unreadCount, 0);
          setUnreadMessages(unreadCount);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    
    fetchNotifications();
    
    // Set up interval to refresh notifications
    const intervalId = setInterval(fetchNotifications, 60000); // Every minute
    
    // Clean up interval
    return () => clearInterval(intervalId);
  }, [currentUser]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };
  
  if (!currentUser) return null;
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/assets/images/linkedin-logo.png" alt="LinkedIn" />
          </Link>
          
          <div className="navbar-search">
            <span className="navbar-search-icon">
              <FaSearch />
            </span>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        
        <div className="navbar-right">
          <ul className="navbar-nav">
            <li className="navbar-nav-item">
              <Link to="/" className={`navbar-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                <FaHome className="navbar-nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            
            <li className="navbar-nav-item">
              <Link to="/mynetwork" className={`navbar-nav-link ${location.pathname === '/mynetwork' ? 'active' : ''}`}>
                <FaUserFriends className="navbar-nav-icon" />
                <span>My Network</span>
                {connectionRequests.length > 0 && (
                  <span className="navbar-notification-badge">{connectionRequests.length}</span>
                )}
              </Link>
            </li>
            
            <li className="navbar-nav-item">
              <Link to="/jobs" className={`navbar-nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>
                <FaBriefcase className="navbar-nav-icon" />
                <span>Jobs</span>
              </Link>
            </li>
            
            <li className="navbar-nav-item">
              <Link to="/messaging" className={`navbar-nav-link ${location.pathname === '/messaging' ? 'active' : ''}`}>
                <FaComments className="navbar-nav-icon" />
                <span>Messaging</span>
                {unreadMessages > 0 && (
                  <span className="navbar-notification-badge">{unreadMessages}</span>
                )}
              </Link>
            </li>
            
            <li className="navbar-nav-item">
              <div className="navbar-nav-link">
                <FaBell className="navbar-nav-icon" />
                <span>Notifications</span>
                {(connectionRequests.length > 0) && (
                  <span className="navbar-notification-badge">{connectionRequests.length}</span>
                )}
              </div>
            </li>
            
            <li className="navbar-nav-item">
              <div 
                className="navbar-nav-link navbar-profile" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                ref={dropdownRef}
              >
                <img 
                  src={currentUser.profilePicture || "/assets/images/default-profile.png"} 
                  alt={`${currentUser.firstName} ${currentUser.lastName}`} 
                  className="navbar-profile-image" 
                />
                <span>Me <FaCaretDown /></span>
                
                {showProfileDropdown && (
                  <div className="navbar-dropdown show">
                    <div className="navbar-dropdown-header">
                      <img 
                        src={currentUser.profilePicture || "/assets/images/default-profile.png"} 
                        alt={`${currentUser.firstName} ${currentUser.lastName}`} 
                        className="navbar-dropdown-profile-image" 
                      />
                      <div className="navbar-dropdown-profile-info">
                        <div className="navbar-dropdown-name">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="navbar-dropdown-headline">
                          {currentUser.headline}
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/profile/${currentUser.id}`} 
                      className="navbar-dropdown-link"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      View Profile
                    </Link>
                    
                    <div className="navbar-dropdown-divider"></div>
                    
                    <div className="navbar-dropdown-footer">
                      <div className="navbar-dropdown-sign-out" onClick={handleLogout}>
                        Sign Out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;