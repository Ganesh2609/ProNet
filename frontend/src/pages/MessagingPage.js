import React, { useState, useEffect } from 'react';
import MessageList from '../components/messaging/MessageList';
import Conversation from '../components/messaging/Conversation';
import { fetchUserConversations, fetchConversationMessages } from '../services/api';
import '../styles/messaging.css';

const MessagingPage = ({ currentUser }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const conversationsData = await fetchUserConversations(currentUser.id);
        setConversations(conversationsData);
        
        // Auto-select first conversation if available
        if (conversationsData.length > 0) {
          setSelectedConversation(conversationsData[0]);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchConversations();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          setLoading(true);
          const messagesData = await fetchConversationMessages(
            currentUser.id,
            selectedConversation.userId
          );
          setMessages(messagesData);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchMessages();
  }, [currentUser, selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // Update unread count to 0 for this conversation
    setConversations(conversations.map(conv => {
      if (conv.userId === conversation.userId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
  };

  const handleNewMessage = (message) => {
    // Add new message to the messages list
    setMessages([...messages, message]);
  };

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="messaging-page">
      <div className="messaging-grid">
        <div className="message-list-wrapper">
          <MessageList 
            conversations={conversations}
            currentUser={currentUser}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        <div className="conversation-wrapper">
          <Conversation 
            conversation={selectedConversation}
            messages={messages}
            currentUser={currentUser}
            onNewMessage={handleNewMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;