import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { getAIRecommendations } from '../utils/aiRecommendationService';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Notification from '../components/Notification';

export default function RecommendationsPage() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
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

  // Fetch recommendations when user profile is loaded
  useEffect(() => {
    if (userProfile) {
      fetchRecommendations();
    }
  }, [userProfile]);

  const fetchRecommendations = async () => {
    try {
      // Get saved jobs from localStorage
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setSavedJobs(savedJobIds);
      
      // Get AI recommendations
      const recommendedJobs = await getAIRecommendations(userProfile);
      
      // Check if recommendedJobs is an array before sorting
      if (Array.isArray(recommendedJobs)) {
        // Sort by match score (highest first)
        recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);
        setRecommendations(recommendedJobs);
      } else {
        console.error("Recommended jobs is not an array:", recommendedJobs);
        setRecommendations([]);
        setNotification({
          show: true,
          type: 'error',
          message: 'Error loading recommendations. Please try again.'
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error loading recommendations. Please try again.'
      });
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">AI Recommended Jobs</h1>
          <p className="mt-2 text-sm text-gray-500">
            Jobs and internships recommended for you based on your profile and skills.
          </p>
        </header>
        
        {recommendations.length > 0 ? (
          <>
            {/* Skills Suggestions */}
            {userProfile && userProfile.skills && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                <h2 className="text-lg font-medium text-blue-800 mb-2">Skill Suggestions</h2>
                <p className="text-sm text-blue-700 mb-3">
                  Based on your current skills, consider learning these additional skills to improve your job prospects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {!userProfile.skills.some(skill => skill.toLowerCase().includes('react')) && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      React.js for Frontend roles
                    </span>
                  )}
                  {!userProfile.skills.some(skill => skill.toLowerCase().includes('node')) && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Node.js for Backend roles
                    </span>
                  )}
                  {!userProfile.skills.some(skill => skill.toLowerCase().includes('python')) && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Python for Data Science roles
                    </span>
                  )}
                  {!userProfile.skills.some(skill => skill.toLowerCase().includes('aws') || skill.toLowerCase().includes('cloud')) && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      AWS/Cloud for DevOps roles
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((job) => (
                <div key={job.id} className="relative">
                  {/* Profile Match Badge */}
                  <div className="absolute right-3 top-3 z-10 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Profile Match: {Math.round(job.matchScore * 100)}%
                  </div>
                  <JobCard
                    job={job}
                    saved={savedJobs.includes(job.id)}
                    onSaveToggle={handleSaveToggle}
                  />
                </div>
              ))}
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">No recommendations available</h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete your profile with more details and skills to get personalized job recommendations.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/profile')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 