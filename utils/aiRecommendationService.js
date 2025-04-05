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
      // Add more job listings here...
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
      // Add more jobs...
    ];
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    throw error;
  }
}; 