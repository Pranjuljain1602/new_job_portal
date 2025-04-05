import axios from 'axios';

// This would be your actual API endpoint in production
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.aicte-jobs-portal.com';

// For development/demo purposes, we'll use a mock implementation
export const fetchJobs = async (userProfile) => {
  // In a real implementation, this would be an API call to your backend
  // which would use AI to match jobs to the user profile
  
  try {
    // Uncomment this in production with your actual API
    // const response = await axios.post(`${API_URL}/api/jobs/recommend`, userProfile);
    // return response.data;
    
    // For demo purposes, we'll return mock data with AI-like matching
    return generateMockJobs(userProfile);
  } catch (error) {
    console.error("Error fetching job recommendations:", error);
    throw error;
  }
};

// Mock implementation for demo purposes
function generateMockJobs(userProfile) {
  const { skills, interests, education, experience } = userProfile;
  
  // Create a pool of potential jobs
  const jobPool = [
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
    }
  ];
  
  // Calculate match score for each job based on user profile
  const matchedJobs = jobPool.map(job => {
    // Calculate skill match
    const userSkillsSet = new Set(skills.map(s => s.toLowerCase()));
    const requiredSkillsSet = new Set(job.requiredSkills.map(s => s.toLowerCase()));
    
    const matchedSkills = job.requiredSkills.filter(skill => 
      userSkillsSet.has(skill.toLowerCase())
    );
    
    const missingSkills = job.requiredSkills.filter(skill => 
      !userSkillsSet.has(skill.toLowerCase())
    );
    
    const skillMatchScore = matchedSkills.length / job.requiredSkills.length;
    
    // Calculate interest match
    const userInterestsSet = new Set(interests.map(i => i.toLowerCase()));
    let interestMatchScore = 0;
    
    // Simple interest matching based on job title and description
    if (job.title.toLowerCase().includes('software') || job.description.toLowerCase().includes('software')) {
      if (userInterestsSet.has('software development') || userInterestsSet.has('programming')) {
        interestMatchScore += 0.3;
      }
    }
    
    if (job.title.toLowerCase().includes('data') || job.description.toLowerCase().includes('data')) {
      if (userInterestsSet.has('data science') || userInterestsSet.has('data analysis')) {
        interestMatchScore += 0.3;
      }
    }
    
    if (job.title.toLowerCase().includes('ai') || job.description.toLowerCase().includes('ai') ||
        job.title.toLowerCase().includes('machine learning') || job.description.toLowerCase().includes('machine learning')) {
      if (userInterestsSet.has('artificial intelligence') || userInterestsSet.has('machine learning')) {
        interestMatchScore += 0.3;
      }
    }
    
    // Education match
    let educationMatchScore = 0;
    const highestEducation = education.reduce((highest, current) => {
      const degreeValue = {
        'Bachelor': 1,
        'Master': 2,
        'PhD': 3
      };
      
      const currentValue = degreeValue[current.degree.split("'")[0]] || 0;
      const highestValue = degreeValue[highest.degree.split("'")[0]] || 0;
      
      return currentValue > highestValue ? current : highest;
    }, education[0]);
    
    if (job.requirements.some(req => req.toLowerCase().includes('bachelor'))) {
      if (highestEducation.degree.toLowerCase().includes('bachelor') || 
          highestEducation.degree.toLowerCase().includes('master') || 
          highestEducation.degree.toLowerCase().includes('phd')) {
        educationMatchScore += 0.2;
      }
    }
    
    if (job.requirements.some(req => req.toLowerCase().includes('master'))) {
      if (highestEducation.degree.toLowerCase().includes('master') || 
          highestEducation.degree.toLowerCase().includes('phd')) {
        educationMatchScore += 0.2;
      }
    }
    
    if (job.requirements.some(req => req.toLowerCase().includes('phd'))) {
      if (highestEducation.degree.toLowerCase().includes('phd')) {
        educationMatchScore += 0.2;
      }
    }
    
    // Experience match
    let experienceMatchScore = 0;
    if (job.experienceLevel === 'Entry Level') {
      experienceMatchScore = 0.2;
    } else if (job.experienceLevel === 'Mid Level' && experience.length > 0) {
      experienceMatchScore = 0.2;
    } else if (job.experienceLevel === 'Senior Level' && experience.length > 1) {
      experienceMatchScore = 0.2;
    }
    
    // Calculate overall match score (weighted average)
    const matchScore = (
      skillMatchScore * 0.5 + 
      interestMatchScore * 0.3 + 
      educationMatchScore * 0.1 + 
      experienceMatchScore * 0.1
    );
    
    return {
      ...job,
      matchScore,
      matchedSkills,
      missingSkills
    };
  });
  
  // Sort by match score (descending)
  return matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
} 