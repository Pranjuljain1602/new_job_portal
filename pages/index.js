import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function LandingPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // If user is already logged in, redirect to jobs page
  useEffect(() => {
    if (!loading && user) {
      router.push('/jobs');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative">
        <div className="bg-indigo-600">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="text-center sm:px-16">
              <p className="font-medium text-white">
                <span className="md:hidden">AICTE-Approved Jobs Portal!</span>
                <span className="hidden md:inline">Looking for AICTE-approved government jobs and internships? You're in the right place!</span>
                <span className="block sm:ml-2 sm:inline-block">
                  <Link href="/auth/register" className="text-white font-bold underline">
                    Sign up now <span aria-hidden="true">&rarr;</span>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-2xl font-bold text-indigo-600">AICTE Jobs Portal</span>
            </div>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link href="/auth/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/auth/register" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2047&q=80"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Find Your Perfect</span>
                  <span className="block text-indigo-200">AICTE-Approved Job</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Our AI-powered platform matches your skills, interests, and experience with AICTE-approved government jobs and internships.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link href="/auth/register" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                      Get started
                    </Link>
                    <Link href="#features" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-100 py-16 sm:py-24" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Why Choose Our Platform?
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Discover how our AI-powered platform can help you find the perfect job match.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">AI-Powered Recommendations</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Our advanced AI algorithm analyzes your profile to recommend the most relevant AICTE-approved jobs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">AICTE-Approved Opportunities</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Access a curated list of government jobs and internships that are approved by AICTE.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">Real-Time Updates</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Get notified about new job opportunities that match your profile in real-time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">Advanced Filtering</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Filter jobs by location, salary, job type, and more to find exactly what you're looking for.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">Secure Application Process</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Apply to jobs securely through our platform with your profile information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 6 */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">Application Tracking</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Keep track of all your job applications and their status in one place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">How It Works</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Three Simple Steps
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Get started with our platform in just a few minutes.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Create Your Account</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Sign up and create your account with basic information.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Complete Your Profile</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Add your skills, interests, education, and experience to your profile.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Get Matched with Jobs</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our AI will recommend the best AICTE-approved jobs for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/auth/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                What Our Users Say
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">RS</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Rahul Sharma</h3>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      "I found my dream job at a government organization through this platform. The AI recommendations were spot on!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">PK</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Priya Kumar</h3>
                      <p className="text-sm text-gray-500">Data Scientist</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      "The platform made it easy to find AICTE-approved internships that matched my skills and interests."
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">AJ</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Amit Joshi</h3>
                      <p className="text-sm text-gray-500">Recent Graduate</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      "As a fresh graduate, I was struggling to find relevant opportunities. This platform helped me land my first job!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to find your perfect job?</span>
              <span className="block">Start using our platform today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Join thousands of students and professionals who have found their dream AICTE-approved jobs and internships through our platform.
            </p>
            <Link href="/auth/register" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
              Sign up for free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Jobs
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Press
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Terms
              </Link>
            </div>

            <div className="px-5 py-2">
              <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 AICTE Jobs Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 