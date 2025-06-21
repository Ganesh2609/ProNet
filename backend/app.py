from flask import Flask, jsonify
from flask_cors import CORS
import os

# Import routes
from routes.user_routes import user_bp
from routes.connection_routes import connection_bp
from routes.job_routes import job_bp
from routes.feed_routes import feed_bp
from routes.message_routes import message_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(connection_bp, url_prefix='/api/connections')
app.register_blueprint(job_bp, url_prefix='/api/jobs')
app.register_blueprint(feed_bp, url_prefix='/api/feed')
app.register_blueprint(message_bp, url_prefix='/api/messages')

@app.route('/')
def home():
    return jsonify({
        "message": "LinkedIn Clone API",
        "version": "1.0.0",
        "endpoints": {
            "users": "/api/users",
            "connections": "/api/connections",
            "jobs": "/api/jobs",
            "feed": "/api/feed",
            "messages": "/api/messages"
        }
    })

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    if not os.path.exists('data'):
        os.makedirs('data')
        
    # Initialize with empty files if they don't exist
    data_files = ['users.json', 'companies.json', 'jobs.json', 'posts.json', 'messages.json']
    for file in data_files:
        file_path = os.path.join('data', file)
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                if file == 'users.json' or file == 'posts.json' or file == 'messages.json':
                    f.write('[]')
                else:
                    f.write('{}')
    
    app.run(debug=True, port=5000)