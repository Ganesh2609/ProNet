import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import Experience from '../components/profile/Experience';
import Education from '../components/profile/Education';
import Skills from '../components/profile/Skills';
import ProfileEdit from '../components/profile/ProfileEdit';
import { fetchUserById, fetchUserConnections } from '../services/api';
import '../styles/profile.css';

const ProfilePage = ({ currentUser }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null); // null or section name
  const [editData, setEditData] = useState(null);
  
  const isOwnProfile = currentUser && profileUser && currentUser.id === profileUser.id;
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userData = await fetchUserById(userId);
        setProfileUser(userData);
        
        // Fetch connections
        const connectionsData = await fetchUserConnections(userId);
        setConnections(connectionsData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [userId]);
  
  const handleEdit = (section, data = null) => {
    setIsEditing(section);
    setEditData(data);
  };
  
  const handleCloseEdit = () => {
    setIsEditing(null);
    setEditData(null);
  };
  
  const handleSave = (section, data) => {
    // Update profileUser with new data
    // In a real app, this would make an API call to update the user
    if (section === 'basic') {
      setProfileUser({
        ...profileUser,
        firstName: data.firstName,
        lastName: data.lastName,
        headline: data.headline,
        location: data.location,
      });
    } else if (section === 'about') {
      setProfileUser({
        ...profileUser,
        about: data.about,
      });
    } else if (section === 'experience') {
      if (data.id) {
        // Update existing experience
        const updatedExperience = profileUser.experience.map(exp => 
          exp.id === data.id ? data : exp
        );
        setProfileUser({
          ...profileUser,
          experience: updatedExperience,
        });
      } else {
        // Add new experience
        const newExperience = {
          ...data,
          id: `exp${profileUser.experience.length + 1}`,
        };
        setProfileUser({
          ...profileUser,
          experience: [...profileUser.experience, newExperience],
        });
      }
    } else if (section === 'education') {
      if (data.id) {
        // Update existing education
        const updatedEducation = profileUser.education.map(edu => 
          edu.id === data.id ? data : edu
        );
        setProfileUser({
          ...profileUser,
          education: updatedEducation,
        });
      } else {
        // Add new education
        const newEducation = {
          ...data,
          id: `edu${profileUser.education.length + 1}`,
        };
        setProfileUser({
          ...profileUser,
          education: [...profileUser.education, newEducation],
        });
      }
    } else if (section === 'skills') {
      setProfileUser({
        ...profileUser,
        skills: data.skills,
      });
    }
    
    handleCloseEdit();
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }
  
  if (!profileUser) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>User not found</h2>
          <p>The user you're looking for does not exist or you don't have permission to view this profile.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="profile-page">
      <div className="profile-grid">
        <div className="profile-main">
          <ProfileHeader 
            profileUser={profileUser} 
            currentUser={currentUser} 
            connections={connections}
            isOwnProfile={isOwnProfile}
            onEdit={() => handleEdit('basic')}
          />
          
          <div className="profile-about">
            <div className="profile-section-header">
              <h2 className="profile-section-title">About</h2>
              {isOwnProfile && (
                <div className="profile-section-edit" onClick={() => handleEdit('about')}>
                  <i className="fas fa-pencil-alt"></i>
                </div>
              )}
            </div>
            <div className="profile-about-content">
              {profileUser.about || "No information provided."}
            </div>
          </div>
          
          <Experience 
            experience={profileUser.experience} 
            isOwnProfile={isOwnProfile} 
            onEdit={handleEdit}
          />
          
          <Education 
            education={profileUser.education} 
            isOwnProfile={isOwnProfile} 
            onEdit={handleEdit}
          />
          
          <Skills 
            skills={profileUser.skills} 
            isOwnProfile={isOwnProfile} 
            onEdit={handleEdit}
          />
        </div>
        
        <div className="profile-sidebar">
          <div className="profile-sidebar-card">
            <h2 className="profile-sidebar-title">Profile Language</h2>
            <div className="profile-sidebar-content">
              <p>English</p>
            </div>
          </div>
          
          <div className="profile-sidebar-card">
            <h2 className="profile-sidebar-title">Public Profile URL</h2>
            <div className="profile-sidebar-content">
              <p>linkedin.com/in/{profileUser.firstName.toLowerCase()}-{profileUser.lastName.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {isEditing && (
        <ProfileEdit 
          section={isEditing} 
          data={editData || profileUser} 
          onClose={handleCloseEdit} 
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfilePage;