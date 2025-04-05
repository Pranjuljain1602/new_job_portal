import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa/index.js';
import { FaLinkedin } from 'react-icons/fa/index.js';
import { FaTwitter } from 'react-icons/fa/index.js';
import { FaFacebook } from 'react-icons/fa/index.js';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | AICTE Jobs Portal</title>
        <meta name="description" content="Get in touch with the AICTE Jobs Portal team for any questions or support." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="py-16">
          {/* Hero Section */}
          <div className="relative bg-indigo-800 dark:bg-indigo-900 transition-colors duration-300">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover opacity-20"
                src="/images/contact-hero.jpg"
                alt="Contact background"
              />
              <div className="absolute inset-0 bg-indigo-800 dark:bg-indigo-900 mix-blend-multiply" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
                Get in Touch
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl animate-fade-in-up">
                Have questions about our platform? Want to provide feedback or need assistance? 
                We're here to help you navigate your career journey.
              </p>
            </div>
          </div>

          {/* Contact Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 animate-fade-in-up transition-all duration-300 transform hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  Send us a message
                </h2>
                
                {submitSuccess ? (
                  <div className="text-center py-12 animate-fade-in">
                    <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      Thank you for reaching out!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      We've received your message and will get back to you within 24-48 hours.
                    </p>
                    <button
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Your Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john.doe@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.subject ? 'border-red-500' : ''}`}
                          placeholder="Inquiry about job recommendations"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Your Message
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.message ? 'border-red-500' : ''}`}
                          placeholder="Please provide details about your inquiry..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Address */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaMapMarkerAlt className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        Our Office
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Nelson Mandela Marg, Vasant Kunj<br />
                        New Delhi, Delhi 110070<br />
                        India
                      </p>
                      <a 
                        href="https://maps.google.com/?q=AICTE+Delhi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300"
                      >
                        View on map
                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaPhone className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        Phone
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Toll Free: 1800-xxx-xxxx<br />
                        Support: +91-11-xxxx-xxxx
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        Monday to Friday, 9AM to 6PM IST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaEnvelope className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        Email
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <a href="mailto:support@aictejobsportal.in" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                          support@aictejobsportal.in
                        </a>
                        <br />
                        <a href="mailto:careers@aictejobsportal.in" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                          careers@aictejobsportal.in
                        </a>
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        We usually respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Prompt */}
                <div className="bg-indigo-50 dark:bg-indigo-900 shadow-md rounded-lg p-6 animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 transition-colors duration-300">
                    Frequently Asked Questions
                  </h3>
                  <p className="mt-2 text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    Looking for quick answers? Check out our comprehensive FAQ section.
                  </p>
                  <a 
                    href="/faq" 
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                  >
                    Visit FAQ
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-16 animate-fade-in">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-colors duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9409437882757!2d77.12790591508094!3d28.545224782454505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1df6b9055555%3A0x45a1d93d7330b357!2sAll%20India%20Council%20for%20Technical%20Education!5e0!3m2!1sen!2sin!4v1620142461008!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="AICTE Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 