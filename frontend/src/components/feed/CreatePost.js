import React, { useState } from 'react';
import { FaImage, FaVideo, FaCalendarAlt, FaNewspaper, FaTimes, FaCamera } from 'react-icons/fa';
import { createPost } from '../../services/api';
import { DEFAULT_AVATAR } from '../../utils/constants';

const CreatePost = ({ currentUser, onNewPost }) => {
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostContent('');
    setImageUrl('');
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, we would upload the image to a server
      // For demo purposes, we'll use a placeholder
      setImageUrl('https://random.imagecdn.app/500/300');
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  const handleSubmit = async () => {
    if (!postContent.trim() && !imageUrl) return;

    setIsSubmitting(true);
    try {
      const newPost = {
        userId: currentUser.id,
        content: postContent,
        image: imageUrl,
      };

      const response = await createPost(newPost);
      
      // Add user data to response
      response.user = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        headline: currentUser.headline,
        profilePicture: currentUser.profilePicture,
      };
      
      onNewPost(response);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="create-post">
        <div className="create-post-input">
          <img 
            src={currentUser.profilePicture || DEFAULT_AVATAR} 
            alt={`${currentUser.firstName} ${currentUser.lastName}`} 
            className="create-post-avatar" 
          />
          <div className="create-post-field" onClick={handleOpenModal}>
            <span className="create-post-placeholder">Start a post</span>
          </div>
        </div>
        
        <div className="create-post-actions">
          <div className="create-post-buttons">
            <div className="create-post-button create-post-photo" onClick={handleOpenModal}>
              <FaImage className="create-post-icon" />
              <span>Photo</span>
            </div>
            
            <div className="create-post-button create-post-video" onClick={handleOpenModal}>
              <FaVideo className="create-post-icon" />
              <span>Video</span>
            </div>
            
            <div className="create-post-button create-post-event" onClick={handleOpenModal}>
              <FaCalendarAlt className="create-post-icon" />
              <span>Event</span>
            </div>
            
            <div className="create-post-button create-post-article" onClick={handleOpenModal}>
              <FaNewspaper className="create-post-icon" />
              <span>Article</span>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="post-modal">
          <div className="post-modal-content">
            <div className="post-modal-header">
              <h2 className="post-modal-title">Create a post</h2>
              <button className="post-modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            
            <div className="post-modal-body">
              <div className="post-modal-user">
                <img 
                  src={currentUser.profilePicture || DEFAULT_AVATAR} 
                  alt={`${currentUser.firstName} ${currentUser.lastName}`} 
                  className="post-modal-avatar" 
                />
                
                <div className="post-modal-user-info">
                  <div className="post-modal-name">{currentUser.firstName} {currentUser.lastName}</div>
                  <div className="post-modal-headline">{currentUser.headline}</div>
                </div>
              </div>
              
              <div className="post-modal-form-group">
                <textarea 
                  className="post-modal-textarea"
                  placeholder="What do you want to talk about?"
                  value={postContent}
                  onChange={handleContentChange}
                  autoFocus
                />
              </div>
              
              {imageUrl && (
                <div className="post-modal-image-preview">
                  <img src={imageUrl} alt="Post preview" className="post-modal-image" />
                  <div className="post-modal-image-remove" onClick={handleRemoveImage}>
                    <FaTimes />
                  </div>
                </div>
              )}
            </div>
            
            <div className="post-modal-footer">
              <div className="post-modal-options">
                <label className="post-modal-option" title="Add a photo">
                  <FaImage />
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleImageChange} 
                  />
                </label>
                
                <div className="post-modal-option" title="Add a video">
                  <FaVideo />
                </div>
                
                <div className="post-modal-option" title="Add a photo">
                  <FaCamera />
                </div>
              </div>
              
              <button 
                className="post-modal-post" 
                onClick={handleSubmit}
                disabled={isSubmitting || (!postContent.trim() && !imageUrl)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;