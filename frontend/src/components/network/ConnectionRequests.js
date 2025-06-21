import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ConnectionRequests = ({ requests, onAccept, onIgnore }) => {
  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="connection-requests">
      <div className="connection-requests-header">
        <h2 className="connection-requests-title">Invitations</h2>
        <span className="connection-requests-count">{requests.length}</span>
      </div>
      
      <div className="connection-requests-list">
        {requests.map(request => (
          <ConnectionRequestItem 
            key={request.id}
            request={request}
            onAccept={onAccept}
            onIgnore={onIgnore}
          />
        ))}
      </div>
    </div>
  );
};

const ConnectionRequestItem = ({ request, onAccept, onIgnore }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onAccept(request.id);
    } catch (error) {
      console.error('Error accepting request:', error);
      setIsLoading(false);
    }
  };

  const handleIgnore = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onIgnore(request.id);
    } catch (error) {
      console.error('Error ignoring request:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="connection-item">
      {isLoading && (
        <div className="connection-item-loading">
          <div className="connection-item-loading-spinner"></div>
        </div>
      )}
      
      <div className="connection-item-header">
        <div className="connection-item-close" onClick={handleIgnore}>
          <FaTimes />
        </div>
      </div>
      
      <div className="connection-item-avatar">
        <img 
          src={request.profilePicture || DEFAULT_AVATAR} 
          alt={`${request.firstName} ${request.lastName}`} 
        />
      </div>
      
      <div className="connection-item-info">
        <Link 
          to={`/profile/${request.id}`} 
          className="connection-item-name"
        >
          {request.firstName} {request.lastName}
        </Link>
        <p className="connection-item-headline">{request.headline}</p>
      </div>
      
      <div className="connection-item-footer">
        <button 
          className="connection-item-btn connection-item-btn-accept"
          onClick={handleAccept}
          disabled={isLoading}
        >
          Accept
        </button>
        
        <button 
          className="connection-item-btn connection-item-btn-ignore"
          onClick={handleIgnore}
          disabled={isLoading}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequests;