import React from 'react';
import PostItem from './PostItem';

const NewsFeed = ({ posts, currentUser, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
        <h3>No posts yet</h3>
        <p>Start following people or create your first post!</p>
      </div>
    );
  }

  return (
    <div className="news-feed">
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          currentUser={currentUser} 
        />
      ))}
    </div>
  );
};

export default NewsFeed;