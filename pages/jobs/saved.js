import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import JobCard from '../../components/JobCard';
import Navbar from '../../components/Navbar';

export default function SavedJobs() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortBy, setSortBy] = useState('date');

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

  // Fetch saved jobs when user is loaded
  useEffect(() => {
    if (!user) return;
    
    const fetchSavedJobs = async () => {
      try {
        // For demonstration purposes (in a real app, this would fetch from Firebase)
        // In a production app, you would have a 'saved_jobs' collection or similar
        // Here we're simulating the functionality with local data
        
        // Example saved jobs (these would be fetched from the database in a real app)
        const mockSavedJobs = [
          {
            id: '2',
            title: 'Data Scientist',
            company: 'Indian Space Research Organisation (ISRO)',
            location: 'Bangalore',
            jobType: 'Full-time',
            isAICTE: true,
            isGovernment: true,
            experienceLevel: 'Mid Level',
            salary: {
              value: 900000,
              period: 'per year'
            },
            postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Join ISRO as a Data Scientist to analyze satellite data and contribute to India\'s space research programs.',
            requirements: [
              'Master\'s or PhD in Data Science, Statistics, or related field',
              'Experience with Python, R, and machine learning frameworks',
              'Knowledge of data visualization tools',
              'Strong analytical and problem-solving skills'
            ],
            requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow'],
            matchScore: 0.85,
            matchedSkills: ['Python', 'Machine Learning', 'Data Analysis'],
            missingSkills: ['TensorFlow', 'Statistics'],
            savedAt: new Date().toISOString()
          },
          {
            id: '7',
            title: 'IoT Development Intern',
            company: 'Centre for Development of Advanced Computing',
            location: 'Noida',
            jobType: 'Internship',
            isAICTE: true,
            isGovernment: true,
            experienceLevel: 'Entry Level',
            salary: {
              value: 18000,
              period: 'per month'
            },
            postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Work on cutting-edge IoT projects for smart cities and infrastructure. Learn about sensors, data collection, and IoT application development.',
            requirements: [
              'Currently pursuing degree in Electronics, Computer Science, or related field',
              'Knowledge of Arduino, Raspberry Pi, or similar platforms',
              'Basic programming skills in Python or C/C++',
              'Interest in IoT and smart devices'
            ],
            requiredSkills: ['IoT', 'Arduino', 'Raspberry Pi', 'Python', 'Sensors'],
            matchScore: 0.78,
            matchedSkills: ['Python', 'IoT'],
            missingSkills: ['Arduino', 'Raspberry Pi', 'Sensors'],
            savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        
        setSavedJobs(mockSavedJobs);
        setFilteredJobs(mockSavedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setLoading(false);
      }
    };
    
    fetchSavedJobs();
  }, [user]);

  // Apply search and sorting
  useEffect(() => {
    if (!savedJobs.length) return;
    
    let result = [...savedJobs];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) || 
        job.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === 'relevance') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    }
    
    setFilteredJobs(result);
  }, [savedJobs, searchTerm, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleRemoveJob = (jobId) => {
    // In a real app, this would remove the job from the user's saved jobs in the database
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
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
          <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        </div>
        
        {/* Search and sort controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search saved jobs</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search saved jobs by title, company, or keywords"
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
                <option value="date">Sort by: Date saved (newest)</option>
                <option value="deadline">Sort by: Application deadline (soonest)</option>
                <option value="relevance">Sort by: Relevance</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredJobs.length}</span> saved jobs
            {searchTerm && <span> for "<span className="font-medium">{searchTerm}</span>"</span>}
          </p>
        </div>
        
        {/* Job listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="relative">
                <JobCard job={job} />
                <button
                  type="button"
                  onClick={() => handleRemoveJob(job.id)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Remove from saved jobs"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">You haven't saved any jobs yet.</p>
              <p className="mt-2 text-sm text-gray-500">Browse jobs and click the "Save" button to add jobs to your saved list.</p>
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
      </div>
    </div>
  );
} 