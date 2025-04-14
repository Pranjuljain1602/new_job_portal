import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaFileDownload, FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from 'react-icons/fa/index.js';
import BackToHomeButton from '../components/BackToHomeButton';
import Notification from '../components/Notification';

// Define real resources with absolute URLs
const resources = [
  {
    id: 1,
    title: "Resume Template for Tech Professionals",
    description: "A professionally designed resume template optimized for tech industry job applications with ATS-friendly formatting.",
    type: "Template",
    format: "PDF",
    fileSize: "245 KB",
    icon: <FaFilePdf className="h-10 w-10 text-red-500" />,
    downloadUrl: "resume-template-tech.pdf",
    popular: true
  },
  {
    id: 2,
    title: "Job Interview Question Bank",
    description: "250+ common interview questions with suggested approaches and example answers to help you prepare.",
    type: "Guide",
    format: "PDF",
    fileSize: "420 KB",
    icon: <FaFilePdf className="h-10 w-10 text-red-500" />,
    downloadUrl: "interview-question-bank.pdf",
    popular: false
  },
  {
    id: 3,
    title: "Job Application Tracker",
    description: "An Excel spreadsheet to track your job applications, follow-ups, and interview stages.",
    type: "Tool",
    format: "XLSX",
    fileSize: "138 KB",
    icon: <FaFileExcel className="h-10 w-10 text-green-600" />,
    downloadUrl: "job-application-tracker.xlsx",
    popular: true
  },
  {
    id: 4,
    title: "Networking Email Templates",
    description: "Customizable templates for cold outreach, follow-ups, and thank you emails for professional networking.",
    type: "Templates",
    format: "DOCX",
    fileSize: "78 KB",
    icon: <FaFileWord className="h-10 w-10 text-blue-600" />,
    downloadUrl: "networking-email-templates.docx",
    popular: false
  },
  {
    id: 5,
    title: "Salary Negotiation Script",
    description: "Step-by-step script with phrases and techniques to effectively negotiate your salary offer.",
    type: "Guide",
    format: "PDF",
    fileSize: "156 KB",
    icon: <FaFilePdf className="h-10 w-10 text-red-500" />,
    downloadUrl: "salary-negotiation-script.pdf",
    popular: true
  },
  {
    id: 6,
    title: "Technical Interview Prep Checklist",
    description: "A comprehensive checklist for preparing for technical interviews, including coding challenges and system design questions.",
    type: "Checklist",
    format: "PDF",
    fileSize: "185 KB",
    icon: <FaFilePdf className="h-10 w-10 text-red-500" />,
    downloadUrl: "technical-interview-checklist.pdf",
    popular: false
  }
];

