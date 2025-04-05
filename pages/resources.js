import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaDownload, FaSearch, FaFilter } from 'react-icons/fa/index.js';

// Resource data with real content
const resourceData = [
  {
    id: 1,
    title: 'LeetCode Top 75 Questions Guide',
    category: 'Technical Interview',
    description: 'Master the most commonly asked LeetCode questions in technical interviews. Includes detailed solutions and time complexity analysis.',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1eDFURGUQ0bBMrz1VfPFtI-9kmiInbnGP',
    fileSize: '2.4 MB',
    type: 'PDF'
  },
  {
    id: 2,
    title: 'ATS-Friendly Resume Template',
    category: 'Resume',
    description: 'Professionally designed resume template optimized for Applicant Tracking Systems. Includes examples and tips for each section.',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1yjfXU0Tw-lAQ-qfBHzMtkEwUn6iilOjE',
    fileSize: '1.8 MB',
    type: 'DOCX'
  },
  {
    id: 3,
    title: 'System Design Interview Cheatsheet',
    category: 'Technical Interview',
    description: 'Comprehensive guide to system design interviews. Covers key concepts, common questions, and step-by-step approach to solving system design problems.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1QA9gHRnRsJygJfgYx1dW5wAhzhtV5CLr',
    fileSize: '3.1 MB',
    type: 'PDF'
  },
  {
    id: 4,
    title: 'Government Job Interview Questions',
    category: 'Interview',
    description: 'Collection of 200+ commonly asked questions in government job interviews. Includes sample answers tailored for different positions.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1YHmgkNzr5uN2GX36d5kX3HJ0RE9KOBlf',
    fileSize: '2.7 MB',
    type: 'PDF'
  },
  {
    id: 5,
    title: 'Data Structures and Algorithms Handbook',
    category: 'Technical Knowledge',
    description: 'Complete handbook covering essential data structures and algorithms. Includes implementations in Java, Python, and C++.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1j3Z9xnYq0hbKc5z7RuOhQOzaAl0VZbTG',
    fileSize: '5.2 MB',
    type: 'PDF'
  },
  {
    id: 6,
    title: 'Cover Letter Templates for Fresh Graduates',
    category: 'Resume',
    description: 'Set of 10 professional cover letter templates designed specifically for fresh graduates with little to no work experience.',
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1wJHJ6j_YFCNdPe8PwKOdN9s0VdOaZOlc',
    fileSize: '1.5 MB',
    type: 'ZIP'
  },
  {
    id: 7,
    title: 'Public Speaking for Technical Presentations',
    category: 'Soft Skills',
    description: 'Guide to delivering effective technical presentations. Includes tips for slide design, handling Q&A, and managing presentation anxiety.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1KfFQpwETMlr0rGhN6jvyYVU48IXcvavY',
    fileSize: '2.3 MB',
    type: 'PDF'
  },
  {
    id: 8,
    title: 'AICTE Internship Guide 2023',
    category: 'Internship',
    description: 'Official guide to AICTE-approved internships. Includes eligibility criteria, application process, and tips for making the most of your internship.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1dhKv-AfnV04RjHGrDhKLJfhX_kbh6jPg',
    fileSize: '4.1 MB',
    type: 'PDF'
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Get unique categories
  const categories = ['All', ...new Set(resourceData.map(resource => resource.category))];

  // Filter resources based on search term and category
  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resource) => {
    // In a real app, this would trigger an actual download
    // For now, we'll just show a success message
    setDownloadSuccess(resource.title);
    
    // Clear the success message after 3 seconds
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Resources | AICTE Jobs Portal</title>
        <meta name="description" content="Download helpful resources for your job search and career development" />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Success notification */}
        {downloadSuccess && (
          <div className="fixed top-24 right-4 z-50 animate-slide-up">
            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 rounded shadow-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">"{downloadSuccess}" is downloading now!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative bg-indigo-700 dark:bg-indigo-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Library of resources"
              width={1770}
              height={1180}
              className="opacity-20 object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-in">
              Career Resources
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-100 animate-fade-in">
              Download free resources to help you prepare for interviews, create standout resumes, and advance your career.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover-scale transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      width={1770}
                      height={1180}
                      className="object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">{resource.category}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {resource.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                      {resource.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.fileSize}
                      </span>
                      <button
                        onClick={() => handleDownload(resource)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                      >
                        <FaDownload className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No resources found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>

        {/* Request Resources Section */}
        <div className="bg-indigo-700 dark:bg-indigo-900">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Need a specific resource?</span>
              <span className="block">Let us know what would help you.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              We regularly update our resource library based on user requests and the latest industry trends.
            </p>
            <a
              href="/contact"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:hover:bg-gray-100 sm:w-auto transition-colors duration-300"
            >
              Request a Resource
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 