import os

def create_linkedin_clone_structure(base_path):
    # Main directories
    directories = [
        # Frontend structure
        'frontend/public',
        'frontend/public/assets/images',
        'frontend/public/assets/icons',
        'frontend/src/components/common',
        'frontend/src/components/profile',
        'frontend/src/components/feed',
        'frontend/src/components/network',
        'frontend/src/components/jobs',
        'frontend/src/components/messaging',
        'frontend/src/pages',
        'frontend/src/services',
        'frontend/src/styles',
        'frontend/src/utils',
        # Backend structure
        'backend/routes',
        'backend/data',
        'backend/utils'
    ]
    
    # Create all directories
    for directory in directories:
        os.makedirs(os.path.join(base_path, directory), exist_ok=True)
    
    # Frontend files
    frontend_files = [
        'public/index.html',
        
        'src/components/common/Navbar.js',
        'src/components/common/Footer.js',
        'src/components/common/Sidebar.js',
        
        'src/components/profile/ProfileHeader.js',
        'src/components/profile/Experience.js',
        'src/components/profile/Education.js',
        'src/components/profile/Skills.js',
        'src/components/profile/ProfileEdit.js',
        
        'src/components/feed/PostItem.js',
        'src/components/feed/CreatePost.js',
        'src/components/feed/NewsFeed.js',
        
        'src/components/network/ConnectionItem.js',
        'src/components/network/ConnectionRequests.js',
        'src/components/network/Recommendations.js',
        
        'src/components/jobs/JobItem.js',
        'src/components/jobs/JobSearch.js',
        'src/components/jobs/ApplicationTracker.js',
        
        'src/components/messaging/MessageList.js',
        'src/components/messaging/Conversation.js',
        'src/components/messaging/MessageInput.js',
        
        'src/pages/HomePage.js',
        'src/pages/ProfilePage.js',
        'src/pages/NetworkPage.js',
        'src/pages/JobsPage.js',
        'src/pages/MessagingPage.js',
        
        'src/services/api.js',
        'src/services/auth.js',
        'src/services/localStorage.js',
        
        'src/styles/global.css',
        'src/styles/navbar.css',
        'src/styles/profile.css',
        'src/styles/feed.css',
        'src/styles/network.css',
        'src/styles/jobs.css',
        'src/styles/messaging.css',
        
        'src/utils/formatDate.js',
        'src/utils/constants.js',
        
        'src/App.js',
        'src/index.js',
        
        'package.json',
        'README.md'
    ]
    
    # Backend files
    backend_files = [
        'app.py',
        
        'routes/user_routes.py',
        'routes/connection_routes.py',
        'routes/job_routes.py',
        'routes/feed_routes.py',
        'routes/message_routes.py',
        
        'data/users.json',
        'data/companies.json',
        'data/jobs.json',
        'data/posts.json',
        'data/messages.json',
        
        'utils/helpers.py',
        
        'requirements.txt',
        'README.md'
    ]
    
    # Create empty frontend files
    for file_path in frontend_files:
        full_path = os.path.join(base_path, 'frontend', file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        open(full_path, 'w').close()  # Create empty file
    
    # Create empty backend files
    for file_path in backend_files:
        full_path = os.path.join(base_path, 'backend', file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        open(full_path, 'w').close()  # Create empty file
    
    print(f"LinkedIn clone project structure created at: {base_path}")

if __name__ == "__main__":
    base_dir = input("Enter the base directory path (default is current directory): ") or "."
    create_linkedin_clone_structure(base_dir)