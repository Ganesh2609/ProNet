import React, { useState } from 'react';
import { FaSmile, FaImage, FaPaperPlane } from 'react-icons/fa';
import { sendMessage } from '../../services/api';
import { MAX_MESSAGE_LENGTH } from '../../utils/constants';

const MessageInput = ({ currentUser, receiverId, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const handleChange = (e) => {
    // Limit message length
    if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(e.target.value);
    }
  };
  
  const handleKeyDown = (e) => {
    // Send message on Enter key (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (!message.trim() || sending) return;
    
    setSending(true);
    try {
      const newMessage = await sendMessage(currentUser.id, receiverId, message);
      
      // Add sender info to the message
      newMessage.senderName = `${currentUser.firstName} ${currentUser.lastName}`;
      newMessage.senderProfilePicture = currentUser.profilePicture;
      
      onSendMessage(newMessage);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="message-input-form">
      <div className="message-input-wrapper">
        <textarea 
          className="message-input"
          placeholder="Write a message..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={sending}
          rows={1}
        />
        
        <div className="message-input-actions">
          <div className="message-input-action">
            <FaSmile />
          </div>
          <div className="message-input-action">
            <FaImage />
          </div>
        </div>
      </div>
      
      <button 
        className="message-submit"
        onClick={handleSubmit}
        disabled={!message.trim() || sending}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;