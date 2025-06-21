// API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  CONNECTIONS: '/api/connections',
  FEED: '/api/feed',
  JOBS: '/api/jobs',
  MESSAGES: '/api/messages',
};

// Local storage keys
export const STORAGE_KEYS = {
  CURRENT_USER: 'linkedin_clone_current_user',
  CONNECTION_REQUESTS: 'linkedin_clone_connection_requests',
  JOB_APPLICATIONS: 'linkedin_clone_job_applications',
  UNREAD_MESSAGES: 'linkedin_clone_unread_messages',
};

// Job types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
  'Volunteer',
  'Remote',
];

// Experience levels
export const EXPERIENCE_LEVELS = [
  'Entry level',
  'Associate',
  'Mid-Senior level',
  'Director',
  'Executive',
];

// Industry options
export const INDUSTRIES = [
  'Information Technology',
  'Software Development',
  'Financial Services',
  'Healthcare',
  'Education',
  'Marketing & Advertising',
  'Design',
  'Engineering',
  'Retail',
  'Hospitality',
  'Media & Communications',
  'Manufacturing',
  'Consulting',
  'Legal Services',
  'Real Estate',
  'Non-profit',
  'Government',
  'Transportation & Logistics',
];

// Employment types
export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Contract',
  'Internship',
  'Apprenticeship',
  'Volunteer',
];

// Default avatar placeholder
export const DEFAULT_AVATAR = 'https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q';

// Default company logo placeholder
export const DEFAULT_COMPANY_LOGO = 'https://static.licdn.com/sc/h/5q92mjc5c51bjlwaj3rs9aa82';

// Maximum post content length
export const MAX_POST_LENGTH = 3000;

// Maximum comment length
export const MAX_COMMENT_LENGTH = 1000;

// Maximum message length
export const MAX_MESSAGE_LENGTH = 1000;

// Search results per page
export const SEARCH_RESULTS_PER_PAGE = 20;

export default {
  API_ENDPOINTS,
  STORAGE_KEYS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  INDUSTRIES,
  EMPLOYMENT_TYPES,
  DEFAULT_AVATAR,
  DEFAULT_COMPANY_LOGO,
  MAX_POST_LENGTH,
  MAX_COMMENT_LENGTH,
  MAX_MESSAGE_LENGTH,
  SEARCH_RESULTS_PER_PAGE,
};