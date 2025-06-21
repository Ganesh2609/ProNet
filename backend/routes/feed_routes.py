from flask import Blueprint, jsonify, request
import json
import time

feed_bp = Blueprint('feed', __name__)

# Helper function to read posts data
def get_posts():
    try:
        with open('data/posts.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Helper function to write posts data
def save_posts(posts):
    with open('data/posts.json', 'w') as f:
        json.dump(posts, f, indent=2)

# Helper function to read users data
def get_users():
    try:
        with open('data/users.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Get feed posts
@feed_bp.route('/', methods=['GET'])
def get_feed():
    posts = get_posts()
    users = get_users()
    
    # Sort posts by created date (most recent first)
    posts.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
    
    # Add user data to posts
    for post in posts:
        user_id = post.get('userId')
        user = next((u for u in users if u.get('id') == user_id), None)
        
        if user:
            # Create a copy without sensitive information
            user_data = {
                'id': user.get('id'),
                'firstName': user.get('firstName'),
                'lastName': user.get('lastName'),
                'headline': user.get('headline'),
                'profilePicture': user.get('profilePicture')
            }
            post['user'] = user_data
    
    return jsonify(posts)

# Get user posts
@feed_bp.route('/user/<user_id>', methods=['GET'])
def get_user_posts(user_id):
    posts = get_posts()
    users = get_users()
    
    # Filter posts by user ID
    user_posts = [p for p in posts if p.get('userId') == user_id]
    
    # Sort posts by created date (most recent first)
    user_posts.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
    
    # Add user data to posts
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if user:
        # Create a copy without sensitive information
        user_data = {
            'id': user.get('id'),
            'firstName': user.get('firstName'),
            'lastName': user.get('lastName'),
            'headline': user.get('headline'),
            'profilePicture': user.get('profilePicture')
        }
        
        for post in user_posts:
            post['user'] = user_data
    
    return jsonify(user_posts)

# Create new post
@feed_bp.route('/', methods=['POST'])
def create_post():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    posts = get_posts()
    
    # Create new post
    new_post = {
        "id": str(int(time.time())),
        "createdAt": int(time.time()),
        "likes": [],
        "comments": [],
        **request.json
    }
    
    posts.append(new_post)
    save_posts(posts)
    
    # Add user data to post
    users = get_users()
    user_id = new_post.get('userId')
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if user:
        # Create a copy without sensitive information
        user_data = {
            'id': user.get('id'),
            'firstName': user.get('firstName'),
            'lastName': user.get('lastName'),
            'headline': user.get('headline'),
            'profilePicture': user.get('profilePicture')
        }
        new_post['user'] = user_data
    
    return jsonify(new_post), 201

# Like a post
@feed_bp.route('/like', methods=['POST'])
def like_post():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    post_id = request.json.get('postId')
    user_id = request.json.get('userId')
    
    if not post_id or not user_id:
        return jsonify({"error": "Post ID and User ID are required"}), 400
    
    posts = get_posts()
    post_index = next((i for i, p in enumerate(posts) if p.get('id') == post_id), None)
    
    if post_index is None:
        return jsonify({"error": "Post not found"}), 404
    
    # Check if already liked
    likes = posts[post_index].get('likes', [])
    if user_id in likes:
        return jsonify({"error": "Post already liked"}), 409
    
    # Add user to likes
    likes.append(user_id)
    posts[post_index]['likes'] = likes
    save_posts(posts)
    
    return jsonify({"message": "Post liked successfully"})

# Unlike a post
@feed_bp.route('/unlike', methods=['POST'])
def unlike_post():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    post_id = request.json.get('postId')
    user_id = request.json.get('userId')
    
    if not post_id or not user_id:
        return jsonify({"error": "Post ID and User ID are required"}), 400
    
    posts = get_posts()
    post_index = next((i for i, p in enumerate(posts) if p.get('id') == post_id), None)
    
    if post_index is None:
        return jsonify({"error": "Post not found"}), 404
    
    # Check if post is liked
    likes = posts[post_index].get('likes', [])
    if user_id not in likes:
        return jsonify({"error": "Post not liked"}), 409
    
    # Remove user from likes
    likes.remove(user_id)
    posts[post_index]['likes'] = likes
    save_posts(posts)
    
    return jsonify({"message": "Post unliked successfully"})

# Add comment to a post
@feed_bp.route('/comment', methods=['POST'])
def add_comment():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    post_id = request.json.get('postId')
    user_id = request.json.get('userId')
    content = request.json.get('content')
    
    if not post_id or not user_id or not content:
        return jsonify({"error": "Post ID, User ID, and content are required"}), 400
    
    posts = get_posts()
    post_index = next((i for i, p in enumerate(posts) if p.get('id') == post_id), None)
    
    if post_index is None:
        return jsonify({"error": "Post not found"}), 404
    
    # Create new comment
    comment = {
        "id": str(int(time.time())),
        "userId": user_id,
        "content": content,
        "createdAt": int(time.time())
    }
    
    # Add user data to comment
    users = get_users()
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if user:
        # Create a copy without sensitive information
        user_data = {
            'id': user.get('id'),
            'firstName': user.get('firstName'),
            'lastName': user.get('lastName'),
            'headline': user.get('headline'),
            'profilePicture': user.get('profilePicture')
        }
        comment['user'] = user_data
    
    # Add comment to post
    if 'comments' not in posts[post_index]:
        posts[post_index]['comments'] = []
    
    posts[post_index]['comments'].append(comment)
    save_posts(posts)
    
    return jsonify(comment), 201