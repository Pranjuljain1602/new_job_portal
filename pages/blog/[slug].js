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
import BackToHomeButton from '../../components/BackToHomeButton';
import Notification from '../../components/Notification';

// Blog post data (in a real app, this would be fetched from an API or CMS)
const blogPosts = [
  {
    id: 1,
    title: '10 Tips to Ace Your Government Job Interview',
    slug: '10-tips-government-job-interview',
    excerpt: 'Learn proven strategies to stand out in competitive government job interviews and increase your chances of success.',
    content: `
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">Preparing for Success in Your Job Interview</h2>
        <p class="mb-6">Government job interviews can be challenging, but with the right preparation, you can significantly increase your chances of success. Here are ten proven strategies to help you stand out from other candidates:</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">1. Research the Organization Thoroughly</h3>
        <p class="mb-4">Before your interview, invest time in understanding the organization's:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Mission and vision</li>
          <li>Recent initiatives and achievements</li>
          <li>Organizational structure</li>
          <li>Current challenges and priorities</li>
        </ul>
        <p class="mb-6">This knowledge will help you tailor your responses and demonstrate genuine interest in the role.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">2. Understand the Job Requirements</h3>
        <p class="mb-4">Carefully analyze the job description to identify:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Key responsibilities</li>
          <li>Required skills and qualifications</li>
          <li>Preferred experiences</li>
        </ul>
        <p class="mb-6">Use this information to highlight relevant aspects of your background during the interview.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">3. Practice Structured Responses</h3>
        <p class="mb-4">For behavioral questions, use the STAR method to structure your answers:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Situation:</strong> Describe the context</li>
          <li><strong>Task:</strong> Explain your responsibility</li>
          <li><strong>Action:</strong> Detail the steps you took</li>
          <li><strong>Result:</strong> Share the outcome and learnings</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">4. Prepare for Technical Questions</h3>
        <p class="mb-6">Many government positions require specific technical knowledge. Review concepts, regulations, and procedures relevant to the role. Be ready to demonstrate your expertise through concrete examples from your experience.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">5. Demonstrate Public Service Motivation</h3>
        <p class="mb-4">Government interviewers look for candidates who are genuinely motivated to serve the public. Be prepared to articulate:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Your commitment to public service values</li>
          <li>How your personal values align with the organization's mission</li>
          <li>Examples of how you've contributed to community welfare</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">6. Show Adaptability and Learning Agility</h3>
        <p class="mb-4">Government environments often involve complex challenges and changing priorities. Prepare examples that showcase your ability to:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Adapt to new situations</li>
          <li>Learn quickly</li>
          <li>Navigate ambiguity</li>
          <li>Implement new processes or technologies</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">7. Address Potential Concerns Proactively</h3>
        <p class="mb-4">If you have gaps in your experience or qualifications, prepare to address them constructively. Focus on:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Transferable skills</li>
          <li>Relevant learning experiences</li>
          <li>Your plan for closing knowledge gaps</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">8. Prepare Thoughtful Questions</h3>
        <p class="mb-4">Having insightful questions demonstrates your interest and engagement. Consider asking about:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Team dynamics and culture</li>
          <li>Success metrics for the role</li>
          <li>Professional development opportunities</li>
          <li>Current challenges the team is addressing</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">9. Practice Professional Communication</h3>
        <p class="mb-4">Government interviews often place high value on communication skills. Practice:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Clear and concise explanations</li>
          <li>Active listening</li>
          <li>Appropriate body language</li>
          <li>Professional vocabulary relevant to the field</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">10. Conduct Mock Interviews</h3>
        <p class="mb-4">Simulate the interview experience by practicing with a friend or mentor who can provide constructive feedback on your:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Response content</li>
          <li>Delivery and presence</li>
          <li>Areas for improvement</li>
        </ul>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Thoughts</h2>
          <p class="mb-4">Remember that preparation builds confidence, and confidence makes a significant difference in how you present yourself. By implementing these strategies, you'll be well-positioned to make a strong impression in your government job interview.</p>
          <p>Good luck with your interview preparation!</p>
        </div>
      </div>
    `,
    author: 'Priya Sharma',
    authorRole: 'Former UPSC Interview Panelist',
    authorBio: 'Priya Sharma has 15+ years of experience in government recruitment, including 5 years as a UPSC interview panelist. She has helped hundreds of candidates successfully navigate government job interviews.',
    date: 'August 15, 2025',
    readTime: '8 min read',
    category: 'Interview Tips',
    tags: ['Government Jobs', 'Interview Preparation', 'Career Advice'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
  },
  {
    id: 2,
    title: 'How to Build a Resume That Gets Past ATS Systems',
    slug: 'resume-ats-systems',
    excerpt: 'Modern job applications often go through Applicant Tracking Systems before human reviewers. Learn how to optimize your resume for ATS success.',
    content: `
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">Optimizing Your Resume for ATS Success</h2>
        
        <p class="mb-6">In today's competitive job market, up to 75% of resumes are rejected before they even reach a human reviewer. This is because companies use Applicant Tracking Systems (ATS) to filter applications. Here's how to ensure your resume passes through these digital gatekeepers:</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Understanding ATS</h3>
        <p class="mb-6">An ATS is software that helps employers manage job applications by automatically scanning, categorizing, and ranking resumes based on specific criteria. To get past this initial screening, your resume needs to be both machine-readable and keyword-optimized.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Essential ATS-Friendly Formatting Tips</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Use standard resume formats:</strong> Stick with chronological or functional formats</li>
          <li><strong>Choose simple fonts:</strong> Arial, Calibri, or Times New Roman at 10-12pt size</li>
          <li><strong>Avoid headers and footers:</strong> Many ATS can't read text in these sections</li>
          <li><strong>Skip tables and columns:</strong> These can confuse ATS parsing algorithms</li>
          <li><strong>Use standard section headings:</strong> "Experience," "Education," "Skills"</li>
          <li><strong>Save as .docx or .pdf:</strong> These are the most ATS-compatible formats</li>
        </ul>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
          <p class="text-yellow-800 dark:text-yellow-200">Pro tip: Always submit your resume in the file format requested in the job posting. If not specified, .docx is generally safest.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Keyword Optimization Strategies</h3>
        <p class="mb-4">ATS systems score your resume based on keyword matches with the job description. Here's how to optimize:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Analyze the job description:</strong> Identify both hard skills (technical abilities) and soft skills (interpersonal qualities)</li>
          <li><strong>Include exact keyword matches:</strong> Use the exact phrasing from the job posting</li>
          <li><strong>Incorporate industry terminology:</strong> Show your familiarity with field-specific language</li>
          <li><strong>Add a skills section:</strong> Create a dedicated area for relevant keywords</li>
          <li><strong>Use both acronyms and spelled-out terms:</strong> Include "SQL" and "Structured Query Language"</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Common ATS Mistakes to Avoid</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded">
            <h4 class="font-semibold text-red-800 dark:text-red-200 mb-2">DON'T</h4>
            <ul class="list-disc pl-4 space-y-1 text-red-700 dark:text-red-300">
              <li>Use images or graphics</li>
              <li>Submit scanned documents</li>
              <li>Use creative layouts</li>
              <li>Include text boxes</li>
              <li>"Keyword stuff" unnaturally</li>
            </ul>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">DO</h4>
            <ul class="list-disc pl-4 space-y-1 text-green-700 dark:text-green-300">
              <li>Use plain text formatting</li>
              <li>Tailor each resume to the job</li>
              <li>Spell out numbers (nine instead of 9)</li>
              <li>Use conventional section titles</li>
              <li>Incorporate keywords naturally</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Testing Your Resume's ATS Compatibility</h3>
        <p class="mb-6">Before submitting your application, consider using these methods to test ATS compatibility:</p>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li>Use an ATS resume scanner tool like JobScan or Resume Worded</li>
          <li>Copy and paste your resume text into a plain text editor – if formatting issues appear, an ATS might have similar problems</li>
          <li>Have a professional review your resume for ATS optimization</li>
        </ol>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Thoughts</h2>
          <p class="mb-4">Remember that while optimizing for ATS is crucial, your resume will eventually be read by humans. Strike a balance between ATS optimization and creating a document that's compelling to human recruiters.</p>
          <p>Update your resume regularly to reflect current industry keywords and standards, and always customize it for each application.</p>
        </div>
      </div>
    `,
    author: 'Vikram Mehta',
    authorRole: 'HR Technology Specialist',
    authorBio: 'Vikram Mehta specializes in HR technology and has helped over 500 candidates optimize their resumes for modern recruitment systems. He regularly conducts workshops on navigating the digital job application process.',
    date: 'July 22, 2025',
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
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">The Transformation of Government Recruitment Through AI</h2>
        
        <p class="mb-6">Artificial intelligence is revolutionizing government recruitment processes, introducing both opportunities and challenges for job seekers. Here's what you need to know about this transformation:</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Current AI Applications in Government Recruitment</h3>
        <p class="mb-4">Government agencies across India are increasingly adopting AI-powered tools to streamline their hiring processes:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Resume Screening:</strong> Advanced algorithms analyze thousands of applications to identify qualified candidates based on skills, experience, and education</li>
          <li><strong>Video Interviews:</strong> AI-powered platforms assess candidates' facial expressions, word choice, and speech patterns during recorded interviews</li>
          <li><strong>Skills Assessment:</strong> Automated tools evaluate technical and soft skills through adaptive testing</li>
          <li><strong>Chatbots:</strong> AI assistants guide candidates through the application process and answer common questions</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Benefits for Government Agencies</h3>
        <p class="mb-4">The implementation of AI in recruitment offers several advantages for government departments:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Processing large volumes of applications more efficiently</li>
          <li>Reducing unconscious bias in the initial screening stages</li>
          <li>Standardizing the evaluation process across different regions</li>
          <li>Identifying candidates who might be overlooked in traditional recruitment</li>
          <li>Reducing administrative burden on HR departments</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">How Candidates Can Adapt</h3>
        <p class="mb-4">To succeed in this new landscape, job seekers should:</p>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Optimize for AI screening:</strong> Use industry-standard keywords and clear formatting in resumes</li>
          <li><strong>Prepare for video assessments:</strong> Practice speaking clearly and maintaining appropriate eye contact</li>
          <li><strong>Develop digital communication skills:</strong> AI often evaluates written responses for clarity and relevance</li>
          <li><strong>Showcase adaptability:</strong> Demonstrate comfort with technology and willingness to learn new systems</li>
          <li><strong>Research each agency's process:</strong> Understand which AI tools they use and prepare accordingly</li>
        </ol>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Ethical Considerations</h3>
        <p class="mb-4">While AI offers efficiency, several ethical concerns remain:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Potential for algorithmic bias if systems are trained on non-diverse data</li>
          <li>Privacy concerns regarding data collected during automated assessments</li>
          <li>Lack of transparency in how AI makes screening decisions</li>
          <li>Accessibility challenges for candidates with disabilities</li>
        </ul>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Future Outlook</h2>
          <p class="mb-4">Government recruitment is likely to adopt a hybrid approach, using AI for initial screening while preserving human judgment for final decisions. Candidates who understand both technological and human elements of the process will have an advantage in this evolving landscape.</p>
          <p>As AI continues to develop, we can expect more sophisticated assessment methods and greater personalization in the recruitment process.</p>
        </div>
      </div>
    `,
    author: 'Dr. Rajesh Kumar',
    authorRole: 'Digital Governance Specialist',
    authorBio: 'Dr. Rajesh Kumar is a leading expert in digital transformation of government processes. He has advised multiple state governments on implementing AI solutions in recruitment and citizen services.',
    date: 'June 10, 2025',
    readTime: '7 min read',
    category: 'Technology',
    tags: ['Artificial Intelligence', 'Government Jobs', 'Recruitment', 'Technology'],
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 4,
    title: 'Navigating Internships at Government Research Labs',
    slug: 'internships-government-research-labs',
    excerpt: 'Government research laboratories offer unique internship opportunities. Discover how to find and secure these valuable experiences.',
    content: `
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">Securing Valuable Internships in Government Research Laboratories</h2>
        
        <p class="mb-6">Government research laboratories represent some of the most prestigious and rewarding internship opportunities available to students and early-career professionals. These institutions offer unique access to cutting-edge research, state-of-the-art facilities, and mentorship from leading scientists and engineers.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Understanding the Landscape</h3>
        <p class="mb-4">India's government research ecosystem includes several world-class institutions:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>ISRO (Indian Space Research Organisation):</strong> Space technology, satellite development, and aerospace engineering</li>
          <li><strong>DRDO (Defence Research and Development Organisation):</strong> Defense technology across various domains</li>
          <li><strong>CSIR Labs (Council of Scientific & Industrial Research):</strong> 38 laboratories covering fields from pharmaceuticals to metallurgy</li>
          <li><strong>DAE (Department of Atomic Energy):</strong> Nuclear science and technology research</li>
          <li><strong>ICMR (Indian Council of Medical Research):</strong> Biomedical and health research</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Benefits of Government Lab Internships</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Professional Benefits</h4>
            <ul class="list-disc pl-4 space-y-1 text-blue-700 dark:text-blue-300">
              <li>Work on projects with national significance</li>
              <li>Access to specialized equipment and resources</li>
              <li>Strong addition to your resume/CV</li>
              <li>Potential pathways to government careers</li>
              <li>Network with leading researchers</li>
            </ul>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Personal Benefits</h4>
            <ul class="list-disc pl-4 space-y-1 text-green-700 dark:text-green-300">
              <li>Develop specialized technical skills</li>
              <li>Gain insight into government research priorities</li>
              <li>Contribute to projects with societal impact</li>
              <li>Stipends often more competitive than private sector</li>
              <li>Exposure to multidisciplinary research</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Application Strategies</h3>
        <p class="mb-4">Securing internships at these prestigious institutions requires careful planning:</p>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Research Official Programs:</strong> 
            <p class="mt-1 mb-2">Most government labs have structured internship programs with specific application windows:</p>
            <ul class="list-disc pl-6 mb-2 ml-4">
              <li>ISRO's YUVIKA (Young Scientist Programme)</li>
              <li>CSIR's Summer Research Training Programme</li>
              <li>BARC (Bhabha Atomic Research Centre) Internship Programme</li>
            </ul>
          </li>
          <li>
            <strong>Academic Connections:</strong>
            <p class="mt-1 mb-2">Faculty members often have research collaborations with government labs. Approach professors who might help facilitate placements.</p>
          </li>
          <li>
            <strong>Targeted Applications:</strong>
            <p class="mt-1 mb-2">Research specific scientists and their work, then craft customized applications highlighting your relevant skills and interest in their research areas.</p>
          </li>
          <li>
            <strong>Technical Preparation:</strong>
            <p class="mt-1 mb-2">Government labs look for strong technical fundamentals. Prepare by:</p>
            <ul class="list-disc pl-6 mb-2 ml-4">
              <li>Building relevant project portfolios</li>
              <li>Publishing papers if possible</li>
              <li>Participating in relevant competitions</li>
            </ul>
          </li>
        </ol>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
          <p class="text-yellow-800 dark:text-yellow-200">Pro tip: Applications for summer internships typically open 6-8 months in advance. Mark application deadlines on your calendar and prepare materials well ahead of time.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Security Clearances and Documentation</h3>
        <p class="mb-6">Government research labs often require additional documentation and security clearances. Be prepared to provide:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Identity verification (multiple government IDs)</li>
          <li>Academic transcripts with verified copies</li>
          <li>Letters of recommendation from academic advisors</li>
          <li>Background verification forms</li>
          <li>Non-disclosure agreements</li>
        </ul>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Making the Most of Your Internship</h2>
          <p class="mb-4">Once you've secured an internship at a government research lab, focus on maximizing the experience:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Set clear learning objectives and discuss them with your mentor</li>
            <li>Take advantage of seminars, workshops, and lectures offered to interns</li>
            <li>Build relationships with both peers and senior researchers</li>
            <li>Document your work thoroughly for future reference and portfolio development</li>
            <li>Inquire about possibilities for extending your internship or future employment opportunities</li>
          </ul>
        </div>
      </div>
    `,
    author: 'Anika Patel',
    authorRole: 'ISRO Internship Coordinator',
    authorBio: 'Anika Patel has coordinated internship programs at ISRO for over 8 years, helping hundreds of students launch their careers in space science and technology. She regularly conducts workshops on research opportunities in government laboratories.',
    date: 'May 5, 2025',
    readTime: '9 min read',
    category: 'Internships',
    tags: ['Research', 'STEM Careers', 'Government Labs', 'Student Opportunities'],
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 5,
    title: 'Networking Strategies for Government Job Seekers',
    slug: 'networking-government-jobs',
    excerpt: 'Effective networking is crucial even in government job searches. Learn strategic approaches to build connections in the public sector.',
    content: `
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">Building Meaningful Connections in the Public Sector</h2>
        
        <p class="mb-6">Many job seekers mistakenly believe that government positions are secured purely through competitive exams and formal applications. While these are essential components, strategic networking plays a crucial role in navigating the complex landscape of public sector employment. This article explores effective networking approaches specifically tailored for government job aspirants.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Dispelling Myths About Government Networking</h3>
        <div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg mb-6">
          <h4 class="font-semibold text-red-800 dark:text-red-200 mb-3">Common Misconceptions</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Myth:</strong> "Networking isn't relevant for government jobs."<br>
            <strong>Reality:</strong> While merit is paramount, connections provide valuable insights into opportunities, application processes, and organizational cultures.</li>
            <li><strong>Myth:</strong> "Government networking is about favoritism."<br>
            <strong>Reality:</strong> Ethical networking in the public sector focuses on information sharing, mentorship, and professional development—not circumventing fair hiring processes.</li>
            <li><strong>Myth:</strong> "I should only network when actively job hunting."<br>
            <strong>Reality:</strong> Building relationships should be an ongoing process throughout your career development.</li>
          </ul>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Strategic Networking Venues</h3>
        <p class="mb-4">Government job seekers should focus their networking efforts on these high-value channels:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Professional Associations</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li>Indian Economic Service Association</li>
              <li>Indian Administrative Service (IAS) Officers Association</li>
              <li>Domain-specific professional bodies (e.g., Indian Medical Association)</li>
              <li>Employee welfare associations of specific departments</li>
            </ul>
            <p class="mt-3 text-sm italic">These organizations often host conferences, seminars, and workshops that provide opportunities to meet current government employees.</p>
          </div>
          
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Educational Connections</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li>Alumni networks from institutions like:
                <ul class="list-circle pl-6 mt-1">
                  <li>Indian Institutes of Management (IIMs)</li>
                  <li>Indian Institutes of Technology (IITs)</li>
                  <li>National Law Universities</li>
                  <li>Lal Bahadur Shastri National Academy of Administration</li>
                </ul>
              </li>
              <li>Training programs and certificate courses offered by government institutions</li>
            </ul>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Digital Platforms</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>LinkedIn Groups:</strong> Join groups focused on government service, public policy, and administration</li>
              <li><strong>Twitter:</strong> Follow government departments, officials, and policy thought leaders</li>
              <li><strong>Specialized Forums:</strong> Participate in discussions on platforms like Quora and Reddit's government-focused communities</li>
              <li><strong>Webinars:</strong> Attend online sessions hosted by government training institutes</li>
            </ul>
          </div>
          
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Civil Society Engagement</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li>Volunteer for government-NGO partnership initiatives</li>
              <li>Participate in public consultations and town halls</li>
              <li>Join citizen advisory committees</li>
              <li>Attend public lectures by senior government officials</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Approaching Current Government Professionals</h3>
        <p class="mb-4">When connecting with those already working in the public sector, follow these principles:</p>
        <ol class="list-decimal pl-6 mb-6 space-y-3">
          <li>
            <strong>Research Before Reaching Out</strong>
            <p class="mt-1">Familiarize yourself with their department, role, and recent projects or initiatives they've been involved with. Reference this knowledge in your communications.</p>
          </li>
          <li>
            <strong>Focus on Learning, Not Job Requests</strong>
            <p class="mt-1">Initial conversations should center on understanding their career path, challenges, and insights—not asking for job referrals.</p>
          </li>
          <li>
            <strong>Offer Value</strong>
            <p class="mt-1">Consider how your background, research, or perspectives might be helpful to them. Networking should be mutually beneficial.</p>
          </li>
          <li>
            <strong>Respect Hierarchical Protocols</strong>
            <p class="mt-1">Government organizations often have formal communication channels and protocols. Be mindful of these when connecting with senior officials.</p>
          </li>
        </ol>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg mb-8">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3">Sample Outreach Message</h4>
          <div class="bg-white dark:bg-gray-800 p-4 rounded border border-green-200 dark:border-green-900 mb-3">
            <p class="italic">Subject: Request for Insights on Urban Development Policy Implementation</p>
            <p class="mt-2 italic">
              Dear Mr. Sharma,<br><br>
              
              I hope this message finds you well. My name is Ananya Desai, a Master's graduate in Urban Planning from SPA Delhi. I recently read your insightful paper on smart city implementations in tier-2 cities and was particularly impressed by your analysis of citizen participation frameworks.<br><br>
              
              I'm currently preparing for the Urban Development Ministry's Technical Officer examination while working on research regarding participatory planning models. I would be immensely grateful for a 20-minute conversation to learn about your experience transitioning from academic urban planning to policy implementation in the ministry.<br><br>
              
              I understand you have a busy schedule, and I would be happy to work around your availability in the coming weeks.<br><br>
              
              Thank you for considering my request.<br><br>
              
              Sincerely,<br>
              Ananya Desai
            </p>
          </div>
          <p class="text-sm text-green-800 dark:text-green-200">Note how this message references specific work, asks for insights (not a job), and respects the recipient's time. It also establishes credibility and a genuine reason for connecting.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Maintaining and Leveraging Your Network</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Keep detailed records of your contacts, including when and where you met them, topics discussed, and follow-up points</li>
          <li>Share relevant articles, research, or opportunities with your connections</li>
          <li>Provide updates on your progress and how their advice has helped you</li>
          <li>Express gratitude for specific guidance or insights received</li>
          <li>Look for opportunities to support others in your network</li>
        </ul>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Thoughts</h2>
          <p class="mb-4">Effective networking in the government sector requires patience, authenticity, and a genuine interest in public service. While it may not directly secure a position, it will provide valuable insights, mentorship, and awareness of opportunities that might otherwise remain hidden.</p>
          <p>Remember that the connections you make today may become invaluable resources throughout your career in public service. Focus on building meaningful professional relationships rather than transactional interactions.</p>
        </div>
      </div>
    `,
    author: 'Sanjay Kapoor',
    authorRole: 'Career Counselor',
    authorBio: 'Sanjay Kapoor is a career strategist specializing in government and public sector employment. With over 15 years of experience in public administration before moving to career counseling, he brings insider knowledge to help aspiring government servants navigate their career paths.',
    date: 'April 18, 2025',
    readTime: '5 min read',
    category: 'Career Strategy',
    tags: ['Networking', 'Government Jobs', 'Career Development', 'Professional Relationships'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
  },
  {
    id: 6,
    title: 'Mastering Coding Tests for Technical Government Positions',
    slug: 'coding-tests-technical-government-positions',
    excerpt: 'Technical roles in government agencies often require coding assessments. Learn how to prepare and excel in these specialized tests.',
    content: `
      <div class="article-content">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">Preparing for Success in Government Technical Assessments</h2>
        
        <p class="mb-6">Government agencies are increasingly seeking skilled technical professionals to drive digital transformation initiatives. Whether you're applying to the National Informatics Centre (NIC), C-DAC, or IT departments of various ministries, you'll likely face coding assessments designed to evaluate your technical abilities. This guide will help you prepare for and excel in these specialized tests.</p>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Understanding Government Coding Assessments</h3>
        <p class="mb-4">Government technical assessments differ from private sector tests in several key ways:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Focus on practical problem-solving:</strong> Tests often emphasize solutions to real-world governance challenges</li>
          <li><strong>Security and efficiency:</strong> Code that prioritizes data security and optimizes resource usage</li>
          <li><strong>Diverse technology stacks:</strong> Questions may span multiple programming languages and frameworks</li>
          <li><strong>Documentation standards:</strong> Clear code documentation following government guidelines</li>
          <li><strong>Compliance knowledge:</strong> Familiarity with relevant regulations and standards</li>
        </ul>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
          <p class="text-yellow-800 dark:text-yellow-200">The complexity of government coding tests varies by role and level. Entry-level positions typically focus on fundamental programming skills, while senior roles may include system design and architecture components.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Common Assessment Formats</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Online Coding Platforms</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li>Timed algorithmic challenges</li>
              <li>Multiple-choice technical questions</li>
              <li>Bug-fixing exercises</li>
              <li>Database query optimization</li>
            </ul>
            <p class="mt-3 text-sm italic">Platforms like HackerRank, Codility, or custom government assessment systems are commonly used.</p>
          </div>
          
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">In-Person Technical Assessments</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li>Whiteboard problem-solving</li>
              <li>Code review exercises</li>
              <li>Pair programming sessions</li>
              <li>Technical presentations</li>
              <li>System design discussions</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Key Topics to Master</h3>
        <p class="mb-4">Focus your preparation on these critical areas:</p>
        
        <div class="mb-8">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-3">1. Data Structures & Algorithms</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Arrays and Strings:</strong> Manipulation, searching, and sorting algorithms</li>
            <li><strong>Linked Lists:</strong> Implementation and operations</li>
            <li><strong>Trees and Graphs:</strong> Traversal, search, and path-finding algorithms</li>
            <li><strong>Hash Tables:</strong> Implementation and collision handling</li>
            <li><strong>Dynamic Programming:</strong> Optimization problems and memoization</li>
          </ul>
        </div>
        
        <div class="mb-8">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-3">2. Database Knowledge</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>SQL Queries:</strong> Complex joins, aggregations, and subqueries</li>
            <li><strong>Database Design:</strong> Normalization and entity-relationship modeling</li>
            <li><strong>Query Optimization:</strong> Indexing and performance tuning</li>
            <li><strong>NoSQL Concepts:</strong> Document stores and key-value databases</li>
          </ul>
        </div>
        
        <div class="mb-8">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-3">3. Web Development & APIs</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>RESTful Services:</strong> Design and implementation</li>
            <li><strong>Authentication:</strong> OAuth, JWT, and secure token handling</li>
            <li><strong>Frontend Frameworks:</strong> Basic knowledge of React, Angular, or Vue</li>
            <li><strong>Backend Technologies:</strong> Node.js, Java, Python frameworks</li>
          </ul>
        </div>
        
        <div class="mb-8">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-3">4. Security & Compliance</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>OWASP Top 10:</strong> Common web vulnerabilities and mitigations</li>
            <li><strong>Input Validation:</strong> Preventing injection attacks</li>
            <li><strong>Data Protection:</strong> Encryption and secure storage</li>
            <li><strong>Government Standards:</strong> Familiarity with relevant guidelines</li>
          </ul>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Effective Preparation Strategies</h3>
        <ol class="list-decimal pl-6 mb-6 space-y-3">
          <li>
            <strong>Create a Structured Study Plan</strong>
            <p class="mt-1">Develop a systematic approach to cover all key topics. Allocate more time to your weaker areas while maintaining proficiency in your strengths.</p>
          </li>
          <li>
            <strong>Practice with Government-Specific Resources</strong>
            <p class="mt-1">Look for sample questions from previous government technical assessments. Many departments publish practice materials or example questions.</p>
          </li>
          <li>
            <strong>Implement Regular Coding Practice</strong>
            <p class="mt-1">Solve problems on platforms like LeetCode, HackerRank, or CodeSignal. Focus on medium to hard difficulty problems that test algorithm efficiency.</p>
          </li>
          <li>
            <strong>Simulate Test Conditions</strong>
            <p class="mt-1">Practice under timed conditions to build comfort with the pressure of actual assessments. Use an online IDE similar to what might be used in the test.</p>
          </li>
          <li>
            <strong>Join Study Groups</strong>
            <p class="mt-1">Connect with others preparing for similar examinations. Government job forums and social media groups often share valuable insights.</p>
          </li>
        </ol>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg mb-8">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">Sample Practice Problem</h4>
          <p class="mb-2 text-blue-800 dark:text-blue-200"><strong>Scenario:</strong> A government portal needs to identify duplicate citizen records based on multiple fields.</p>
          <p class="mb-2 text-blue-800 dark:text-blue-200"><strong>Problem:</strong> Write an algorithm that can efficiently find potential duplicate records in a large dataset where exact matches on all fields are not required (fuzzy matching).</p>
          <div class="bg-white dark:bg-gray-800 p-4 rounded border border-blue-200 dark:border-blue-900 mb-3 overflow-x-auto">
            <pre><code class="language-python">
def find_potential_duplicates(records, threshold=0.8):
    """
    Find potential duplicate records using fuzzy matching.
    
    Args:
        records: List of dictionaries containing citizen data
        threshold: Similarity threshold (0-1) to consider as potential match
        
    Returns:
        List of tuples containing indices of potential duplicate pairs
    """
    potential_duplicates = []
    for i in range(len(records)):
        for j in range(i+1, len(records)):
            similarity = calculate_similarity(records[i], records[j])
            if similarity >= threshold:
                potential_duplicates.append((i, j, similarity))
                
    return sorted(potential_duplicates, key=lambda x: x[2], reverse=True)
            </code></pre>
          </div>
          <p class="text-sm text-blue-800 dark:text-blue-200">This is just a skeleton solution. A complete implementation would include a sophisticated similarity calculation function that considers various fields with appropriate weighting.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Day of the Assessment Tips</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Read instructions carefully:</strong> Government assessments often have specific formatting and submission requirements</li>
          <li><strong>Manage your time:</strong> Allocate time to each question based on its complexity and point value</li>
          <li><strong>Start with test cases:</strong> Define expected inputs and outputs before coding</li>
          <li><strong>Focus on code quality:</strong> Write clean, well-documented code with proper error handling</li>
          <li><strong>Prioritize correctness:</strong> A working solution is better than an incomplete optimization</li>
          <li><strong>Test thoroughly:</strong> Check edge cases and validate your solutions</li>
        </ul>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-10">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Beyond the Test: Technical Interviews</h2>
          <p class="mb-4">If you succeed in the coding assessment, you'll likely proceed to a technical interview. Be prepared to:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Explain your thought process and solution approach</li>
            <li>Discuss alternative implementations and their trade-offs</li>
            <li>Connect your technical skills to government-specific challenges</li>
            <li>Demonstrate your understanding of scalability and security concerns</li>
            <li>Show enthusiasm for public sector technology challenges</li>
          </ul>
          <p class="mt-4">Remember that government technical roles often seek candidates who combine strong technical skills with an understanding of public service values. Be ready to articulate how your expertise can contribute to citizen-focused solutions.</p>
        </div>
      </div>
    `,
    author: 'Arjun Reddy',
    authorRole: 'Software Engineer at NIC',
    authorBio: 'Arjun Reddy is a senior software engineer at the National Informatics Centre with extensive experience in developing government digital infrastructure. He has been involved in the technical recruitment process and has helped design coding assessments for various technical positions.',
    date: 'March 7, 2025',
    readTime: '10 min read',
    category: 'Technical Skills',
    tags: ['Coding', 'Technical Interviews', 'Government Jobs', 'Career Preparation'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
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
  const [email, setEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Find post based on slug
    const currentPost = blogPosts.find(post => post.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);
      setRelatedPosts(getRelatedPosts(currentPost));
      setLoading(false);
    } else {
      router.push('/blog');
    }
  }, [slug, router]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real app, this would call an API to handle the subscription
      setSubscriptionSuccess(true);
      setEmail('');
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setSubscriptionSuccess(false);
      }, 5000);
    }
  };

  if (loading || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading article<span className="loading-dots"></span></p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | HirEdge</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <BackToHomeButton />
        
        {/* Success notification */}
        <Notification 
          type="success"
          message="You've successfully subscribed to our newsletter!"
          show={subscriptionSuccess}
          onClose={() => setSubscriptionSuccess(false)}
        />
        
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              width={1770}
              height={1180}
              className="opacity-25 object-cover"
              style={{ width: '100%', height: '100%' }}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="prose prose-lg dark:prose-invert prose-indigo mx-auto animate-fade-in">
            <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-900 dark:text-gray-100" />
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map((tag, index) => (
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
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-0 sm:mr-4">Share this article:</span>
            <div className="flex space-x-4">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors duration-300">
                <FaLinkedin className="h-5 w-5" />
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
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{post.authorBio || `${post.author} is an expert in ${post.category} with years of experience in the field.`}</p>
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
                          width={1770}
                          height={1180}
                          className="transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
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

          {/* Newsletter Subscription */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 py-12 mt-10 rounded-xl">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to Our Newsletter</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get the latest career tips and job opportunities delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="mt-6 sm:flex sm:max-w-md sm:mx-auto">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </>
  );
} 