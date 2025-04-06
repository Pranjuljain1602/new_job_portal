import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';
import Notification from '../../components/Notification';

export default function ApplyForJob() {
  const router = useRouter();
  const { jobId } = router.query;
  
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeLink: '',
    additionalInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Check authentication and load user profile
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
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  // Fetch job data when jobId is available
  useEffect(() => {
    if (!jobId) return;
    
    const fetchJobData = async () => {
      try {
        // For demonstration, we're using mock data
        // In a real app, this would fetch from Firestore
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
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS']
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
            requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow']
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
            requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React']
          }
        ];
        
        const job = mockJobs.find(j => j.id === jobId);
        
        if (job) {
          setJobData(job);
          
          // Pre-fill the cover letter with a template
          setFormData(prev => ({
            ...prev,
            coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the ${job.title} position at ${job.company}. With my background in ${userProfile?.skills?.join(', ') || '[your relevant skills]'}, I believe I would be a valuable addition to your team.

[Describe your relevant experience and why you're interested in this role]

Thank you for considering my application. I look forward to the opportunity to discuss how my skills align with your needs.

Sincerely,
${userProfile?.fullName || '[Your Name]'}`
          }));
        } else {
          // Job not found
          setNotification({
            show: true,
            type: 'error',
            message: 'Job not found. Please try again.'
          });
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setNotification({
          show: true,
          type: 'error',
          message: 'Error loading job details. Please try again.'
        });
      }
    };
    
    fetchJobData();
  }, [jobId, userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobData || !user) return;
    
    // Validate form
    if (!formData.coverLetter.trim()) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please provide a cover letter.'
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // In a real app, this would save to Firestore
      // For demonstration, we'll simulate the process
      
      // Create application object
      const applicationData = {
        id: Math.random().toString(36).substring(2, 15),
        userId: user.uid,
        jobId: jobData.id,
        jobTitle: jobData.title,
        company: jobData.company,
        location: jobData.location,
        applicationDate: new Date().toISOString(),
        status: 'Under Review',
        coverLetter: formData.coverLetter,
        resume: formData.resumeLink || 'https://example.com/resume.pdf',
        additionalInfo: formData.additionalInfo,
        lastStatusUpdate: new Date().toISOString()
      };
      
      // Simulate saving to database with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: 'Your application has been submitted successfully!'
      });
      
      // Redirect to applications page after a delay
      setTimeout(() => {
        router.push('/jobs/applications');
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error submitting your application. Please try again.'
      });
      setSubmitting(false);
    }
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
          <Link href={`/jobs/${jobId}`} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <svg className="mr-2 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to job details
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {jobData.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{jobData.company} • {jobData.location}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Application Details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide information that will help us understand why you're a good fit for this position.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows={10}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Write a brief cover letter explaining why you're interested in this position and how your skills match the requirements.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">
                        Resume Link
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="resumeLink"
                          id="resumeLink"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://drive.google.com/file/d/your-resume"
                          value={formData.resumeLink}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Provide a link to your resume (Google Drive, Dropbox, etc). If left blank, we'll use the resume from your profile.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                        Additional Information
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          rows={4}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Any additional information you'd like to share with the hiring team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Application Preview</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Review your application before submitting.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500">Applying As</h4>
                      <p className="mt-1 text-sm text-gray-900">{userProfile?.fullName || user?.email}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500">Contact Email</h4>
                      <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {userProfile?.skills?.map((skill) => (
                          <span key={skill} className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                            {skill}
                          </span>
                        )) || <p className="text-sm text-gray-500">No skills listed</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link
                href={`/jobs/${jobId}`}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 