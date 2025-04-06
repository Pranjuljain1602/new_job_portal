import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';
import Link from 'next/link';

export default function BookedSessionsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
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
            
            // Load booked sessions
            fetchBookedSessions(currentUser.uid);
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

  const fetchBookedSessions = (userId) => {
    try {
      // In a real app, this would fetch from Firestore
      // For this demo, we'll use mock data
      const mockSessions = [
        {
          id: '1',
          mentorId: 'mentor1',
          mentorName: 'Dr. Rahul Sharma',
          mentorTitle: 'Senior Software Engineer at Google',
          mentorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          time: '10:00 AM - 11:00 AM',
          topic: 'Career Guidance in AI & Machine Learning',
          status: 'Upcoming',
          notes: 'Prepare questions about ML career paths'
        },
        {
          id: '2',
          mentorId: 'mentor2',
          mentorName: 'Prof. Aarti Gupta',
          mentorTitle: 'Professor at IIT Delhi',
          mentorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          time: '3:00 PM - 4:00 PM',
          topic: 'Research Opportunities in Computer Science',
          status: 'Completed',
          notes: 'Discussed potential research projects in distributed systems'
        },
        {
          id: '3',
          mentorId: 'mentor3',
          mentorName: 'Vikram Mehta',
          mentorTitle: 'Tech Entrepreneur & Investor',
          mentorImage: 'https://randomuser.me/api/portraits/men/67.jpg',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          time: '5:30 PM - 6:30 PM',
          topic: 'Starting a Tech Startup in India',
          status: 'Upcoming',
          notes: ''
        }
      ];
      
      setSessions(mockSessions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booked sessions:", error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error loading your booked sessions. Please try again.'
      });
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelSession = (sessionId) => {
    // In a real app, this would update Firestore
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? {...session, status: 'Cancelled'} 
        : session
    ));
    
    setNotification({
      show: true,
      type: 'success',
      message: 'Session cancelled successfully'
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">Booked Mentorship Sessions</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your upcoming and past mentorship sessions.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link 
              href="/mentors" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Find More Mentors
            </Link>
          </div>
        </div>
        
        {sessions.length > 0 ? (
          <div className="space-y-6">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img className="h-12 w-12 rounded-full" src={session.mentorImage} alt={session.mentorName} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Session with {session.mentorName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {session.mentorTitle}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {formatDate(session.date)}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Time</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {session.time}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Topic</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {session.topic}
                      </dd>
                    </div>
                    {session.notes && (
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Notes</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {session.notes}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
                  <Link
                    href={`/mentors/${session.mentorId}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Mentor Profile
                  </Link>
                  
                  {session.status === 'Upcoming' && (
                    <button
                      type="button"
                      onClick={() => handleCancelSession(session.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel Session
                    </button>
                  )}
                  
                  {session.status === 'Completed' && (
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">No booked sessions</h2>
            <p className="mt-1 text-sm text-gray-500">
              You haven't booked any mentorship sessions yet. Find a mentor to get started!
            </p>
            <div className="mt-6">
              <Link
                href="/mentors"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Mentors
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 