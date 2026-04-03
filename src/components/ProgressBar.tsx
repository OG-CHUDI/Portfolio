import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    // Get all section IDs
    const sectionElements = document.querySelectorAll('section[id]');
    const sectionIds = Array.from(sectionElements).map((el) => el.id);
    setSections(sectionIds);
  }, []);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Side Progress Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${section}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span className="text-xs text-white/0 group-hover:text-white/50 transition-all duration-300 opacity-0 group-hover:opacity-100">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-amber-500 transition-colors" />
          </a>
        ))}
      </div>
    </>
  );
}
