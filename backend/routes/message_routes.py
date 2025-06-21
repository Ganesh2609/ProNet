from flask import Blueprint, jsonify, request
import json
import time

message_bp = Blueprint('messages', __name__)

# Helper function to read messages data
def get_messages():
    try:
        with open('data/messages.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Helper function to write messages data
def save_messages(messages):
    with open('data/messages.json', 'w') as f:
        json.dump(messages, f, indent=2)

# Helper function to read users data
def get_users():
    try:
        with open('data/users.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Get user conversations
@message_bp.route('/conversations/<user_id>', methods=['GET'])
def get_conversations(user_id):
    messages = get_messages()
    users = get_users()
    
    # Get all messages where user is sender or receiver
    user_messages = [
        m for m in messages 
        if m.get('senderId') == user_id or m.get('receiverId') == user_id
    ]
    
    # Group messages by conversation (other user)
    conversations = {}
    for message in user_messages:
        sender_id = message.get('senderId')
        receiver_id = message.get('receiverId')
        
        # Determine other user
        other_user_id = receiver_id if sender_id == user_id else sender_id
        
        if other_user_id not in conversations:
            # Get other user data
            other_user = next((u for u in users if u.get('id') == other_user_id), None)
            
            if other_user:
                # Create conversation with latest message
                conversations[other_user_id] = {
                    'userId': other_user_id,
                    'firstName': other_user.get('firstName'),
                    'lastName': other_user.get('lastName'),
                    'profilePicture': other_user.get('profilePicture'),
                    'latestMessage': message,
                    'unreadCount': 0
                }
        else:
            # Update latest message if this one is newer
            current_latest = conversations[other_user_id]['latestMessage']
            if message.get('createdAt', 0) > current_latest.get('createdAt', 0):
                conversations[other_user_id]['latestMessage'] = message
        
        # Count unread messages
        if receiver_id == user_id and not message.get('read', False):
            conversations[other_user_id]['unreadCount'] += 1
    
    # Convert to list and sort by latest message (most recent first)
    conversation_list = list(conversations.values())
    conversation_list.sort(
        key=lambda x: x.get('latestMessage', {}).get('createdAt', 0), 
        reverse=True
    )
    
    return jsonify(conversation_list)

# Get conversation messages
@message_bp.route('/conversation', methods=['GET'])
def get_conversation_messages():
    user_id = request.args.get('userId')
    other_id = request.args.get('otherId')
    
    if not user_id or not other_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    messages = get_messages()
    
    # Get messages between the two users
    conversation_messages = [
        m for m in messages 
        if (m.get('senderId') == user_id and m.get('receiverId') == other_id) or
           (m.get('senderId') == other_id and m.get('receiverId') == user_id)
    ]
    
    # Sort messages by created date (oldest first)
    conversation_messages.sort(key=lambda x: x.get('createdAt', 0))
    
    # Mark messages as read
    updated = False
    for i, message in enumerate(conversation_messages):
        if message.get('receiverId') == user_id and not message.get('read', False):
            conversation_messages[i]['read'] = True
            updated = True
    
    # Save updated messages
    if updated:
        for i, message in enumerate(messages):
            if message.get('receiverId') == user_id and message.get('senderId') == other_id and not message.get('read', False):
                messages[i]['read'] = True
        
        save_messages(messages)
    
    return jsonify(conversation_messages)

# Send message
@message_bp.route('/', methods=['POST'])
def send_message():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    sender_id = request.json.get('senderId')
    receiver_id = request.json.get('receiverId')
    content = request.json.get('content')
    
    if not sender_id or not receiver_id or not content:
        return jsonify({"error": "Sender ID, Receiver ID, and content are required"}), 400
    
    messages = get_messages()
    
    # Create new message
    new_message = {
        "id": str(int(time.time())),
        "senderId": sender_id,
        "receiverId": receiver_id,
        "content": content,
        "createdAt": int(time.time()),
        "read": False
    }
    
    messages.append(new_message)
    save_messages(messages)
    
    return jsonify(new_message), 201

# Mark messages as read
@message_bp.route('/read', methods=['POST'])
def mark_as_read():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    user_id = request.json.get('userId')
    sender_id = request.json.get('senderId')
    
    if not user_id or not sender_id:
        return jsonify({"error": "User IDs are required"}), 400
    
    messages = get_messages()
    updated = False
    
    # Update messages
    for i, message in enumerate(messages):
        if message.get('receiverId') == user_id and message.get('senderId') == sender_id and not message.get('read', False):
            messages[i]['read'] = True
            updated = True
    
    if updated:
        save_messages(messages)
        return jsonify({"message": "Messages marked as read"})
    
    return jsonify({"message": "No messages to update"})