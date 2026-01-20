/* ============================================
   KIDSAI - 3D GRAPHICS WITH THREE.JS
   Creates animated 3D elements for the hero section
   ============================================ */

let scene, camera, renderer, animationId;

const init3D = () => {
    // Get canvas element
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // ========== SCENE SETUP ==========
    scene = new THREE.Scene();
    scene.background = null; // Transparent
    scene.fog = new THREE.Fog(0xffffff, 1000, 50);

    // ========== CAMERA SETUP ==========
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // ========== RENDERER SETUP ==========
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        precision: 'mediump', // Better performance
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio * 0.8); // Slightly lower for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // ========== LIGHTING ==========
    // Ambient light - provides base illumination
    const ambientLight = new THREE.AmbientLight(0x0066FF, 0.5);
    scene.add(ambientLight);

    // Directional light - creates shadows and depth
    const directionalLight = new THREE.DirectionalLight(0x00D9FF, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point light - adds color accent
    const pointLight = new THREE.PointLight(0xFF6B35, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // ========== CREATE 3D OBJECTS ==========
    createGears();
    createFloatingCubes();
    createNeuralNetwork();

    // ========== HANDLE WINDOW RESIZE ==========
    window.addEventListener('resize', onWindowResize, false);

    // ========== START ANIMATION LOOP ==========
    animate();
};

// ========== CREATE ROTATING GEARS ==========
const createGears = () => {
    const gearGroup = new THREE.Group();
    gearGroup.position.set(-2, 0, 0);

    // Gear 1 - Large central gear
    const gear1 = createGear(1.2, 12, 0x0066FF);
    gear1.position.set(0, 0.5, 0);
    gear1.castShadow = true;
    gear1.receiveShadow = true;
    gearGroup.add(gear1);

    // Gear 2 - Smaller gear (rotating opposite)
    const gear2 = createGear(0.7, 10, 0x00D9FF);
    gear2.position.set(2, 0, 0);
    gear2.castShadow = true;
    gear2.receiveShadow = true;
    gearGroup.add(gear2);

    // Gear 3 - Medium gear
    const gear3 = createGear(0.9, 11, 0xFF6B35);
    gear3.position.set(0, -1.5, 0);
    gear3.castShadow = true;
    gear3.receiveShadow = true;
    gearGroup.add(gear3);

    scene.add(gearGroup);

    // Store reference for animation
    scene.userData.gears = [
        { mesh: gear1, speed: 0.005 },
        { mesh: gear2, speed: -0.007 },
        { mesh: gear3, speed: 0.006 }
    ];
};

// ========== CREATE GEAR GEOMETRY ==========
const createGear = (radius, teeth, color) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const innerRadius = radius * 0.6;
    const outerRadius = radius;

    // Create gear vertices
    for (let i = 0; i < teeth * 2; i++) {
        const angle = (i / (teeth * 2)) * Math.PI * 2;
        const currentRadius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * currentRadius;
        const y = Math.sin(angle) * currentRadius;

        vertices.push(x, y, 0);
        vertices.push(x, y, 0.3); // Depth
    }

    // Create center hub
    const centerZ = 0;
    const hubVertexStart = vertices.length / 3;
    vertices.push(0, 0, centerZ);
    vertices.push(0, 0, 0.3);

    // Create indices (simplified)
    for (let i = 0; i < teeth * 2; i++) {
        const next = (i + 1) % (teeth * 2);
        indices.push(i, next, hubVertexStart);
        indices.push(i + teeth * 2, hubVertexStart + 1, next + teeth * 2);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.7,
        roughness: 0.3,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.3
    });

    return new THREE.Mesh(geometry, material);
};

// ========== CREATE FLOATING CUBES ==========
const createFloatingCubes = () => {
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(2, 0, 0);

    const colors = [0x0066FF, 0x00D9FF, 0xFF6B35, 0x00C853];

    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(colors[i]),
            metalness: 0.5,
            roughness: 0.4,
            emissive: new THREE.Color(colors[i]),
            emissiveIntensity: 0.2
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;

        // Position cubes in a circular pattern
        const angle = (i / 4) * Math.PI * 2;
        const distance = 1.5;
        cube.position.set(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance - 0.5,
            Math.cos(angle * 0.5) * distance * 0.5
        );

        cube.userData.originalPosition = cube.position.clone();
        cube.userData.angle = angle;
        cubeGroup.add(cube);
    }

    scene.add(cubeGroup);
    scene.userData.cubes = cubeGroup.children;
};

