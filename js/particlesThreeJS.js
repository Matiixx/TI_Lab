function ParticlesThree() {
  var scene,
    camera,
    renderer,
    material,
    particles = [],
    sprite;

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("particles-js").appendChild(renderer.domElement);

    sprite = new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png"
    );

    for (let i = 0; i < 10000; i++) {
      particles.push(generatePoint());
    }
    particles.forEach((el) => {
      scene.add(el.point);
    });

    window.addEventListener("resize", onWindowResize, false);
  }

  function generatePoint() {
    const x = 2 * (window.innerWidth * Math.random() - window.innerWidth / 2);
    const y = 2 * (window.innerHeight * Math.random() - window.innerHeight / 2);
    const z = 100 * Math.random();
    var vertices = [];
    vertices.push(x, y, z);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    material = new THREE.PointsMaterial({
      size: Math.random() * 5,
      sizeAttenuation: true,
      map: sprite,
      opacity: Math.random() * (1.0 - 0.2) + 0.2,
      transparent: true,
      color: 0xffffff,
    });

    return {
      point: new THREE.Points(geometry, material),
      speed: Math.random() * 5,
    };
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    particles.forEach((el, index, object) => {
      el.point.position.z += el.speed;
      if (el.point.position.z >= 1001) {
        el.point.position.z = -100;
      }
    });
    // camera.position.z -= 1;
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init();
  animate();
}
