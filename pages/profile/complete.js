import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfileComplete() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    skills: [],
    interests: [],
    education: [{ institution: '', degree: '', field: '', startYear: '', endYear: '' }],
    experience: [{ company: '', position: '', description: '', startDate: '', endDate: '', current: false }]
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [profileInsights, setProfileInsights] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch existing profile data
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // If profile is already completed, redirect to recommendations
            if (userData.profileCompleted) {
              router.push('/jobs');
              return;
            }
            
            // Pre-fill form with existing data
            setProfileData({
              fullName: userData.fullName || '',
              skills: userData.skills || [],
              interests: userData.interests || [],
              education: userData.education?.length ? userData.education : [{ institution: '', degree: '', field: '', startYear: '', endYear: '' }],
              experience: userData.experience?.length ? userData.experience : [{ company: '', position: '', description: '', startDate: '', endDate: '', current: false }]
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Not logged in, redirect to login
        router.push('/auth/login');
        return;
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  // Calculate profile completion percentage
  useEffect(() => {
    if (!user) return;
    
    let totalFields = 0;
    let completedFields = 0;
    
    // Basic info
    if (profileData.fullName) completedFields++;
    totalFields++;
    
    // Skills
    if (profileData.skills.length > 0) completedFields++;
    totalFields++;
    
    // Interests
    if (profileData.interests.length > 0) completedFields++;
    totalFields++;
    
    // Education (at least one complete entry)
    const hasCompleteEducation = profileData.education.some(
      edu => edu.institution && edu.degree && edu.field && edu.startYear
    );
    if (hasCompleteEducation) completedFields++;
    totalFields++;
    
    // Experience is completely optional and doesn't count toward completion percentage
    // Remove this section from completion calculation
    
    const percentage = Math.floor((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  }, [profileData, user]);

  // Generate profile insights whenever profile data changes
  useEffect(() => {
    if (Object.values(profileData).some(value => value && value.length)) {
      analyzeProfile();
    }
  }, [profileData]);
  
  const analyzeProfile = async () => {
    try {
      // In production, this would call your AI API
      // const response = await axios.post('/api/profile/analyze', profileData);
      // setProfileInsights(response.data);
      
      // For development, generate insights locally
      const insights = {
        skillGaps: getCommonSkillGaps(profileData.skills),
        recommendedSkills: getRecommendedSkills(profileData.skills, profileData.interests),
        careerPaths: getCareerPathSuggestions(profileData),
        profileStrengths: getProfileStrengths(profileData),
        profileWeaknesses: getProfileWeaknesses(profileData)
      };
      
      setProfileInsights(insights);
    } catch (error) {
      console.error("Error analyzing profile:", error);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(s => s !== skill)
    });
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !profileData.interests.includes(interestInput.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter(i => i !== interest)
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profileData.education];
    newEducation[index][field] = value;
    setProfileData({ ...profileData, education: newEducation });
  };

  const handleAddEducation = () => {
    setProfileData({
      ...profileData,
      education: [...profileData.education, { institution: '', degree: '', field: '', startYear: '', endYear: '' }]
    });
  };

  const handleRemoveEducation = (index) => {
    if (profileData.education.length > 1) {
      const newEducation = [...profileData.education];
      newEducation.splice(index, 1);
      setProfileData({ ...profileData, education: newEducation });
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...profileData.experience];
    newExperience[index][field] = value;
    
    // If current is checked, clear end date
    if (field === 'current' && value === true) {
      newExperience[index].endDate = '';
    }
    
    setProfileData({ ...profileData, experience: newExperience });
  };

  const handleAddExperience = () => {
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, { company: '', position: '', description: '', startDate: '', endDate: '', current: false }]
    });
  };

  const handleRemoveExperience = (index) => {
    if (profileData.experience.length > 1) {
      const newExperience = [...profileData.experience];
      newExperience.splice(index, 1);
      setProfileData({ ...profileData, experience: newExperience });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (completionPercentage < 100) {
      alert('Please complete your profile (100%) before proceeding.');
      return;
    }
    
    setSaving(true);
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...profileData,
        profileCompleted: true,
        updatedAt: new Date()
      });
      
      router.push('/jobs');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Please complete your profile to get personalized job recommendations
          </p>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Profile Completion: {completionPercentage}%
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            <div className="mt-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Skills *</h2>
            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill (e.g., JavaScript, Python, Project Management)"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                    >
                      <span className="sr-only">Remove {skill}</span>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Interests *</h2>
            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add an interest (e.g., AI, Web Development, Data Science)"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
                    >
                      <span className="sr-only">Remove {interest}</span>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Education *</h2>
            
            {profileData.education.map((edu, index) => (
              <div key={index} className="mt-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
                  {profileData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree *
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Year *
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2099"
                      value={edu.startYear}
                      onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Year (or expected)
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2099"
                      value={edu.endYear}
                      onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Education
              </button>
            </div>
          </div>

          {/* Experience (Optional) */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Experience (Optional - Not required for profile completion)</h2>
            
            {profileData.experience.map((exp, index) => (
              <div key={index} className="mt-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
                  {profileData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center h-full">
                      <input
                        id={`current-${index}`}
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                  </div>
                  
                  {!exp.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddExperience}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Experience
              </button>
            </div>
          </div>

          {/* Add profile insights section */}
          {profileInsights && completionPercentage > 50 && (
            <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-800">AI Profile Insights</h3>
              
              {profileInsights.skillGaps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-indigo-700">Skill Gaps</h4>
                  <p className="mt-1 text-sm text-indigo-600">
                    Consider adding these in-demand skills: {profileInsights.skillGaps.join(', ')}
                  </p>
                </div>
              )}
              
              {profileInsights.recommendedSkills.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-indigo-700">Recommended Skills</h4>
                  <p className="mt-1 text-sm text-indigo-600">
                    Based on your interests, these skills would enhance your profile: {profileInsights.recommendedSkills.join(', ')}
                  </p>
                </div>
              )}
              
              {profileInsights.careerPaths.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-indigo-700">Potential Career Paths</h4>
                  <p className="mt-1 text-sm text-indigo-600">
                    Your profile is well-suited for: {profileInsights.careerPaths.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="pt-5 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving || completionPercentage < 100}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  completionPercentage < 100 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {saving ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper functions for profile analysis
function getCommonSkillGaps(userSkills) {
  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  
  // Common in-demand skills
  const inDemandSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning',
    'Data Analysis', 'Cloud Computing', 'AWS', 'DevOps', 'Docker'
  ];
  
  return inDemandSkills.filter(skill => 
    !userSkillsLower.some(userSkill => 
      skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
    )
  ).slice(0, 3); // Return top 3 gaps
}

function getRecommendedSkills(userSkills, userInterests) {
  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  const userInterestsLower = userInterests.map(i => i.toLowerCase());
  
  // Map interests to related skills
  const interestToSkills = {
    'web development': ['React', 'Vue.js', 'Angular', 'Node.js', 'Express'],
    'data science': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL'],
    'artificial intelligence': ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    'mobile development': ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    'cloud computing': ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker'],
    'cybersecurity': ['Network Security', 'Ethical Hacking', 'Cryptography']
  };
  
  // Collect recommended skills based on interests
  let recommendedSkills = [];
  
  userInterestsLower.forEach(interest => {
    for (const [key, skills] of Object.entries(interestToSkills)) {
      if (interest.includes(key) || key.includes(interest)) {
        recommendedSkills = [...recommendedSkills, ...skills];
      }
    }
  });
  
  // Filter out skills the user already has
  return [...new Set(recommendedSkills)].filter(skill => 
    !userSkillsLower.some(userSkill => 
      skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
    )
  ).slice(0, 3); // Return top 3 recommendations
}

function getCareerPathSuggestions(profileData) {
  const { skills, interests, education } = profileData;
  
  // Simple career path suggestions based on skills and interests
  const careerPaths = [];
  
  const skillsLower = skills.map(s => s.toLowerCase());
  const interestsLower = interests.map(i => i.toLowerCase());
  
  // Check for web development path
  if (skillsLower.some(s => ['javascript', 'html', 'css', 'react', 'angular', 'vue'].includes(s)) ||
      interestsLower.some(i => i.includes('web'))) {
    careerPaths.push('Web Development');
  }
  
  // Check for data science path
  if (skillsLower.some(s => ['python', 'r', 'statistics', 'machine learning', 'data'].includes(s)) ||
      interestsLower.some(i => i.includes('data') || i.includes('analytics'))) {
    careerPaths.push('Data Science');
  }
  
  // Check for AI/ML path
  if (skillsLower.some(s => ['machine learning', 'deep learning', 'tensorflow', 'pytorch', 'ai'].includes(s)) ||
      interestsLower.some(i => i.includes('ai') || i.includes('machine learning'))) {
    careerPaths.push('Artificial Intelligence');
  }
  
  // Check for mobile development
  if (skillsLower.some(s => ['android', 'ios', 'swift', 'kotlin', 'react native', 'flutter'].includes(s)) ||
      interestsLower.some(i => i.includes('mobile') || i.includes('app'))) {
    careerPaths.push('Mobile App Development');
  }
  
  return careerPaths.slice(0, 2); // Return top 2 career paths
}

function getProfileStrengths(profileData) {
  const strengths = [];
  
  if (profileData.skills.length >= 5) {
    strengths.push('Diverse skill set');
  }
  
  if (profileData.education.some(edu => edu.degree.toLowerCase().includes('master') || 
                                       edu.degree.toLowerCase().includes('phd'))) {
    strengths.push('Advanced education');
  }
  
  if (profileData.experience.length >= 2) {
    strengths.push('Good work experience');
  }
  
  return strengths;
}

function getProfileWeaknesses(profileData) {
  const weaknesses = [];
  
  if (profileData.skills.length < 3) {
    weaknesses.push('Limited skill set');
  }
  
  if (profileData.experience.length === 0) {
    weaknesses.push('No work experience');
  }
  
  return weaknesses;
} 