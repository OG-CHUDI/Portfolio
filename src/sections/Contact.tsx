import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Send, 
  Linkedin, 
  Github, 
  Twitter, 
  Mail,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/chudi-ogunjiofor-4b6426292/',
    color: 'hover:bg-[#0077B5]/20 hover:text-[#0077B5]',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/OG-CHUDI',
    color: 'hover:bg-white/10 hover:text-white',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://x.com/Chudi_001',
    color: 'hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:chudi.ogunjiofor@gmail.com',
    color: 'hover:bg-amber-500/20 hover:text-amber-400',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/public/pdf/CHUDI OGUNJIOFOR UI CV .pdf';
    link.download = 'Chudi_Ogunjiofor_CV.pdf';
    link.click();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        // @ts-ignore
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-white/80">Let's Connect</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Let's build something{' '}
            <span className="text-gradient">meaningful</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'm always open to discussing 
            new opportunities, creative ideas, or potential collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-6 text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50"
                data-cursor-hover
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Info */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <a 
                      href="mailto:hello@chudi.dev" 
                      className="text-white hover:text-amber-400 transition-colors"
                    >
                      chudi.ogunjiofor@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Location</p>
                    <p className="text-white">Remote / Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Download */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Download My CV</h3>
              <p className="text-white/60 text-sm mb-6">
                Get a comprehensive overview of my skills, experience, and achievements.
              </p>
              <Button
                onClick={downloadCV}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 rounded-xl transition-all duration-300"
                data-cursor-hover
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-3 p-4 rounded-xl glass transition-all duration-300 group ${social.color}`}
                    data-cursor-hover
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.name}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div>
                <p className="text-white font-medium">Available for freelance</p>
                <p className="text-sm text-white/50">Open to new projects and collaborations</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-32 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient">Chudi</span>
            </div>
            <p className="text-white/40 text-sm">
              © 2026 Chudi Ogunjiofor. Crafted with passion and code.
            </p>
            <div className="flex items-center gap-6">
              <a href="#hero" className="text-sm text-white/40 hover:text-white transition-colors">
                Back to top
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
