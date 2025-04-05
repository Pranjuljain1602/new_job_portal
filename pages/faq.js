import { useState } from 'react';
import Head from 'next/head';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function FAQ() {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      category: 'Platform & Account',
      questions: [
        {
          question: 'What is AICTE Jobs Portal?',
          answer: 'AICTE Jobs Portal is an AI-powered platform that connects students and professionals with AICTE-approved government jobs and internships. Our platform leverages artificial intelligence to match users with opportunities based on their skills, interests, education, and experience.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click on the "Sign Up" button in the top right corner of the homepage. Fill in your basic information, verify your email address, and you\'re all set to start using the platform.'
        },
        {
          question: 'Is the AICTE Jobs Portal free to use?',
          answer: 'Yes, the AICTE Jobs Portal is completely free for job seekers. We believe in providing equal access to opportunities for all students and professionals.'
        },
        {
          question: 'How can I reset my password?',
          answer: 'If you\'ve forgotten your password, click on the "Forgot Password" link on the login page. You\'ll receive an email with instructions to reset your password. If you don\'t receive the email, check your spam folder or contact our support team.'
        }
      ]
    },
    {
      category: 'Job Recommendations',
      questions: [
        {
          question: 'How does the AI recommendation system work?',
          answer: 'Our AI recommendation system analyzes your profile, including your skills, education, experience, and interests, and matches them with available job opportunities. The more detailed your profile is, the more accurate the recommendations will be. The system continuously learns from your interactions to improve the quality of recommendations over time.'
        },
        {
          question: 'Why am I not seeing any job recommendations?',
          answer: 'If you\'re not seeing job recommendations, it could be due to an incomplete profile. Make sure you\'ve filled out all the necessary information, especially your skills, education, and work experience. It could also be that there are no jobs currently available that match your profile. Check back regularly as new opportunities are added daily.'
        },
        {
          question: 'Can I filter job recommendations?',
          answer: 'Yes, you can filter job recommendations based on various criteria such as location, job type (full-time, part-time, internship), salary range, and more. Use the filters available on the job recommendations page to narrow down your search.'
        },
        {
          question: 'Are all jobs on the platform AICTE-approved?',
          answer: 'Yes, all jobs and internships listed on our platform are AICTE-approved and verified. We maintain strict quality control to ensure that only legitimate opportunities are posted.'
        }
      ]
    },
    {
      category: 'Profile & Applications',
      questions: [
        {
          question: 'How can I make my profile more attractive to employers?',
          answer: 'To make your profile more attractive to employers, provide detailed information about your education, skills, and experience. Upload a professional photo, add certifications, and highlight your achievements. Keep your profile updated regularly, and make sure to include keywords relevant to your field.'
        },
        {
          question: 'How do I apply for a job through the platform?',
          answer: 'To apply for a job, navigate to the job listing page, review the job details, and click on the "Apply Now" button. You\'ll be guided through the application process, which may include submitting your resume, answering additional questions, or completing assessments, depending on the employer\'s requirements.'
        },
        {
          question: 'Can I track my job applications?',
          answer: 'Yes, you can track all your job applications through the "My Applications" section in your dashboard. Here, you\'ll see the status of each application, including whether it\'s been viewed, shortlisted, or rejected.'
        },
        {
          question: 'How can I update my resume?',
          answer: 'You can update your resume by going to your profile settings. Click on "Edit Profile" and navigate to the "Resume" section. You can upload a new resume or update your existing one. Make sure your resume is up-to-date before applying for jobs.'
        }
      ]
    },
    {
      category: 'Mentorship & Resources',
      questions: [
        {
          question: 'How does the mentorship program work?',
          answer: 'Our mentorship program connects you with experienced professionals who can provide guidance, advice, and support in your career journey. You can browse through our list of mentors, view their profiles, and book sessions based on your needs and their availability.'
        },
        {
          question: 'Are mentorship sessions free?',
          answer: 'Most introductory mentorship sessions are free, but some mentors may charge for extended or specialized sessions. The cost, if any, will be clearly indicated on the mentor\'s profile before you book a session.'
        },
        {
          question: 'What resources are available on the platform?',
          answer: 'We offer a variety of resources to help you in your career development, including resume templates, interview guides, skill assessment tools, industry reports, and more. These resources are regularly updated to reflect current industry trends and best practices.'
        },
        {
          question: 'How can I access the downloadable resources?',
          answer: 'You can access all downloadable resources through the "Resources" page. Browse through the available resources, click on the one you\'re interested in, and follow the download instructions. Most resources are free to download, but some premium resources may require credits or subscription.'
        }
      ]
    },
    {
      category: 'Technical & Support',
      questions: [
        {
          question: 'What should I do if I encounter a technical issue?',
          answer: 'If you encounter a technical issue, first try refreshing the page or logging out and back in. If the problem persists, please contact our support team through the Contact page with details about the issue, including screenshots if possible.'
        },
        {
          question: 'Is my data secure on the platform?',
          answer: 'Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. Our privacy policy details how we collect, use, and protect your data.'
        },
        {
          question: 'How can I delete my account?',
          answer: 'To delete your account, go to your profile settings and select "Account Settings." At the bottom of the page, you\'ll find an option to "Delete Account." Follow the instructions to complete the process. Please note that this action is irreversible, and all your data will be permanently deleted.'
        },
        {
          question: 'How can I contact the support team?',
          answer: 'You can contact our support team through the Contact page on our website. Fill out the contact form with your inquiry, and our team will get back to you within 24-48 hours. For urgent matters, you can also reach out to us through our social media channels.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filterFaqs = () => {
    if (!searchTerm.trim()) return faqs;

    return faqs.map(category => ({
      ...category,
      questions: category.questions.filter(
        faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);
  };

  const filteredFaqs = filterFaqs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>FAQ | AICTE Jobs Portal</title>
        <meta name="description" content="Frequently Asked Questions about the AICTE Jobs Portal - Find answers to common questions about our platform, job recommendations, and more." />
      </Head>

      <main className="py-16">
        {/* Hero Section */}
        <div className="relative bg-indigo-800 dark:bg-indigo-900 transition-colors duration-300">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover opacity-20"
              src="/images/faq-hero.jpg"
              alt="FAQ background"
            />
            <div className="absolute inset-0 bg-indigo-800 dark:bg-indigo-900 mix-blend-multiply" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl animate-fade-in-up">
              Find answers to common questions about our platform, job recommendations, and more.
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {/* Search Bar */}
          <div className="relative mb-8 animate-fade-in">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              className={`pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Search for questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FAQ Sections */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, categoryIndex) => (
              category.questions.length > 0 && (
                <div key={categoryIndex} className="mb-12 animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div 
                          key={faqIndex} 
                          className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-all duration-300 ${
                            openFaqIndex === globalIndex ? 'ring-2 ring-indigo-500' : ''
                          }`}
                        >
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                          >
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                              {faq.question}
                            </h3>
                            <span>
                              {openFaqIndex === globalIndex ? 
                                <FaMinus className="h-5 w-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" /> : 
                                <FaPlus className="h-5 w-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                              }
                            </span>
                          </button>
                          <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ${
                              openFaqIndex === globalIndex ? 'max-h-96 py-4' : 'max-h-0 py-0'
                            }`}
                          >
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <svg 
                className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.663 17h4.673M12 12v5m0 0l-3-3m3 3l3-3m-8-3a4 4 0 11-8 0 4 4 0 018 0zm9.75 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-8.25 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" 
                />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white transition-colors duration-300">
                No results found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                We couldn't find any FAQs matching your search. Try using different keywords or browse all questions.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-16 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md p-8 text-center animate-fade-in transition-colors duration-300">
            <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 transition-colors duration-300">
              Still have questions?
            </h2>
            <p className="text-indigo-700 dark:text-indigo-200 mb-6 transition-colors duration-300">
              If you couldn't find the answer to your question, feel free to reach out to our support team.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 