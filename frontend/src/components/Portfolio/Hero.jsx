import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function Hero({ sectionRef }) {
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-12 py-20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-light tracking-tight">{portfolioData.name}</h1>
          <p className="text-2xl text-gray-400 font-light">{portfolioData.title}</p>
        </div>
        
        <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
          {portfolioData.about}
        </p>
        
        <div className="flex gap-4 pt-4">
          <a href={`https://${portfolioData.github}`} target="_blank" rel="noopener noreferrer" 
             className="p-2 border border-gray-700 hover:border-gray-500 transition-colors">
            <Github size={20} />
          </a>
          <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noopener noreferrer"
             className="p-2 border border-gray-700 hover:border-gray-500 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${portfolioData.email}`}
             className="p-2 border border-gray-700 hover:border-gray-500 transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/4 animate-bounce">
        <ChevronDown size={24} className="text-gray-600" />
      </div>
    </section>
  );
}