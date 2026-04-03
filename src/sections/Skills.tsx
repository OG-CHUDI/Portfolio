import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Figma, 
  Code2, 
  Database, 
  Brain,
  Palette,
  Layers,
  Terminal,
  Cpu,
  Box,
  Calculator
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Design',
    icon: Palette,
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Figma', icon: Figma, level: 95 },
      { name: 'UI/UX Design', icon: Layers, level: 90 },
      { name: 'Design Systems', icon: Box, level: 85 },
      { name: 'Prototyping', icon: Palette, level: 88 },
    ],
  },
  {
    title: 'Frontend',
    icon: Code2,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'React', icon: Code2, level: 80 },
      { name: 'TypeScript', icon: Terminal, level: 80 },
      { name: 'Next.js', icon: Box, level: 70 },
      { name: 'Tailwind CSS', icon: Layers, level: 95 },
    ],
  },
  {
    title: 'Backend & Data',
    icon: Database,
    color: 'from-yellow-500 to-amber-500',
    skills: [
      { name: 'Node.js', icon: Terminal, level: 70 },
      { name: 'Python', icon: Terminal, level: 85 },
      { name: 'MongoDB', icon: Database, level: 78 },
    ],
  },
  {
    title: 'AI/ML',
    icon: Brain,
    color: 'from-amber-600 to-orange-600',
    skills: [
      { name: 'Python', icon: Terminal, level: 85 },
      { name: 'TensorFlow', icon: Cpu, level: 65 },
      { name: 'Calculus', icon: Calculator, level: 85 },
      { name: 'OpenAI API', icon: Brain, level: 65 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            The Arsenal
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Skills & <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A curated collection of tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass rounded-3xl p-8 hover:bg-white/[0.07] transition-all duration-500 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="group/skill"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-4 h-4 text-white/40 group-hover/skill:text-amber-400 transition-colors" />
                        <span className="text-white/80 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-white/40">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          {[
            { name: 'React', color: '#61DAFB' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'Node.js', color: '#339933' },
            { name: 'Python', color: '#3776AB' },
            { name: 'Figma', color: '#F24E1E' },
            { name: 'Git', color: '#F05032' },
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 rounded-full glass text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-default"
              style={{ borderColor: `${tech.color}30` }}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
