import Particles from "react-particles-js";
import { color } from "src/constants/color";

const Particle = () => {
  return (
    <>
      <Particles
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1
        }}
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false
              }
            },
            size: {
              value: 10,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3
              }
            },
            color: {
              value: `${color.PRIMARY}`
            },
            line_linked: {
              enable: false
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out"
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble"
              },
              onclick: {
                enable: true,
                mode: "repulse"
              }
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0
              },
              repulse: {
                distance: 400,
                duration: 4
              }
            }
          }
        }}
      />
    </>
  );
};

export default Particle;
