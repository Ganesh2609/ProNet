import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import JobSearch from '../components/jobs/JobSearch';
import JobItem from '../components/jobs/JobItem';
import ApplicationTracker from '../components/jobs/ApplicationTracker';
import { fetchJobs, searchJobs, fetchUserApplications } from '../services/api';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../utils/constants';
import '../styles/jobs.css';

const JobsPage = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    datePosted: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        setLoading(true);
        
        // Fetch jobs
        let jobsData;
        if (searchQuery || searchLocation) {
          jobsData = await searchJobs(searchQuery, searchLocation);
        } else {
          jobsData = await fetchJobs();
        }
        
        setJobs(jobsData);
        
        // Fetch user applications
        if (currentUser) {
          const applicationsData = await fetchUserApplications(currentUser.id);
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error('Error fetching jobs data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobsData();
  }, [currentUser, searchQuery, searchLocation]);

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      if (filterType === 'datePosted') {
        return { ...prevFilters, datePosted: value };
      } else {
        const updatedFilter = [...prevFilters[filterType]];
        const index = updatedFilter.indexOf(value);
        
        if (index === -1) {
          updatedFilter.push(value);
        } else {
          updatedFilter.splice(index, 1);
        }
        
        return { ...prevFilters, [filterType]: updatedFilter };
      }
    });
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
  };

  const handleApplySuccess = (jobId) => {
    // Update applications list (in a real app, we would get the updated application)
    const appliedJob = jobs.find(job => job.id === jobId);
    if (appliedJob) {
      setApplications([
        ...applications,
        {
          ...appliedJob,
          applicationStatus: 'applied',
          appliedAt: Date.now(),
        },
      ]);
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    // Job type filter
    if (filters.jobType.length > 0 && !filters.jobType.includes(job.type)) {
      return false;
    }
    
    // Experience level filter
    if (filters.experienceLevel.length > 0) {
      // For demo purposes, we'll assume jobs have an experienceLevel property
      // In a real app, this might be derived from the job description or title
      const jobExperienceLevel = job.experienceLevel || 'Mid-Senior level';
      if (!filters.experienceLevel.includes(jobExperienceLevel)) {
        return false;
      }
    }
    
    // Date posted filter
    if (filters.datePosted) {
      const now = Date.now();
      const jobPostedAt = job.postedAt * 1000; // Convert to milliseconds
      const daysDifference = Math.floor((now - jobPostedAt) / (1000 * 60 * 60 * 24));
      
      switch (filters.datePosted) {
        case 'past24h':
          return daysDifference < 1;
        case 'pastWeek':
          return daysDifference < 7;
        case 'pastMonth':
          return daysDifference < 30;
        default:
          return true;
      }
    }
    
    return true;
  });

  if (loading && jobs.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <JobSearch onSearch={handleSearch} />
      
      <div className="jobs-grid">
        <div className="jobs-filters">
          <div className="filters-card">
            <div className="filters-header">
              <h2 className="filters-title">Filters</h2>
            </div>
            
            <div className="filters-group">
              <h3 className="filters-group-title">Job Type</h3>
              {JOB_TYPES.slice(0, 5).map(type => (
                <div className="filter-checkbox" key={type}>
                  <input
                    type="checkbox"
                    id={`jobType-${type}`}
                    className="filter-checkbox-input"
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleFilterChange('jobType', type)}
                  />
                  <label htmlFor={`jobType-${type}`} className="filter-checkbox-label">
                    {type}
                  </label>
                </div>
              ))}
              
              {JOB_TYPES.length > 5 && (
                <div className="filters-show-more">
                  Show more
                </div>
              )}
            </div>
            
            <div className="filters-group">
              <h3 className="filters-group-title">Experience Level</h3>
              {EXPERIENCE_LEVELS.map(level => (
                <div className="filter-checkbox" key={level}>
                  <input
                    type="checkbox"
                    id={`experienceLevel-${level}`}
                    className="filter-checkbox-input"
                    checked={filters.experienceLevel.includes(level)}
                    onChange={() => handleFilterChange('experienceLevel', level)}
                  />
                  <label htmlFor={`experienceLevel-${level}`} className="filter-checkbox-label">
                    {level}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="filters-group">
              <h3 className="filters-group-title">Date Posted</h3>
              <div className="filter-checkbox">
                <input
                  type="radio"
                  id="datePosted-any"
                  name="datePosted"
                  className="filter-checkbox-input"
                  checked={filters.datePosted === ''}
                  onChange={() => handleFilterChange('datePosted', '')}
                />
                <label htmlFor="datePosted-any" className="filter-checkbox-label">
                  Any time
                </label>
              </div>
              
              <div className="filter-checkbox">
                <input
                  type="radio"
                  id="datePosted-past24h"
                  name="datePosted"
                  className="filter-checkbox-input"
                  checked={filters.datePosted === 'past24h'}
                  onChange={() => handleFilterChange('datePosted', 'past24h')}
                />
                <label htmlFor="datePosted-past24h" className="filter-checkbox-label">
                  Past 24 hours
                </label>
              </div>
              
              <div className="filter-checkbox">
                <input
                  type="radio"
                  id="datePosted-pastWeek"
                  name="datePosted"
                  className="filter-checkbox-input"
                  checked={filters.datePosted === 'pastWeek'}
                  onChange={() => handleFilterChange('datePosted', 'pastWeek')}
                />
                <label htmlFor="datePosted-pastWeek" className="filter-checkbox-label">
                  Past week
                </label>
              </div>
              
              <div className="filter-checkbox">
                <input
                  type="radio"
                  id="datePosted-pastMonth"
                  name="datePosted"
                  className="filter-checkbox-input"
                  checked={filters.datePosted === 'pastMonth'}
                  onChange={() => handleFilterChange('datePosted', 'pastMonth')}
                />
                <label htmlFor="datePosted-pastMonth" className="filter-checkbox-label">
                  Past month
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="jobs-content">
          <div className="jobs-list">
            <div className="jobs-list-header">
              <h2 className="jobs-list-title">
                Jobs
                {searchQuery && ` matching "${searchQuery}"`}
                {searchLocation && ` in ${searchLocation}`}
                {' '}
                <span className="jobs-list-count">({filteredJobs.length})</span>
              </h2>
            </div>
            
            {filteredJobs.length === 0 ? (
              <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <JobItem 
                  key={job.id} 
                  job={job} 
                  onClick={() => handleJobClick(job)}
                  isApplied={applications.some(app => app.id === job.id)}
                />
              ))
            )}
          </div>
          
          <ApplicationTracker 
            applications={applications} 
            currentUser={currentUser} 
          />
        </div>
      </div>
      
      {selectedJob && (
        <div className="job-modal" onClick={handleCloseJobModal}>
          <div className="job-modal-content" onClick={e => e.stopPropagation()}>
            <div className="job-modal-header">
              <div>
                <h1 className="job-modal-title">{selectedJob.title}</h1>
                <div className="job-modal-company">
                  <div className="job-modal-company-logo">
                    <img 
                      src={selectedJob.company?.logo || "https://via.placeholder.com/40"} 
                      alt={selectedJob.company?.name} 
                    />
                  </div>
                  {selectedJob.company?.name}
                </div>
                <div className="job-modal-location">
                  <FaMapMarkerAlt /> {selectedJob.location}
                </div>
                <div className="job-modal-date">
                  Posted {new Date(selectedJob.postedAt * 1000).toLocaleDateString()}
                </div>
              </div>
              
              <button className="job-modal-close" onClick={handleCloseJobModal}>
                &times;
              </button>
            </div>
            
            <div className="job-modal-body">
              <div className="job-modal-section">
                <div className="job-modal-salary">
                  {selectedJob.salary ? 
                    `$${selectedJob.salary.min.toLocaleString()} - $${selectedJob.salary.max.toLocaleString()} a year` : 
                    'Salary not specified'}
                </div>
                
                <div className="job-modal-description">
                  {selectedJob.description}
                </div>
              </div>
              
              <div className="job-modal-section">
                <h2 className="job-modal-section-title">Requirements</h2>
                <ul className="job-modal-requirements-list">
                  {selectedJob.requirements?.map((req, index) => (
                    <li key={index} className="job-modal-requirements-item">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="job-modal-section">
                <h2 className="job-modal-section-title">Skills</h2>
                <div className="job-modal-skills">
                  {selectedJob.skills?.map((skill, index) => (
                    <div key={index} className="job-modal-skill">{skill}</div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="job-modal-footer">
              <div className="job-modal-actions">
                {applications.some(app => app.id === selectedJob.id) ? (
                  <button 
                    className="job-modal-button job-modal-button-disabled"
                    disabled
                  >
                    Applied
                  </button>
                ) : (
                  <button 
                    className="job-modal-button job-modal-button-primary"
                    onClick={() => {
                      handleApplySuccess(selectedJob.id);
                      handleCloseJobModal();
                    }}
                  >
                    Apply
                  </button>
                )}
                
                <button className="job-modal-button job-modal-button-secondary">
                  Easy Apply
                </button>
              </div>
              
              <div className="job-modal-save">
                <FaRegBookmark className="job-modal-save-icon" />
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;