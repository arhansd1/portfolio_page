import personalInfo from './personal_info.json';
import experienceData from './experience.json';
import projectsData from './projects.json';
import skillsData from './skills.json';

const portfolioData = {
  ...personalInfo,
  experience: experienceData.experience,
  projects: projectsData.projects,
  skills: skillsData.skills
};

export default portfolioData; 