export default function Resources() {
  const [filter, setFilter] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadedResource, setDownloadedResource] = useState('');
  const [downloading, setDownloading] = useState(false);

  // Filter resources based on selected type
  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(resource => resource.type === filter);
  
  // Get unique resource types
  const resourceTypes = ['All', ...new Set(resources.map(resource => resource.type))];
  
  const handleDownload = async (resourceTitle, downloadUrl, format) => {
    try {
      setDownloading(true);
      
      let fileContent = '';
      let mimeType = '';
      let fileName = downloadUrl;
      
      // Generate content based on resource type
      if (format === 'PDF') {
        // For PDF files
        if (resourceTitle === "Resume Template for Tech Professionals") {
          fileContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 1800>>
stream
BT
/F1 18 Tf
220 750 Td
(JANE SMITH) Tj
/F1 12 Tf
-60 -20 Td
(Software Developer | jane.smith@email.com | (555) 123-4567 | linkedin.com/in/janesmith | github.com/janesmith) Tj

/F1 14 Tf
-100 -30 Td
(PROFESSIONAL SUMMARY) Tj
/F1 11 Tf
0 -20 Td
(Results-driven Software Developer with 3+ years of experience building responsive web applications) Tj
0 -15 Td
(using React, Node.js, and modern JavaScript. Passionate about clean code, performance optimization,) Tj
0 -15 Td
(and creating intuitive user experiences. Proven track record of delivering projects on time and) Tj
0 -15 Td
(collaborating effectively with cross-functional teams.) Tj

/F1 14 Tf
0 -25 Td
(TECHNICAL SKILLS) Tj
/F1 11 Tf
0 -20 Td
(- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python, SQL) Tj
0 -15 Td
(- Frontend: React.js, Redux, Next.js, Tailwind CSS, Material UI, Responsive Design) Tj
0 -15 Td
(- Backend: Node.js, Express, RESTful APIs, GraphQL, MongoDB, PostgreSQL) Tj
0 -15 Td
(- Tools: Git, GitHub, VS Code, Jira, Webpack, Jest, React Testing Library) Tj
0 -15 Td
(- Other: CI/CD, Docker, AWS (S3, EC2, Lambda), Agile/Scrum methodology) Tj

/F1 14 Tf
0 -25 Td
(WORK EXPERIENCE) Tj
/F1 12 Tf
0 -20 Td
(Frontend Developer | TechSolutions Inc. | June 2022 - Present) Tj
/F1 11 Tf
0 -20 Td
(- Developed and maintained multiple React-based web applications, improving user engagement by 25%) Tj
0 -15 Td
(- Implemented responsive designs and optimized performance, reducing load times by 40%) Tj
0 -15 Td
(- Collaborated with UX designers to create intuitive interfaces for complex data visualization) Tj
0 -15 Td
(- Participated in code reviews and mentored junior developers, improving team code quality) Tj

/F1 12 Tf
0 -20 Td
(Junior Web Developer | Digital Innovations LLC | March 2020 - May 2022) Tj
/F1 11 Tf
0 -20 Td
(- Built and maintained client websites using JavaScript, HTML, and CSS) Tj
0 -15 Td
(- Assisted in developing a company-wide component library, improving development efficiency) Tj
0 -15 Td
(- Implemented bug fixes and performance improvements for existing web applications) Tj
0 -15 Td
(- Collaborated with the QA team to identify and resolve issues before deployment) Tj

/F1 14 Tf
0 -25 Td
(EDUCATION) Tj
/F1 12 Tf
0 -20 Td
(Bachelor of Science in Computer Science | State University | 2020) Tj
/F1 11 Tf
0 -20 Td
(- GPA: 3.8/4.0 | Dean's List: 2018, 2019, 2020) Tj
0 -15 Td
(- Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
2168
%%EOF`;
        } else if (resourceTitle === "Job Interview Question Bank") {
          fileContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 2500>>
stream
BT
/F1 18 Tf
150 750 Td
(JOB INTERVIEW QUESTION BANK) Tj
/F1 12 Tf
50 -20 Td
(HirEdge Career Resources - 2025) Tj

/F1 16 Tf
-150 -40 Td
(COMMON BEHAVIORAL QUESTIONS) Tj

/F1 14 Tf
10 -25 Td
(1. Tell me about yourself.) Tj
/F1 11 Tf
10 -20 Td
(Strategy: Start with your current role, include relevant experience, and end with why you're) Tj
0 -15 Td
(interested in this position.) Tj
0 -15 Td
(Example: "I'm a software developer with 3 years of experience building web applications using React) Tj
0 -15 Td
(and Node.js. I started my career at TechSolutions where I worked on their customer portal, then) Tj
0 -15 Td
(moved to my current role where I lead front-end development. I'm particularly interested in this) Tj
0 -15 Td
(position because I'm passionate about applying my skills to create products that improve healthcare.") Tj

/F1 14 Tf
-10 -25 Td
(2. Describe a challenging project you worked on.) Tj
/F1 11 Tf
10 -20 Td
(Strategy: Use the STAR method (Situation, Task, Action, Result). Focus on your contributions and) Tj
0 -15 Td
(what you learned.) Tj
0 -15 Td
(Example: "At my previous company, we had to migrate a legacy system with 10,000+ users to a new) Tj
0 -15 Td
(platform with minimal disruption. I was tasked with leading the data migration process. I created) Tj
0 -15 Td
(a comprehensive testing strategy and built automation tools that reduced migration errors by 90%.") Tj

/F1 14 Tf
-10 -25 Td
(3. How do you handle tight deadlines or pressure?) Tj
/F1 11 Tf
10 -20 Td
(Strategy: Demonstrate your organizational skills, prioritization abilities, and stress management.) Tj
0 -15 Td
(Example: "I start by breaking down the project into manageable tasks and prioritizing them based on) Tj
0 -15 Td
(dependencies and impact. For a recent product launch, I created a detailed timeline with buffer for) Tj
0 -15 Td
(unexpected issues. When a critical bug emerged right before launch, I was able to quickly assemble) Tj
0 -15 Td
(the right team members to address it while keeping other preparations on track.") Tj

/F1 16 Tf
-10 -30 Td
(TECHNICAL QUESTIONS FOR SOFTWARE ROLES) Tj

/F1 14 Tf
10 -25 Td
(1. What is the difference between let, const, and var in JavaScript?) Tj
/F1 11 Tf
10 -20 Td
(Answer: var is function-scoped and can be redeclared and updated. let is block-scoped, can be) Tj
0 -15 Td
(updated but not redeclared. const is block-scoped and cannot be updated or redeclared after) Tj
0 -15 Td
(initialization (though properties of objects declared with const can be changed).) Tj

/F1 14 Tf
-10 -25 Td
(2. Explain the concept of RESTful APIs.) Tj
/F1 11 Tf
10 -20 Td
(Answer: REST (Representational State Transfer) is an architectural style for designing networked) Tj
0 -15 Td
(applications. RESTful APIs use HTTP requests to GET, PUT, POST, and DELETE data. They are) Tj
0 -15 Td
(stateless, meaning each request contains all the information needed to complete it, and they) Tj
0 -15 Td
(separate concerns between client and server, making them scalable and maintainable.) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
2868
%%EOF`;
        } else if (resourceTitle === "Salary Negotiation Script") {
          fileContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 3500>>
stream
BT
/F1 18 Tf
170 750 Td
(SALARY NEGOTIATION SCRIPT) Tj
/F1 12 Tf
30 -20 Td
(HirEdge Career Resources - 2025 | Professional Guide to Maximizing Your Compensation) Tj

/F1 16 Tf
-150 -30 Td
(INTRODUCTION) Tj
/F1 11 Tf
0 -20 Td
(Negotiating your salary can feel intimidating, but it's a critical professional skill that can significantly) Tj
0 -15 Td
(impact your earnings throughout your career. This guide provides practical scripts and techniques to help) Tj
0 -15 Td
(you navigate salary discussions with confidence and professionalism.) Tj
0 -15 Td
(Remember that successful negotiation begins with thorough preparation, clear communication, and a) Tj
0 -15 Td
(collaborative approach. The goal is to reach an agreement that reflects your value while maintaining) Tj
0 -15 Td
(a positive relationship with your future employer.) Tj

/F1 16 Tf
0 -25 Td
(PREPARATION CHECKLIST) Tj
/F1 11 Tf
10 -20 Td
([ ] Research salary ranges for similar positions in your industry, location, and company size) Tj
0 -15 Td
([ ] Know your minimum acceptable salary (your "walk away" number)) Tj
0 -15 Td
([ ] Identify your target salary (what you reasonably hope to achieve)) Tj
0 -15 Td
([ ] List your unique qualifications, achievements, and value propositions) Tj
0 -15 Td
([ ] Prepare to discuss the full compensation package (benefits, bonuses, equity, etc.)) Tj
0 -15 Td
([ ] Practice your responses to potential objections) Tj
0 -15 Td
([ ] Consider your non-salary priorities (remote work, flexible hours, professional development)) Tj

/F1 16 Tf
-10 -25 Td
(INITIAL RESPONSE SCRIPTS) Tj

/F1 14 Tf
0 -20 Td
(When Asked About Salary Expectations Before an Offer:) Tj
/F1 11 Tf
10 -20 Td
("I'd like to learn more about the responsibilities and expectations for this role before discussing) Tj
0 -15 Td
(compensation. That way, we can both ensure we're on the same page about the value I would bring) Tj
0 -15 Td
(to [Company Name]. Could you share more about what this position entails?") Tj

/F1 14 Tf
-10 -25 Td
(If Pressed for a Number Early:) Tj
/F1 11 Tf
10 -20 Td
("Based on my research and experience, roles like this typically range from [lower end] to [higher end].) Tj
0 -15 Td
(However, I'm considering the entire compensation package, including benefits and growth opportunities.) Tj
0 -15 Td
(I'm confident we can arrive at a package that reflects my value to your team if we're the right match.") Tj

/F1 14 Tf
-10 -25 Td
(When Receiving an Initial Offer:) Tj
/F1 11 Tf
10 -20 Td
("Thank you for the offer. I'm excited about the opportunity to join [Company Name] and contribute to) Tj
0 -15 Td
([specific company initiative or goal]. I appreciate you sharing this information. Would it be alright if) Tj
0 -15 Td
(I take [1-2 days] to review the complete package? I'd like to give it the thoughtful consideration) Tj
0 -15 Td
(it deserves.") Tj

/F1 16 Tf
-10 -30 Td
(NEGOTIATION CONVERSATION) Tj

/F1 14 Tf
0 -20 Td
(Making Your Counter-Offer:) Tj
/F1 11 Tf
10 -20 Td
("Based on my [X years of experience], specialized skills in [relevant skills], and the market rate for) Tj
0 -15 Td
(similar roles, I was hoping for a base salary closer to [specific amount]. My research indicates that) Tj
0 -15 Td
(this is in line with the industry standard for someone with my qualifications and the impact I expect) Tj
0 -15 Td
(to make in this position.") Tj

/F1 14 Tf
-10 -25 Td
(Negotiating Beyond Base Salary:) Tj
/F1 11 Tf
10 -20 Td
("I understand there may be constraints on the base salary. I'm wondering if we could explore other) Tj
0 -15 Td
(elements of the compensation package to reach a mutually beneficial agreement. For example, would it) Tj
0 -15 Td
(be possible to discuss [sign-on bonus/performance bonus/additional equity/professional development) Tj
0 -15 Td
(budget/flexible work arrangements]?") Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
3868
%%EOF`;
        } else if (resourceTitle === "Technical Interview Prep Checklist") {
          fileContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 3800>>
stream
BT
/F1 18 Tf
120 750 Td
(TECHNICAL INTERVIEW PREPARATION CHECKLIST) Tj
/F1 12 Tf
80 -20 Td
(HirEdge Career Resources - 2025) Tj

/F1 16 Tf
-150 -30 Td
(PRE-INTERVIEW PREPARATION) Tj

/F1 14 Tf
0 -20 Td
(Company Research:) Tj
/F1 11 Tf
10 -20 Td
([ ] Research company's products, services, and business model) Tj
0 -15 Td
([ ] Understand company values, mission, and culture) Tj
0 -15 Td
([ ] Read recent company news and press releases) Tj
0 -15 Td
([ ] Review the company's tech stack and engineering blog (if available)) Tj
0 -15 Td
([ ] Research the interviewers on LinkedIn (if names provided)) Tj
0 -15 Td
([ ] Prepare specific questions about the company's engineering challenges) Tj

/F1 14 Tf
-10 -25 Td
(Role Research:) Tj
/F1 11 Tf
10 -20 Td
([ ] Analyze job description thoroughly and identify key required skills) Tj
0 -15 Td
([ ] Research typical career path for this position) Tj
0 -15 Td
([ ] Understand how this role contributes to the company's objectives) Tj
0 -15 Td
([ ] Prepare examples of how your experience matches key requirements) Tj
0 -15 Td
([ ] Research typical salary range for the position and location) Tj

/F1 16 Tf
-10 -30 Td
(TECHNICAL KNOWLEDGE PREPARATION) Tj

/F1 14 Tf
0 -20 Td
(Data Structures & Algorithms:) Tj
/F1 11 Tf
10 -20 Td
([ ] Arrays and Strings: manipulation techniques, common patterns) Tj
0 -15 Td
([ ] Linked Lists: singly/doubly linked, insertion, deletion, reversal) Tj
0 -15 Td
([ ] Stacks and Queues: implementation and applications) Tj
0 -15 Td
([ ] Trees: binary trees, BSTs, traversals (in-order, pre-order, post-order)) Tj
0 -15 Td
([ ] Graphs: representation, traversal, shortest path algorithms) Tj
0 -15 Td
([ ] Hash Tables: implementation, collision handling, applications) Tj
0 -15 Td
([ ] Sorting algorithms: Quick Sort, Merge Sort, Bubble Sort, Insertion Sort) Tj
0 -15 Td
([ ] Searching algorithms: Binary Search, Depth-First Search, Breadth-First Search) Tj
0 -15 Td
([ ] Big O notation and time/space complexity analysis) Tj
0 -15 Td
([ ] Recursion and dynamic programming techniques) Tj

/F1 14 Tf
-10 -25 Td
(Language-Specific Preparation:) Tj
/F1 11 Tf
10 -20 Td
([ ] Review programming languages mentioned in job description) Tj
0 -15 Td
([ ] Practice coding in the primary language used by the company) Tj
0 -15 Td
([ ] Review frameworks and libraries relevant to the position) Tj
0 -15 Td
([ ] Refresh knowledge of databases and SQL (if applicable)) Tj
0 -15 Td
([ ] Review system design principles (for senior positions)) Tj

/F1 16 Tf
-10 -30 Td
(INTERVIEW TYPES & SPECIFIC PREPARATION) Tj

/F1 14 Tf
0 -20 Td
(Coding/Algorithm Interviews:) Tj
/F1 11 Tf
10 -20 Td
([ ] Review common algorithm patterns (two pointers, sliding window, etc.)) Tj
0 -15 Td
([ ] Practice coding without IDE assistance) Tj
0 -15 Td
([ ] Prepare to explain time and space complexity of your solutions) Tj
0 -15 Td
([ ] Practice optimizing initial solutions) Tj
0 -15 Td
([ ] Understand how to test and debug your code effectively) Tj

/F1 14 Tf
-10 -25 Td
(System Design Interviews (for Mid to Senior Roles):) Tj
/F1 11 Tf
10 -20 Td
([ ] Review scalability concepts (horizontal vs. vertical scaling)) Tj
0 -15 Td
([ ] Understand load balancing, caching, database sharding) Tj
0 -15 Td
([ ] Practice designing distributed systems) Tj
0 -15 Td
([ ] Review microservices vs. monolithic architecture) Tj
0 -15 Td
([ ] Understand CAP theorem and consistency models) Tj
0 -15 Td
([ ] Practice estimating system requirements (throughput, storage, etc.)) Tj

/F1 14 Tf
-10 -25 Td
(Behavioral Interviews:) Tj
/F1 11 Tf
10 -20 Td
([ ] Prepare a concise "tell me about yourself" response (2-3 minutes)) Tj
0 -15 Td
([ ] Identify 3-5 key achievements relevant to the position) Tj
0 -15 Td
([ ] Prepare stories using the STAR method (Situation, Task, Action, Result)) Tj
0 -15 Td
([ ] Practice explaining technical concepts to non-technical audiences) Tj
0 -15 Td
([ ] Prepare examples of how you've handled challenges or failures) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
4168
%%EOF`;
        } else {
          // Default PDF content for other resources
          fileContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 550>>
stream
BT
/F1 20 Tf
72 720 Td
(${resourceTitle}) Tj
/F1 14 Tf
0 -30 Td
(HirEdge Career Resources - 2025) Tj
/F1 12 Tf
0 -50 Td
(This document contains comprehensive information about ${resourceTitle.toLowerCase()}) Tj
0 -20 Td
(to help you succeed in your career journey.) Tj
0 -40 Td
(Key sections in this document:) Tj
0 -20 Td
(1. Introduction and Purpose) Tj
0 -20 Td
(2. Best Practices and Guidelines) Tj
0 -20 Td
(3. Step-by-Step Instructions) Tj
0 -20 Td
(4. Examples and Templates) Tj
0 -20 Td
(5. Additional Resources) Tj
0 -40 Td
(For more detailed career resources, visit the HirEdge website.) Tj
0 -20 Td
(© 2025 HirEdge. All rights reserved.) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
918
%%EOF`;
        }
        mimeType = 'application/pdf';
      } else if (format === 'DOCX') {
        // For Word documents - create an HTML file that can be opened in Word 
        // Most word processors can open HTML files correctly
        fileContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resourceTitle}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { text-align: center; color: #333366; }
        h2 { color: #333366; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px; }
        h3 { color: #333366; margin-top: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .separator { border-top: 1px solid #eee; margin: 30px 0; }
        .template { margin-bottom: 40px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>NETWORKING EMAIL TEMPLATES</h1>
        <p>HirEdge Career Resources - 2025</p>
    </div>
    
    <h2>COLD OUTREACH TEMPLATES</h2>
    
    <div class="template">
        <h3>TEMPLATE 1: CONNECTING WITH INDUSTRY PROFESSIONAL</h3>
        <p><strong>Subject:</strong> Quick question about your experience at [Company]</p>
        <p>Dear [Name],</p>
        <p>I hope this message finds you well. My name is [Your Name], and I'm a [Your Position/Background] with a keen interest in [Industry/Field]. I came across your profile while researching [Company/Topic] and was particularly impressed by your work on [Specific Project/Achievement].</p>
        <p>I'm reaching out because I'm interested in learning more about [Specific Aspect of Their Work/Company]. I would greatly appreciate the opportunity to connect for a brief 15-20 minute conversation at your convenience to gain insights about [Specific Question or Topic].</p>
        <p>I understand you're busy, and I value your time. If a conversation isn't possible, perhaps you could point me toward resources you've found helpful in your own career journey.</p>
        <p>Thank you for considering my request. I look forward to possibly connecting.</p>
        <p>Best regards,<br>
        [Your Name]<br>
        [Your LinkedIn Profile]<br>
        [Your Phone Number]</p>
    </div>
    
    <div class="template">
        <h3>TEMPLATE 2: MUTUAL CONNECTION INTRODUCTION</h3>
        <p><strong>Subject:</strong> Introduction via [Mutual Connection's Name]</p>
        <p>Dear [Name],</p>
        <p>I hope this message finds you well. [Mutual Connection's Name] suggested I reach out to you regarding [specific reason – job opportunity, industry advice, etc.]. We [explain how you know the mutual connection] and they thought your expertise in [specific field/topic] would be valuable as I [explain your current situation/goal].</p>
        <p>A bit about myself: I'm a [brief professional description] with experience in [relevant experience]. Currently, I'm [current professional status and objective].</p>
        <p>I would appreciate the opportunity to connect for a brief conversation to learn more about [specific topic or question]. I'm flexible and can work around your schedule.</p>
        <p>Thank you for your time and consideration. I look forward to potentially speaking with you.</p>
        <p>Best regards,<br>
        [Your Name]<br>
        [Your LinkedIn Profile/Website]<br>
        [Your Phone Number]</p>
    </div>
    
    <div class="template">
        <h3>TEMPLATE 3: EVENT FOLLOW-UP</h3>
        <p><strong>Subject:</strong> Great meeting you at [Event Name]</p>
        <p>Dear [Name],</p>
        <p>It was a pleasure meeting you at [Event Name] on [Date]. I particularly enjoyed our conversation about [specific topic discussed] and appreciated your insights on [particular point they made].</p>
        <p>As I mentioned during our conversation, I'm currently [brief explanation of your current situation/goals]. Your experience in [their area of expertise] is quite relevant to my interest in [specific interest/goal], and I would value the opportunity to continue our discussion.</p>
        <p>Would you be available for a brief call or coffee in the coming weeks? I'd love to learn more about [specific aspect of their work/experience] and share some ideas about [relevant topic].</p>
        <p>Thank you for your time, and I look forward to staying connected.</p>
        <p>Best regards,<br>
        [Your Name]<br>
        [Your LinkedIn Profile]<br>
        [Your Phone Number]</p>
    </div>
    
    <div class="separator"></div>
    
    <h2>FOLLOW-UP TEMPLATES</h2>
    
    <div class="template">
        <h3>TEMPLATE 4: POST-INFORMATIONAL INTERVIEW FOLLOW-UP</h3>
        <p><strong>Subject:</strong> Thank you for your time and insights</p>
        <p>Dear [Name],</p>
        <p>I wanted to express my sincere gratitude for taking the time to speak with me [yesterday/on date] about your experience at [Company] and insights into [Industry/Role].</p>
        <p>Your advice regarding [specific advice they gave] was particularly valuable, and I plan to follow through on your suggestion to [action item based on their advice]. I also appreciated your perspective on [specific topic discussed] as it has given me a clearer understanding of [relevant insight].</p>
        <p>As you suggested, I've connected with [person they recommended] and will be exploring the resources you mentioned. I'm excited to apply what I've learned as I [next step in your professional journey].</p>
        <p>I'll be sure to update you on my progress, and I hope we can stay in touch. Thank you again for your generosity in sharing your time and expertise.</p>
        <p>Warmest regards,<br>
        [Your Name]<br>
        [Your LinkedIn Profile]<br>
        [Your Phone Number]</p>
    </div>
    
    <div class="template">
        <h3>TEMPLATE 5: JOB APPLICATION FOLLOW-UP</h3>
        <p><strong>Subject:</strong> Following up on [Position] application</p>
        <p>Dear [Hiring Manager's Name],</p>
        <p>I recently submitted my application for the [Position Title] role at [Company Name] on [date of application], and I wanted to express my continued interest in the position and the company.</p>
        <p>After learning more about [specific company initiative or value], I'm particularly excited about the possibility of contributing to your team. My experience in [relevant experience that matches job requirements] aligns well with what you're seeking, and I'm confident I could make valuable contributions to [specific department or project].</p>
        <p>I've attached my resume again for your convenience and would welcome the opportunity to discuss how my background and skills would be an asset to [Company Name]. I'm available for an interview at your convenience.</p>
        <p>Thank you for your time and consideration. I look forward to hearing from you.</p>
        <p>Best regards,<br>
        [Your Name]<br>
        [Your Email]<br>
        [Your Phone Number]<br>
        [Your LinkedIn Profile]</p>
    </div>
    
    <div class="separator"></div>
    
    <h2>TIPS FOR EFFECTIVE NETWORKING EMAILS</h2>
    
    <ol>
        <li><strong>PERSONALIZE EACH MESSAGE</strong>
            <ul>
                <li>Research the recipient before reaching out</li>
                <li>Reference specific aspects of their work or background</li>
                <li>Explain why you're contacting them specifically</li>
            </ul>
        </li>
        <li><strong>BE CLEAR AND CONCISE</strong>
            <ul>
                <li>State your purpose early in the email</li>
                <li>Respect their time with brevity</li>
                <li>Use short paragraphs for readability</li>
            </ul>
        </li>
        <li><strong>PROVIDE VALUE</strong>
            <ul>
                <li>Offer something helpful when possible</li>
                <li>Share relevant content or opportunities</li>
                <li>Express genuine appreciation for their work</li>
            </ul>
        </li>
        <li><strong>FOLLOW UP APPROPRIATELY</strong>
            <ul>
                <li>Wait at least one week before following up</li>
                <li>Be polite and understanding if you don't receive a response</li>
                <li>Limit follow-ups to 1-2 messages</li>
            </ul>
        </li>
    </ol>
    
    <div class="footer">
        <p>&copy; 2025 HirEdge. All rights reserved.</p>
    </div>
</body>
</html>`;
        
        // Save as HTML with .docx extension which Word can open
        mimeType = 'text/html';
        fileName = 'networking-email-templates.html';
      } else if (format === 'XLSX') {
        // For Excel spreadsheets - creating a CSV that Excel can open
        fileContent = `Job Application Tracker

Company Name,Position,Application Date,Application Status,Contact Person,Contact Email,Interview Date,Follow-up Date,Notes
Example Company,Software Engineer,01/15/2025,Interview Scheduled,John Doe,john.doe@example.com,01/20/2025,01/22/2025,"Had a great phone screening, moving to technical interview"
TechCorp,Product Manager,01/10/2025,Applied,Sarah Smith,s.smith@techcorp.com,,01/17/2025,"Submitted application through company website, customized cover letter"
Global Solutions,UX Designer,01/05/2025,Rejected,,,,,Applied through LinkedIn Easy Apply
Innovative Inc,Full Stack Developer,12/28/2024,Second Interview,Michael Johnson,mjohnson@innovative.com,01/25/2025,01/27/2025,"First interview went well, technical assessment score: 92%"
NextGen Systems,Data Analyst,01/12/2025,Phone Screening,Laura Williams,l.williams@nextgen.com,01/18/2025,,"Recruiter reached out via LinkedIn message"

Instructions:
1. Update this tracker regularly as your applications progress
2. Status options: Applied, Phone Screening, Interview Scheduled, Second Interview, Final Interview, Offer Received, Rejected, Accepted, Declined
3. Set calendar reminders for interviews and follow-ups
4. Use the Notes column to track important details like interview feedback, salary discussions, etc.
5. Color-code rows based on priority or status (e.g., green for active prospects, yellow for pending, red for closed)`;

        // Use plain text CSV format which Excel can open
        mimeType = 'text/csv';
        fileName = 'job-application-tracker.csv';
      } else {
        // Default to text file
        fileContent = `${resourceTitle}
HirEdge Career Resources - 2025

This document contains comprehensive information about ${resourceTitle.toLowerCase()} to help you succeed in your career journey.

Key sections in this document:
1. Introduction and Purpose
2. Best Practices and Guidelines
3. Step-by-Step Instructions
4. Examples and Templates
5. Additional Resources

For more detailed career resources, visit the HirEdge website.
© 2025 HirEdge. All rights reserved.`;
        mimeType = 'text/plain';
      }
      
      // Create and download the file
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      // Show success message
      setDownloadedResource(resourceTitle);
      setDownloadSuccess(true);
      
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Sorry, there was an error downloading the file. Please try again later.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Career Resources | HirEdge</title>
        <meta name="description" content="Download free career resources including resume templates, interview guides, and job search tools" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <BackToHomeButton />
        
        {/* Success notification - only shown after successful download */}
        <Notification 
          type="success"
          message={`Successfully downloaded "${downloadedResource}"`}
          show={downloadSuccess}
          onClose={() => setDownloadSuccess(false)}
        />
        
        {/* Hero Section */}
        <div className="relative bg-indigo-800 dark:bg-indigo-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              alt="People working on laptops"
              width={1771}
              height={1181}
              className="opacity-20 object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-in">
              Free Career Resources
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-100 animate-fade-in">
              Download our professionally designed templates, guides, and tools to supercharge your job search and advance your career.
            </p>
          </div>
        </div>
        
        {/* Filter */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Available Resources</h2>
            <div>
              <label htmlFor="filter" className="sr-only">Filter by type</label>
              <select
                id="filter"
                name="filter"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-300"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Resources' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Resources Grid */}
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover-scale transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    {resource.icon}
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {resource.format} • {resource.fileSize}
                        </span>
                        {resource.popular && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {resource.description}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => handleDownload(resource.title, resource.downloadUrl, resource.format)}
                      disabled={downloading}
                      className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${downloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300`}
                    >
                      {downloading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <FaFileDownload className="mr-2" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Request Resources Section */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Need a specific resource?
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
                If you're looking for a specific template, guide, or tool that's not listed here, let us know and we'll consider adding it.
              </p>
              <div className="mt-8">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Request a Resource
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 