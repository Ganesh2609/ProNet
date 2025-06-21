import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp, FaRegCommentDots, FaShare, FaPaperPlane } from 'react-icons/fa';
import { formatRelativeDate } from '../../utils/formatDate';
import { likePost, unlikePost, addComment } from '../../services/api';
import { DEFAULT_AVATAR } from '../../utils/constants';

const PostItem = ({ post, currentUser }) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.likes?.includes(currentUser.id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id, currentUser.id);
        setLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        await likePost(post.id, currentUser.id);
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const newComment = await addComment(post.id, currentUser.id, commentText);
      
      // Add user data to the comment
      newComment.user = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        profilePicture: currentUser.profilePicture,
      };
      
      setComments([...comments, newComment]);
      setCommentText('');
      
      // Make sure comments are visible after adding
      setShowComments(true);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <img 
          src={post.user?.profilePicture || DEFAULT_AVATAR} 
          alt={`${post.user?.firstName} ${post.user?.lastName}`} 
          className="post-avatar" 
        />
        
        <div className="post-user-info">
          <Link to={`/profile/${post.user?.id}`} className="post-user-name">
            {post.user?.firstName} {post.user?.lastName}
          </Link>
          <div className="post-user-headline">{post.user?.headline}</div>
          <div className="post-time">
            {formatRelativeDate(post.createdAt)}
            <span className="post-time-dot">•</span>
            <span>🌎</span>
          </div>
        </div>
      </div>
      
      <div className="post-content">
        {post.content}
      </div>
      
      {post.image && (
        <img src={post.image} alt="Post content" className="post-image" />
      )}
      
      <div className="post-stats">
        {likesCount > 0 && (
          <div className="post-likes">
            <FaThumbsUp className="post-likes-icon" />
            <span>{likesCount}</span>
          </div>
        )}
        
        {comments.length > 0 && (
          <div className="post-comments-count" onClick={toggleComments}>
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      <div className="post-actions">
        <div 
          className={`post-action post-action-like ${liked ? 'active' : ''}`}
          onClick={handleLike}
        >
          {liked ? (
            <FaThumbsUp className="post-action-icon" />
          ) : (
            <FaRegThumbsUp className="post-action-icon" />
          )}
          Like
        </div>
        
        <div className="post-action post-action-comment" onClick={toggleComments}>
          <FaRegCommentDots className="post-action-icon" />
          Comment
        </div>
        
        <div className="post-action post-action-share">
          <FaShare className="post-action-icon" />
          Share
        </div>
        
        <div className="post-action post-action-send">
          <FaPaperPlane className="post-action-icon" />
          Send
        </div>
      </div>
      
      {showComments && (
        <div className="post-comments">
          <div className="post-comment-form">
            <img 
              src={currentUser.profilePicture || DEFAULT_AVATAR} 
              alt={`${currentUser.firstName} ${currentUser.lastName}`} 
              className="post-comment-avatar" 
            />
            
            <div className="post-comment-input-container">
              <form onSubmit={handleSubmitComment}>
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="post-comment-input"
                  value={commentText}
                  onChange={handleCommentChange}
                  disabled={isSubmitting}
                />
                
                {commentText.trim() && (
                  <button 
                    type="submit" 
                    className="post-comment-submit"
                    disabled={isSubmitting}
                  >
                    <FaPaperPlane />
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {comments.map(comment => (
            <div className="post-comment-item" key={comment.id}>
              <img 
                src={comment.user?.profilePicture || DEFAULT_AVATAR} 
                alt={`${comment.user?.firstName} ${comment.user?.lastName}`} 
                className="post-comment-avatar" 
              />
              
              <div className="post-comment-content">
                <Link to={`/profile/${comment.user?.id}`} className="post-comment-user">
                  {comment.user?.firstName} {comment.user?.lastName}
                </Link>
                <div className="post-comment-text">{comment.content}</div>
                
                <div className="post-comment-actions">
                  <span className="post-comment-action">Like</span>
                  <span className="post-comment-action">Reply</span>
                  <span className="post-comment-time">{formatRelativeDate(comment.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostItem;