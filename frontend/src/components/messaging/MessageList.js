import React, { useState } from 'react';
import { FaEdit, FaEllipsisH } from 'react-icons/fa';
import { formatRelativeDate } from '../../utils/formatDate';
import { DEFAULT_AVATAR } from '../../utils/constants';

const MessageList = ({ conversations, currentUser, selectedConversation, onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    const name = `${conversation.firstName} ${conversation.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return name.includes(query);
  });

  return (
    <>
      <div className="message-list-header">
        <h2 className="message-list-title">Messaging</h2>
        <div className="message-list-actions">
          <div className="message-list-action">
            <FaEllipsisH />
          </div>
          <div className="message-list-action">
            <FaEdit />
          </div>
        </div>
      </div>
      
      <div className="message-search">
        <input 
          type="text"
          className="message-search-input"
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="message-list">
        {filteredConversations.length === 0 ? (
          <div className="message-list-empty">
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <MessageItem 
              key={conversation.userId}
              conversation={conversation}
              isActive={selectedConversation?.userId === conversation.userId}
              onClick={() => onSelectConversation(conversation)}
            />
          ))
        )}
      </div>
    </>
  );
};

const MessageItem = ({ conversation, isActive, onClick }) => {
  const { firstName, lastName, profilePicture, latestMessage, unreadCount } = conversation;
  
  return (
    <div 
      className={`message-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="message-item-avatar">
        <img 
          src={profilePicture || DEFAULT_AVATAR} 
          alt={`${firstName} ${lastName}`} 
        />
        <div className="message-item-status"></div>
      </div>
      
      <div className="message-item-content">
        <div className="message-item-row">
          <div className="message-item-name">{firstName} {lastName}</div>
          <div className="message-item-time">
            {formatRelativeDate(latestMessage.createdAt * 1000)}
          </div>
        </div>
        
        <div className="message-item-text">
          {unreadCount > 0 && <span className="message-item-unread"></span>}
          {latestMessage.content}
        </div>
      </div>
    </div>
  );
};

export default MessageList;