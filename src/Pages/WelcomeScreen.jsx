import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useLanguage from '../components/useLanguage';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-12 left-8 w-32 h-32 sm:w-44 sm:h-44 bg-nb-yellow border-2 border-fg rotate-6" />
    <div className="absolute bottom-12 right-8 w-32 h-32 sm:w-44 sm:h-44 bg-nb-blue border-2 border-fg -rotate-6" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--c-line)/0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgb(var(--c-line)/0.12)_2px,transparent_2px)] bg-[size:48px_48px]" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-200">
    <div className="relative p-2 sm:p-3 bg-surface border-2 border-fg shadow-md">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-fg" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const line1 = t("welcome.line1");
  const line2 = t("welcome.line2");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div 
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    {line1.map((word, i) => (
                      <React.Fragment key={i}>
                        <span data-aos="fade-right" data-aos-delay={200 + i * 200} className="inline-block px-2 text-fg">
                          {word}
                        </span>{' '}
                      </React.Fragment>
                    ))}
                  </div>
                  <div>
                    {line2.map((word, i) => (
                      <React.Fragment key={i}>
                        <span data-aos="fade-up" data-aos-delay={800 + i * 200} className="inline-block px-2 text-accent">
                          {word}
                        </span>{' '}
                      </React.Fragment>
                    ))}
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div 
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="https://lhizaadev.vercel.app/"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl bg-surface border-2 border-fg shadow-md px-4 py-2">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <span className="text-fg font-mono font-bold">
                      <TypewriterEffect text="lhizaadev.vercel.app" />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;