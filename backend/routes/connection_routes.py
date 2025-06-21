from flask import Blueprint, jsonify, request
import json
import time

connection_bp = Blueprint('connections', __name__)

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

# Get user connections
@connection_bp.route('/user/<user_id>', methods=['GET'])
def get_connections(user_id):
    users = get_users()
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Get connections data
    connections = user.get('connections', [])
    
    # Get full user data for each connection
    connection_users = []
    for conn in connections:
        if conn.get('status') == 'connected':
            connection_user = next((u for u in users if u.get('id') == conn.get('userId')), None)
            if connection_user:
                # Remove sensitive data
                if 'password' in connection_user:
                    connection_user_copy = connection_user.copy()
                    del connection_user_copy['password']
                    connection_users.append(connection_user_copy)
                else:
                    connection_users.append(connection_user)
    
    return jsonify(connection_users)

# Get pending connection requests
@connection_bp.route('/requests/<user_id>', methods=['GET'])
def get_connection_requests(user_id):
    users = get_users()
    user = next((u for u in users if u.get('id') == user_id), None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Filter other users who have sent connection requests to this user
    pending_requests = []
    for u in users:
        if u.get('id') != user_id:
            connections = u.get('connections', [])
            for conn in connections:
                if conn.get('userId') == user_id and conn.get('status') == 'pending':
                    # Copy user data without sensitive info
                    user_data = u.copy()
                    if 'password' in user_data:
                        del user_data['password']
                    pending_requests.append(user_data)
    
    return jsonify(pending_requests)

# Send connection request
@connection_bp.route('/request', methods=['POST'])
def send_connection_request():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    from_user_id = request.json.get('fromUserId')
    to_user_id = request.json.get('toUserId')
    
    if not from_user_id or not to_user_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    users = get_users()
    from_user_index = next((i for i, u in enumerate(users) if u.get('id') == from_user_id), None)
    to_user_index = next((i for i, u in enumerate(users) if u.get('id') == to_user_id), None)
    
    if from_user_index is None or to_user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Check if connection already exists
    from_user_connections = users[from_user_index].get('connections', [])
    existing_connection = next((c for c in from_user_connections if c.get('userId') == to_user_id), None)
    
    if existing_connection:
        return jsonify({"error": "Connection request already sent"}), 409
    
    # Add connection to from_user
    connection = {
        "userId": to_user_id,
        "status": "pending",
        "createdAt": int(time.time())
    }
    
    if 'connections' not in users[from_user_index]:
        users[from_user_index]['connections'] = []
    
    users[from_user_index]['connections'].append(connection)
    save_users(users)
    
    return jsonify({"message": "Connection request sent successfully"})

# Accept connection request
@connection_bp.route('/accept', methods=['POST'])
def accept_connection_request():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    from_user_id = request.json.get('fromUserId')
    to_user_id = request.json.get('toUserId')
    
    if not from_user_id or not to_user_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    users = get_users()
    from_user_index = next((i for i, u in enumerate(users) if u.get('id') == from_user_id), None)
    to_user_index = next((i for i, u in enumerate(users) if u.get('id') == to_user_id), None)
    
    if from_user_index is None or to_user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Update connection status in from_user
    from_user_connections = users[from_user_index].get('connections', [])
    connection_index = next((i for i, c in enumerate(from_user_connections) 
                           if c.get('userId') == to_user_id), None)
    
    if connection_index is None:
        return jsonify({"error": "Connection request not found"}), 404
    
    from_user_connections[connection_index]['status'] = 'connected'
    users[from_user_index]['connections'] = from_user_connections
    
    # Add connection to to_user
    to_user_connections = users[to_user_index].get('connections', [])
    
    # Check if connection already exists
    existing_connection = next((c for c in to_user_connections if c.get('userId') == from_user_id), None)
    
    if not existing_connection:
        connection = {
            "userId": from_user_id,
            "status": "connected",
            "createdAt": int(time.time())
        }
        
        if 'connections' not in users[to_user_index]:
            users[to_user_index]['connections'] = []
        
        users[to_user_index]['connections'].append(connection)
    else:
        # Update existing connection
        connection_index = next((i for i, c in enumerate(to_user_connections) 
                               if c.get('userId') == from_user_id), None)
        to_user_connections[connection_index]['status'] = 'connected'
        users[to_user_index]['connections'] = to_user_connections
    
    save_users(users)
    
    return jsonify({"message": "Connection request accepted"})

# Reject connection request
@connection_bp.route('/reject', methods=['POST'])
def reject_connection_request():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    from_user_id = request.json.get('fromUserId')
    to_user_id = request.json.get('toUserId')
    
    if not from_user_id or not to_user_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    users = get_users()
    from_user_index = next((i for i, u in enumerate(users) if u.get('id') == from_user_id), None)
    
    if from_user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Remove connection from from_user
    from_user_connections = users[from_user_index].get('connections', [])
    connection_index = next((i for i, c in enumerate(from_user_connections) 
                           if c.get('userId') == to_user_id), None)
    
    if connection_index is None:
        return jsonify({"error": "Connection request not found"}), 404
    
    del from_user_connections[connection_index]
    users[from_user_index]['connections'] = from_user_connections
    save_users(users)
    
    return jsonify({"message": "Connection request rejected"})

# Remove connection
@connection_bp.route('/remove', methods=['POST'])
def remove_connection():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    user_id = request.json.get('userId')
    connection_id = request.json.get('connectionId')
    
    if not user_id or not connection_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    users = get_users()
    user_index = next((i for i, u in enumerate(users) if u.get('id') == user_id), None)
    connection_index = next((i for i, u in enumerate(users) if u.get('id') == connection_id), None)
    
    if user_index is None or connection_index is None:
        return jsonify({"error": "User not found"}), 404
    
    # Remove connection from user
    user_connections = users[user_index].get('connections', [])
    conn_index = next((i for i, c in enumerate(user_connections) 
                     if c.get('userId') == connection_id), None)
    
    if conn_index is not None:
        del user_connections[conn_index]
        users[user_index]['connections'] = user_connections
    
    # Remove connection from connection_user
    connection_connections = users[connection_index].get('connections', [])
    conn_index = next((i for i, c in enumerate(connection_connections) 
                     if c.get('userId') == user_id), None)
    
    if conn_index is not None:
        del connection_connections[conn_index]
        users[connection_index]['connections'] = connection_connections
    
    save_users(users)
    
    return jsonify({"message": "Connection removed successfully"})