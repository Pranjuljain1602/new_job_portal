import { useState } from 'react';
import Link from 'next/link';

export default function JobCard({ job, saved, onSaveToggle, showMatchScore = false }) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days remaining until deadline
  const daysRemaining = (deadlineString) => {
    const deadline = new Date(deadlineString);
    const today = new Date();
    const diffTime = Math.abs(deadline - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format salary to readable format
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    return `${formatter.format(salary.value)} ${salary.period}`;
  };
  
  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onSaveToggle) {
      onSaveToggle(job.id, !saved);
    }
  };
  
  // Format match percentage
  const matchPercentage = Math.round(job.matchScore * 100);
  
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="bg-white shadow hover:shadow-md rounded-lg overflow-hidden transition duration-200 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{job.company} • {job.location}</p>
            </div>
            <button
              onClick={handleSaveClick}
              className="text-gray-400 hover:text-yellow-500 focus:outline-none transition-colors duration-200"
              aria-label={saved ? "Unsave job" : "Save job"}
            >
              {saved ? (
                <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {job.jobType}
              </span>
              
              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                {job.experienceLevel}
              </span>
              
              {job.isAICTE && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  AICTE Approved
                </span>
              )}
              
              {job.isGovernment && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                  Government
                </span>
              )}
            </div>
          </div>
          
          <p className="mt-3 text-sm text-gray-500 line-clamp-2">{job.shortDescription}</p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="text-sm font-medium text-gray-900">{formatSalary(job.salary)}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Posted</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(job.postedDate)}</p>
            </div>
          </div>
          
          {job.skills && job.skills.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 5).map((skill) => (
                  <span key={skill} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 5 && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    +{job.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xs text-red-500 font-medium">
              {job.deadline && daysRemaining(job.deadline) > 0 ? (
                `${daysRemaining(job.deadline)} days left to apply`
              ) : (
                'Application deadline passed'
              )}
            </div>
            
            <div className="flex gap-2">
              <Link 
                href={`/jobs/${job.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View More
              </Link>
              <Link 
                href={`/jobs/apply?jobId=${job.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 