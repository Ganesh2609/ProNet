import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { EMPLOYMENT_TYPES } from '../../utils/constants';

const ProfileEdit = ({ section, data, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    // Initialize form data based on section and data
    if (section === 'basic') {
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        headline: data.headline || '',
        location: {
          country: data.location?.country || '',
          city: data.location?.city || '',
          state: data.location?.state || '',
        },
      });
    } else if (section === 'about') {
      setFormData({
        about: data.about || '',
      });
    } else if (section === 'experience') {
      if (data && data.id) {
        // Editing existing experience
        setFormData({
          id: data.id,
          title: data.title || '',
          companyName: data.companyName || '',
          employmentType: data.employmentType || '',
          location: data.location || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          currentlyWorking: data.currentlyWorking || false,
          description: data.description || '',
        });
      } else {
        // Adding new experience
        setFormData({
          title: '',
          companyName: '',
          employmentType: '',
          location: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
        });
      }
    } else if (section === 'education') {
      if (data && data.id) {
        // Editing existing education
        setFormData({
          id: data.id,
          school: data.school || '',
          degree: data.degree || '',
          fieldOfStudy: data.fieldOfStudy || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          description: data.description || '',
        });
      } else {
        // Adding new education
        setFormData({
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        });
      }
    } else if (section === 'skills') {
      setFormData({
        skills: data.skills || [],
        newSkill: '',
      });
    }
  }, [section, data]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., location.country)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSkillChange = (e) => {
    setFormData({
      ...formData,
      newSkill: e.target.value,
    });
  };
  
  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill.trim()],
        newSkill: '',
      });
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove temporary form fields
    const dataToSave = { ...formData };
    if (section === 'skills') {
      delete dataToSave.newSkill;
    }
    
    onSave(section, dataToSave);
  };
  
  const renderForm = () => {
    switch (section) {
      case 'basic':
        return (
          <>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="profile-edit-input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="profile-edit-input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="headline">Headline</label>
              <input
                type="text"
                id="headline"
                name="headline"
                className="profile-edit-input"
                value={formData.headline}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="location.country">Country/Region</label>
              <input
                type="text"
                id="location.country"
                name="location.country"
                className="profile-edit-input"
                value={formData.location?.country}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="location.city">City</label>
              <input
                type="text"
                id="location.city"
                name="location.city"
                className="profile-edit-input"
                value={formData.location?.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="location.state">State</label>
              <input
                type="text"
                id="location.state"
                name="location.state"
                className="profile-edit-input"
                value={formData.location?.state}
                onChange={handleChange}
              />
            </div>
          </>
        );
        
      case 'about':
        return (
          <div className="profile-edit-form-group">
            <label className="profile-edit-label" htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              className="profile-edit-textarea"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write a summary about yourself"
            />
          </div>
        );
        
      case 'experience':
        return (
          <>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="profile-edit-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="profile-edit-input"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="employmentType">Employment Type</label>
              <select
                id="employmentType"
                name="employmentType"
                className="profile-edit-input"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="profile-edit-input"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <div className="profile-edit-checkbox">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                />
                <label htmlFor="currentlyWorking">I am currently working in this role</label>
              </div>
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="profile-edit-input"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            {!formData.currentlyWorking && (
              <div className="profile-edit-form-group">
                <label className="profile-edit-label" htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="profile-edit-input"
                  value={formData.endDate}
                  onChange={handleChange}
                  required={!formData.currentlyWorking}
                />
              </div>
            )}
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="profile-edit-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your role and accomplishments"
              />
            </div>
          </>
        );
        
      case 'education':
        return (
          <>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="school">School</label>
              <input
                type="text"
                id="school"
                name="school"
                className="profile-edit-input"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                name="degree"
                className="profile-edit-input"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="fieldOfStudy">Field of Study</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                className="profile-edit-input"
                value={formData.fieldOfStudy}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="profile-edit-input"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="profile-edit-input"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="profile-edit-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your studies, activities, etc."
              />
            </div>
          </>
        );
        
      case 'skills':
        return (
          <>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label" htmlFor="newSkill">Add a new skill</label>
              <div className="profile-edit-skill-input">
                <input
                  type="text"
                  id="newSkill"
                  name="newSkill"
                  className="profile-edit-input"
                  value={formData.newSkill}
                  onChange={handleSkillChange}
                  placeholder="e.g., JavaScript"
                />
                <button
                  type="button"
                  className="profile-edit-btn profile-edit-save"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="profile-edit-skill-list">
              <h4 className="profile-edit-skill-list-title">Your Skills</h4>
              {formData.skills.length === 0 ? (
                <p>No skills added yet.</p>
              ) : (
                <ul className="profile-edit-skills">
                  {formData.skills.map((skill, index) => (
                    <li key={index} className="profile-edit-skill-item">
                      <span className="profile-edit-skill-name">{skill}</span>
                      <button
                        type="button"
                        className="profile-edit-skill-remove"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  const getSectionTitle = () => {
    switch (section) {
      case 'basic':
        return 'Edit Intro';
      case 'about':
        return 'Edit About';
      case 'experience':
        return formData.id ? 'Edit Experience' : 'Add Experience';
      case 'education':
        return formData.id ? 'Edit Education' : 'Add Education';
      case 'skills':
        return 'Edit Skills';
      default:
        return 'Edit Profile';
    }
  };
  
  return (
    <div className="profile-edit-modal">
      <div className="profile-edit-modal-content">
        <div className="profile-edit-modal-header">
          <h2 className="profile-edit-modal-title">{getSectionTitle()}</h2>
          <button className="profile-edit-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="profile-edit-modal-body">
          <form onSubmit={handleSubmit} className="profile-edit-form">
            {renderForm()}
          </form>
        </div>
        
        <div className="profile-edit-modal-footer">
          <button
            type="button"
            className="profile-edit-btn profile-edit-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="profile-edit-btn profile-edit-save"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;