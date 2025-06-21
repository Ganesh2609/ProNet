import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

const Advertisement = ({ title, message, imageUrl, buttonText, buttonUrl }) => {
  return (
    <div className="ads-card">
      <div className="ads-header">
        <span className="ads-title">{title || 'Ad'}</span>
        <span className="ads-icon">
          <FaEllipsisH />
        </span>
      </div>
      
      <div className="ads-content">
        {imageUrl && (
          <div className="ads-image-container">
            <img src={imageUrl} alt="Advertisement" className="ads-image" />
          </div>
        )}
        
        <p className="ads-message">{message || 'Check out our services'}</p>
        
        <a 
          href={buttonUrl || '#'} 
          className="ads-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText || 'Learn More'}
        </a>
      </div>
    </div>
  );
};

export default Advertisement;