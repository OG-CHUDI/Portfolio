import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, Lightbulb, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const philosophyPoints = [
  {
    icon: Lightbulb,
    title: 'Human-Centric Design',
    description: 'Every interface starts with understanding the human behind the screen.',
  },
  {
    icon: Target,
    title: 'Precision Engineering',
    description: 'Clean code architecture that scales with ambition.',
  },
  {
    icon: Sparkles,
    title: 'AI-Augmented Creativity',
    description: 'Leveraging machine intelligence to amplify creative potential.',
  },
  {
    icon: Rocket,
    title: 'Future-Forward Vision',
    description: 'Building for tomorrow while solving problems of today.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax effect for background elements
      gsap.to('.about-bg-element', {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="about-bg-element absolute top-1/4 -left-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="about-bg-element absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                The Story
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                More than code.
                <br />
                <span className="text-gradient">More than design.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-lg text-white/70 leading-relaxed"
            >
              <p>
                My journey began at the intersection of visual arts and technology. 
                What started as curiosity about how things look evolved into a deep 
                fascination with how things work — and ultimately, how they feel.
              </p>
              <p>
                Today, I operate at the convergence of{' '}
                <span className="text-amber-400">generative AI</span> and{' '}
                <span className="text-orange-400">human-centric design</span>. 
                My work is defined by systems that learn, interfaces that breathe, 
                and experiences that linger in memory.
              </p>
              <p>
                As I venture deeper into{' '}
                <span className="text-yellow-400">agentic AI systems</span>, 
                I'm exploring how autonomous agents can augment human creativity 
                and solve complex problems through intelligent collaboration.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Delivered' },
                { value: '10+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Philosophy Cards */}
          <div className="space-y-4">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="glass rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                      <point.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
