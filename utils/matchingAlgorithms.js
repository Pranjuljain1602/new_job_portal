/**
 * Calculate skill match score between user skills and job required skills
 * @param {Array} userSkills - Array of user skills
 * @param {Array} jobSkills - Array of job required skills
 * @returns {number} - Match score between 0 and 1
 */
export const calculateSkillMatch = (userSkills, jobSkills) => {
  if (!jobSkills.length) return 0;
  
  const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
  const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());
  
  // Count how many job skills the user has
  let matchCount = 0;
  
  jobSkillsLower.forEach(jobSkill => {
    // Check for exact matches
    if (userSkillsLower.includes(jobSkill)) {
      matchCount += 1;
      return;
    }
    
    // Check for partial matches (e.g., "JavaScript" matches "JavaScript Programming")
    for (const userSkill of userSkillsLower) {
      if (jobSkill.includes(userSkill) || userSkill.includes(jobSkill)) {
        matchCount += 0.5; // Partial match gets half weight
        return;
      }
    }
  });
  
  // Calculate match percentage
  return matchCount / jobSkills.length;
};

/**
 * Calculate interest match score between user interests and job
 * @param {Array} userInterests - Array of user interests
 * @param {Object} job - Job object with title, description, etc.
 * @returns {number} - Match score between 0 and 1
 */
export const calculateInterestMatch = (userInterests, job) => {
  if (!userInterests.length) return 0;
  
  const userInterestsLower = userInterests.map(interest => interest.toLowerCase());
  const jobText = `${job.title} ${job.description} ${job.company}`.toLowerCase();
  
  // Check how many user interests are mentioned in the job
  let matchCount = 0;
  
  userInterestsLower.forEach(interest => {
    // Check if interest is mentioned in job text
    if (jobText.includes(interest)) {
      matchCount += 1;
      return;
    }
    
    // Check for related interests based on keywords
    const interestKeywords = getInterestKeywords(interest);
    for (const keyword of interestKeywords) {
      if (jobText.includes(keyword)) {
        matchCount += 0.5; // Related match gets half weight
        return;
      }
    }
  });
  
  // Calculate match percentage (max score is 1)
  return Math.min(matchCount / userInterests.length, 1);
};

/**
 * Get related keywords for an interest
 * In a real AI model, this would be based on word embeddings or a knowledge graph
 */
const getInterestKeywords = (interest) => {
  const interestMap = {
    'programming': ['coding', 'development', 'software', 'engineer', 'developer'],
    'data science': ['machine learning', 'ai', 'analytics', 'statistics', 'analysis'],
    'artificial intelligence': ['machine learning', 'deep learning', 'neural networks', 'ai', 'nlp'],
    'web development': ['frontend', 'backend', 'fullstack', 'javascript', 'react', 'node'],
    'mobile development': ['android', 'ios', 'app', 'flutter', 'react native'],
    'cybersecurity': ['security', 'encryption', 'hacking', 'protection', 'privacy'],
    'cloud computing': ['aws', 'azure', 'gcp', 'devops', 'infrastructure'],
    'networking': ['network', 'cisco', 'protocols', 'infrastructure', 'communication'],
    'iot': ['internet of things', 'embedded', 'sensors', 'devices', 'arduino'],
    'blockchain': ['cryptocurrency', 'smart contracts', 'distributed ledger', 'ethereum', 'bitcoin']
  };
  
  return interestMap[interest.toLowerCase()] || [];
};

/**
 * Calculate education match score between user education and job requirements
 * @param {Array} userEducation - Array of user education objects
 * @param {Array} jobRequirements - Array of job requirement strings
 * @returns {number} - Match score between 0 and 1
 */
