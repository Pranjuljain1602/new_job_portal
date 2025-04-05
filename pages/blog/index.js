import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa/index.js';
import { FaUser } from 'react-icons/fa/index.js';
import { FaClock } from 'react-icons/fa/index.js';
import { FaSearch } from 'react-icons/fa/index.js';
import { FaTag } from 'react-icons/fa/index.js';
import { FaArrowRight } from 'react-icons/fa/index.js';
import { useTheme } from '../../context/ThemeContext';

// Blog post data with real content
const blogPosts = [
  {
    id: 1,
    title: '10 Tips to Ace Your Government Job Interview',
    slug: '10-tips-government-job-interview',
    excerpt: 'Learn proven strategies to stand out in competitive government job interviews and increase your chances of success.',
    author: 'Priya Sharma',
    authorRole: 'Former UPSC Interview Panelist',
    date: 'August 15, 2023',
    readTime: '8 min read',
    category: 'Interview Tips',
    image: 'https://images.unsplash.com/photo-1542744173-8659b8e77b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 2,
    title: 'How to Build a Resume That Gets Past ATS Systems',
    slug: 'resume-ats-systems',
    excerpt: 'Modern job applications often go through Applicant Tracking Systems before human reviewers. Learn how to optimize your resume for ATS success.',
    author: 'Vikram Mehta',
    authorRole: 'HR Technology Specialist',
    date: 'July 22, 2023',
    readTime: '6 min read',
    category: 'Resume',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 3,
    title: 'The Rise of AI in Government Recruitment',
    slug: 'ai-government-recruitment',
    excerpt: 'Artificial intelligence is transforming how government agencies recruit talent. Learn how AI is being used and how candidates can adapt.',
    author: 'Dr. Rajesh Kumar',
    authorRole: 'Digital Governance Specialist',
    date: 'June 10, 2023',
    readTime: '7 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 4,
    title: 'Navigating Internships at Government Research Labs',
    slug: 'internships-government-research-labs',
    excerpt: 'Government research laboratories offer unique internship opportunities. Discover how to find and secure these valuable experiences.',
    author: 'Anika Patel',
    authorRole: 'ISRO Internship Coordinator',
    date: 'May 5, 2023',
    readTime: '9 min read',
    category: 'Internships',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 5,
    title: 'Networking Strategies for Government Job Seekers',
    slug: 'networking-government-jobs',
    excerpt: 'Effective networking is crucial even in government job searches. Learn strategic approaches to build connections in the public sector.',
    author: 'Sanjay Kapoor',
    authorRole: 'Career Counselor',
    date: 'April 18, 2023',
    readTime: '5 min read',
    category: 'Career Strategy',
    image: 'https://images.unsplash.com/photo-1553358667-14923c9d3a25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
  },
  {
    id: 6,
    title: 'Mastering Coding Tests for Technical Government Positions',
    slug: 'coding-tests-technical-government-positions',
    excerpt: 'Technical roles in government agencies often require coding assessments. Learn how to prepare and excel in these specialized tests.',
    author: 'Arjun Reddy',
    authorRole: 'Software Engineer at NIC',
    date: 'March 7, 2023',
    readTime: '10 min read',
    category: 'Technical Skills',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
];

// Get all unique categories
const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

export default function Blog() {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredPost, ...regularPosts] = blogPosts;

  // Filter posts based on search term and category
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Blog | AICTE Jobs Portal</title>
        <meta name="description" content="Career insights, interview tips, and job search strategies for AICTE-approved opportunities" />
      </Head>

      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section with Featured Post */}
        <div className="relative bg-indigo-800 dark:bg-indigo-900">
          <div className="absolute inset-0">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              layout="fill"
              objectFit="cover"
              className="opacity-25"
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mb-4">
                Featured Post
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center text-indigo-200 mb-8">
                <FaUser className="mr-2" />
                <span className="mr-6">{featuredPost.author}</span>
                <FaCalendarAlt className="mr-2" />
                <span className="mr-6">{featuredPost.date}</span>
                <FaClock className="mr-2" />
                <span>{featuredPost.readTime}</span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 dark:hover:bg-gray-100 transition-all duration-300 hover-scale">
                Read Article <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover-scale transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1 h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-800 dark:text-indigo-200">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.authorRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No blog posts found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Stay up to date
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
                Subscribe to our newsletter for the latest career tips, job opportunities, and resources.
              </p>
              <div className="mt-8 sm:flex sm:justify-center">
                <div className="sm:flex-1 sm:max-w-md">
                  <form className="sm:flex">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs rounded-md dark:bg-gray-800 dark:text-white transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                We care about your data. Read our{' '}
                <a href="/privacy" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 