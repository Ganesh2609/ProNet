// localStorage keys
const KEYS = {
  CURRENT_USER: 'linkedin_clone_current_user',
  CONNECTION_REQUESTS: 'linkedin_clone_connection_requests',
  JOB_APPLICATIONS: 'linkedin_clone_job_applications',
  UNREAD_MESSAGES: 'linkedin_clone_unread_messages',
};

// Generic get function
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Generic set function
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage (${key}):`, error);
  }
};

// Generic remove function
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error);
  }
};

// Current user methods
export const getCurrentUser = () => getItem(KEYS.CURRENT_USER);
export const setCurrentUser = (user) => setItem(KEYS.CURRENT_USER, user);
export const removeCurrentUser = () => removeItem(KEYS.CURRENT_USER);

// Connection requests methods
export const getConnectionRequests = (userId) => {
  const allRequests = getItem(KEYS.CONNECTION_REQUESTS, {});
  return allRequests[userId] || [];
};

export const setConnectionRequests = (userId, requests) => {
  const allRequests = getItem(KEYS.CONNECTION_REQUESTS, {});
  allRequests[userId] = requests;
  setItem(KEYS.CONNECTION_REQUESTS, allRequests);
};

export const addConnectionRequest = (userId, request) => {
  const requests = getConnectionRequests(userId);
  requests.push(request);
  setConnectionRequests(userId, requests);
};

export const removeConnectionRequest = (userId, requestId) => {
  const requests = getConnectionRequests(userId);
  const updatedRequests = requests.filter(req => req.id !== requestId);
  setConnectionRequests(userId, updatedRequests);
};

// Job applications methods
export const getJobApplications = (userId) => {
  const allApplications = getItem(KEYS.JOB_APPLICATIONS, {});
  return allApplications[userId] || [];
};

export const setJobApplications = (userId, applications) => {
  const allApplications = getItem(KEYS.JOB_APPLICATIONS, {});
  allApplications[userId] = applications;
  setItem(KEYS.JOB_APPLICATIONS, allApplications);
};

export const addJobApplication = (userId, application) => {
  const applications = getJobApplications(userId);
  applications.push(application);
  setJobApplications(userId, applications);
};

// Unread messages methods
export const getUnreadMessages = (userId) => {
  const allUnread = getItem(KEYS.UNREAD_MESSAGES, {});
  return allUnread[userId] || {};
};

export const setUnreadMessages = (userId, unread) => {
  const allUnread = getItem(KEYS.UNREAD_MESSAGES, {});
  allUnread[userId] = unread;
  setItem(KEYS.UNREAD_MESSAGES, allUnread);
};

export const incrementUnreadMessages = (userId, senderId) => {
  const unread = getUnreadMessages(userId);
  unread[senderId] = (unread[senderId] || 0) + 1;
  setUnreadMessages(userId, unread);
};

export const clearUnreadMessages = (userId, senderId) => {
  const unread = getUnreadMessages(userId);
  if (unread[senderId]) {
    delete unread[senderId];
    setUnreadMessages(userId, unread);
  }
};

export default {
  KEYS,
  getItem,
  setItem,
  removeItem,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  getConnectionRequests,
  setConnectionRequests,
  addConnectionRequest,
  removeConnectionRequest,
  getJobApplications,
  setJobApplications,
  addJobApplication,
  getUnreadMessages,
  setUnreadMessages,
  incrementUnreadMessages,
  clearUnreadMessages,
};