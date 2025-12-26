import { Briefcase, Calendar, Code, Cpu, Database, Server, Code2, CpuIcon, DatabaseIcon } from 'lucide-react';
import react from 'react';

export const experienceIcons = {
  'Internship': <Briefcase className="w-5 h-5 text-blue-400" />,
  'Full-time': <Briefcase className="w-5 h-5 text-green-400" />,
  'Contract': <Briefcase className="w-5 h-5 text-purple-400" />,
  'default': <Briefcase className="w-5 h-5 text-gray-400" />
};

export const skillIcons = {
  'Languages': <Code2 className="w-5 h-5 text-blue-400" />,
  'Frameworks': <Cpu className="w-5 h-5 text-purple-400" />,
  'Databases': <Database className="w-5 h-5 text-green-400" />,
  'Tools': <Server className="w-5 h-5 text-yellow-400" />
};

export const techIcons = {
  'Python': <Code className="w-4 h-4 text-blue-400" />,
  'LLMs': <Cpu className="w-4 h-4 text-purple-400" />,
  'SLMs': <Cpu className="w-4 h-4 text-green-400" />,
  'LangGraph': <Server className="w-4 h-4 text-yellow-400" />,
  'Playwright': <Code className="w-4 h-4 text-red-400" />,
  'Qdrant': <Database className="w-4 h-4 text-indigo-400" />,
  'mem0': <Server className="w-4 h-4 text-pink-400" />,
  'HTML': <Code className="w-4 h-4 text-orange-400" />,
  'CSS': <Code className="w-4 h-4 text-blue-400" />,
  'JavaScript': <Code className="w-4 h-4 text-yellow-400" />,
  'Node.js': <Code className="w-4 h-4 text-green-400" />,
  'Express': <Server className="w-4 h-4 text-gray-300" />,
  'SQL': <Database className="w-4 h-4 text-blue-500" />,
  'TypeScript': <Code className="w-4 h-4 text-blue-600" />,
  'Chrome Extension APIs': <Code className="w-4 h-4 text-yellow-500" />,
  'FastAPI': <Server className="w-4 h-4 text-green-500" />,
  'React.js': <Code className="w-4 h-4 text-blue-400" />,
  'Tailwind CSS': <Code className="w-4 h-4 text-cyan-400" />,
  'OpenAI Models': <Cpu className="w-4 h-4 text-purple-500" />,
  'Gemini': <Cpu className="w-4 h-4 text-yellow-500" />,
  'Grok': <Cpu className="w-4 h-4 text-red-500" />,
  'Unsloth': <Server className="w-4 h-4 text-green-600" />,
  'Automation Tools': <Cpu className="w-4 h-4 text-indigo-400" />
};

export default {
  experienceIcons,
  techIcons,
  skillIcons
};
