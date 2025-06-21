import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaUserPlus, FaUsers, FaBriefcase, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import ConnectionRequests from '../components/network/ConnectionRequests';
import ConnectionItem from '../components/network/ConnectionItem';
import Recommendations from '../components/network/Recommendations';
import { fetchUserConnections, fetchConnectionRequests, fetchUsers } from '../services/api';
import '../styles/network.css';

const NetworkPage = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('connections');
  const [connections, setConnections] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        setLoading(true);
        
        // Fetch connections
        const connectionsData = await fetchUserConnections(currentUser.id);
        setConnections(connectionsData);
        
        // Fetch connection requests
        const requestsData = await fetchConnectionRequests(currentUser.id);
        setConnectionRequests(requestsData);
        
        // Fetch all users for recommendations
        const usersData = await fetchUsers();
        
        // Filter out current user, connections, and pending requests
        const connectionsIds = connectionsData.map(conn => conn.id);
        const requestsIds = requestsData.map(req => req.id);
        
        const recommendedUsers = usersData.filter(user => 
          user.id !== currentUser.id && 
          !connectionsIds.includes(user.id) && 
          !requestsIds.includes(user.id)
        );
        
        setRecommendations(recommendedUsers);
      } catch (error) {
        console.error('Error fetching network data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNetworkData();
  }, [currentUser.id]);

  const handleAcceptRequest = (userId) => {
    // Update connection requests
    setConnectionRequests(connectionRequests.filter(req => req.id !== userId));
    
    // Refresh connections (in a real app, we would get the updated connection)
    const userToAdd = connectionRequests.find(req => req.id === userId);
    if (userToAdd) {
      setConnections([...connections, userToAdd]);
    }
  };
  
  const handleIgnoreRequest = (userId) => {
    // Update connection requests
    setConnectionRequests(connectionRequests.filter(req => req.id !== userId));
  };
  
  const handleRemoveConnection = (userId) => {
    // Update connections
    setConnections(connections.filter(conn => conn.id !== userId));
  };
  
  const handleConnect = (userId) => {
    // Remove from recommendations
    setRecommendations(recommendations.filter(rec => rec.id !== userId));
  };
  
  const handleDismissRecommendation = (userId) => {
    // Remove from recommendations
    setRecommendations(recommendations.filter(rec => rec.id !== userId));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading network...</p>
      </div>
    );
  }

  return (
    <div className="network-page">
      <div className="network-grid">
        <div className="network-sidebar">
          <div className="network-sidebar-card">
            <div className="network-sidebar-header">
              <h2 className="network-sidebar-title">Manage my network</h2>
            </div>
            
            <ul className="network-sidebar-list">
              <li 
                className={`network-sidebar-item ${activeTab === 'connections' ? 'active' : ''}`}
                onClick={() => setActiveTab('connections')}
              >
                <FaUserFriends className="network-sidebar-icon" />
                <span className="network-sidebar-text">Connections</span>
                <span className="network-sidebar-count">{connections.length}</span>
              </li>
              
              <li 
                className={`network-sidebar-item ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => setActiveTab('requests')}
              >
                <FaUserPlus className="network-sidebar-icon" />
                <span className="network-sidebar-text">Invitations</span>
                <span className="network-sidebar-count">{connectionRequests.length}</span>
              </li>
              
              <li className="network-sidebar-item">
                <FaUsers className="network-sidebar-icon" />
                <span className="network-sidebar-text">Groups</span>
                <span className="network-sidebar-count">6</span>
              </li>
              
              <li className="network-sidebar-item">
                <FaBriefcase className="network-sidebar-icon" />
                <span className="network-sidebar-text">Pages</span>
                <span className="network-sidebar-count">8</span>
              </li>
              
              <li className="network-sidebar-item">
                <FaEnvelope className="network-sidebar-icon" />
                <span className="network-sidebar-text">Newsletter</span>
                <span className="network-sidebar-count">4</span>
              </li>
              
              <li className="network-sidebar-item">
                <FaBirthdayCake className="network-sidebar-icon" />
                <span className="network-sidebar-text">Celebrations</span>
                <span className="network-sidebar-count">5</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="network-content">
          {activeTab === 'requests' && connectionRequests.length > 0 && (
            <ConnectionRequests 
              requests={connectionRequests} 
              onAccept={handleAcceptRequest}
              onIgnore={handleIgnoreRequest}
            />
          )}
          
          {activeTab === 'connections' && (
            <div className="my-network">
              <div className="my-network-header">
                <h2 className="my-network-title">Connections</h2>
                <span className="my-network-count">{connections.length}</span>
              </div>
              
              {connections.length === 0 ? (
                <div className="no-items-message">
                  <p>You don't have any connections yet.</p>
                </div>
              ) : (
                <div className="my-network-list">
                  {connections.map(connection => (
                    <ConnectionItem 
                      key={connection.id}
                      connection={connection}
                      onRemove={handleRemoveConnection}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          <Recommendations 
            recommendations={recommendations}
            onConnect={handleConnect}
            onDismiss={handleDismissRecommendation}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;