// Mock data for jobs and internships

export const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Ministry of Electronics & IT',
    location: 'Delhi',
    jobType: 'Full-time',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Entry Level',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'We are looking for a Software Engineer to join our team and help build digital solutions for government services.',
    fullDescription: 'As a Software Engineer at the Ministry of Electronics & IT, you will be responsible for developing innovative digital solutions for various government services and initiatives under the Digital India program. You will work with a team of talented engineers to build scalable, secure, and user-friendly applications.',
    requirements: [
      'Bachelor\'s degree in Computer Science, Engineering or related field',
      'Proficiency in JavaScript, React, and Node.js',
      'Experience with web application development',
      'Knowledge of database systems like MongoDB or SQL',
      'Understanding of software development life cycle',
      'Excellent problem-solving skills'
    ],
    responsibilities: [
      'Design, develop, and maintain web applications for government services',
      'Collaborate with cross-functional teams to define and implement new features',
      'Write clean, efficient, and maintainable code',
      'Participate in code reviews and contribute to technical documentation',
      'Troubleshoot and debug applications',
      'Stay updated with emerging technologies and industry trends'
    ],
    perks: [
      'Competitive salary package',
      'Health insurance and retirement benefits',
      'Professional development opportunities',
      'Work on projects with nationwide impact',
      'Flexible work arrangements',
      'Collaborative work environment'
    ],
    salary: {
      value: 600000,
      period: 'per year'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS']
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
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Join ISRO as a Data Scientist to analyze satellite data and contribute to India\'s space research programs.',
    fullDescription: 'As a Data Scientist at ISRO, you will analyze vast amounts of satellite data to extract meaningful insights that will advance India\'s space research programs. You will work with multidisciplinary teams to develop machine learning models that can process and interpret complex satellite imagery and telemetry data.',
    requirements: [
      'Master\'s or PhD in Data Science, Statistics, Computer Science, or related field',
      'Proven experience in machine learning and deep learning',
      'Strong programming skills in Python or R',
      'Experience with data visualization tools',
      'Knowledge of image processing techniques',
      'Ability to work with large datasets'
    ],
    responsibilities: [
      'Develop and implement machine learning algorithms for satellite data analysis',
      'Process and analyze large volumes of imagery and telemetry data',
      'Create predictive models for space research applications',
      'Collaborate with scientists and engineers on research projects',
      'Prepare reports and presentations on research findings',
      'Contribute to publications in scientific journals'
    ],
    perks: [
      'Prestigious organization with cutting-edge research',
      'Comprehensive benefits package',
      'Opportunity to contribute to national space program',
      'Access to advanced computing resources',
      'Continuous learning and development',
      'Work-life balance'
    ],
    salary: {
      value: 900000,
      period: 'per year'
    },
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow']
  },
  {
    id: '3',
    title: 'Front-end Developer',
    company: 'Digital India Corporation',
    location: 'Remote',
    jobType: 'Full-time',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Entry Level',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Design and implement user interfaces for government digital services using modern front-end technologies.',
    fullDescription: 'As a Front-end Developer at Digital India Corporation, you will be responsible for creating intuitive, accessible, and responsive user interfaces for various government digital services. You will collaborate with designers and back-end developers to create seamless user experiences that make government services more accessible to all citizens.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong proficiency in HTML, CSS, and JavaScript',
      'Experience with React or other modern front-end frameworks',
      'Understanding of responsive design principles',
      'Knowledge of web accessibility standards',
      'Experience with front-end build tools and version control'
    ],
    responsibilities: [
      'Develop responsive and accessible user interfaces',
      'Translate design mockups into functional web applications',
      'Optimize applications for maximum performance',
      'Ensure cross-browser compatibility and responsive design',
      'Collaborate with back-end developers to integrate front-end with server-side logic',
      'Participate in user testing and incorporate feedback'
    ],
    perks: [
      'Remote work flexibility',
      'Competitive salary',
      'Professional development budget',
      'Health benefits',
      'Opportunity to impact millions of users',
      'Collaborative team environment'
    ],
    salary: {
      value: 700000,
      period: 'per year'
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX']
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'National Informatics Centre',
    location: 'Delhi',
    jobType: 'Full-time',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Mid Level',
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Build robust backend systems for government applications with focus on security and scalability.',
    fullDescription: 'As a Backend Developer at National Informatics Centre, you will develop and maintain the server-side logic that powers critical government applications. You will design APIs, implement security protocols, and ensure that our systems can scale to meet the needs of millions of users across India.',
    requirements: [
      'Bachelor\'s or Master\'s degree in Computer Science or related field',
      'Strong knowledge of Java, Spring Boot, and RESTful API design',
      'Experience with database design and SQL/NoSQL databases',
      'Understanding of cloud computing platforms',
      'Knowledge of security best practices',
      '3+ years of experience in backend development'
    ],
    responsibilities: [
      'Design and implement robust backend services and APIs',
      'Ensure data security and compliance with government standards',
      'Optimize database queries and application performance',
      'Collaborate with front-end developers to integrate user-facing elements',
      'Implement automated testing and CI/CD pipelines',
      'Document code and apis for other developers'
    ],
    perks: [
      'Stable government position',
      'Comprehensive health coverage',
      'Retirement benefits',
      'Regular work hours',
      'Professional growth opportunities',
      'Impactful work on national infrastructure'
    ],
    salary: {
      value: 850000,
      period: 'per year'
    },
    skills: ['Java', 'Spring Boot', 'SQL', 'Cloud Computing', 'API Design']
  },
  {
    id: '5',
    title: 'AI Research Engineer',
    company: 'Defence Research and Development Organisation (DRDO)',
    location: 'Hyderabad',
    jobType: 'Full-time',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Senior Level',
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Research and develop AI solutions for defense applications with cutting-edge technologies.',
    fullDescription: 'As an AI Research Engineer at DRDO, you will lead cutting-edge research initiatives to develop artificial intelligence solutions for defense applications. You will work on challenging problems that require innovative approaches to machine learning, computer vision, and natural language processing in defense contexts.',
    requirements: [
      'PhD or Master\'s degree in Computer Science, AI, or related field',
      'Strong research background in AI, machine learning, or deep learning',
      'Publications in recognized AI conferences or journals',
      'Experience with AI frameworks like TensorFlow or PyTorch',
      'Knowledge of computer vision and/or natural language processing',
      '5+ years of experience in AI research or applications'
    ],
    responsibilities: [
      'Lead research initiatives in artificial intelligence for defense applications',
      'Develop novel algorithms and models for complex AI challenges',
      'Implement and test AI solutions in simulated environments',
      'Collaborate with defense experts to understand operational requirements',
      'Publish research findings in academic journals and conferences',
      'Mentor junior researchers and engineers'
    ],
    perks: [
      'State-of-the-art research facilities',
      'Competitive compensation package',
      'Opportunity to work on classified defense projects',
      'Collaboration with top researchers in the field',
      'Support for continuing education',
      'Government benefits and job security'
    ],
    salary: {
      value: 1500000,
      period: 'per year'
    },
    skills: ['AI', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP']
  },
  {
    id: 'intern1',
    title: 'Web Development Intern',
    company: 'National Informatics Centre',
    location: 'Remote',
    jobType: 'Internship',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Entry Level',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Exciting opportunity to work on government web applications and gain valuable experience in web development.',
    fullDescription: 'As a Web Development Intern at National Informatics Centre, you will assist in creating and maintaining government web applications that serve millions of citizens. This internship offers a unique opportunity to learn web development in a professional setting while contributing to important national digital infrastructure.',
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with at least one front-end framework (React preferred)',
      'Understanding of responsive design principles',
      'Good problem-solving skills',
      'Eagerness to learn and grow'
    ],
    responsibilities: [
      'Assist in developing and testing web applications',
      'Implement UI components based on design specifications',
      'Fix bugs and improve application performance',
      'Participate in code reviews and team meetings',
      'Document code and contribute to technical documentation',
      'Learn from experienced developers and expand your skills'
    ],
    perks: [
      'Stipend of ₹15,000 per month',
      'Remote work flexibility',
      'Certificate upon successful completion',
      'Potential for pre-placement offer',
      'Exposure to government tech projects',
      'Mentorship from experienced professionals'
    ],
    salary: {
      value: 15000,
      period: 'per month'
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: 'intern2',
    title: 'Data Science Intern',
    company: 'Indian Statistical Institute',
    location: 'Kolkata',
    jobType: 'Internship',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Entry Level',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Join our research team to analyze large datasets and contribute to statistical research projects.',
    fullDescription: 'As a Data Science Intern at the Indian Statistical Institute, you will be part of a research team analyzing large datasets and contributing to important statistical research projects. This internship provides a unique opportunity to apply data science techniques to real-world problems while learning from some of India\'s leading statisticians and data scientists.',
    requirements: [
      'Currently pursuing a degree in Statistics, Mathematics, Computer Science, or related field',
      'Strong foundation in statistics and mathematics',
      'Basic programming skills in Python or R',
      'Experience with data analysis libraries and tools',
      'Ability to work with structured and unstructured data',
      'Good analytical and problem-solving skills'
    ],
    responsibilities: [
      'Collect, clean, and preprocess datasets for analysis',
      'Apply statistical methods and machine learning algorithms',
      'Visualize data and communicate insights',
      'Assist researchers with computational aspects of projects',
      'Document research procedures and findings',
      'Participate in research discussions and presentations'
    ],
    perks: [
      'Monthly stipend of ₹18,000',
      'Access to advanced computing resources',
      'Opportunity to contribute to research publications',
      'Learning environment with expert mentorship',
      'Networking with researchers and data scientists',
      'Certificate of completion and recommendation letter'
    ],
    salary: {
      value: 18000,
      period: 'per month'
    },
    skills: ['Python', 'R', 'Statistics', 'Machine Learning']
  },
  {
    id: 'intern3',
    title: 'Digital Marketing Intern',
    company: 'Digital India Corporation',
    location: 'Delhi',
    jobType: 'Internship',
    isAICTE: true,
    isGovernment: true,
    experienceLevel: 'Entry Level',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    shortDescription: 'Learn and apply digital marketing strategies to promote government initiatives.',
    fullDescription: 'As a Digital Marketing Intern at Digital India Corporation, you will assist in promoting various government initiatives and digital services through effective online marketing strategies. This internship offers hands-on experience in digital marketing while contributing to raising awareness about important government programs that benefit citizens across India.',
    requirements: [
      'Currently pursuing a degree in Marketing, Communications, or related field',
      'Understanding of digital marketing principles',
      'Experience with social media platforms',
      'Basic knowledge of content creation and SEO',
      'Good communication and writing skills',
      'Creative mindset and attention to detail'
    ],
    responsibilities: [
      'Assist in creating and implementing digital marketing campaigns',
      'Develop content for social media channels and websites',
      'Monitor and analyze campaign performance',
      'Conduct research on target audiences and marketing trends',
      'Support SEO efforts and website optimization',
      'Help prepare marketing reports and presentations'
    ],
    perks: [
      'Monthly stipend of ₹12,000',
      'Flexible work arrangements',
      'Exposure to government communication strategies',
      'Hands-on experience with digital marketing tools',
      'Networking opportunities within government sector',
      'Certificate and recommendation upon successful completion'
    ],
    salary: {
      value: 12000,
      period: 'per month'
    },
    skills: ['Social Media', 'Content Creation', 'SEO', 'Analytics']
  }
];

// Function to get only jobs (excluding internships)
export const getJobs = () => {
  return mockJobs.filter(job => job.jobType !== 'Internship');
};

// Function to get only internships
export const getInternships = () => {
  return mockJobs.filter(job => job.jobType === 'Internship');
}; 