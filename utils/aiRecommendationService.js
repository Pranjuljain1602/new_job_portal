import axios from 'axios';
import { calculateSkillMatch, calculateInterestMatch, calculateEducationMatch, calculateExperienceMatch } from './matchingAlgorithms';

// This would connect to your actual AI model API in production
const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'https://api.aicte-jobs-portal.com/ai';

/**
 * Get AI-powered job recommendations based on user profile
 * @param {Object} userProfile - The user's complete profile
 * @returns {Promise<Array>} - Array of recommended jobs with match scores
 */
export const getAIRecommendations = async (userProfile) => {
  try {
    // In production, this would call your actual AI model API
    // const response = await axios.post(`${AI_API_URL}/recommend`, userProfile);
    // return response.data;
    
    // For development, we'll use our local AI simulation
    return simulateAIRecommendations(userProfile);
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    throw error;
  }
};

/**
 * Simulates AI recommendations using local algorithms
 * This would be replaced by a real ML model in production
 */
const simulateAIRecommendations = async (userProfile) => {
  // Fetch all available jobs
  const allJobs = await fetchAvailableJobs();
  
  // Apply our matching algorithms to each job
  const scoredJobs = allJobs.map(job => {
    // Calculate different aspects of the match
    const skillMatchScore = calculateSkillMatch(userProfile.skills, job.requiredSkills);
    const interestMatchScore = calculateInterestMatch(userProfile.interests, job);
    const educationMatchScore = calculateEducationMatch(userProfile.education, job.requirements);
    const experienceMatchScore = calculateExperienceMatch(userProfile.experience, job.experienceLevel);
    
    // Calculate overall match score with weighted components
    // These weights would be optimized by the AI model in production
    const matchScore = (
      skillMatchScore * 0.5 + 
      interestMatchScore * 0.3 + 
      educationMatchScore * 0.1 + 
      experienceMatchScore * 0.1
    );
    
    // Identify matched and missing skills
    const matchedSkills = userProfile.skills.filter(skill => 
      job.requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    
    const missingSkills = job.requiredSkills.filter(skill => 
      !userProfile.skills.some(userSkill => skill.toLowerCase().includes(userSkill.toLowerCase()))
    );
    
    // Return job with match data
    return {
      ...job,
      matchScore,
      matchPercentage: Math.round(matchScore * 100),
      matchedSkills,
      missingSkills,
      // Add personalized recommendation reason based on highest match component
      recommendationReason: generateRecommendationReason(
        skillMatchScore, 
        interestMatchScore, 
        educationMatchScore, 
        experienceMatchScore,
        userProfile,
        job
      )
    };
  });
  
  // Sort by match score (descending)
  return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Generate a personalized recommendation reason
 */
const generateRecommendationReason = (
  skillMatchScore, 
  interestMatchScore, 
  educationMatchScore, 
  experienceMatchScore,
  userProfile,
  job
) => {
  // Find the highest match component
  const scores = [
    { type: 'skill', score: skillMatchScore },
    { type: 'interest', score: interestMatchScore },
    { type: 'education', score: educationMatchScore },
    { type: 'experience', score: experienceMatchScore }
  ];
  
  const highestMatch = scores.reduce((prev, current) => 
    (current.score > prev.score) ? current : prev
  );
  
  // Generate reason based on highest match component
  switch (highestMatch.type) {
    case 'skill':
      const topSkills = userProfile.skills
        .filter(skill => job.requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase())))
        .slice(0, 2);
      return `Your ${topSkills.join(' and ')} skills are a great match for this position.`;
      
    case 'interest':
      return `This aligns with your interests in ${userProfile.interests.slice(0, 2).join(' and ')}.`;
      
    case 'education':
      const relevantEducation = userProfile.education[0];
      return `Your ${relevantEducation.degree} in ${relevantEducation.field} is relevant to this role.`;
      
    case 'experience':
      return `Your experience level is well-suited for this ${job.experienceLevel} position.`;
      
    default:
      return `This job matches your overall profile.`;
  }
};

/**
 * Fetch all available jobs from the API or database
 */
