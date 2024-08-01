// ParticleBackground.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./App.css"; // Import custom styles

const ParticleBackground = ({ containerRef }) => {
  const mountRef = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create particles
    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    camera.position.z = 1000;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleScroll = () => {
      if (containerRef.current) {
        const currentScrollY = containerRef.current.scrollTop;
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += (currentScrollY - positions[i + 3]) * 0.001;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      }
    };

    const containerElement = containerRef.current;
    containerElement.addEventListener("scroll", handleScroll);

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      containerElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);

  return <div className="particle-container" ref={mountRef} />;
};

export default ParticleBackground;
