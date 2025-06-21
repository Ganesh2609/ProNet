import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <img src="/assets/images/linkedin-logo.png" alt="LinkedIn" className="footer-logo-img" />
            </Link>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4 className="footer-links-title">Navigation</h4>
              <ul className="footer-links-list">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/mynetwork" className="footer-link">My Network</Link></li>
                <li><Link to="/jobs" className="footer-link">Jobs</Link></li>
                <li><Link to="/messaging" className="footer-link">Messaging</Link></li>
                <li><Link to="/notifications" className="footer-link">Notifications</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-links-title">Business Services</h4>
              <ul className="footer-links-list">
                <li><Link to="/talent" className="footer-link">Talent Solutions</Link></li>
                <li><Link to="/marketing" className="footer-link">Marketing Solutions</Link></li>
                <li><Link to="/sales" className="footer-link">Sales Solutions</Link></li>
                <li><Link to="/learning" className="footer-link">Learning Solutions</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-links-title">Resources</h4>
              <ul className="footer-links-list">
                <li><Link to="/help" className="footer-link">Help Center</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy & Terms</Link></li>
                <li><Link to="/accessibility" className="footer-link">Accessibility</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-links-title">Community</h4>
              <ul className="footer-links-list">
                <li><Link to="/community" className="footer-link">Community Guidelines</Link></li>
                <li><Link to="/safety" className="footer-link">Safety Center</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} LinkedIn Clone
          </div>
          <div className="footer-info">
            <span>This is a clone project for demonstration purposes only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;