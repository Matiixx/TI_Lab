function Stars() {
  var scene, camera, renderer, material, particles, sprite, sphere;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-wrapper").appendChild(renderer.domElement);

    sprite = new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png"
    );

    material = new THREE.PointsMaterial({
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
      color: 0xffffff,
      size: 0.9,
    });

    const amount = 50000;
    const radius = 320;

    const positions = new Float32Array(amount * 3);

    const vector = new THREE.Vector3();

    for (let i = 0; i < amount; i++) {
      vector.x = (Math.random() * 2 - 1) * radius;
      vector.y = (Math.random() * 2 - 1) * radius;
      vector.z = 10;
      vector.toArray(positions, i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    window.addEventListener("resize", onWindowResize, false);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const time = Date.now() * 0.005;
    sphere.rotation.z = 0.002 * time;
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
