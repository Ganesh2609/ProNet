# LinkedIn Clone

A full-stack LinkedIn clone built with React.js for the frontend and Flask for the backend. This project replicates the core features of LinkedIn, including profile pages, news feed, networking, job search, and messaging.

## Features

- **Authentication**: Simulated login/logout
- **Profile Management**: View and edit profile information, experience, education, and skills
- **News Feed**: Create posts, like, and comment
- **Networking**: Send and accept connection requests
- **Job Search**: Search jobs, view details, and track applications
- **Messaging**: Real-time chat with connections

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS for styling
- Axios for API requests

### Backend
- Flask (Python)
- JSON files for data storage (no database required)
- RESTful API architecture

## Project Structure

```
linkedin-clone/
├── frontend/          # React frontend
│   ├── public/        # Static files
│   └── src/           # React components and logic
│       ├── components/  # Reusable UI components
│       ├── pages/       # Main page components
│       ├── services/    # API and service functions
│       ├── styles/      # CSS files
│       └── utils/       # Utility functions
└── backend/           # Flask backend
    ├── app.py         # Main application file
    ├── routes/        # API route handlers
    └── data/          # JSON data files
```

## Setup and Installation

### Prerequisites
- Node.js and npm
- Python 3.6 or higher
- pip

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd linkedin-clone/backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```
   python app.py
   ```
   
   The server will run on http://localhost:5000.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd linkedin-clone/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```
   
   The application will open in your browser at http://localhost:3000.

## Usage

- The application automatically logs in as the first user for demonstration purposes.
- Navigate through the different pages using the navbar.
- Explore the various features like creating posts, searching for jobs, or sending messages.

## Data Storage

Instead of a traditional database, this project uses JSON files to store data:

- `users.json`: User profiles, connections, and credentials
- `companies.json`: Company information
- `jobs.json`: Job listings and applications
- `posts.json`: News feed posts, likes, and comments
- `messages.json`: User conversations and messages

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- This project is for educational purposes only and is not affiliated with LinkedIn.
- The design and functionality are inspired by LinkedIn's interface.