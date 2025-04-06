import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';

export default function Applications() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
            
            // If profile is not completed, redirect to profile completion
            if (!userData.profileCompleted) {
              router.push('/profile/complete');
              return;
            }
            
            setUserProfile(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Not logged in, redirect to login
        router.push('/auth/login');
        return;
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  // Fetch applications when user is loaded
  useEffect(() => {
    if (!user) return;
    
    const fetchApplications = async () => {
      try {
        // For demonstration purposes (in a real app, this would fetch from Firebase)
        // In a production app, you would have an 'applications' collection or similar
        // Here we're simulating the functionality with local data
        
        // Example applications (these would be fetched from the database in a real app)
        const mockApplications = [
          {
            id: '1',
            jobId: '1',
            jobTitle: 'Software Engineer',
            company: 'Ministry of Electronics & IT',
            location: 'Delhi',
            applicationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Under Review',
            coverLetter: 'I am writing to express my interest in the Software Engineer position at the Ministry of Electronics & IT...',
            resume: 'https://example.com/resume.pdf',
            lastStatusUpdate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            jobId: '3',
            jobTitle: 'Web Development Intern',
            company: 'National Informatics Centre',
            location: 'Remote',
            applicationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Shortlisted',
            coverLetter: 'I am excited to apply for the Web Development Internship at the National Informatics Centre...',
            resume: 'https://example.com/resume.pdf',
            lastStatusUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            jobId: '5',
            jobTitle: 'Network Security Engineer',
            company: 'Defence Research and Development Organisation (DRDO)',
            location: 'Hyderabad',
            applicationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Rejected',
            coverLetter: 'I am applying for the Network Security Engineer position at DRDO...',
            resume: 'https://example.com/resume.pdf',
            lastStatusUpdate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            feedback: 'Thank you for your application. While your profile is impressive, we are looking for candidates with more specific experience in defense systems security.'
          }
        ];
        
        setApplications(mockApplications);
        setFilteredApplications(mockApplications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [user]);

  // Apply search and filters
  useEffect(() => {
    if (!applications.length) return;
    
    let result = [...applications];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.jobTitle.toLowerCase().includes(term) || 
        app.company.toLowerCase().includes(term) || 
        app.location.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());
    }
    
    // Sort by application date (newest first)
    result.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
    
    setFilteredApplications(result);
  }, [applications, searchTerm, filterStatus]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Function to get appropriate badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'offer received':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        </div>
        
        {/* Search and filter controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search applications</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search applications by job title, company, or location"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                name="status-filter"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filterStatus}
                onChange={handleStatusFilterChange}
              >
                <option value="all">All Statuses</option>
                <option value="under review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview scheduled">Interview Scheduled</option>
                <option value="offer received">Offer Received</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredApplications.length}</span> applications
            {searchTerm && <span> for "<span className="font-medium">{searchTerm}</span>"</span>}
            {filterStatus !== 'all' && <span> with status "<span className="font-medium">{filterStatus}</span>"</span>}
          </p>
        </div>
        
        {/* Applications list */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <div key={application.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{application.jobTitle}</h3>
                      <p className="text-gray-600">{application.company}</p>
                      <p className="text-gray-500 text-sm mt-1">{application.location}</p>
                    </div>
                    
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Application Date:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {new Date(application.applicationDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500">Last Status Update:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {new Date(application.lastStatusUpdate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {application.feedback && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900">Feedback:</h4>
                      <p className="mt-1 text-sm text-gray-500">{application.feedback}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => router.push(`/jobs/${application.jobId}`)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Job Details
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => router.push(`/jobs/applications/${application.id}`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Full Application
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">No applications found matching your criteria.</p>
              {filterStatus !== 'all' || searchTerm ? (
                <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search terms.</p>
              ) : (
                <div>
                  <p className="mt-2 text-sm text-gray-500">You haven't applied to any jobs yet.</p>
                  <button
                    type="button"
                    onClick={() => router.push('/jobs')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Browse Jobs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 