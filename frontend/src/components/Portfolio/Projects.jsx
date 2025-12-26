import { portfolioData } from '../../data/portfolioData';
import { Github, ExternalLink, Code } from 'lucide-react';

export default function Projects({ sectionRef }) {
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-gray-100 flex items-center">
          <Code className="w-8 h-8 mr-3 text-purple-400" />
          Featured Projects
        </h2>
        
        <div className="space-y-6">
          {portfolioData.projects.map((project, i) => (
            <div 
              key={i} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-gray-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
                {project.period && (
                  <div className="flex items-center text-sm text-gray-400">
                    {project.period}
                  </div>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-medium text-white mb-1">
                {project.name}
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {project.tools_used && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-purple-400" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(project.tools_used || {}).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(project.github || project.website_link) && (
                <div className="flex flex-wrap gap-3 pt-4 mt-4 border-t border-gray-800">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  )}
                  
                  {project.website_link && (
                    <a 
                      href={project.website_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}