import { useState, useEffect } from 'react';

export default function FilterSidebar({ filters, onChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    let newJobTypes;
    if (isChecked) {
      newJobTypes = [...localFilters.jobType, value];
    } else {
      newJobTypes = localFilters.jobType.filter(type => type !== value);
    }
    
    const newFilters = { ...localFilters, jobType: newJobTypes };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };
  
  const handleLocationChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    let newLocations;
    if (isChecked) {
      newLocations = [...localFilters.location, value];
    } else {
      newLocations = localFilters.location.filter(loc => loc !== value);
    }
    
    const newFilters = { ...localFilters, location: newLocations };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };
  
  const handleSalaryChange = (field, value) => {
    const newSalary = { ...localFilters.salary, [field]: value };
    const newFilters = { ...localFilters, salary: newSalary };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };
  
  const handleExperienceChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    let newExperience;
    if (isChecked) {
      newExperience = [...localFilters.experience, value];
    } else {
      newExperience = localFilters.experience.filter(exp => exp !== value);
    }
    
    const newFilters = { ...localFilters, experience: newExperience };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };
  
  const clearFilters = () => {
    const resetFilters = {
      jobType: [],
      location: [],
      salary: { min: '', max: '' },
      experience: []
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Clear all
        </button>
      </div>
      
      {/* Job Type Filter */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-900">Job Type</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="job-type-fulltime"
              name="job-type"
              value="Full-time"
              type="checkbox"
              checked={localFilters.jobType.includes('Full-time')}
              onChange={handleJobTypeChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="job-type-fulltime" className="ml-3 text-sm text-gray-700">
              Full-time
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="job-type-parttime"
              name="job-type"
              value="Part-time"
              type="checkbox"
              checked={localFilters.jobType.includes('Part-time')}
              onChange={handleJobTypeChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="job-type-parttime" className="ml-3 text-sm text-gray-700">
              Part-time
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="job-type-internship"
              name="job-type"
              value="Internship"
              type="checkbox"
              checked={localFilters.jobType.includes('Internship')}
              onChange={handleJobTypeChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="job-type-internship" className="ml-3 text-sm text-gray-700">
              Internship
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="job-type-contract"
              name="job-type"
              value="Contract"
              type="checkbox"
              checked={localFilters.jobType.includes('Contract')}
              onChange={handleJobTypeChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="job-type-contract" className="ml-3 text-sm text-gray-700">
              Contract
            </label>
          </div>
        </div>
      </div>
      
      {/* Location Filter */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-sm font-medium text-gray-900">Location</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="location-delhi"
              name="location"
              value="Delhi"
              type="checkbox"
              checked={localFilters.location.includes('Delhi')}
              onChange={handleLocationChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="location-delhi" className="ml-3 text-sm text-gray-700">
              Delhi
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="location-mumbai"
              name="location"
              value="Mumbai"
              type="checkbox"
              checked={localFilters.location.includes('Mumbai')}
              onChange={handleLocationChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="location-mumbai" className="ml-3 text-sm text-gray-700">
              Mumbai
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="location-bangalore"
              name="location"
              value="Bangalore"
              type="checkbox"
              checked={localFilters.location.includes('Bangalore')}
              onChange={handleLocationChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="location-bangalore" className="ml-3 text-sm text-gray-700">
              Bangalore
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="location-hyderabad"
              name="location"
              value="Hyderabad"
              type="checkbox"
              checked={localFilters.location.includes('Hyderabad')}
              onChange={handleLocationChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="location-hyderabad" className="ml-3 text-sm text-gray-700">
              Hyderabad
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="location-remote"
              name="location"
              value="Remote"
              type="checkbox"
              checked={localFilters.location.includes('Remote')}
              onChange={handleLocationChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="location-remote" className="ml-3 text-sm text-gray-700">
              Remote
            </label>
          </div>
        </div>
      </div>
      
      {/* Salary Filter */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-sm font-medium text-gray-900">Salary Range (₹)</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="salary-min" className="sr-only">Minimum Salary</label>
            <input
              type="number"
              id="salary-min"
              placeholder="Min"
              value={localFilters.salary.min}
              onChange={(e) => handleSalaryChange('min', e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="salary-max" className="sr-only">Maximum Salary</label>
            <input
              type="number"
              id="salary-max"
              placeholder="Max"
              value={localFilters.salary.max}
              onChange={(e) => handleSalaryChange('max', e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Experience Level Filter */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-sm font-medium text-gray-900">Experience Level</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="experience-entry"
              name="experience"
              value="Entry Level"
              type="checkbox"
              checked={localFilters.experience.includes('Entry Level')}
              onChange={handleExperienceChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="experience-entry" className="ml-3 text-sm text-gray-700">
              Entry Level
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="experience-mid"
              name="experience"
              value="Mid Level"
              type="checkbox"
              checked={localFilters.experience.includes('Mid Level')}
              onChange={handleExperienceChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="experience-mid" className="ml-3 text-sm text-gray-700">
              Mid Level
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="experience-senior"
              name="experience"
              value="Senior Level"
              type="checkbox"
              checked={localFilters.experience.includes('Senior Level')}
              onChange={handleExperienceChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="experience-senior" className="ml-3 text-sm text-gray-700">
              Senior Level
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 