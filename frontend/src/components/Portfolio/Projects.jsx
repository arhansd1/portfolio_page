import { portfolioData } from '../../data/portfolioData';

export default function Projects({ sectionRef }) {
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-12 py-20">
      <h2 className="text-4xl font-light mb-12 tracking-tight">Projects</h2>
      <div className="space-y-8">
        {portfolioData.projects.map((proj, i) => (
          <div key={i} className="border border-gray-800 p-6 hover:border-gray-700 transition-colors">
            <h3 className="text-xl font-light mb-2">{proj.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{proj.tech}</p>
            <p className="text-gray-300 leading-relaxed">{proj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}