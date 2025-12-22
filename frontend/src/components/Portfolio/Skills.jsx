import { portfolioData } from '../../data/portfolioData';

export default function Skills({ sectionRef }) {
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-12 py-20">
      <h2 className="text-4xl font-light mb-12 tracking-tight">Skills</h2>
      <div className="space-y-8">
        {Object.entries(portfolioData.skills).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-light mb-4 text-gray-400">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 border border-gray-800 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}