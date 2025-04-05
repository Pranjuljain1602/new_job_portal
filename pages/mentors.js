import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Mentor data with realistic information
const mentors = [
  {
    id: 1,
    name: 'Dr. Arun Sharma',
    role: 'Software Development Expert',
    company: 'Former CTO at TCS',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'With over 20 years of experience in software development, Dr. Sharma specializes in guiding students through technical interviews and career progression in top tech companies.',
    expertise: ['Technical Interviews', 'Software Architecture', 'Career Planning'],
    rating: 4.9,
    sessions: 120
  },
  {
    id: 2,
    name: 'Neha Gupta',
    role: 'HR & Recruitment Specialist',
    company: 'Infosys',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'Neha has helped hundreds of students improve their resumes and interview skills. She provides insider knowledge on what top companies look for in candidates.',
    expertise: ['Resume Building', 'HR Interviews', 'Personal Branding'],
    rating: 4.8,
    sessions: 98
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    role: 'Data Science Mentor',
    company: 'Amazon',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'Ravi specializes in guiding students and professionals into data science careers. He focuses on practical skills and portfolio building to help you stand out in the job market.',
    expertise: ['Data Science', 'Machine Learning', 'Python', 'Portfolio Development'],
    rating: 4.7,
    sessions: 85
  },
  {
    id: 4,
    name: 'Dr. Priya Mehta',
    role: 'Academic Counselor',
    company: 'IIT Delhi',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'As a professor at IIT Delhi, Dr. Mehta helps students navigate their academic journey and transition into the professional world with confidence.',
    expertise: ['Academic Planning', 'Research Guidance', 'Higher Education'],
    rating: 4.9,
    sessions: 150
  },
  {
    id: 5,
    name: 'Vikram Singhania',
    role: 'Government Job Expert',
    company: 'Former UPSC Member',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'Having served as a UPSC member, Vikram provides expert guidance on preparing for and excelling in government job examinations and interviews.',
    expertise: ['Government Exams', 'Public Sector Interviews', 'UPSC Preparation'],
    rating: 4.8,
    sessions: 112
  },
  {
    id: 6,
    name: 'Anjali Desai',
    role: 'Startup & Entrepreneurship Coach',
    company: 'Founder of TechStart India',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description: 'Anjali guides students interested in the startup ecosystem, helping them develop entrepreneurial skills or find the right roles in growing startups.',
    expertise: ['Entrepreneurship', 'Startup Jobs', 'Innovation', 'Business Development'],
    rating: 4.6,
    sessions: 76
  }
];

export default function Mentors() {
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  
  // Get unique expertise areas for filter
  const expertiseAreas = ['All', ...new Set(mentors.flatMap(mentor => mentor.expertise))];
  
  // Filter mentors based on selected expertise
  const filteredMentors = selectedExpertise === 'All' 
    ? mentors 
    : mentors.filter(mentor => mentor.expertise.includes(selectedExpertise));

  const handleBookSession = (mentorId, mentorName) => {
    setBookingSuccess(mentorName);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setBookingSuccess(null);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Expert Mentors | AICTE Jobs Portal</title>
        <meta name="description" content="Connect with experienced mentors to guide your career journey" />
      </Head>

      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Success notification */}
        {bookingSuccess && (
          <div className="fixed top-24 right-4 z-50 animate-slide-up transform transition-all duration-500 ease-in-out">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Your mentor session with {bookingSuccess} has been successfully booked!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative bg-indigo-800 dark:bg-indigo-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              alt="People in a meeting"
              width={1974}
              height={1316}
              className="opacity-20 object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-in">
              Learn from Industry Experts
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-100 animate-fade-in">
              Book a session with our experienced mentors who have helped thousands of students and professionals succeed in their career journeys.
            </p>
          </div>
        </div>

        {/* Mentor Filtering */}
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                Our Mentors
              </h2>
              <div className="w-full md:w-auto">
                <label htmlFor="expertise" className="sr-only">Filter by expertise</label>
                <select
                  id="expertise"
                  name="expertise"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-300"
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                >
                  {expertiseAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover-scale transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20 rounded-full overflow-hidden relative">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        width={80}
                        height={80}
                        className="object-cover"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{mentor.name}</h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">{mentor.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.company}</p>
                      <div className="flex items-center mt-1">
                        <svg className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{mentor.rating} • {mentor.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-300">
                    {mentor.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Expertise</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <span 
                          key={skill} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => handleBookSession(mentor.id, mentor.name)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                      Book a Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Mentor */}
        <div className="bg-indigo-700 dark:bg-indigo-900">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Want to share your expertise?</span>
              <span className="block">Become a mentor on our platform.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Help the next generation of professionals succeed in their careers while building your personal brand and network.
            </p>
            <Link 
              href="/contact"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:hover:bg-gray-100 sm:w-auto transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 