import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveSky() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 35, 75);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. Interactive 3D Quantum Wave Grid ---
    const gridCols = 80;
    const gridRows = 55;
    const numParticles = gridCols * gridRows;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const initialY = new Float32Array(numParticles);

    const color1 = new THREE.Color(0x6366f1); // Electric Indigo
    const color2 = new THREE.Color(0x8b5cf6); // Quantum Violet
    const color3 = new THREE.Color(0x38bdf8); // Cyber Cyan
    const color4 = new THREE.Color(0x10b981); // Emerald Recovery

    let idx = 0;
    const spacingX = 2.4;
    const spacingZ = 2.2;
    const offsetX = (gridCols * spacingX) / 2;
    const offsetZ = (gridRows * spacingZ) / 2;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = c * spacingX - offsetX;
        const z = r * spacingZ - offsetZ;
        const y = Math.sin(c * 0.15) * 2 + Math.cos(r * 0.15) * 2;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        initialY[idx] = y;

        // Gradient interpolation
        const mixRatio = c / gridCols;
        const tempColor = new THREE.Color();
        if (mixRatio < 0.5) {
          tempColor.lerpColors(color1, color2, mixRatio * 2);
        } else {
          tempColor.lerpColors(color2, color3, (mixRatio - 0.5) * 2);
        }

        // Add occasional emerald spark nodes
        if (Math.random() < 0.03) {
          tempColor.copy(color4);
        }

        colors[idx * 3] = tempColor.r;
        colors[idx * 3 + 1] = tempColor.g;
        colors[idx * 3 + 2] = tempColor.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular soft particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(180,200,255,0.8)");
    gradient.addColorStop(0.7, "rgba(99,102,241,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveParticles = new THREE.Points(geometry, material);
    scene.add(waveParticles);

    // --- 2. Floating Financial Constellation Nodes & Connecting Rays ---
    const numStars = 45;
    const starPositions = new Float32Array(numStars * 3);
    const starVelocities = [];

    for (let i = 0; i < numStars; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 160;
      starPositions[i * 3 + 1] = Math.random() * 40 + 5;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      starVelocities.push({
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.03,
        vz: (Math.random() - 0.5) * 0.05,
      });
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.8,
      color: 0xb0a6ff,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- 3. Dynamic Connecting Beams ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const maxLines = 60;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // --- Mouse Interaction State ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (e) => {
      mouseX = (e.clientX - windowHalfX) * 0.06;
      mouseY = (e.clientY - windowHalfY) * 0.06;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- Resize Handler ---
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation based on mouse movement
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.8;
      camera.position.y = 35 - targetY * 0.4;
      camera.lookAt(0, 0, 0);

      // Undulate wave grid
      const posAttr = waveParticles.geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < numParticles; i++) {
        const u = i % gridCols;
        const v = Math.floor(i / gridCols);
        
        // Multi-frequency hydrodynamic wave function
        const wave =
          Math.sin(u * 0.18 + elapsedTime * 1.5) * 3.5 +
          Math.cos(v * 0.18 + elapsedTime * 1.2) * 3.5 +
          Math.sin((u + v) * 0.1 + elapsedTime * 0.8) * 2.0;

        array[i * 3 + 1] = wave;
      }
      posAttr.needsUpdate = true;

      // Animate floating constellation stars
      const starPosAttr = starField.geometry.attributes.position;
      const starArr = starPosAttr.array;
      let lineIdx = 0;
      const linePosAttr = lineSegments.geometry.attributes.position;
      const lineArr = linePosAttr.array;

      for (let i = 0; i < numStars; i++) {
        starArr[i * 3] += starVelocities[i].vx;
        starArr[i * 3 + 1] += starVelocities[i].vy;
        starArr[i * 3 + 2] += starVelocities[i].vz;

        // Boundaries wrap
        if (Math.abs(starArr[i * 3]) > 80) starVelocities[i].vx *= -1;
        if (starArr[i * 3 + 1] < 2 || starArr[i * 3 + 1] > 45) starVelocities[i].vy *= -1;
        if (Math.abs(starArr[i * 3 + 2]) > 50) starVelocities[i].vz *= -1;

        // Connect nearby nodes with laser lines
        for (let j = i + 1; j < numStars; j++) {
          const dx = starArr[i * 3] - starArr[j * 3];
          const dy = starArr[i * 3 + 1] - starArr[j * 3 + 1];
          const dz = starArr[i * 3 + 2] - starArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 22 && lineIdx < maxLines) {
            lineArr[lineIdx * 6] = starArr[i * 3];
            lineArr[lineIdx * 6 + 1] = starArr[i * 3 + 1];
            lineArr[lineIdx * 6 + 2] = starArr[i * 3 + 2];

            lineArr[lineIdx * 6 + 3] = starArr[j * 3];
            lineArr[lineIdx * 6 + 4] = starArr[j * 3 + 1];
            lineArr[lineIdx * 6 + 5] = starArr[j * 3 + 2];
            lineIdx++;
          }
        }
      }

      // Clear remaining lines
      for (let k = lineIdx; k < maxLines; k++) {
        lineArr[k * 6] = 0;
        lineArr[k * 6 + 1] = 0;
        lineArr[k * 6 + 2] = 0;
        lineArr[k * 6 + 3] = 0;
        lineArr[k * 6 + 4] = 0;
        lineArr[k * 6 + 5] = 0;
      }

      starPosAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {/* Luxury atmospheric vignette and radial blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090c]/30 via-transparent to-[#08090c] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090c_80%)] pointer-events-none" />
    </div>
  );
}
