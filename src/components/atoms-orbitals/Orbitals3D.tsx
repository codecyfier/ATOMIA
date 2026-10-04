import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Play, Pause, Eye } from 'lucide-react';

type OrbitalType = '1s' | '2px' | '2py' | '2pz' | '3dz2' | '3dx2y2' | '3dxy';

export const Orbitals3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedOrbital, setSelectedOrbital] = useState<OrbitalType>('2pz');
  const [autoRotate, setAutoRotate] = useState(true);
  const [showAxes, setShowAxes] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbitalGroupRef = useRef<THREE.Group | null>(null);
  const axesRef = useRef<THREE.AxesHelper | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 320;
    const height = 360;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.5, 3.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x22d3ee, 1.6);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.4);
    dirLight2.position.set(-5, -6, -5);
    scene.add(dirLight2);

    // Group for orbital meshes
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);
    orbitalGroupRef.current = orbitalGroup;

    // Axes helper
    const axes = new THREE.AxesHelper(3.2);
    scene.add(axes);
    axesRef.current = axes;

    // Touch & Mouse Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !orbitalGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      orbitalGroupRef.current.rotation.y += deltaX * 0.01;
      orbitalGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Render loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && orbitalGroupRef.current && !isDragging) {
        orbitalGroupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      if (mount) mount.innerHTML = '';
    };
  }, []);

  // Update orbital geometry whenever selectedOrbital changes
  useEffect(() => {
    const group = orbitalGroupRef.current;
    if (!group) return;

    // Clear previous children
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
      else if (child.material) child.material.dispose();
    }

    const posMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan (+ phase)
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    const negMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, // Violet (- phase)
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    // Central tiny nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    group.add(nucleus);

    if (selectedOrbital === '1s') {
      const sphereGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const mesh = new THREE.Mesh(sphereGeo, posMaterial);
      group.add(mesh);
    } else if (selectedOrbital === '2pz') {
      // Top lobe (+z)
      const lobeGeo1 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo1.scale(0.85, 0.85, 1.45);
      const topMesh = new THREE.Mesh(lobeGeo1, posMaterial);
      topMesh.position.set(0, 0, 1.25);
      group.add(topMesh);

      // Bottom lobe (-z)
      const lobeGeo2 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo2.scale(0.85, 0.85, 1.45);
      const botMesh = new THREE.Mesh(lobeGeo2, negMaterial);
      botMesh.position.set(0, 0, -1.25);
      group.add(botMesh);
    } else if (selectedOrbital === '2px') {
      // Right lobe (+x)
      const lobeGeo1 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo1.scale(1.45, 0.85, 0.85);
      const m1 = new THREE.Mesh(lobeGeo1, posMaterial);
      m1.position.set(1.25, 0, 0);
      group.add(m1);

      // Left lobe (-x)
      const lobeGeo2 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo2.scale(1.45, 0.85, 0.85);
      const m2 = new THREE.Mesh(lobeGeo2, negMaterial);
      m2.position.set(-1.25, 0, 0);
      group.add(m2);
    } else if (selectedOrbital === '2py') {
      // Upper lobe (+y)
      const lobeGeo1 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo1.scale(0.85, 1.45, 0.85);
      const m1 = new THREE.Mesh(lobeGeo1, posMaterial);
      m1.position.set(0, 1.25, 0);
      group.add(m1);

      // Lower lobe (-y)
      const lobeGeo2 = new THREE.SphereGeometry(1.2, 32, 32);
      lobeGeo2.scale(0.85, 1.45, 0.85);
      const m2 = new THREE.Mesh(lobeGeo2, negMaterial);
      m2.position.set(0, -1.25, 0);
      group.add(m2);
    } else if (selectedOrbital === '3dz2') {
      // 2 major lobes along Z (+ phase)
      const zLobeGeo1 = new THREE.SphereGeometry(1.1, 32, 32);
      zLobeGeo1.scale(0.7, 0.7, 1.4);
      const z1 = new THREE.Mesh(zLobeGeo1, posMaterial);
      z1.position.set(0, 0, 1.25);
      group.add(z1);

      const zLobeGeo2 = new THREE.SphereGeometry(1.1, 32, 32);
      zLobeGeo2.scale(0.7, 0.7, 1.4);
      const z2 = new THREE.Mesh(zLobeGeo2, posMaterial);
      z2.position.set(0, 0, -1.25);
      group.add(z2);

      // Torus ring in XY plane (- phase)
      const torusGeo = new THREE.TorusGeometry(1.0, 0.28, 20, 36);
      const torus = new THREE.Mesh(torusGeo, negMaterial);
      group.add(torus);
    } else if (selectedOrbital === '3dx2y2' || selectedOrbital === '3dxy') {
      // 4 lobes cloverleaf
      const isDiagonal = selectedOrbital === '3dxy';
      const offset = 1.15;

      const lobeGeo = new THREE.SphereGeometry(0.9, 24, 24);

      // 4 lobes with alternating phases
      const l1 = new THREE.Mesh(lobeGeo.clone().scale(1.2, 0.75, 0.75), posMaterial);
      const l2 = new THREE.Mesh(lobeGeo.clone().scale(1.2, 0.75, 0.75), posMaterial);
      const l3 = new THREE.Mesh(lobeGeo.clone().scale(0.75, 1.2, 0.75), negMaterial);
      const l4 = new THREE.Mesh(lobeGeo.clone().scale(0.75, 1.2, 0.75), negMaterial);

      if (!isDiagonal) {
        l1.position.set(offset, 0, 0);
        l2.position.set(-offset, 0, 0);
        l3.position.set(0, offset, 0);
        l4.position.set(0, -offset, 0);
      } else {
        const d = offset * 0.707;
        l1.position.set(d, d, 0);
        l2.position.set(-d, -d, 0);
        l3.position.set(-d, d, 0);
        l4.position.set(d, -d, 0);
      }

      group.add(l1, l2, l3, l4);
    }
  }, [selectedOrbital]);

  useEffect(() => {
    if (axesRef.current) {
      axesRef.current.visible = showAxes;
    }
  }, [showAxes]);

  const orbitalDescriptions: Record<OrbitalType, { name: string; quantum: string; desc: string }> = {
    '1s': {
      name: 'Orbitale 1s',
      quantum: 'n = 1, l = 0, ml = 0',
      desc: 'Sphère à symétrie parfaite sans plan nodal. Représente l\'état fondamental de l\'hydrogène et la couche K.',
    },
    '2px': {
      name: 'Orbitale 2px',
      quantum: 'n = 2, l = 1, ml = ±1',
      desc: 'Deux lobes orientés le long de l\'axe horizontal X, séparés par un plan nodal (plan YZ) où la probabilité de présence est nulle.',
    },
    '2py': {
      name: 'Orbitale 2py',
      quantum: 'n = 2, l = 1, ml = ±1',
      desc: 'Deux lobes orientés le long de l\'axe vertical Y, avec un plan nodal dans le plan XZ.',
    },
    '2pz': {
      name: 'Orbitale 2pz',
      quantum: 'n = 2, l = 1, ml = 0',
      desc: 'Deux lobes orientés selon l\'axe Z (avant/arrière), avec un plan nodal XY.',
    },
    '3dz2': {
      name: 'Orbitale 3d_z²',
      quantum: 'n = 3, l = 2, ml = 0',
      desc: 'Composée de deux lobes principaux le long de l\'axe Z entourés d\'un anneau toroïdal dans le plan XY de phase opposée.',
    },
    '3dx2y2': {
      name: 'Orbitale 3d_x²-y²',
      quantum: 'n = 3, l = 2, ml = +2',
      desc: 'Quatre lobes en forme de trèfle alignés directement sur les axes X et Y, séparés par deux plans nodaux diagonaux.',
    },
    '3dxy': {
      name: 'Orbitale 3d_xy',
      quantum: 'n = 3, l = 2, ml = -2',
      desc: 'Quatre lobes bissecteurs des quadrants du plan XY, alternant les signes de fonction d\'onde (+/-).',
    },
  };

  const activeInfo = orbitalDescriptions[selectedOrbital];

  return (
    <div className="flex flex-col space-y-4">
      {/* Selector pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {(Object.keys(orbitalDescriptions) as OrbitalType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedOrbital(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition min-h-[38px] cursor-pointer ${
              selectedOrbital === type
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 3D Canvas Box */}
      <div className="relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div ref={mountRef} className="w-full h-[360px] cursor-grab active:cursor-grabbing touch-none" />

        {/* Floating Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/60 shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl transition min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer ${
              autoRotate ? 'text-cyan-400 bg-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
            title={autoRotate ? 'Pause rotation' : 'Reprendre rotation'}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowAxes(!showAxes)}
            className={`p-2 rounded-xl transition min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer ${
              showAxes ? 'text-purple-400 bg-purple-500/20' : 'text-slate-400 hover:text-white'
            }`}
            title="Afficher/Masquer les axes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Legend / Phase signs */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <span className="text-slate-300">Phase (+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500" />
            <span className="text-slate-300">Phase (-)</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{activeInfo.name}</h3>
          <span className="font-mono text-xs text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-800/40">
            {activeInfo.quantum}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          {activeInfo.desc}
        </p>
      </div>
    </div>
  );
};