export const calculateEducationMatch = (userEducation, jobRequirements) => {
  if (!userEducation.length || !jobRequirements.length) return 0;
  
  // Get highest education level
  const degreeValues = {
    'high school': 1,
    'associate': 2,
    'bachelor': 3,
    'master': 4,
    'phd': 5,
    'doctorate': 5
  };
  
  // Find user's highest degree
  let highestDegree = 0;
  let relevantFields = [];
  
  userEducation.forEach(edu => {
    const degreeLower = edu.degree.toLowerCase();
    
    // Find degree level
    for (const [degree, value] of Object.entries(degreeValues)) {
      if (degreeLower.includes(degree)) {
        if (value > highestDegree) {
          highestDegree = value;
        }
        break;
      }
    }
    
    // Add field of study
    if (edu.field) {
      relevantFields.push(edu.field.toLowerCase());
    }
  });
  
  // Check job requirements for education match
  let degreeMatch = 0;
  let fieldMatch = 0;
  
  const requirementsText = jobRequirements.join(' ').toLowerCase();
  
  // Check degree level match
  if (requirementsText.includes('phd') || requirementsText.includes('doctorate')) {
    degreeMatch = highestDegree >= 5 ? 1 : 0;
  } else if (requirementsText.includes('master')) {
    degreeMatch = highestDegree >= 4 ? 1 : 0;
  } else if (requirementsText.includes('bachelor')) {
    degreeMatch = highestDegree >= 3 ? 1 : 0;
  } else if (requirementsText.includes('associate')) {
    degreeMatch = highestDegree >= 2 ? 1 : 0;
  } else {
    degreeMatch = highestDegree >= 1 ? 1 : 0;
  }
  
  // Check field match
  for (const field of relevantFields) {
    if (requirementsText.includes(field)) {
      fieldMatch = 1;
      break;
    }
    
    // Check for related fields
    const relatedFields = getRelatedFields(field);
    for (const related of relatedFields) {
      if (requirementsText.includes(related)) {
        fieldMatch = 0.5; // Partial match
        break;
      }
    }
  }
  
  // Combine degree and field match (weighted)
  return (degreeMatch * 0.6) + (fieldMatch * 0.4);
};

/**
 * Get related fields for a field of study
 * In a real AI model, this would be based on a knowledge graph or taxonomy
 */
const getRelatedFields = (field) => {
  const fieldMap = {
    'computer science': ['software engineering', 'information technology', 'computing', 'programming'],
    'information technology': ['computer science', 'information systems', 'computing'],
    'electrical engineering': ['electronics', 'computer engineering', 'telecommunications'],
    'mechanical engineering': ['robotics', 'manufacturing', 'industrial engineering'],
    'data science': ['statistics', 'mathematics', 'computer science', 'analytics'],
    'mathematics': ['statistics', 'physics', 'computer science', 'data science'],
    'physics': ['engineering', 'mathematics', 'astronomy'],
    'business': ['management', 'finance', 'marketing', 'economics'],
    'finance': ['accounting', 'economics', 'business', 'banking']
  };
  
  return fieldMap[field.toLowerCase()] || [];
};

/**
 * Calculate experience match score between user experience and job level
 * @param {Array} userExperience - Array of user experience objects
 * @param {string} jobLevel - Job experience level (Entry, Mid, Senior)
 * @returns {number} - Match score between 0 and 1
 */
export const calculateExperienceMatch = (userExperience, jobLevel) => {
  if (!userExperience) return 0;
  
  // Calculate total years of experience
  const totalYears = userExperience.reduce((total, exp) => {
    let years = 0;
    
    if (exp.current) {
      // For current positions, calculate years from start date to now
      const startDate = new Date(exp.startDate);
      const now = new Date();
      years = (now - startDate) / (1000 * 60 * 60 * 24 * 365);
    } else if (exp.startDate && exp.endDate) {
      // For past positions, calculate years between start and end dates
      const startDate = new Date(exp.startDate);
      const endDate = new Date(exp.endDate);
      years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
    }
    
    return total + years;
  }, 0);
  
  // Match experience level
  const jobLevelLower = jobLevel.toLowerCase();
  
  if (jobLevelLower.includes('entry')) {
    // Entry level: 0-2 years is perfect, more is still good
    return totalYears <= 2 ? 1 : 0.8;
  } else if (jobLevelLower.includes('mid')) {
    // Mid level: 2-5 years is perfect
    if (totalYears < 2) return 0.4;
    if (totalYears <= 5) return 1;
    return 0.8; // More than 5 years is still good
  } else if (jobLevelLower.includes('senior')) {
    // Senior level: 5+ years is perfect
    if (totalYears < 3) return 0.2;
    if (totalYears < 5) return 0.6;
    return 1;
  }
  
  // Default match if level is not specified
  return 0.5;
}; 