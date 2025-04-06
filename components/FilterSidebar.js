import { useState, useEffect } from 'react';

export default function FilterSidebar({ filters, onFilterChange, forInternships = false }) {
  const [localFilters, setLocalFilters] = useState({
    location: filters.location || [],
    jobType: filters.jobType || [],
    experience: filters.experience || [],
    salary: {
      min: filters.salary?.min || 0,
      max: filters.salary?.max || 0
    },
    isAICTE: filters.isAICTE || false,
    isGovernment: filters.isGovernment || false
  });
  
  useEffect(() => {
    // Update local filters when parent filters change
    setLocalFilters({
      location: filters.location || [],
      jobType: filters.jobType || [],
      experience: filters.experience || [],
      salary: {
        min: filters.salary?.min || 0,
        max: filters.salary?.max || 0
      },
      isAICTE: filters.isAICTE || false,
      isGovernment: filters.isGovernment || false
    });
  }, [filters]);

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;
    const updatedLocations = checked
      ? [...localFilters.location, value]
      : localFilters.location.filter(loc => loc !== value);
    
    const updatedFilters = {
      ...localFilters,
      location: updatedLocations
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    const updatedJobTypes = checked
      ? [...localFilters.jobType, value]
      : localFilters.jobType.filter(type => type !== value);
    
    const updatedFilters = {
      ...localFilters,
      jobType: updatedJobTypes
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleExperienceChange = (e) => {
    const { value, checked } = e.target;
    const updatedExperience = checked
      ? [...localFilters.experience, value]
      : localFilters.experience.filter(exp => exp !== value);
    
    const updatedFilters = {
      ...localFilters,
      experience: updatedExperience
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    const updatedSalary = {
      ...localFilters.salary,
      [name]: value === '' ? 0 : parseInt(value)
    };
    
    const updatedFilters = {
      ...localFilters,
      salary: updatedSalary
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    const updatedFilters = {
      ...localFilters,
      [name]: checked
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    // For internships page, keep jobType set to "Internship"
    const defaultFilters = {
      location: [],
      jobType: forInternships ? ['Internship'] : [],
      experience: [],
      salary: {
        min: 0,
        max: 0
      },
      isAICTE: false,
      isGovernment: false
    };
    
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Clear all
        </button>
      </div>
      
      {/* Location filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
        <div className="space-y-2">
          {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Remote'].map((location) => (
            <div key={location} className="flex items-center">
              <input
                id={`location-${location}`}
                name="location"
                value={location}
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={localFilters.location.includes(location)}
                onChange={handleLocationChange}
              />
              <label htmlFor={`location-${location}`} className="ml-3 text-sm text-gray-600">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Type filter - Hide for internships page */}
      {!forInternships && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
          <div className="space-y-2">
            {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  id={`job-type-${type}`}
                  name="jobType"
                  value={type}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={localFilters.jobType.includes(type)}
                  onChange={handleJobTypeChange}
                />
                <label htmlFor={`job-type-${type}`} className="ml-3 text-sm text-gray-600">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Experience Level filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Experience Level</h3>
        <div className="space-y-2">
          {['Entry Level', 'Mid Level', 'Senior Level'].map((exp) => (
            <div key={exp} className="flex items-center">
              <input
                id={`experience-${exp}`}
                name="experience"
                value={exp}
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={localFilters.experience.includes(exp)}
                onChange={handleExperienceChange}
              />
              <label htmlFor={`experience-${exp}`} className="ml-3 text-sm text-gray-600">
                {exp}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Salary filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Salary (₹ per year)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-salary" className="block text-sm text-gray-600 mb-1">Min</label>
            <input
              type="number"
              name="min"
              id="min-salary"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={localFilters.salary.min || ''}
              onChange={handleSalaryChange}
              min="0"
              placeholder="Min"
            />
          </div>
          <div>
            <label htmlFor="max-salary" className="block text-sm text-gray-600 mb-1">Max</label>
            <input
              type="number"
              name="max"
              id="max-salary"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={localFilters.salary.max || ''}
              onChange={handleSalaryChange}
              min="0"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      
      {/* AICTE Approved filter */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            id="aicte-approved"
            name="isAICTE"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={localFilters.isAICTE}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="aicte-approved" className="ml-3 text-sm text-gray-600">
            AICTE Approved Only
          </label>
        </div>
      </div>
      
      {/* Government Jobs filter */}
      <div className="mb-2">
        <div className="flex items-center">
          <input
            id="government-jobs"
            name="isGovernment"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={localFilters.isGovernment}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="government-jobs" className="ml-3 text-sm text-gray-600">
            Government Jobs Only
          </label>
        </div>
      </div>
    </div>
  );
} 