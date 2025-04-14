import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa/index.js';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | HirEdge</title>
        <meta name="description" content="Learn about our mission to connect talented individuals with the perfect career opportunities" />
      </Head>
      
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:scale-105 transform">
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="relative py-16 overflow-hidden">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
              <svg className="absolute top-12 left-full transform translate-x-32 opacity-20 dark:opacity-10" width="404" height="384" fill="none" viewBox="0 0 404 384">
                <defs>
                  <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-indigo-300 dark:text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
              </svg>
              <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32 opacity-20 dark:opacity-10" width="404" height="384" fill="none" viewBox="0 0 404 384">
                <defs>
                  <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-indigo-300 dark:text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto animate-fade-in">
              <h1>
                <span className="block text-base text-center text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Our Story</span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">About HirEdge</span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 dark:text-gray-300 leading-8">
                We're on a mission to revolutionize how students and professionals find their dream jobs and internships through AI-powered matching.
              </p>
            </div>
            
            <div className="relative w-full h-[400px] my-12 rounded-xl overflow-hidden animate-fade-in hover-scale">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Team working together"
                width={2070}
                height={1380}
                className="rounded-xl object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="prose prose-indigo dark:prose-invert mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10">Our Vision</h2>
              <p className="text-gray-800 dark:text-gray-200">
                To create a seamless bridge between educational excellence and career opportunities by leveraging artificial intelligence to match the right talent with the right opportunities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10">Our Mission</h2>
              <p className="text-gray-800 dark:text-gray-200">
                To empower students and professionals by providing them with personalized, AI-driven job recommendations that align with their skills, interests, and career aspirations.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10">Why We Started</h2>
              <p className="text-gray-800 dark:text-gray-200">
                Our journey began when we identified a critical gap in the employment ecosystem. Despite the abundance of talent emerging from educational institutions and the numerous job opportunities available, there was no dedicated platform that connected qualified individuals with the right jobs using AI technology.
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                We realized that traditional job portals often overwhelmed users with irrelevant options, while most job matching platforms lacked modern AI features and personalized recommendations. Thus, HirEdge was born – a platform built on cutting-edge AI technology to bridge this gap.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 hover-scale">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Our Approach</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    We've built a platform that understands the unique requirements of each job seeker and matches them with opportunities where they're most likely to succeed, saving time and improving outcomes for both candidates and employers.
                  </p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 hover-scale">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Our Commitment</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    We're committed to creating a platform that not only connects talent with opportunities but also fosters growth through mentorship, resources, and community support.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10">Meet Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                <div className="flex flex-col items-center hover-scale">
                  <div className="h-40 w-40 relative rounded-full overflow-hidden mb-4">
                    <Image
                      src="/images/Pranjul.jpeg"
                      alt="Pranjul Jain"
                      width={160}
                      height={160}
                      className="object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pranjul Jain</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Team Leader</p>
                </div>
                <div className="flex flex-col items-center hover-scale">
                  <div className="h-40 w-40 relative rounded-full overflow-hidden mb-4">
                    <Image
                      src="/images/bhagyawardhan.png"
                      alt="Bhagyawardhan"
                      width={160}
                      height={160}
                      className="object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bhagyawardhan</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Team Member</p>
                </div>
                <div className="flex flex-col items-center hover-scale">
                  <div className="h-40 w-40 relative rounded-full overflow-hidden mb-4">
                    <Image
                      src="/images/Shauryam.jpg"
                      alt="Shauryam"
                      width={160}
                      height={160}
                      className="object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shauryam</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Team Member</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10">Our Values</h2>
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
                <li className="mb-2"><strong>Innovation:</strong> We constantly push the boundaries of what's possible with AI and job matching technology.</li>
                <li className="mb-2"><strong>Integrity:</strong> We verify all jobs and internships to ensure they are legitimate opportunities.</li>
                <li className="mb-2"><strong>Inclusivity:</strong> We believe everyone deserves access to quality job opportunities regardless of their background.</li>
                <li className="mb-2"><strong>Impact:</strong> We measure our success by the positive change we create in the lives of job seekers and the broader economy.</li>
              </ul>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 mt-10">
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Join Our Journey</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We're always looking for passionate individuals to join our team. If you're excited about using technology to transform careers and create opportunity, we'd love to hear from you.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 