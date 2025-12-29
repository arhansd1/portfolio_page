export default function SelectionUI({ options, onSelect }) {
  // Group by type
  const experiences = options.filter(opt => opt.type === 'experience');
  const projects = options.filter(opt => opt.type === 'project');

  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 max-w-md border border-gray-700/50 shadow-lg">
        <p className="text-gray-300 text-sm mb-4 font-medium">
          Select what you'd like to explore:
        </p>
        
        <div className="space-y-4">
          {/* Experiences Section */}
          {experiences.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
                Experience
              </p>
              <div className="space-y-2">
                {experiences.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => onSelect(option)}
                    className="w-full text-left px-4 py-3 bg-gray-700/50 hover:bg-blue-600/30 rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-blue-500/50 group"
                  >
                    <div className="text-gray-200 text-sm font-medium group-hover:text-blue-300">
                      {option.company}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {option.name} • {option.period}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects Section */}
          {projects.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
                Projects
              </p>
              <div className="space-y-2">
                {projects.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => onSelect(option)}
                    className="w-full text-left px-4 py-3 bg-gray-700/50 hover:bg-purple-600/30 rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-purple-500/50 group"
                  >
                    <div className="text-gray-200 text-sm font-medium group-hover:text-purple-300">
                      {option.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {option.period}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}