import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaCamera, FaUserPlus, FaEnvelope, FaEllipsisH } from 'react-icons/fa';
import { sendConnectionRequest, acceptConnectionRequest, removeConnection } from '../../services/api';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ProfileHeader = ({ profileUser, currentUser, connections, isOwnProfile, onEdit }) => {
  const [connectionStatus, setConnectionStatus] = useState('not_connected');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Determine connection status
    if (isOwnProfile) {
      setConnectionStatus('self');
    } else if (currentUser && profileUser) {
      // Check if there's an existing connection
      const currentUserConnections = currentUser.connections || [];
      const connection = currentUserConnections.find(
        conn => conn.userId === profileUser.id
      );

      if (connection) {
        setConnectionStatus(connection.status);
      } else {
        // Check if profile user has sent a request to current user
        const profileUserConnections = profileUser.connections || [];
        const incomingRequest = profileUserConnections.find(
          conn => conn.userId === currentUser.id && conn.status === 'pending'
        );

        if (incomingRequest) {
          setConnectionStatus('pending_incoming');
        } else {
          setConnectionStatus('not_connected');
        }
      }
    }
  }, [currentUser, profileUser, isOwnProfile]);

  const handleConnect = async () => {
    if (!currentUser || !profileUser) return;

    setIsLoading(true);
    try {
      await sendConnectionRequest(currentUser.id, profileUser.id);
      setConnectionStatus('pending');
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!currentUser || !profileUser) return;

    setIsLoading(true);
    try {
      await acceptConnectionRequest(profileUser.id, currentUser.id);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error accepting connection request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveConnection = async () => {
    if (!currentUser || !profileUser) return;

    setIsLoading(true);
    try {
      await removeConnection(currentUser.id, profileUser.id);
      setConnectionStatus('not_connected');
    } catch (error) {
      console.error('Error removing connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderConnectionButton = () => {
    switch (connectionStatus) {
      case 'self':
        return null;
      case 'connected':
        return (
          <button className="profile-action-btn profile-action-secondary" onClick={handleRemoveConnection} disabled={isLoading}>
            <FaUserPlus className="profile-action-icon" />
            Connected
          </button>
        );
      case 'pending':
        return (
          <button className="profile-action-btn profile-action-secondary" disabled={true}>
            Pending
          </button>
        );
      case 'pending_incoming':
        return (
          <button className="profile-action-btn profile-action-primary" onClick={handleAccept} disabled={isLoading}>
            Accept Request
          </button>
        );
      default:
        return (
          <button className="profile-action-btn profile-action-primary" onClick={handleConnect} disabled={isLoading}>
            <FaUserPlus className="profile-action-icon" />
            Connect
          </button>
        );
    }
  };

  if (!profileUser) return null;

  return (
    <div className="profile-header">
      <div className="profile-background">
        {isOwnProfile && (
          <div className="profile-background-edit">
            <FaCamera />
          </div>
        )}
      </div>

      <div className="profile-info">
        <div className="profile-image-container">
          <img
            src={profileUser.profilePicture || DEFAULT_AVATAR}
            alt={`${profileUser.firstName} ${profileUser.lastName}`}
            className="profile-image"
          />
          {isOwnProfile && (
            <div className="profile-image-edit">
              <FaCamera />
            </div>
          )}
        </div>

        <div className="profile-name-section">
          <h1 className="profile-name">
            {profileUser.firstName} {profileUser.lastName}
          </h1>
          <p className="profile-headline">{profileUser.headline}</p>
          <p className="profile-location">
            {profileUser.location && (
              `${profileUser.location.city}, ${profileUser.location.state}, ${profileUser.location.country}`
            )}
          </p>
          <p className="profile-connections">
            {connections.length} connections
          </p>

          <div className="profile-actions">
            {isOwnProfile ? (
              <button className="profile-action-btn profile-action-secondary" onClick={onEdit}>
                <FaPencilAlt className="profile-action-icon" />
                Edit Profile
              </button>
            ) : (
              <>
                {renderConnectionButton()}
                <button className="profile-action-btn profile-action-secondary">
                  <FaEnvelope className="profile-action-icon" />
                  Message
                </button>
                <button className="profile-action-btn profile-action-more">
                  <FaEllipsisH className="profile-action-icon" />
                  More
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;