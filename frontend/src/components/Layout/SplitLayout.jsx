import { useState } from 'react';
import Portfolio from '../Portfolio';
import Chat from '../Chat';
import AnimatedBackground from '../Background/AnimatedBackground';

export default function SplitLayout() {
  const [sectionRefs] = useState({
    about: null,
    experience: null,
    projects: null,
    skills: null
  });

  const scrollToSection = (section) => {
    sectionRefs[section]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative flex h-screen bg-black text-gray-100 p-1 gap-1">
      <AnimatedBackground />
      <Portfolio sectionRefs={sectionRefs} />
      <Chat scrollToSection={scrollToSection} />
    </div>
  );
}