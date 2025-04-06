import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { mockJobs } from '../../utils/mockData';
import Navbar from '../../components/Navbar';
import JobCard from '../../components/JobCard';
import Notification from '../../components/Notification';

export default function SavedJobs() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

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
            
            // For mock data, simulate saved jobs by randomly selecting some
            fetchSavedJobs();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Not logged in, redirect to login
        router.push('/auth/login');
        return;
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  const fetchSavedJobs = () => {
    // Simulate fetching saved jobs by selecting random ones
    // In a real app, this would fetch saved jobs from Firestore
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobsList = mockJobs.filter(job => savedJobIds.includes(job.id));
    setSavedJobs(savedJobsList);
  };

  const handleSaveToggle = (jobId) => {
    // Get current saved jobs from local storage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    // Remove job from saved jobs
    const updatedSavedJobIds = savedJobIds.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobIds));
    
    // Update UI
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    
    setNotification({
      show: true,
      type: 'success',
      message: 'Job removed from saved jobs'
    });
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        </div>
        
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                saved={true}
                onSaveToggle={handleSaveToggle}
              />
            ))}
          </div>
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">No saved jobs yet</h2>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any saved jobs or internships yet.
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
    </div>
  );
} 