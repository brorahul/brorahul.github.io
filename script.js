// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 2000);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress Bar Animation
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.dataset.width;
                if (width) {
                    bar.style.width = width;
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Three.js Hero Geometry Animation
let scene, camera, renderer, heroMeshes;

function initHeroScene() {
    const container = document.getElementById('hero-3d');
    if (!container) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.064);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.35, 60);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    heroMeshes = [];
    const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.4,
        roughness: 0.35,
        emissive: 0x443300,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.92,
        wireframe: true
    });

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1.4, 0.3, 120, 16), material);
    torus.position.set(-2.2, 1.4, -0.6);
    scene.add(torus);
    heroMeshes.push(torus);

    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1.05), material);
    octa.position.set(2.4, 0.8, -1.2);
    scene.add(octa);
    heroMeshes.push(octa);

    const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92), material);
    icosa.position.set(0.5, -1.4, -1.6);
    scene.add(icosa);
    heroMeshes.push(icosa);

    const particles = new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: 0xffd700, size: 0.03, transparent: true, opacity: 0.35 })
    );

    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 24;
        particlePositions[i + 1] = (Math.random() - 0.5) * 14;
        particlePositions[i + 2] = (Math.random() - 0.5) * 24;
    }
    particles.geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    scene.add(particles);

    animateHeroScene();
}

function animateHeroScene() {
    requestAnimationFrame(animateHeroScene);

    if (heroMeshes) {
        heroMeshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.0015 + index * 0.0008;
            mesh.rotation.y += 0.0025 + index * 0.0009;
            mesh.rotation.z += 0.0007 + index * 0.0004;
        });
    }

    renderer.render(scene, camera);
}

function resizeHeroScene() {
    if (!renderer || !camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resizeHeroScene);

// Background Particles
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundParticles();
    initHeroScene();
    initCursor();
    initAnimations();
});

// Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

// Animation Triggers
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile menu toggle (if needed in future)
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}