import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa/index.js';
import { FaUser } from 'react-icons/fa/index.js';
import { FaTag } from 'react-icons/fa/index.js';
import { FaClock } from 'react-icons/fa/index.js';
import { FaArrowLeft } from 'react-icons/fa/index.js';
import { FaLinkedin } from 'react-icons/fa/index.js';
import { FaTwitter } from 'react-icons/fa/index.js';
import { FaFacebook } from 'react-icons/fa/index.js';

// Blog post data (in a real app, this would be fetched from an API or CMS)
const blogPosts = [
  {
    id: 1,
    title: '10 Tips to Ace Your Government Job Interview',
    slug: '10-tips-government-job-interview',
    excerpt: 'Learn proven strategies to stand out in competitive government job interviews and increase your chances of success.',
    content: `
      <p>Government job interviews can be highly competitive and structured differently than private sector interviews. Here are ten proven tips to help you stand out:</p>
      
      <h2>1. Research the Department and Role Thoroughly</h2>
      <p>Government departments have specific missions and values. Study the department's website, annual reports, and recent initiatives. Understand how your role contributes to their broader objectives.</p>
      
      <h2>2. Review the Selection Criteria</h2>
      <p>Government job descriptions often list detailed selection criteria. Address each point specifically in your answers, using the STAR method (Situation, Task, Action, Result) to provide concrete examples.</p>
      
      <h2>3. Understand the Government Hierarchy</h2>
      <p>Familiarize yourself with the organizational structure and reporting lines in the department. This demonstrates your understanding of how government operations work.</p>
      
      <h2>4. Prepare for Behavioral Questions</h2>
      <p>Government interviews heavily emphasize behavioral questions to assess your past performance. Prepare examples that showcase your skills in teamwork, problem-solving, communication, and adaptability.</p>
      
      <h2>5. Demonstrate Public Service Values</h2>
      <p>Emphasize your commitment to public service values like integrity, accountability, transparency, and citizen-focused service delivery.</p>
      
      <h2>6. Practice Panel Interview Techniques</h2>
      <p>Government interviews often involve panels of 3-5 people. Practice maintaining eye contact with all panel members and addressing the specific person who asked each question.</p>
      
      <h2>7. Know Relevant Policies and Regulations</h2>
      <p>Demonstrate knowledge of key policies, laws, or regulations relevant to the role. This shows you understand the regulatory environment you'll be working in.</p>
      
      <h2>8. Prepare for Competency Tests</h2>
      <p>Many government positions require written tests, presentations, or case studies as part of the interview process. Ask in advance about any assessments so you can prepare accordingly.</p>
      
      <h2>9. Highlight Transferable Skills</h2>
      <p>If you're coming from the private sector, emphasize how your skills transfer to government work. Focus on universal competencies like project management, stakeholder engagement, and resource optimization.</p>
      
      <h2>10. Ask Thoughtful Questions</h2>
      <p>Prepare questions that demonstrate your interest in contributing to the department's mission and your understanding of current challenges in the sector.</p>
      
      <p>Remember that government hiring processes can take longer than private sector recruitment. Be patient and follow up professionally after your interview.</p>
    `,
    author: 'Priya Sharma',
    authorRole: 'Former UPSC Interview Panelist',
    authorBio: 'Priya Sharma has 15+ years of experience in government recruitment, including 5 years as a UPSC interview panelist. She has helped hundreds of candidates successfully navigate government job interviews.',
    date: 'August 15, 2023',
    readTime: '8 min read',
    category: 'Interview Tips',
    tags: ['Government Jobs', 'Interview Preparation', 'Career Advice'],
    image: 'https://images.unsplash.com/photo-1542744173-8659b8e77b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 2,
    title: 'How to Build a Resume That Gets Past ATS Systems',
    slug: 'resume-ats-systems',
    excerpt: 'Modern job applications often go through Applicant Tracking Systems before human reviewers. Learn how to optimize your resume for ATS success.',
    content: `
      <p>Before your resume reaches a human recruiter, it often must pass through an Applicant Tracking System (ATS). These systems filter applications based on keywords, formatting, and other factors. Here's how to ensure your resume makes it through:</p>
      
      <h2>Understanding ATS Systems</h2>
      <p>Applicant Tracking Systems scan resumes for relevant keywords and qualifications to determine which candidates best match the job requirements. Up to 75% of resumes are rejected by ATS before a human ever sees them.</p>
      
      <h2>Keyword Optimization Strategies</h2>
      <p>Carefully review the job description and identify key skills, qualifications, and responsibilities. Incorporate these exact terms naturally throughout your resume. Use both the spelled-out term and acronym where applicable (e.g., "Artificial Intelligence (AI)").</p>
      
      <h2>ATS-Friendly Formatting</h2>
      <ul>
        <li>Use standard resume section headings (e.g., "Work Experience," "Education," "Skills")</li>
        <li>Choose a clean, simple layout without tables, headers/footers, or text boxes</li>
        <li>Use a standard, readable font like Arial, Calibri, or Times New Roman</li>
        <li>Save your file as a .docx or .pdf (check job posting for preferred format)</li>
        <li>Include your name at the top of every page</li>
        <li>Use standard bullet points (•) rather than custom symbols</li>
      </ul>
      
      <h2>What to Avoid</h2>
      <ul>
        <li>Fancy graphics, charts, or images</li>
        <li>Headers and footers (information in these areas may be missed)</li>
        <li>Text boxes or multiple columns</li>
        <li>Uncommon section headings</li>
        <li>Creative fonts or very small text (stay above 10pt)</li>
        <li>Excessive formatting (keep bold and italics minimal)</li>
      </ul>
      
      <h2>Tailoring for Each Application</h2>
      <p>Customize your resume for each job application by adjusting keywords to match the specific job description. A one-size-fits-all approach rarely works with modern ATS systems.</p>
      
      <h2>Testing Your Resume</h2>
      <p>Before applying, you can test your resume's ATS compatibility using tools like JobScan, Resume Worded, or by copying text from your PDF resume into a plain text editor to check for formatting issues.</p>
      
      <p>Remember that while optimizing for ATS is important, your resume should still be compelling and readable for humans once it passes the automated screening.</p>
    `,
    author: 'Vikram Mehta',
    authorRole: 'HR Technology Specialist',
    authorBio: 'Vikram Mehta specializes in HR technology and has helped over 500 candidates optimize their resumes for modern recruitment systems. He regularly conducts workshops on navigating the digital job application process.',
    date: 'July 22, 2023',
    readTime: '6 min read',
    category: 'Resume',
    tags: ['Resume Building', 'ATS', 'Job Application'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 3,
    title: 'The Rise of AI in Government Recruitment',
    slug: 'ai-government-recruitment',
    excerpt: 'Artificial intelligence is transforming how government agencies recruit talent. Learn how AI is being used and how candidates can adapt.',
    content: `
      <p>Artificial intelligence is revolutionizing government recruitment processes, introducing both opportunities and challenges for job seekers. Here's what you need to know about this transformation:</p>
      
      <h2>Current AI Applications in Government Recruitment</h2>
      <p>Government agencies across India are increasingly adopting AI-powered tools to streamline their hiring processes:</p>
      
      <ul>
        <li><strong>Resume Screening:</strong> Advanced algorithms analyze thousands of applications to identify qualified candidates based on skills, experience, and education.</li>
        <li><strong>Video Interviews:</strong> AI-powered platforms assess candidates' facial expressions, word choice, and speech patterns during recorded interviews.</li>
        <li><strong>Skills Assessment:</strong> Automated tools evaluate technical and soft skills through adaptive testing.</li>
        <li><strong>Chatbots:</strong> AI assistants guide candidates through the application process and answer common questions.</li>
      </ul>
      
      <h2>Benefits for Government Agencies</h2>
      <p>The implementation of AI in recruitment offers several advantages for government departments:</p>
      
      <ul>
        <li>Processing large volumes of applications more efficiently</li>
        <li>Reducing unconscious bias in the initial screening stages</li>
        <li>Standardizing the evaluation process across different regions</li>
        <li>Identifying candidates who might be overlooked in traditional recruitment</li>
        <li>Reducing administrative burden on HR departments</li>
      </ul>
      
      <h2>How Candidates Can Adapt</h2>
      <p>To succeed in this new landscape, job seekers should:</p>
      
      <ol>
        <li><strong>Optimize for AI screening:</strong> Use industry-standard keywords and clear formatting in resumes.</li>
        <li><strong>Prepare for video assessments:</strong> Practice speaking clearly and maintaining appropriate eye contact.</li>
        <li><strong>Develop digital communication skills:</strong> AI often evaluates written responses for clarity and relevance.</li>
        <li><strong>Showcase adaptability:</strong> Demonstrate comfort with technology and willingness to learn new systems.</li>
        <li><strong>Research each agency's process:</strong> Understand which AI tools they use and prepare accordingly.</li>
      </ol>
      
      <h2>Ethical Considerations</h2>
      <p>While AI offers efficiency, several ethical concerns remain:</p>
      
      <ul>
        <li>Potential for algorithmic bias if systems are trained on non-diverse data</li>
        <li>Privacy concerns regarding data collected during automated assessments</li>
        <li>Lack of transparency in how AI makes screening decisions</li>
        <li>Accessibility challenges for candidates with disabilities</li>
      </ul>
      
      <h2>The Future Outlook</h2>
      <p>Government recruitment is likely to adopt a hybrid approach, using AI for initial screening while preserving human judgment for final decisions. Candidates who understand both technological and human elements of the process will have an advantage in this evolving landscape.</p>
    `,
    author: 'Dr. Rajesh Kumar',
    authorRole: 'Digital Governance Specialist',
    authorBio: 'Dr. Rajesh Kumar is a leading expert in digital transformation of government processes. He has advised multiple state governments on implementing AI solutions in recruitment and citizen services.',
    date: 'June 10, 2023',
    readTime: '7 min read',
    category: 'Technology',
    tags: ['Artificial Intelligence', 'Government Jobs', 'Recruitment', 'Technology'],
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
];

// Related posts function
const getRelatedPosts = (currentPost) => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && 
                   (post.category === currentPost.category || 
                    post.tags.some(tag => currentPost.tags.includes(tag))))
    .slice(0, 3);
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const currentPost = blogPosts.find(post => post.slug === slug);
      
      if (currentPost) {
        setPost(currentPost);
        setRelatedPosts(getRelatedPosts(currentPost));
      } else {
        router.push('/blog');
      }
      
      setLoading(false);
    }
  }, [slug, router]);

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | AICTE Jobs Portal</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/90 dark:via-gray-900/90 to-white/60 dark:to-gray-900/60"></div>
          </div>
          <div className="relative pt-32 pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center animate-fade-in">
                <Link href="/blog" className="inline-flex items-center mb-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300">
                  <FaArrowLeft className="mr-2" /> Back to blog
                </Link>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>
                <div className="mt-5 flex flex-col sm:flex-row justify-center items-center text-gray-500 dark:text-gray-400 space-y-2 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert prose-indigo mx-auto animate-fade-in">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover-scale"
                  >
                    <FaTag className="mr-1.5 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Share this article</h3>
              <div className="mt-2 flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://aictejobs.com/blog/${post.slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover-scale"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://aictejobs.com/blog/${post.slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-300 hover-scale"
                >
                  <span className="sr-only">Share on Facebook</span>
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://aictejobs.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700 transition-colors duration-300 hover-scale"
                >
                  <span className="sr-only">Share on LinkedIn</span>
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-800 dark:text-indigo-200 text-xl font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{post.author}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{post.authorRole}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{post.authorBio}</p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="group hover-scale">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-40 w-full rounded-lg overflow-hidden mb-3">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-0 right-0 m-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                              {relatedPost.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {relatedPost.title}
                        </h3>
                        <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="mr-1 h-3 w-3" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section (Placeholder) */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">Comments are coming soon! Check back later to join the discussion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Sign Up */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Want more career insights?
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
                Sign up for our newsletter to receive the latest job search tips and career advice.
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
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 hover-scale"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 