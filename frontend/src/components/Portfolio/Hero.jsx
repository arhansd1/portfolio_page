import { Github, Linkedin, Mail, ChevronDown, ArrowRight , Code } from 'lucide-react';
import { skillIcons } from '../../utils/iconConfigs';
import { portfolioData } from '../../data/portfolioData';

export default function Hero({ sectionRef }) {
  const socialLinks = [
    { icon: <Github size={20} />, url: portfolioData.github },
    { icon: <Linkedin size={20} />, url: portfolioData.linkedin },
    { icon: <Mail size={20} />, url: `mailto:${portfolioData.email}` }
  ];

  // Using skillIcons from iconConfigs

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center px-12 py-12 md:py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full">
        <div className="grid grid-rows-1 lg:grid-rows-2 gap-3">
          {/* TOP Column - Introduction */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
                {portfolioData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xl md:text-2xl font-light text-gray-300">{portfolioData.title}</p>
                <span className="text-blue-400 hidden sm:inline">•</span>
                <p className="text-base sm:text-lg text-blue-400">{portfolioData.college}</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed mt-6">
              {portfolioData.about}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                View My Work
                <ArrowRight className="ml-2" size={16} />
              </a>
              <a 
                href={`mailto:${portfolioData.email}`}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all text-sm sm:text-base"
              >
                Get In Touch
              </a>
            </div>
            
            <div className="flex space-x-4 pt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-all hover:-translate-y-0.5"
                  aria-label={link.icon.type.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* BOTTOM Column - Skills */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-100 flex items-center">
              <Code className="w-6 h-6 mr-2 text-purple-400" />
              Technical Skills
            </h2>
            <div className="space-y-6">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category}>
                  <div className="flex items-center mb-3">
                    {skillIcons[category]}
                    <h3 className="ml-2 text-lg font-medium text-gray-300">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-sm bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 hover:bg-gray-700/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={28} className="text-gray-500" />
      </div>
    </section>
  );
}