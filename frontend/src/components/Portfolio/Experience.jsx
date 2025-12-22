import { portfolioData } from '../../data/portfolioData';

export default function Experience({ sectionRef }) {
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-12 py-20">
      <h2 className="text-4xl font-light mb-12 tracking-tight">Experience</h2>
      <div className="space-y-12">
        {portfolioData.experience.map((exp, i) => (
          <div key={i} className="border-l-2 border-gray-800 pl-6 space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-2xl font-light">{exp.role}</h3>
              <span className="text-sm text-gray-500">{exp.period}</span>
            </div>
            <p className="text-gray-400">{exp.company}</p>
            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}