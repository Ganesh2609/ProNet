import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ConnectionItem = ({ connection, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = () => {
    // In a real app, this would open a message dialog or navigate to the messaging page
    console.log('Message connection:', connection.id);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onRemove(connection.id);
    } catch (error) {
      console.error('Error removing connection:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-network-item">
      {isLoading && (
        <div className="connection-item-loading">
          <div className="connection-item-loading-spinner"></div>
        </div>
      )}
      
      <div className="my-network-item-header"></div>
      
      <div className="my-network-item-avatar">
        <img 
          src={connection.profilePicture || DEFAULT_AVATAR} 
          alt={`${connection.firstName} ${connection.lastName}`} 
        />
      </div>
      
      <div className="my-network-item-info">
        <Link 
          to={`/profile/${connection.id}`} 
          className="my-network-item-name"
        >
          {connection.firstName} {connection.lastName}
        </Link>
        <p className="my-network-item-headline">{connection.headline}</p>
      </div>
      
      <div className="my-network-item-footer">
        <button 
          className="my-network-item-btn my-network-item-btn-message"
          onClick={handleMessage}
          disabled={isLoading}
        >
          Message
        </button>
        
        <button 
          className="my-network-item-btn my-network-item-btn-remove"
          onClick={handleRemove}
          disabled={isLoading}
        >
          Remove connection
        </button>
      </div>
    </div>
  );
};

export default ConnectionItem;