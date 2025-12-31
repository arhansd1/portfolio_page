import experienceData from './experience.json';
import projectsData from './projects.json';

// Extract experiences for selection
const ALL_EXPERIENCES = experienceData.experience.map(exp => ({
  type: 'experience',
  id: exp.id,
  name: exp.role,
  company: exp.company,
  period: exp.period,
  display: `${exp.company} - ${exp.role}`
}));

// Extract projects for selection
const ALL_PROJECTS = projectsData.projects.map(proj => ({
  type: 'project',
  id: proj.id,
  name: proj.name,
  period: proj.period,
  display: proj.name
}));

// Export individual arrays
export { ALL_EXPERIENCES, ALL_PROJECTS };

// Export combined array
export const ALL_ITEMS = [...ALL_EXPERIENCES, ...ALL_PROJECTS];