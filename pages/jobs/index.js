import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { getAIRecommendations } from '../../utils/aiRecommendationService';
import JobCard from '../../components/JobCard';
import Navbar from '../../components/Navbar';
import FilterSidebar from '../../components/FilterSidebar';

export default function Jobs() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    location: [],
    salary: { min: '', max: '' },
    experience: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

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

  // Fetch jobs when user profile is loaded
  useEffect(() => {
    if (userProfile) {
      const getJobs = async () => {
        try {
          // Use our AI recommendation service instead of the simple fetchJobs
          const jobsData = await getAIRecommendations(userProfile);
          setJobs(jobsData);
          setFilteredJobs(jobsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching AI job recommendations:", error);
          setLoading(false);
        }
      };
      
      getJobs();
    }
  }, [userProfile]);

  // Apply filters and search
  useEffect(() => {
    if (!jobs.length) return;
    
    let result = [...jobs];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) || 
        job.description.toLowerCase().includes(term)
      );
    }
    
    // Apply job type filter
    if (filters.jobType.length) {
      result = result.filter(job => filters.jobType.includes(job.jobType));
    }
    
    // Apply location filter
    if (filters.location.length) {
      result = result.filter(job => filters.location.includes(job.location));
    }
    
    // Apply salary filter
    if (filters.salary.min || filters.salary.max) {
      result = result.filter(job => {
        const jobSalary = job.salary?.value || 0;
        const min = filters.salary.min ? parseInt(filters.salary.min) : 0;
        const max = filters.salary.max ? parseInt(filters.salary.max) : Infinity;
        return jobSalary >= min && jobSalary <= max;
      });
    }
    
    // Apply experience filter
    if (filters.experience.length) {
      result = result.filter(job => filters.experience.includes(job.experienceLevel));
    }
    
    // Apply sorting
    if (sortBy === 'relevance') {
      // Already sorted by relevance from the API
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortBy === 'salary') {
      result.sort((a, b) => (b.salary?.value || 0) - (a.salary?.value || 0));
    }
    
    setFilteredJobs(result);
  }, [jobs, searchTerm, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
          <h1 className="text-3xl font-bold text-gray-900">AICTE-Approved Jobs & Internships</h1>
          
          <button
            type="button"
            onClick={toggleFilters}
            className="md:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - visible on desktop or when toggled on mobile */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Search and sort controls */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search" className="sr-only">Search jobs</label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search jobs by title, company, or keywords"
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
                  <label htmlFor="sort" className="sr-only">Sort by</label>
                  <select
                    id="sort"
                    name="sort"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="date">Sort by: Date (newest)</option>
                    <option value="salary">Sort by: Salary (highest)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredJobs.length}</span> results
                {searchTerm && <span> for "<span className="font-medium">{searchTerm}</span>"</span>}
              </p>
            </div>
            
            {/* Job listings */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 