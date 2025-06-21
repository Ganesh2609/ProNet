import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import NewsFeed from '../components/feed/NewsFeed';
import CreatePost from '../components/feed/CreatePost';
import { fetchFeed } from '../services/api';
import '../styles/feed.css';
import Advertisement from '../components/common/Advertisement';
import '../styles/advertisement.css';

const HomePage = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const feedData = await fetchFeed();
        setPosts(feedData);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-grid">
        <Sidebar currentUser={currentUser} />
        
        <div className="feed">
          <CreatePost currentUser={currentUser} onNewPost={handleNewPost} />
          <NewsFeed 
            posts={posts} 
            currentUser={currentUser} 
            loading={loading} 
          />
        </div>
        
        <div className="sidebar-right">
          <div className="news-card">
            <div className="news-header">
              <h2 className="news-title">LinkedIn News</h2>
              <span className="news-icon">ⓘ</span>
            </div>
            
            <ul className="news-list">
              <li className="news-item">
                <span className="news-bullet">•</span>
                <div className="news-content">
                  <h3 className="news-headline">Big Tech continues hiring freeze</h3>
                  <div className="news-footer">
                    <span className="news-source">TechCrunch</span>
                    <span className="news-time">3h ago</span>
                  </div>
                </div>
              </li>
              
              <li className="news-item">
                <span className="news-bullet">•</span>
                <div className="news-content">
                  <h3 className="news-headline">Remote work leads to burnout, study finds</h3>
                  <div className="news-footer">
                    <span className="news-source">Harvard Business Review</span>
                    <span className="news-time">5h ago</span>
                  </div>
                </div>
              </li>
              
              <li className="news-item">
                <span className="news-bullet">•</span>
                <div className="news-content">
                  <h3 className="news-headline">How AI is transforming healthcare</h3>
                  <div className="news-footer">
                    <span className="news-source">Forbes</span>
                    <span className="news-time">1d ago</span>
                  </div>
                </div>
              </li>
              
              <li className="news-item">
                <span className="news-bullet">•</span>
                <div className="news-content">
                  <h3 className="news-headline">The future of electric vehicles</h3>
                  <div className="news-footer">
                    <span className="news-source">Bloomberg</span>
                    <span className="news-time">2d ago</span>
                  </div>
                </div>
              </li>
              
              <li className="news-item">
                <span className="news-bullet">•</span>
                <div className="news-content">
                  <h3 className="news-headline">Startups raise record funding despite economic uncertainty</h3>
                  <div className="news-footer">
                    <span className="news-source">The Wall Street Journal</span>
                    <span className="news-time">3d ago</span>
                  </div>
                </div>
              </li>
            </ul>
            
            <div className="news-show-more">
              Show more
            </div>
          </div>
          
          <Advertisement 
            title="Ad"
            message="Get the latest insights on market trends"
            imageUrl="/assets/images/ad-placeholder.jpg"
            buttonText="Learn More"
            buttonUrl="https://example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;