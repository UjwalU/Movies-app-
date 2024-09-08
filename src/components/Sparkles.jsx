"use client";
import { useEffect, useState, useId } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticlesEngine = async (engine) => {
      await loadSlim(engine);
      setInit(true);
    };

    initParticlesEngine();
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container) => {
    if (container) {
      console.log(container);
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={`opacity-0 ${className}`}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "#0d47a1",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: particleColor || "#ffffff",
              },
              move: {
                enable: true,
                speed: speed || 1,
                outModes: {
                  default: "out",
                },
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  enable: true,
                  speed: speed || 4,
                  startValue: "random",
                },
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
