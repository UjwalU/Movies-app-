import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
/* import NumberTicker from './NumberTicker'; */
import '../App.css';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, [onFinish]);

  const GradualSpacing = ({
    text,
    duration = 0.5,
    delayMultiple = 0.04,
    framerProps = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    className,
  }) => {
    return (
      <div className="flex justify-center">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: 0 }}
            className={className}
          >
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: i * delayMultiple }}
              >
                {char === ' ' ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  GradualSpacing.propTypes = {
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
    delayMultiple: PropTypes.number,
    framerProps: PropTypes.shape({
      hidden: PropTypes.object,
      visible: PropTypes.object,
    }),
    className: PropTypes.string,
  };

  return (
    <div className="splash-screen flex items-center justify-center flex-col h-screen">
      <GradualSpacing text="MovieStreamer" className="splash-title" />
    </div>
  );
};

SplashScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default SplashScreen;
