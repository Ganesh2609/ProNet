# ProNet - LinkedIn Clone

A comprehensive full-stack LinkedIn clone built with React.js and Flask, featuring complete social networking functionality including user profiles, news feeds, professional networking, job search, and real-time messaging.

## 🚀 Project Overview

ProNet replicates the core functionality of LinkedIn, providing a professional networking platform where users can connect, share updates, search for jobs, and communicate with their network. The application demonstrates modern web development practices with a React frontend and Flask backend.

## ✨ Key Features

### 🔐 User Authentication & Profiles
- User registration and login system
- Comprehensive profile management with photo uploads
- Professional headline and summary sections
- Experience and education tracking
- Skills showcase with endorsements

### 📰 Social Feed & Content
- Create and share professional posts with media support
- Like, comment, and share functionality
- Real-time news feed with personalized content
- Rich text editor for post creation
- Image and video upload capabilities

### 🤝 Professional Networking
- Send and receive connection requests
- Network management and recommendations
- People discovery based on mutual connections
- Connection status tracking and management

### 💼 Job Search & Applications
- Advanced job search with filters
- Job posting management for companies
- Application tracking system
- Saved jobs functionality
- Easy apply with one-click applications

### 💬 Real-time Messaging
- Direct messaging between connections
- Conversation management
- Message history and status tracking
- Online status indicators

## 🛠 Technology Stack

### Frontend
- **React.js 18.2.0** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Comprehensive icon library
- **Date-fns** - Date manipulation and formatting
- **CSS3** - Custom styling with CSS variables

### Backend
- **Flask 2.3.3** - Lightweight Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **JSON File Storage** - Simple data persistence
- **RESTful API** - Clean API architecture

## 📁 Project Structure

```
pronet-linkedin-clone/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Shared components (Navbar, Footer)
│   │   │   ├── profile/     # Profile-related components
│   │   │   ├── feed/        # News feed components
│   │   │   ├── network/     # Networking components
│   │   │   ├── jobs/        # Job search components
│   │   │   └── messaging/   # Chat components
│   │   ├── pages/           # Main page components
│   │   ├── services/        # API and authentication services
│   │   ├── styles/          # CSS stylesheets
│   │   └── utils/           # Utility functions
│   └── package.json
└── backend/                 # Flask API server
    ├── app.py              # Main application entry point
    ├── routes/             # API route handlers
    ├── data/               # JSON data storage
    └── requirements.txt
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The API server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The React app will open at `http://localhost:3000`

## 🎯 Core Functionality

### User Management
- **Profile Creation**: Complete professional profiles with photos, experience, education, and skills
- **Authentication**: Secure login system with session management
- **Profile Editing**: Real-time profile updates with modal interfaces

### Social Networking
- **Connection System**: Send, accept, and manage professional connections
- **News Feed**: Personalized feed with posts from connections
- **Content Creation**: Rich post creation with media upload support
- **Engagement**: Like, comment, and share functionality

### Job Platform
- **Job Search**: Advanced filtering by location, type, and experience level
- **Application Tracking**: Monitor application status and history
- **Company Profiles**: Detailed company information and job listings

### Communication
- **Direct Messaging**: Real-time chat between connections
- **Conversation Management**: Organized message threads with status indicators
- **Notification System**: Connection requests and message notifications

## 🎨 Design Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **LinkedIn-inspired UI**: Familiar interface for professional users
- **Modern CSS**: CSS Grid, Flexbox, and custom properties
- **Smooth Animations**: Hover effects and loading states
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📊 Data Management

The application uses JSON files for data persistence, making it easy to understand and modify:

- `users.json` - User profiles and authentication data
- `companies.json` - Company information and details
- `jobs.json` - Job listings and application data
- `posts.json` - Social feed posts, likes, and comments
- `messages.json` - Direct messages and conversations

## 🚀 Future Enhancements

- Real-time notifications with WebSocket integration
- File upload and document sharing
- Advanced search with Elasticsearch
- Email notification system
- Mobile app development with React Native
- Integration with third-party APIs (GitHub, Twitter)
- Video calling functionality
- Advanced analytics dashboard

## 🤝 Contributing

This project demonstrates modern web development practices and is perfect for learning full-stack development. The codebase is well-structured and documented for easy understanding and extension.

## 📝 Development Timeline

- **July 2024**: Project initiation and core architecture setup
- **August 2024**: Feature implementation and testing completion

## 🔍 Key Learning Outcomes

- Full-stack web development with React and Flask
- RESTful API design and implementation
- Modern JavaScript ES6+ features and React hooks
- Responsive web design and CSS best practices
- User authentication and session management
- Real-time communication implementation
- Professional software development workflow