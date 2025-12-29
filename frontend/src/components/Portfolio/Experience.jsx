import portfolioData  from '../../data/portfolioData';
import { Calendar , Briefcase, Code} from 'lucide-react';
import { experienceIcons, techIcons } from '../../utils/iconConfigs';

export default function Experience({ sectionRef }) {

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-gray-100 flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-purple-400" />
          Professional Experience
        </h2>
        
        <div className="space-y-6">
          {portfolioData.experience.map((exp, i) => (
            <div 
              key={i} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-gray-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                  {experienceIcons[exp.type] || experienceIcons['default']}
                  <span className="ml-2 text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                    {exp.type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {exp.period}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-medium text-white mb-1">
                {exp.role}
              </h3>
              <p className="text-lg text-blue-300 mb-4">{exp.company}</p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {exp.description}
              </p>

              {exp.tech_used && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-purple-400" />
                    Tech Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(exp.tech_used).map((tech, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200"
                        title={exp.tech_used[tech]}
                      >
                        {techIcons[tech] || <Code className="w-3.5 h-3.5 mr-1.5 text-gray-400" />}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}