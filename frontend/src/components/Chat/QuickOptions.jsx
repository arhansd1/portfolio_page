export default function QuickOptions({ onOptionClick, show }) {
  const quickOptions = [
    { label: "Experience", section: "experience" },
    { label: "Projects", section: "projects" },
    { label: "Skills", section: "skills" },
    { label: "Contact", section: "about" }
  ];

  if (!show) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {quickOptions.map((opt, i) => (
        <button
          key={i}
          onClick={() => onOptionClick(opt)}
          className="px-4 py-2 text-sm border border-gray-700 hover:border-gray-500 transition-colors"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}