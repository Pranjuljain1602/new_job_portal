import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

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

  // Fetch job data when ID is available
  useEffect(() => {
    if (!id) return;
    
    const fetchJobData = async () => {
      try {
        // For demonstration purposes (in a real app, this would fetch from Firebase)
        // Using mock data similar to what's in aiRecommendationService.js
        const mockJobs = [
          {
            id: '1',
            title: 'Software Engineer',
            company: 'Ministry of Electronics & IT',
            location: 'Delhi',
            jobType: 'Full-time',
            isAICTE: true,
            isGovernment: true,
            experienceLevel: 'Entry Level',
            salary: {
              value: 600000,
              period: 'per year'
            },
            postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'We are looking for a Software Engineer to join our team and help build digital solutions for government services.',
            requirements: [
              'Bachelor\'s degree in Computer Science or related field',
              'Knowledge of JavaScript, React, and Node.js',
              'Good problem-solving skills',
              'Ability to work in a team environment'
            ],
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
            responsibilities: [
              'Develop and maintain web applications using React, Node.js, and other modern technologies',
              'Collaborate with cross-functional teams to define, design, and ship new features',
              'Ensure the technical feasibility of UI/UX designs',
              'Optimize applications for maximum speed and scalability',
              'Participate in code reviews and mentor junior developers'
            ],
            benefits: [
              'Competitive salary package',
              'Health insurance coverage',
              'Retirement benefits',
              'Professional development opportunities',
              'Work-life balance with flexible working hours'
            ]
          },
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
            responsibilities: [
              'Analyze large datasets from satellite missions and space research',
              'Develop and implement machine learning models for predictive analysis',
              'Create visualization tools to represent complex data in an accessible format',
              'Collaborate with scientists and engineers to apply data insights to space research',
              'Publish findings in scientific journals and present at conferences'
            ],
            benefits: [
              'Opportunity to work on cutting-edge space research',
              'Comprehensive healthcare benefits',
              'Housing allowance',
              'Access to world-class research facilities',
              'Pension and retirement benefits'
            ]
          },
          {
            id: '3',
            title: 'Web Development Intern',
            company: 'National Informatics Centre',
            location: 'Remote',
            jobType: 'Internship',
            isAICTE: true,
            isGovernment: true,
            experienceLevel: 'Entry Level',
            salary: {
              value: 15000,
              period: 'per month'
            },
            postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Exciting opportunity to work on government web applications and gain valuable experience in web development.',
            requirements: [
              'Currently pursuing a degree in Computer Science or related field',
              'Knowledge of HTML, CSS, and JavaScript',
              'Familiarity with React or Angular is a plus',
              'Good communication skills'
            ],
            requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
            responsibilities: [
              'Assist in developing and maintaining government web applications',
              'Write clean, maintainable, and efficient code',
              'Collaborate with the design team to implement UI/UX features',
              'Test websites for usability and fix bugs',
              'Document development processes and procedures'
            ],
            benefits: [
              'Flexible remote working schedule',
              'Mentorship from experienced developers',
              'Certificate of completion',
              'Possibility of pre-placement offer upon successful completion',
              'Networking opportunities with government agencies'
            ]
          }
        ];
        
        const job = mockJobs.find(job => job.id === id);
        
        if (job) {
          setJobData(job);
          
          // Check if job is saved by user (for demonstration)
          setIsSaved(Math.random() > 0.5); // Random for demo
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setLoading(false);
      }
    };
    
    fetchJobData();
  }, [id]);

  const handleSaveJob = async () => {
    try {
      // Toggle saved state
      setIsSaved(!isSaved);
      
      // Show notification
      setNotification({
        show: true,
        type: 'success',
        message: isSaved ? 'Job removed from saved jobs' : 'Job saved successfully'
      });
      
      // In a real app, this would save/remove to/from Firestore
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
      
      // Revert state on error
      setIsSaved(isSaved);
      
      setNotification({
        show: true,
        type: 'error',
        message: 'Error saving job. Please try again.'
      });
    }
  };

  const handleApply = () => {
    router.push(`/jobs/apply?jobId=${id}`);
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    return `${formatter.format(salary.value)} ${salary.period}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const daysRemaining = (deadlineString) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
            <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
            <div className="mt-6">
              <Link href="/jobs" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
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
        <div className="mb-6">
          <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <svg className="mr-2 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to jobs
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{jobData.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{jobData.company} • {jobData.location}</p>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {jobData.isAICTE && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    AICTE Approved
                  </span>
                )}
                
                {jobData.isGovernment && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Government
                  </span>
                )}
                
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  {jobData.jobType}
                </span>
                
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  {jobData.experienceLevel}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSaveJob}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSaved ? (
                  <>
                    <svg className="mr-1.5 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <svg className="mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Save
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleApply}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Salary</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatSalary(jobData.salary)}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Posted On</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(jobData.postedDate)}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Application Deadline</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(jobData.deadline)}
                  <span className="ml-2 text-xs font-medium text-red-600">
                    ({daysRemaining(jobData.deadline)} days left)
                  </span>
                </dd>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Job Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>{jobData.description}</p>
                </dd>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Required Skills</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {jobData.requiredSkills.map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Requirements</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="list-disc list-inside space-y-1">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              
              {jobData.responsibilities && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Responsibilities</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc list-inside space-y-1">
                      {jobData.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              
              {jobData.benefits && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Benefits</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc list-inside space-y-1">
                      {jobData.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 