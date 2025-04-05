import { useState } from 'react';
import Link from 'next/link';

export default function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Format salary display
  const formatSalary = () => {
    if (!job.salary) return 'Not specified';
    
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    if (job.salary.type === 'range') {
      return `${formatter.format(job.salary.min)} - ${formatter.format(job.salary.max)} ${job.salary.period}`;
    } else {
      return `${formatter.format(job.salary.value)} ${job.salary.period}`;
    }
  };
  
  // Calculate days ago
  const daysAgo = () => {
    const postedDate = new Date(job.postedDate);
    const today = new Date();
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Format match percentage
  const matchPercentage = Math.round(job.matchScore * 100);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm mt-1">{job.location}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              matchPercentage >= 80 ? 'bg-green-100 text-green-800' : 
              matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {matchPercentage}% Match
            </span>
            <span className="text-sm text-gray-500 mt-1">{daysAgo()}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
            {job.jobType}
          </span>
          
          {job.isAICTE && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
              AICTE Approved
            </span>
          )}
          
          {job.isGovernment && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
              Government
            </span>
          )}
          
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {job.experienceLevel}
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <span className="text-sm font-medium text-gray-500">Salary:</span>
              <span className="ml-2 text-sm text-gray-900">{formatSalary()}</span>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500">Apply by:</span>
              <span className="ml-2 text-sm text-gray-900">
                {new Date(job.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2 text-sm text-gray-500 space-y-2">
              <p>{job.description}</p>
            </div>
            
            <h3 className="mt-4 text-sm font-medium text-gray-900">Requirements</h3>
            <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            
            <div className="mt-4 bg-indigo-50 p-3 rounded-md">
              <h3 className="text-sm font-medium text-indigo-800">AI Recommendation</h3>
              <p className="mt-1 text-sm text-indigo-700">
                {job.recommendationReason || "This job matches your profile."}
              </p>
            </div>
            
            <h3 className="mt-4 text-sm font-medium text-gray-900">Skills Match</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.matchedSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {skill}
                </span>
              ))}
              
              {job.missingSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </button>
          
          <Link href={`/jobs/${job.id}/apply`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
} 