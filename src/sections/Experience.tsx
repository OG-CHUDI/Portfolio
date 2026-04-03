import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Senior UI/UX Designer',
    company: 'NOAGSC',
    location: 'Remote',
    duration: 'April 2025 - September 2025',
    type: 'Contract',
    description: 'Designed the complete UI/UX experience for a volunteer recruitment platform targeted at NYSC corpers and community members.',
    achievements: [
      'Designed end-to-end user experiences for web applications',
      'Built scalable design systems to ensure visual consistency and faster product iteration',
      'Produced wireframes, interactive prototypes, and high-fidelity UI designs using Figma',
      'Led end-to-end design from ideation to final delivery',
    ],
  },
  {
    id: 2,
    role: 'Lead UI/UX Designer & Product Designer',
    company: 'EduExcel',
    location: 'Remote',
    duration: 'October 2025 - January 2026',
    type: 'Contract',
    description: 'Worked closely with the product founder to design a mobile-first school management platform from concept to execution.',
    achievements: [
      'Designed user-centered layouts reflecting the client\'s brand and professional identity',
      'Collaborated closely with frontend developers to translate designs into functional interfaces',
      'Delivered design solutions that improved conversion rates, onboarding flows, and overall user satisfaction',
      'Managed multiple design projects simultaneously while meeting deadlines and maintaining quality standards',
    ],
  },
  {
    id: 3,
    role: 'Lead UI/UX Designer & Senior Frontend Engineer',
    company: 'Nibblets',
    location: 'Physical',
    duration: 'December 2025 - Present',
    type: 'Full-time',
    description: 'Designed and developed a personal website for a bakery and catering service to showcase their work.',
    achievements: [
      'Achieved 70% user satisfaction through usability testing and iterative improvements',
      'Created a scalable design system for consistency across digital platforms',
      'Focused on clean UI, information hierarchy, and engaging visual design',
      'Created a functional platform that supports service discovery and bookings',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Professional Journey
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A timeline of my professional growth and the impact I've made along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-orange-500/30 to-transparent md:-translate-x-px" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-6">
                  <div className="w-full h-full rounded-full bg-amber-500 border-4 border-[#02040a] shadow-lg shadow-amber-500/50" />
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="glass rounded-3xl p-6 md:p-8 hover:bg-white/[0.07] transition-all duration-500 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-amber-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 mb-6">{exp.description}</p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-medium text-white/40 mb-3 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-white/70"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education / Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Education & Certifications
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced Diploma In Software Engineering',
                institution: 'Aptech',
                year: '2026',
                description: 'Comprehensive software engineering program covering full-stack development',
              },
              {
                title: 'Web Development Intern',
                institution: 'Prodigy Infotech',
                year: '2025',
                description: 'Hands-on experience in modern web development practices',
              },
              {
                title: 'Certified Rookie Robotics Engineer',
                institution: 'U.S Space and Rocket Center',
                year: '2019',
                description: 'Robotics engineering fundamentals and practical applications',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white leading-tight">{item.title}</h4>
                  <span className="text-sm text-amber-400 flex-shrink-0 ml-2">{item.year}</span>
                </div>
                <p className="text-orange-400 text-sm mb-2">{item.institution}</p>
                <p className="text-white/50 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
