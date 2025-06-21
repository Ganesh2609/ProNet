import React, { useEffect, useRef } from 'react';
import { FaEllipsisH, FaPhoneAlt, FaVideo, FaComments } from 'react-icons/fa';
import MessageInput from './MessageInput';
import { formatRelativeDate } from '../../utils/formatDate';
import { DEFAULT_AVATAR } from '../../utils/constants';

const Conversation = ({ conversation, messages, currentUser, onNewMessage }) => {
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  if (!conversation) {
    return (
      <div className="conversation-empty">
        <div className="conversation-empty-icon">
          <FaComments />
        </div>
        <h3 className="conversation-empty-title">No conversation selected</h3>
        <p className="conversation-empty-text">
          Select a conversation from the list or start a new one
        </p>
      </div>
    );
  }
  
  // Group messages by date
  const groupedMessages = {};
  messages.forEach(message => {
    const date = new Date(message.createdAt * 1000).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return (
    <>
      <div className="conversation-header">
        <div className="conversation-header-avatar">
          <img 
            src={conversation.profilePicture || DEFAULT_AVATAR} 
            alt={`${conversation.firstName} ${conversation.lastName}`} 
          />
          <div className="conversation-header-status"></div>
        </div>
        
        <div className="conversation-header-info">
          <div className="conversation-header-name">
            {conversation.firstName} {conversation.lastName}
          </div>
          <div className="conversation-header-headline">
            {conversation.headline}
          </div>
        </div>
        
        <div className="conversation-header-actions">
          <div className="conversation-header-action">
            <FaPhoneAlt />
          </div>
          <div className="conversation-header-action">
            <FaVideo />
          </div>
          <div className="conversation-header-action">
            <FaEllipsisH />
          </div>
        </div>
      </div>
      
      <div className="conversation-body">
        <div className="conversation-messages">
          {Object.keys(groupedMessages).map(date => (
            <React.Fragment key={date}>
              <div className="conversation-date">{date}</div>
              {groupedMessages[date].map(message => (
                <div 
                  key={message.id}
                  className={`message-bubble ${
                    message.senderId === currentUser.id ? 'sent' : 'received'
                  }`}
                >
                  <div className="message-bubble-content">
                    {message.content}
                  </div>
                  <div className="message-bubble-time">
                    {formatRelativeDate(message.createdAt * 1000)}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      <div className="conversation-footer">
        <MessageInput 
          currentUser={currentUser}
          receiverId={conversation.userId}
          onSendMessage={onNewMessage}
        />
      </div>
    </>
  );
};

export default Conversation;