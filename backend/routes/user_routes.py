from flask import Blueprint, jsonify, request
import json
import os
import time

user_bp = Blueprint('users', __name__)

# Helper function to read users data
def get_users():
    try:
        with open('data/users.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Helper function to write users data
def save_users(users):
    with open('data/users.json', 'w') as f:
        json.dump(users, f, indent=2)

# Get all users
@user_bp.route('/', methods=['GET'])
def get_all_users():
    users = get_users()
    # Remove sensitive information like password
    for user in users:
        if 'password' in user:
            del user['password']
    return jsonify(users)

# Get user by ID
@user_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    users = get_users()
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Remove sensitive information
    if 'password' in user:
        user_copy = user.copy()
        del user_copy['password']
        return jsonify(user_copy)
    
    return jsonify(user)

# Create new user
@user_bp.route('/', methods=['POST'])
def create_user():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    users = get_users()
    
    # Check if email already exists
    if any(u.get('email') == request.json.get('email') for u in users):
        return jsonify({"error": "Email already exists"}), 409
    
    # Create new user
    new_user = {
        "id": str(int(time.time())),
        "createdAt": int(time.time()),
        **request.json
    }
    
    users.append(new_user)
    save_users(users)
    
    # Don't return password in response
    if 'password' in new_user:
        new_user_copy = new_user.copy()
        del new_user_copy['password']
        return jsonify(new_user_copy), 201
    
    return jsonify(new_user), 201

# Update user
@user_bp.route('/<user_id>', methods=['PUT'])
def update_user(user_id):
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    users = get_users()
    user_index = next((i for i, u in enumerate(users) if u.get('id') == user_id), None)
    
    if user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Update user data
    updated_user = {**users[user_index], **request.json}
    updated_user['updatedAt'] = int(time.time())
    users[user_index] = updated_user
    
    save_users(users)
    
    # Don't return password in response
    if 'password' in updated_user:
        updated_user_copy = updated_user.copy()
        del updated_user_copy['password']
        return jsonify(updated_user_copy)
    
    return jsonify(updated_user)

# Delete user
@user_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    users = get_users()
    user_index = next((i for i, u in enumerate(users) if u.get('id') == user_id), None)
    
    if user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Remove user
    del users[user_index]
    save_users(users)
    
    return jsonify({"message": "User deleted successfully"})