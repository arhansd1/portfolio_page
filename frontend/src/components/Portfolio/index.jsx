import { useRef } from 'react';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';

export default function Portfolio({ sectionRefs }) {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);

  // Update parent refs
  if (sectionRefs) {
    sectionRefs.about = aboutRef.current;
    sectionRefs.experience = experienceRef.current;
    sectionRefs.projects = projectsRef.current;
    sectionRefs.skills = skillsRef.current;
  }

  return (
    <div className="w-2/3 overflow-y-auto border-r border-gray-800">
      <div className="max-w-2xl mx-auto">
        <Hero sectionRef={aboutRef} />
        <Experience sectionRef={experienceRef} />
        <Projects sectionRef={projectsRef} />
        <Skills sectionRef={skillsRef} />
      </div>
    </div>
  );
}