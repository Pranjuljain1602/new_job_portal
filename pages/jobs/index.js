import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { getJobs } from '../../utils/mockData';
import Navbar from '../../components/Navbar';
import JobCard from '../../components/JobCard';
import FilterSidebar from '../../components/FilterSidebar';
import Notification from '../../components/Notification';

export default function JobsPage() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    location: [],
    workMode: [],
    salary: { min: '', max: '' }
  });
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user profile to check if profile is completed
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            if (!userData.profileCompleted) {
              router.push('/profile/complete');
              return;
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Not logged in, redirect to login
        router.push('/auth/login');
        return;
      }
      
      await fetchJobs();
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  const fetchJobs = async () => {
    try {
      // Get jobs (not internships) from mock data
      const jobsList = getJobs();
      setJobs(jobsList);
      setFilteredJobs(jobsList);
      
      // Get saved jobs from localStorage
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setSavedJobs(savedJobIds);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error loading jobs. Please try again.'
      });
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterJobs(term, filters);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterJobs(searchTerm, newFilters);
  };

  // Filter jobs based on search term and filters
  const filterJobs = (term, activeFilters) => {
    let filtered = [...jobs];
    
    // Apply search term
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(lowercaseTerm) ||
        job.company.toLowerCase().includes(lowercaseTerm) ||
        job.location.toLowerCase().includes(lowercaseTerm) ||
        (job.skills && job.skills.some(skill => skill.toLowerCase().includes(lowercaseTerm)))
      );
    }
    
    // Apply job type filter
    if (activeFilters.jobType && activeFilters.jobType.length > 0) {
      filtered = filtered.filter(job => activeFilters.jobType.includes(job.jobType));
    }
    
    // Apply experience level filter
    if (activeFilters.experienceLevel && activeFilters.experienceLevel.length > 0) {
      filtered = filtered.filter(job => activeFilters.experienceLevel.includes(job.experienceLevel));
    }
    
    // Apply location filter
    if (activeFilters.location && activeFilters.location.length > 0) {
      filtered = filtered.filter(job => activeFilters.location.includes(job.location));
    }
    
    // Apply work mode filter
    if (activeFilters.workMode && activeFilters.workMode.length > 0) {
      filtered = filtered.filter(job => {
        // Default to On-site if not specified
        const jobWorkMode = job.workMode || 'On-site';
        return activeFilters.workMode.includes(jobWorkMode);
      });
    }
    
    // Apply salary filter
    if (activeFilters.salary.min) {
      filtered = filtered.filter(job => 
        job.salary && job.salary.value >= parseInt(activeFilters.salary.min)
      );
    }
    
    if (activeFilters.salary.max) {
      filtered = filtered.filter(job => 
        job.salary && job.salary.value <= parseInt(activeFilters.salary.max)
      );
    }
    
    setFilteredJobs(filtered);
  };

  const handleSaveToggle = (jobId) => {
    // Get current saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    let updatedSavedJobIds;
    
    if (savedJobIds.includes(jobId)) {
      // Remove job from saved jobs
      updatedSavedJobIds = savedJobIds.filter(id => id !== jobId);
      setNotification({
        show: true,
        type: 'success',
        message: 'Job removed from saved jobs'
      });
    } else {
      // Add job to saved jobs
      updatedSavedJobIds = [...savedJobIds, jobId];
      setNotification({
        show: true,
        type: 'success',
        message: 'Job saved successfully'
      });
    }
    
    // Update localStorage
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobIds));
    
    // Update state
    setSavedJobs(updatedSavedJobIds);
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
      
      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Jobs & Internships</h1>
          <p className="mt-2 text-sm text-gray-500">
          Discover AI-powered opportunities tailored to your skills and interests.
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          <div className="md:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search jobs by title, company, location, or skills"
                />
              </div>
            </div>
            
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saved={savedJobs.includes(job.id)}
                    onSaveToggle={handleSaveToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria to find more results.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        jobType: [],
                        experienceLevel: [],
                        location: [],
                        workMode: [],
                        salary: { min: '', max: '' }
                      });
                      setFilteredJobs(jobs);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 