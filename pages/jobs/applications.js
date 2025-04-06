import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';
import Link from 'next/link';

export default function ApplicationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Add modal state for cover letter and resume
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user profile
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // Redirect if profile not completed
            if (!userData.profileCompleted) {
              router.push('/profile/complete');
              return;
            }
            
            // Fetch applications
            fetchApplications(currentUser.uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        // Not logged in, redirect to login
        router.push('/auth/login');
        return;
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  const fetchApplications = async (userId) => {
    try {
      // Get applications from localStorage instead of using mock data
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      
      // Filter applications for this user
      const userApplications = applications.filter(app => app.userId === userId);
      
      setApplications(userApplications);
      setFilteredApplications(userApplications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error loading applications. Please try again.'
      });
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, filterStatus);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    applyFilters(searchTerm, status);
  };

  // Apply filters
  const applyFilters = (term, status) => {
    let results = [...applications];
    
    // Search term filter
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      results = results.filter(app => 
        app.jobTitle.toLowerCase().includes(lowercaseTerm) ||
        app.company.toLowerCase().includes(lowercaseTerm) ||
        app.location.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    // Status filter
    if (status !== 'all') {
      results = results.filter(app => app.status === status);
    }
    
    setFilteredApplications(results);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to view cover letter
  const handleViewCoverLetter = (application) => {
    setSelectedApplication(application);
    setShowCoverLetterModal(true);
  };

  // Function to view resume
  const handleViewResume = (application) => {
    setSelectedApplication(application);
    setShowResumeModal(true);
  };

  // Cover Letter Modal Component
  const CoverLetterModal = () => {
    if (!selectedApplication) return null;
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Cover Letter for {selectedApplication.jobTitle} at {selectedApplication.company}
                  </h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md whitespace-pre-line">
                    {selectedApplication.coverLetter}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowCoverLetterModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Resume Modal Component
  const ResumeModal = () => {
    if (!selectedApplication) return null;
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Resume for {selectedApplication.jobTitle} at {selectedApplication.company}
                  </h3>
                  <div className="mt-4">
                    {selectedApplication.resume ? (
                      <div className="flex flex-col">
                        <p className="text-gray-700 mb-4">Resume Link:</p>
                        <a 
                          href={selectedApplication.resume} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          {selectedApplication.resume}
                        </a>
                      </div>
                    ) : (
                      <p className="text-gray-500">No resume link provided.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowResumeModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Offered':
        return 'bg-purple-100 text-purple-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Accepted':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        </div>
        
        {applications.length > 0 ? (
          <>
            {/* Search and filter controls */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <label htmlFor="search-applications" className="sr-only">Search applications</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="search-applications"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search by job title, company, or location"
                      type="search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                
                {/* Status filter */}
                <div className="w-full md:w-64">
                  <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                  <select
                    id="status-filter"
                    className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filterStatus}
                    onChange={handleStatusFilterChange}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Applications list */}
            <div className="space-y-6">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <div key={application.id} className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{application.jobTitle}</h3>
                          <p className="mt-1 text-sm text-gray-500">{application.company} • {application.location}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Applied on</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formatDate(application.applicationDate)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Last updated</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formatDate(application.lastStatusUpdate)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Resume</dt>
                          <dd className="mt-1 text-sm text-indigo-600 hover:text-indigo-500">
                            <button 
                              onClick={() => handleViewResume(application)} 
                              className="font-medium"
                            >
                              View Resume
                            </button>
                          </dd>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => handleViewCoverLetter(application)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Cover Letter
                        </button>
                        <a
                          href={`/jobs/${application.jobId}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Job
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <p className="text-gray-500">No applications match your search criteria.</p>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter settings.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">No applications yet</h2>
            <p className="mt-1 text-sm text-gray-500">
              You have not applied for any jobs or internships yet.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/jobs')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Render modals */}
      {showCoverLetterModal && <CoverLetterModal />}
      {showResumeModal && <ResumeModal />}
    </div>
  );
} 