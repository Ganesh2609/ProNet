import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { sendConnectionRequest } from '../../services/api';
import { DEFAULT_AVATAR } from '../../utils/constants';

const Recommendations = ({ recommendations, onConnect, onDismiss }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="people-may-know">
      <div className="people-may-know-header">
        <h2 className="people-may-know-title">People you may know</h2>
      </div>
      
      <div className="people-may-know-list">
        {recommendations.map(recommendation => (
          <RecommendationItem 
            key={recommendation.id}
            recommendation={recommendation}
            onConnect={onConnect}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
};

const RecommendationItem = ({ recommendation, onConnect, onDismiss }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would use the current user's ID
      await sendConnectionRequest('1', recommendation.id);
      onConnect(recommendation.id);
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    onDismiss(recommendation.id);
  };

  return (
    <div className="people-may-know-item">
      {isLoading && (
        <div className="connection-item-loading">
          <div className="connection-item-loading-spinner"></div>
        </div>
      )}
      
      <div className="people-may-know-item-header">
        <div className="people-may-know-item-close" onClick={handleDismiss}>
          <FaTimes />
        </div>
      </div>
      
      <div className="people-may-know-item-avatar">
        <img 
          src={recommendation.profilePicture || DEFAULT_AVATAR} 
          alt={`${recommendation.firstName} ${recommendation.lastName}`} 
        />
      </div>
      
      <div className="people-may-know-item-info">
        <Link 
          to={`/profile/${recommendation.id}`} 
          className="people-may-know-item-name"
        >
          {recommendation.firstName} {recommendation.lastName}
        </Link>
        <p className="people-may-know-item-headline">{recommendation.headline}</p>
      </div>
      
      <div className="people-may-know-item-footer">
        <button 
          className="people-may-know-item-btn people-may-know-item-btn-connect"
          onClick={handleConnect}
          disabled={isLoading}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Recommendations;