// ========== CREATE NEURAL NETWORK VISUALIZATION ==========
const createNeuralNetwork = () => {
    const networkGroup = new THREE.Group();
    networkGroup.position.set(0, 0, -1);

    const nodeCount = 8;
    const nodes = [];

    // Create nodes (spheres)
    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const y = Math.sin(angle) * 1.5;
        const z = Math.cos(angle * 0.5) * 0.5;

        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00D9FF,
            emissive: 0x00D9FF,
            emissiveIntensity: 0.8,
            metalness: 0.8,
            roughness: 0.2
        });

        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, z);
        node.castShadow = true;
        node.receiveShadow = true;
        networkGroup.add(node);
        nodes.push(node);
    }

    // Create connections (lines between nodes)
    for (let i = 0; i < nodes.length; i++) {
        // Connect to next node
        const next = (i + 1) % nodes.length;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(
            new Float32Array([
                nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                nodes[next].position.x, nodes[next].position.y, nodes[next].position.z
            ]),
            3
        ));

        const material = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            linewidth: 2,
            transparent: true,
            opacity: 0.5
        });

        const line = new THREE.Line(geometry, material);
        networkGroup.add(line);
    }

    scene.add(networkGroup);
    scene.userData.networkNodes = nodes;
};

// ========== ANIMATION LOOP ==========
const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Animate gears
    if (scene.userData.gears) {
        scene.userData.gears.forEach(gear => {
            gear.mesh.rotation.z += gear.speed;
        });
    }

    // Animate floating cubes
    if (scene.userData.cubes) {
        scene.userData.cubes.forEach((cube, index) => {
            // Floating motion
            const time = Date.now() * 0.001;
            const originalPos = cube.userData.originalPosition;
            const angle = cube.userData.angle;

            cube.position.x = originalPos.x + Math.sin(time + angle) * 0.3;
            cube.position.y = originalPos.y + Math.cos(time * 1.2 + angle) * 0.3;
            cube.position.z = originalPos.z + Math.sin(time * 0.8) * 0.2;

            // Rotation
            cube.rotation.x += 0.003;
            cube.rotation.y += 0.005;
            cube.rotation.z += 0.002;
        });
    }

    // Animate neural network nodes
    if (scene.userData.networkNodes) {
        const time = Date.now() * 0.001;
        scene.userData.networkNodes.forEach((node, index) => {
            const pulse = Math.sin(time + index) * 0.08 + 0.15;
            node.scale.set(pulse / 0.15, pulse / 0.15, pulse / 0.15);
        });
    }

    // Gentle camera movement
    const time = Date.now() * 0.0005;
    camera.position.x = Math.sin(time) * 0.5;
    camera.position.y = Math.cos(time * 0.7) * 0.3;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
};

// ========== HANDLE WINDOW RESIZE ==========
const onWindowResize = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

// ========== MOUSE INTERACTION ==========
const addMouseInteraction = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Subtle camera adjustment
        gsap.to(camera.position, {
            x: mouseX * 0.5,
            y: mouseY * 0.3,
            duration: 0.3,
            overwrite: 'auto'
        });
    });
};

// ========== CLEANUP ==========
const cleanup3D = () => {
    if (renderer) {
        renderer.dispose();
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onWindowResize);
    }
};

// ========== INITIALIZE ON PAGE LOAD ==========
window.addEventListener('load', () => {
    init3D();
    addMouseInteraction();
});

// ========== CLEANUP ON PAGE UNLOAD ==========
window.addEventListener('beforeunload', cleanup3D);

// ========== PAUSE ANIMATION ON TAB INACTIVE ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden && renderer) {
        cancelAnimationFrame(animationId);
    } else if (!document.hidden && renderer) {
        animate();
    }
});
