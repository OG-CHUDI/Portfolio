import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  image: string;
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MealPlanner',
    description: 'Weekly meal planning simplified with smart recipe suggestions',
    fullDescription: 'A comprehensive meal planning application that helps users plan their weekly meals in minutes. Features include recipe suggestions, shopping list generation, and nutritional tracking.',
    category: 'Web Development',
    image: '/images/project-mealplanner.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    link: 'https://mealplanner-main.vercel.app/',
  },
  {
    id: 2,
    title: 'S.O.S Study OS',
    description: 'AI-powered study companion with Pomodoro and insights',
    fullDescription: 'A distraction-free productivity system featuring Pomodoro sessions, streak tracking, and AI that understands study patterns. Built to help students stay consistent and study smarter.',
    category: 'AI Solutions',
    image: '/images/project-sos.png',
    tags: ['React', 'AI Integration', 'TypeScript', 'Tailwind'],
    link: 'https://s-o-s101.vercel.app/',
  },
  {
    id: 3,
    title: 'VoiceNote AI',
    description: 'Turn voice notes into clear summaries with AI',
    fullDescription: 'An AI-powered voice transcription tool that converts audio recordings into clean transcripts, AI summaries, and key points in seconds. Powered by Whisper and Claude.',
    category: 'AI Solutions',
    image: '/images/project-voicenote.png',
    tags: ['OpenAI', 'Whisper API', 'React', 'TypeScript'],
    link: 'https://voicenoteai-main.vercel.app/',
  },
  {
    id: 4,
    title: 'AI SaaS Platform',
    description: 'Modern AI-powered SaaS landing page design',
    fullDescription: 'A comprehensive UI/UX design for an AI-powered SaaS platform. Features a modern dark theme with orange accents, intuitive navigation, and engaging visual hierarchy optimized for conversions.',
    category: 'UI/UX Design',
    image: '/images/project-ai-saas.png',
    tags: ['Figma', 'UI Design', 'Prototyping', 'Design System'],
    link: 'https://www.figma.com/design/c6GkmDcpNntDru41qYMqoP/AI-SAAS',
  },
  {
    id: 5,
    title: 'Expense Voyage',
    description: 'Travel booking platform with expense tracking',
    fullDescription: 'A complete travel booking platform design featuring flight search, hotel bookings, and integrated expense tracking. Designed with a clean, modern interface focused on user experience.',
    category: 'UI/UX Design',
    image: '/images/project-expense-voyage.png',
    tags: ['Figma', 'Web Design', 'User Research', 'Components'],
    link: 'https://www.figma.com/design/BHJx06ihgyXFnfPp0zd8Vs/Expense-Voyage',
  },
];

const categories = ['All', 'Web Development', 'AI Solutions', 'UI/UX Design'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Selected Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A curated selection of projects showcasing design, development, and AI innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
              }`}
              data-cursor-hover
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
                data-cursor-hover
              >
                <div className="glass rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/50 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/50 border border-white/10">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal - Wide Horizontal Layout */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent
          showCloseButton={false}
          className="
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[95vw] max-w-5xl
            max-h-[90vh]
            bg-[#0d0d0d] border border-white/10
            rounded-2xl p-0 overflow-hidden
            flex flex-col
            shadow-2xl shadow-black/60
          "
        >
          {selectedProject && (
            <>
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
                  {String(selectedProject.id).padStart(2, '0')} | {selectedProject.category}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  data-cursor-hover
                >
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* Body — side by side on md+, stacked on mobile */}
              <div className="flex flex-col md:flex-row flex-1 min-h-0">

                {/* LEFT — Project screenshot */}
                <div className="relative w-full md:w-[55%] h-56 md:h-auto flex-shrink-0 overflow-hidden bg-black">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle vignette on the right edge for a seamless blend */}
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#0d0d0d] hidden md:block" />
                </div>

                {/* RIGHT — Info panel */}
                <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 md:p-8">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/25 mb-4">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-6">
                      {selectedProject.fullDescription}
                    </p>

                    {/* Tech stack */}
                    <div className="mb-8">
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-3">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-white/60 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Preview CTA */}
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/20"
                      data-cursor-hover
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Preview →
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
