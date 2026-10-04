import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MOLECULES_LIST, MoleculeData, ATOM_COLORS, ATOM_RADII } from '../../data/molecules';
import { RotateCw, Play, Pause, Compass, ZoomIn, ZoomOut, Info, Sparkles, ArrowLeft } from 'lucide-react';

type RenderMode = 'ball-and-stick' | 'space-filling' | 'wireframe';

interface Molecules3DViewProps {
  onBack?: () => void;
}

export const Molecules3DView: React.FC<Molecules3DViewProps> = ({ onBack }) => {
  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData>(MOLECULES_LIST[0]);
  const [renderMode, setRenderMode] = useState<RenderMode>('ball-and-stick');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showDipole, setShowDipole] = useState<boolean>(true);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const dipoleArrowRef = useRef<THREE.ArrowHelper | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = 400;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x22d3ee, 0.8);
    dirLight2.position.set(-6, -6, -4);
    scene.add(dirLight2);

    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Pointer events for rotation & zoom
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !moleculeGroupRef.current) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      moleculeGroupRef.current.rotation.y += dx * 0.01;
      moleculeGroupRef.current.rotation.x += dy * 0.01;

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(3, Math.min(18, cameraRef.current.position.z + e.deltaY * 0.005));
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && moleculeGroupRef.current && !isDragging) {
        moleculeGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (mount) mount.innerHTML = '';
    };
  }, []);

  // Re-build 3D molecule mesh whenever selectedMolecule or renderMode changes
  useEffect(() => {
    const group = moleculeGroupRef.current;
    const scene = sceneRef.current;
    if (!group || !scene) return;

    // Clear previous
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    if (dipoleArrowRef.current) {
      scene.remove(dipoleArrowRef.current);
      dipoleArrowRef.current = null;
    }

    const { atoms, bonds, polarity } = selectedMolecule;

    // Calculate center of mass to center the molecule
    let cx = 0, cy = 0, cz = 0;
    atoms.forEach((a) => {
      cx += a.x;
      cy += a.y;
      cz += a.z;
    });
    cx /= atoms.length;
    cy /= atoms.length;
    cz /= atoms.length;

    // Build Atoms
    atoms.forEach((atom) => {
      const colorHex = ATOM_COLORS[atom.element] || '#cbd5e1';
      const defaultRadius = ATOM_RADII[atom.element] || 0.6;

      let radius = defaultRadius * 0.7; // default for ball-and-stick
      if (renderMode === 'space-filling') {
        radius = defaultRadius * 1.5;
      } else if (renderMode === 'wireframe') {
        radius = defaultRadius * 0.35;
      }

      const sphereGeo = new THREE.SphereGeometry(radius, 28, 28);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.3,
        metalness: 0.15,
        wireframe: renderMode === 'wireframe',
      });

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(atom.x - cx, atom.y - cy, atom.z - cz);
      group.add(sphere);
    });

    // Build Bonds (if not space-filling)
    if (renderMode !== 'space-filling') {
      bonds.forEach(([idxA, idxB, order = 1]) => {
        const atomA = atoms[idxA];
        const atomB = atoms[idxB];
        if (!atomA || !atomB) return;

        const pA = new THREE.Vector3(atomA.x - cx, atomA.y - cy, atomA.z - cz);
        const pB = new THREE.Vector3(atomB.x - cx, atomB.y - cy, atomB.z - cz);

        const distance = pA.distanceTo(pB);
        const direction = new THREE.Vector3().subVectors(pB, pA).normalize();
        const midPoint = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);

        const bondRadius = renderMode === 'wireframe' ? 0.04 : 0.1;
        const bondGeo = new THREE.CylinderGeometry(bondRadius, bondRadius, distance, 16);
        const bondMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.4,
          metalness: 0.2,
          wireframe: renderMode === 'wireframe',
        });

        const cylinder = new THREE.Mesh(bondGeo, bondMat);
        cylinder.position.copy(midPoint);
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        group.add(cylinder);

        // If double bond, add parallel twin cylinder offset
        if (order >= 2 && renderMode === 'ball-and-stick') {
          const ortho = new THREE.Vector3(0, 0, 1).cross(direction).normalize().multiplyScalar(0.12);
          cylinder.position.add(ortho);

          const twinCylinder = new THREE.Mesh(bondGeo, bondMat);
          twinCylinder.position.copy(midPoint).sub(ortho);
          twinCylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
          group.add(twinCylinder);
        }
      });
    }

    // Dipole Moment Arrow overlay for polar molecules
    if (polarity === 'Polaire' && showDipole) {
      const dir = new THREE.Vector3(0, 1, 0); // General dipole direction
      const origin = new THREE.Vector3(0, -1.8, 0);
      const length = 2.4;
      const color = 0x22d3ee;
      const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color, 0.45, 0.28);
      scene.add(arrowHelper);
      dipoleArrowRef.current = arrowHelper;
    }
  }, [selectedMolecule, renderMode, showDipole]);

  return (
    <div className="flex flex-col space-y-5 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition min-h-[44px] min-w-[44px] cursor-pointer shrink-0"
              aria-label="Retour à l'accueil"
              title="Retour à l'accueil"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Visualiseur de Molécules en 3D
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Explorer les géométries VSEPR, angles de liaison, dipôles et conformations spatiales.
            </p>
          </div>
        </div>

        {/* Render mode switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setRenderMode('ball-and-stick')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer whitespace-nowrap ${
              renderMode === 'ball-and-stick'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Boules-Bâtons
          </button>
          <button
            onClick={() => setRenderMode('space-filling')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer whitespace-nowrap ${
              renderMode === 'space-filling'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Compact (Van der Waals)
          </button>
          <button
            onClick={() => setRenderMode('wireframe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer whitespace-nowrap ${
              renderMode === 'wireframe'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Filaire
          </button>
        </div>
      </div>

      {/* Molecule Selection Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {MOLECULES_LIST.map((mol) => (
          <button
            key={mol.id}
            onClick={() => setSelectedMolecule(mol)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              selectedMolecule.id === mol.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 scale-102'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{mol.name}</span>
            <span className="font-mono text-[10px] opacity-75">({mol.formula})</span>
          </button>
        ))}
      </div>

      {/* Main 3D Canvas Box */}
      <div className="relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div ref={mountRef} className="w-full h-[400px] cursor-grab active:cursor-grabbing touch-none" />

        {/* Floating action controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl transition min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer ${
              autoRotate ? 'text-cyan-400 bg-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
            title="Rotation automatique"
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowDipole(!showDipole)}
            className={`p-2 rounded-xl transition min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer ${
              showDipole && selectedMolecule.polarity === 'Polaire'
                ? 'text-purple-400 bg-purple-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Afficher/masquer vecteur dipolaire"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* CPK Color Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto max-w-[90%]">
          <span className="font-bold text-slate-400">CPK :</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white" /> H</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600" /> C</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> O</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> N</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> S</span>
        </div>
      </div>

      {/* Chemical & Geometric Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Identity & VSEPR */}
        <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                {selectedMolecule.iupacName}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedMolecule.formula}
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">{selectedMolecule.name}</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Masse molaire : <strong className="text-white">{selectedMolecule.molarMass} g/mol</strong>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400 block">Géométrie VSEPR :</span>
              <span className="font-bold text-cyan-300">{selectedMolecule.vseprGeometry}</span>
            </div>
          </div>
        </div>

        {/* Bond Angle & Lengths */}
        <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Liaisons & Angles
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Angles de liaison :</span>
              <span className="font-mono font-bold text-white">{selectedMolecule.bondAngle}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Longueurs caractéristiques :</span>
              <span className="font-mono font-bold text-white">{selectedMolecule.bondLengths}</span>
            </div>
          </div>
        </div>

        {/* Polarity & Description */}
        <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Polarité Moléculaire
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  selectedMolecule.polarity === 'Polaire'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {selectedMolecule.polarity}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-300 mt-1.5">
              Moment dipolaire μ = <strong>{selectedMolecule.dipoleMoment}</strong>
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 mt-2">
            {selectedMolecule.description}
          </p>
        </div>
      </div>
    </div>
  );
};
