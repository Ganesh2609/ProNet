import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

// Connection API
export const fetchUserConnections = async (userId) => {
  try {
    const response = await api.get(`/connections/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching connections for user ${userId}:`, error);
    throw error;
  }
};

export const fetchConnectionRequests = async (userId) => {
  try {
    const response = await api.get(`/connections/requests/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching connection requests for user ${userId}:`, error);
    throw error;
  }
};

export const sendConnectionRequest = async (fromUserId, toUserId) => {
  try {
    const response = await api.post('/connections/request', { fromUserId, toUserId });
    return response.data;
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

export const acceptConnectionRequest = async (fromUserId, toUserId) => {
  try {
    const response = await api.post('/connections/accept', { fromUserId, toUserId });
    return response.data;
  } catch (error) {
    console.error('Error accepting connection request:', error);
    throw error;
  }
};

export const rejectConnectionRequest = async (fromUserId, toUserId) => {
  try {
    const response = await api.post('/connections/reject', { fromUserId, toUserId });
    return response.data;
  } catch (error) {
    console.error('Error rejecting connection request:', error);
    throw error;
  }
};

export const removeConnection = async (userId, connectionId) => {
  try {
    const response = await api.post('/connections/remove', { userId, connectionId });
    return response.data;
  } catch (error) {
    console.error('Error removing connection:', error);
    throw error;
  }
};

// Feed API
export const fetchFeed = async () => {
  try {
    const response = await api.get('/feed');
    return response.data;
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await api.get(`/feed/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/feed', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const likePost = async (postId, userId) => {
  try {
    const response = await api.post('/feed/like', { postId, userId });
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    const response = await api.post('/feed/unlike', { postId, userId });
    return response.data;
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

export const addComment = async (postId, userId, content) => {
  try {
    const response = await api.post('/feed/comment', { postId, userId, content });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Jobs API
export const fetchJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const searchJobs = async (query, location) => {
  try {
    const response = await api.get('/jobs/search', {
      params: { q: query, location },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

export const fetchJobById = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${jobId}:`, error);
    throw error;
  }
};

export const applyForJob = async (userId, jobId) => {
  try {
    const response = await api.post('/jobs/apply', { userId, jobId });
    return response.data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

export const fetchUserApplications = async (userId) => {
  try {
    const response = await api.get(`/jobs/applications/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching applications for user ${userId}:`, error);
    throw error;
  }
};

// Messages API
export const fetchUserConversations = async (userId) => {
  try {
    const response = await api.get(`/messages/conversations/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching conversations for user ${userId}:`, error);
    throw error;
  }
};

export const fetchConversationMessages = async (userId, otherId) => {
  try {
    const response = await api.get('/messages/conversation', {
      params: { userId, otherId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    throw error;
  }
};

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const response = await api.post('/messages', { senderId, receiverId, content });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (userId, senderId) => {
  try {
    const response = await api.post('/messages/read', { userId, senderId });
    return response.data;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

export default api;