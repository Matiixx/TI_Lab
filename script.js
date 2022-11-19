const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

document.addEventListener("DOMContentLoaded", () =>
  wait(250).then(() => {
    $("#loading-screen").removeClass("off-animate");
    wait(750).then(() => {
      $("#loading-screen").hide();
    });
  })
);

// particlesJS("particles-js", {
//   particles: {
//     number: {
//       value: 200,
//       density: {
//         enable: true,
//         value_area: 800,
//       },
//     },
//     color: {
//       value: "#ffffff",
//     },
//     shape: {
//       type: "circle",
//       stroke: {
//         width: 0,
//         color: "#000000",
//       },
//       polygon: {
//         nb_sides: 5,
//       },
//       image: {
//         src: "img/github.svg",
//         width: 100,
//         height: 100,
//       },
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1,
//         opacity_min: 0.1,
//         sync: false,
//       },
//     },
//     size: {
//       value: 3,
//       random: true,
//       anim: {
//         enable: false,
//         speed: 40,
//         size_min: 0.1,
//         sync: false,
//       },
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: "#ffffff",
//       opacity: 0.4,
//       width: 1,
//     },
//     move: {
//       enable: true,
//       speed: 6,
//       direction: "none",
//       random: false,
//       straight: false,
//       out_mode: "out",
//       bounce: false,
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200,
//       },
//     },
//   },
//   interactivity: {
//     detect_on: "canvas",
//     events: {
//       onhover: {
//         enable: true,
//         mode: "grab",
//       },
//       onclick: {
//         enable: true,
//         mode: "repulse",
//       },
//       resize: true,
//     },
//     modes: {
//       grab: {
//         distance: 140,
//         line_linked: {
//           opacity: 1,
//         },
//       },
//       bubble: {
//         distance: 400,
//         size: 40,
//         duration: 2,
//         opacity: 8,
//         speed: 3,
//       },
//       repulse: {
//         distance: 300,
//         duration: 1.0,
//       },
//       push: {
//         particles_nb: 4,
//       },
//       remove: {
//         particles_nb: 2,
//       },
//     },
//   },
//   retina_detect: true,
// });

$(".list-box > div:has(a:not(.disable))").mouseenter((e) => {
  $("#counter-background h1").text($(e.currentTarget).attr("labnumber"));
  if ($("#counter-background h1").text())
    $("#counter-background h1").addClass("hover");
});

$(".list-box > div:has(a:not(.disable))").mouseleave(() => {
  $("#counter-background h1").removeClass("hover");
});

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const canvasAnimation = [ParticlesThree, ParticlesP5, Stars, GridPoints, FlowField];
// const canvasAnimation = [FlowField];

canvasAnimation.random()();

var timeoutid = 0;
$(window).mousemove(() => {
  $(".list-box").removeClass("transparent");
  $("header").removeClass("transparent");
  clearTimeout(timeoutid);

  timeoutid = setTimeout(() => {
    $(".list-box").addClass("transparent");
    $("header").addClass("transparent");
  }, 3000);
});
