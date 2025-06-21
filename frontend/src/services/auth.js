import api from './api';

// For demo purposes, we'll use a dummy login flow that sets the current user in localStorage
// This would be replaced with a proper auth system in a real application

const USER_KEY = 'linkedin_clone_current_user';

export const login = async (email, password) => {
  try {
    // In a real app, we would make an API call here to authenticate
    // For demo, we'll fetch users and find a matching one
    const users = await api.get('/users');
    const user = users.data.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, we would verify password here
    // For demo, we'll skip password verification
    
    // Store user in localStorage
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = async () => {
  const userJson = localStorage.getItem(USER_KEY);
  
  if (!userJson) {
    // For demo purposes, we'll auto-login as the first user
    try {
      const users = await api.get('/users');
      if (users.data && users.data.length > 0) {
        const defaultUser = users.data[0];
        localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
        return defaultUser;
      }
    } catch (error) {
      console.error('Error fetching default user:', error);
      return null;
    }
  }
  
  return JSON.parse(userJson);
};