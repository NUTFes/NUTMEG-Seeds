import React, { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import s from './UsersBackgroundAnimation.module.css';

const UserBackgroundAnimation = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className={s.BackgroundAnimationContainer}>
      <Particles
        id='tsparticles'
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#FFF9F5',
            },
          },
          particles: {
            number: {
              value: 15,
              density: {
                enable: true,
                value_area: 1262.6362266116362,
              },
            },
            color: {
              value: '#fff',
            },
            shape: {
              type: 'image',
              stroke: {
                width: 0,
                color: '#000000',
              },

              image: {
                src: 'Union.svg',
                width: 200,
                height: 200,
              },
            },
            opacity: {
              value: 1,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 150,
              random: false,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: true,
              },
            },
            line_linked: {
              enable: false,
              distance: 256.54592973848366,
              color: '#ffffff',
              opacity: 0.4,
              width: 2,
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'bottom',
              random: false,
              straight: true,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'bubble',
              },
              onclick: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 0.5,
                },
              },
              bubble: {
                distance: 400,
                size: 4,
                duration: 0.3,
                opacity: 1,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default UserBackgroundAnimation;
