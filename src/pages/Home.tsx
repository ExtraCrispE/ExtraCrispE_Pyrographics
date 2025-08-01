import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Flame, 
  Zap, 
  Heart, 
  Award, 
  Users, 
  Clock,
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Handle hash-based section scrolling
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # symbol
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [location.hash]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay fails
      });
    }
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: 'general'
    });
  };

  const stats = [
    { icon: Flame, number: '150+', label: 'Pieces Created' },
    { icon: Award, number: '15+', label: 'Awards Won (reddit counts, Right?)' },
    { icon: Users, number: '75+', label: 'Happy Clients' },
    { icon: Clock, number: '10+', label: 'Years Experience' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@extracrispepyro.com',
      description: 'Send me a message anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Call for urgent inquiries'
    },
    {
      icon: MapPin,
      title: 'Undisclosed',
      details: 'The PNW, where the wood is abundant',
      description: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '24-48 hours',
      description: 'Typical response time'
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const projectTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'commission', label: 'Custom Commission' },
    { value: 'purchase', label: 'Purchase Inquiry' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'press', label: 'Press & Media' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900/20" />
          <div className="absolute inset-0 wood-texture" />
          
          {/* Animated embers */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500 rounded-full ember-glow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="heading-primary text-white mb-6">
              "It's not burnt,
              <span className="block text-transparent bg-clip-text fire-gradient">
                It's ExtracrispE"
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Handcrafted pyrography that transforms wood into timeless stories, 
              one burn at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/gallery" className="btn-primary">
                Step into the Flames
              </Link>
              <Link to="/shop" className="btn-secondary">
                Shop Artwork
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-orange-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary text-white mb-4">
              Crafted with Passion
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each piece tells a unique story through the ancient art of pyrography
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Flame,
                title: "Handcrafted Excellence",
                description: "Every piece is meticulously burned by hand using traditional pyrography techniques"
              },
              {
                icon: Zap,
                title: "Custom Commissions",
                description: "Bring your vision to life with personalized artwork tailored to your story"
              },
              {
                icon: Heart,
                title: "Timeless Beauty",
                description: "Created to last generations, each piece becomes a cherished heirloom"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="heading-tertiary text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary text-white mb-4">
              Featured Artwork
            </h2>
            <p className="text-gray-400 text-lg">
              A glimpse into the world of pyrographic artistry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <Flame className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Featured Artwork {item}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/gallery" className="btn-primary">
              Step into the Flames
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-secondary text-white mb-6">
                The Artist Behind
                <span className="block text-transparent bg-clip-text fire-gradient">
                  The Flame
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Welcome to my world of pyrographic artistry, where each piece is born from the 
                dance between fire and wood, creating timeless stories that speak to the soul.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  Master Pyrographer
                </span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  Custom Commissions
                </span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  Artist Enthusist
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg wood-texture flex items-center justify-center">
                <div className="text-center text-white">
                  <Flame className="w-24 h-24 mx-auto mb-4 text-orange-500 ember-glow" />
                  <p className="text-lg">Artist Portrait</p>
                  <p className="text-sm text-gray-400">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary text-white mb-6">
              My Journey with Fire
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Pyrography chose me as much as I chose it. What began as curiosity about an ancient art form 
              has evolved into a passionate pursuit of capturing life's essence through controlled flame. 
              Each piece I create is a meditation, a conversation between artist, tool, and medium that 
              results in something greater than the sum of its parts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-lg p-8 mb-16"
          >
            <h3 className="heading-tertiary text-white mb-4">
              The Art of Pyrography
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Pyrography, literally meaning "writing with fire," is an ancient art form that transforms 
              wood into canvas through controlled burning. Using specialized tools heated to precise 
              temperatures, I create intricate designs that celebrate the natural beauty of wood grain 
              while adding layers of artistic expression.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Every piece begins with careful selection of wood, considering grain patterns, density, 
              and natural characteristics that will enhance the final artwork. The burning process 
              requires patience, precision, and an intimate understanding of how different woods 
              respond to heat and pressure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-secondary text-white mb-8">
              My Philosophy
            </h2>
            <blockquote className="text-2xl text-gray-300 italic leading-relaxed mb-8">
              "Art is not what you see, but what you make others see. Through pyrography, 
              I strive to reveal the hidden stories within each piece of wood, bringing 
              forth beauty that speaks to the heart and stands the test of time."
            </blockquote>
            <div className="w-24 h-0.5 bg-orange-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's discuss your custom pyrography project 
              or answer any questions you might have.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="heading-tertiary text-white mb-8">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors resize-vertical"
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="loading-spinner" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="heading-tertiary text-white mb-8">
                Contact Information
              </h3>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {info.title}
                      </h4>
                      <p className="text-orange-400 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Commission Process */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg p-6 mb-8"
              >
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Flame className="w-5 h-5 text-orange-500 mr-2" />
                  Commission Process
                </h4>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">1.</span>
                    <span>Initial consultation to discuss your vision and requirements</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">2.</span>
                    <span>Detailed proposal with timeline and pricing</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">3.</span>
                    <span>50% deposit to begin work, sketches and approval process</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">4.</span>
                    <span>Creation process with progress updates</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">5.</span>
                    <span>Final payment and delivery of your custom artwork</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Follow My Work
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;