const fetchAvailableJobs = async () => {
  try {
    // In production, this would call your actual jobs API
    // const response = await axios.get(`${API_URL}/jobs`);
    // return response.data;
    
    // For development, return mock data
    return [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Ministry of Electronics & IT',
        location: 'Delhi',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 600000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'We are looking for a Software Engineer to join our team and help build digital solutions for government services.',
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          'Knowledge of JavaScript, React, and Node.js',
          'Good problem-solving skills',
          'Ability to work in a team environment'
        ],
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS']
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
        salary: {
          value: 900000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Join ISRO as a Data Scientist to analyze satellite data and contribute to India\'s space research programs.',
        requirements: [
          'Master\'s or PhD in Data Science, Statistics, or related field',
          'Experience with Python, R, and machine learning frameworks',
          'Knowledge of data visualization tools',
          'Strong analytical and problem-solving skills'
        ],
        requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow']
      },
      {
        id: '3',
        title: 'Web Development Intern',
        company: 'National Informatics Centre',
        location: 'Remote',
        jobType: 'Internship',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 15000,
          period: 'per month'
        },
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Exciting opportunity to work on government web applications and gain valuable experience in web development.',
        requirements: [
          'Currently pursuing a degree in Computer Science or related field',
          'Knowledge of HTML, CSS, and JavaScript',
          'Familiarity with React or Angular is a plus',
          'Good communication skills'
        ],
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React']
      },
      {
        id: '4',
        title: 'AI Research Assistant',
        company: 'Indian Institute of Technology (IIT)',
        location: 'Mumbai',
        jobType: 'Part-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 25000,
          period: 'per month'
        },
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Join our AI research lab to work on cutting-edge artificial intelligence projects and contribute to academic research.',
        requirements: [
          'Currently pursuing or completed Master\'s in Computer Science or related field',
          'Strong knowledge of machine learning and deep learning',
          'Experience with Python and AI frameworks like TensorFlow or PyTorch',
          'Good academic record'
        ],
        requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch']
      },
      {
        id: '5',
        title: 'Network Security Engineer',
        company: 'Defence Research and Development Organisation (DRDO)',
        location: 'Hyderabad',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Senior Level',
        salary: {
          value: 1200000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Join DRDO to work on critical network security infrastructure and protect national digital assets.',
        requirements: [
          'Bachelor\'s or Master\'s in Computer Science, Cybersecurity, or related field',
          'At least 5 years of experience in network security',
          'Knowledge of firewalls, IDS/IPS, and security protocols',
          'Security certifications like CISSP, CEH preferred'
        ],
        requiredSkills: ['Network Security', 'Firewall', 'IDS/IPS', 'Cybersecurity', 'Risk Assessment']
      },
      {
        id: '6',
        title: 'Junior Mobile App Developer',
        company: 'Department of Science and Technology',
        location: 'Pune',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 550000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Develop mobile applications for government services and citizen engagement platforms. Focus on Android development with Kotlin.',
        requirements: [
          'Bachelor\'s degree in Computer Science, IT, or related field',
          'Knowledge of Android app development using Kotlin',
          'Basic understanding of UX/UI principles',
          'Strong problem-solving skills'
        ],
        requiredSkills: ['Android', 'Kotlin', 'Java', 'Mobile Development', 'Git']
      },
      {
        id: '7',
        title: 'IoT Development Intern',
        company: 'Centre for Development of Advanced Computing',
        location: 'Noida',
        jobType: 'Internship',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 18000,
          period: 'per month'
        },
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Work on cutting-edge IoT projects for smart cities and infrastructure. Learn about sensors, data collection, and IoT application development.',
        requirements: [
          'Currently pursuing degree in Electronics, Computer Science, or related field',
          'Knowledge of Arduino, Raspberry Pi, or similar platforms',
          'Basic programming skills in Python or C/C++',
          'Interest in IoT and smart devices'
        ],
        requiredSkills: ['IoT', 'Arduino', 'Raspberry Pi', 'Python', 'Sensors']
      },
      {
        id: '8',
        title: 'Digital Marketing Specialist',
        company: 'Ministry of Tourism',
        location: 'Delhi',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Mid Level',
        salary: {
          value: 750000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Design and implement digital marketing strategies to promote Indian tourism globally. Handle social media campaigns, content marketing, and SEO.',
        requirements: [
          'Bachelor\'s in Marketing, Communications, or related field',
          '3+ years of experience in digital marketing',
          'Proficiency in social media management and analytics tools',
          'Experience with content creation and SEO'
        ],
        requiredSkills: ['Digital Marketing', 'SEO', 'Social Media Management', 'Content Marketing', 'Analytics']
      },
      {
        id: '9',
        title: 'Database Administrator',
        company: 'Central Board of Direct Taxes',
        location: 'Mumbai',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Senior Level',
        salary: {
          value: 1000000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Manage and optimize large-scale database systems for tax processing and record management. Ensure database security, performance, and reliability.',
        requirements: [
          'Bachelor\'s or Master\'s in Computer Science or related field',
          '5+ years of experience with large-scale database management',
          'Expertise in Oracle and SQL Server',
          'Knowledge of database security and performance tuning'
        ],
        requiredSkills: ['Oracle', 'SQL Server', 'Database Administration', 'SQL', 'Database Security']
      },
      {
        id: '10',
        title: 'Mechanical Engineering Intern',
        company: 'Hindustan Aeronautics Limited',
        location: 'Bangalore',
        jobType: 'Internship',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 20000,
          period: 'per month'
        },
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Gain hands-on experience in aerospace engineering and manufacturing processes. Assist engineers in design, testing, and quality control.',
        requirements: [
          'Currently pursuing a degree in Mechanical or Aerospace Engineering',
          'Knowledge of CAD software (AutoCAD, SolidWorks)',
          'Understanding of mechanical principles and materials',
          'Good analytical skills'
        ],
        requiredSkills: ['AutoCAD', 'SolidWorks', 'Mechanical Design', 'Engineering Drawing', 'Materials Science']
      },
      {
        id: '11',
        title: 'UI/UX Designer',
        company: 'National e-Governance Division',
        location: 'Gurgaon',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Mid Level',
        salary: {
          value: 850000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Design user interfaces for government digital platforms that are accessible, intuitive, and inclusive. Create wireframes, prototypes, and user flows.',
        requirements: [
          'Bachelor\'s in Design, HCI, or related field',
          '3+ years of experience in UI/UX design',
          'Proficiency in design tools like Figma, Adobe XD',
          'Knowledge of accessibility standards and inclusive design'
        ],
        requiredSkills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'Accessibility']
      },
      {
        id: '12',
        title: 'Civil Engineering Assistant',
        company: 'Public Works Department',
        location: 'Chennai',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 500000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Assist in infrastructure development projects including roads, bridges, and government buildings. Support site supervision, quality control, and documentation.',
        requirements: [
          'Bachelor\'s in Civil Engineering',
          'Knowledge of construction methods and materials',
          'Familiarity with AutoCAD and other civil engineering software',
          'Good communication skills'
        ],
        requiredSkills: ['Civil Engineering', 'AutoCAD', 'Construction Management', 'Structural Analysis', 'Material Testing']
      },
      {
        id: '13',
        title: 'Research Scientist - Biotechnology',
        company: 'Indian Council of Medical Research',
        location: 'Pune',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Senior Level',
        salary: {
          value: 1100000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Conduct research in biotechnology with focus on vaccine development, disease diagnostics, and public health applications.',
        requirements: [
          'PhD in Biotechnology, Microbiology, or related field',
          '5+ years of research experience',
          'Publication record in peer-reviewed journals',
          'Experience with laboratory techniques and research methodologies'
        ],
        requiredSkills: ['Biotechnology', 'Microbiology', 'PCR', 'Cell Culture', 'Immunology', 'Research Methodology']
      },
      {
        id: '14',
        title: 'Data Analytics Intern',
        company: 'Ministry of Statistics and Programme Implementation',
        location: 'Delhi',
        jobType: 'Internship',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Entry Level',
        salary: {
          value: 18000,
          period: 'per month'
        },
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Analyze statistical data to support policy decisions and program evaluation. Learn about government data collection, processing, and visualization.',
        requirements: [
          'Currently pursuing degree in Statistics, Economics, or Data Science',
          'Knowledge of statistical analysis tools (R, SPSS, or similar)',
          'Basic programming skills in Python or R',
          'Good analytical and problem-solving skills'
        ],
        requiredSkills: ['Statistics', 'R', 'Python', 'Data Analysis', 'Data Visualization']
      },
      {
        id: '15',
        title: 'Electrical Engineer',
        company: 'Power Grid Corporation of India',
        location: 'Multiple Locations',
        jobType: 'Full-time',
        isAICTE: true,
        isGovernment: true,
        experienceLevel: 'Mid Level',
        salary: {
          value: 800000,
          period: 'per year'
        },
        postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Design, develop, and maintain electrical power systems and infrastructure. Work on power transmission, distribution, and grid modernization projects.',
        requirements: [
          'Bachelor\'s in Electrical Engineering',
          '3+ years of experience in power systems',
          'Knowledge of electrical codes and standards',
          'Experience with power system analysis and planning'
        ],
        requiredSkills: ['Electrical Engineering', 'Power Systems', 'Circuit Design', 'Power Distribution', 'Substation Design']
      }
    ];
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    throw error;
  }
}; 