export interface MoleculeAtom {
  element: string;
  x: number;
  y: number;
  z: number;
  radius?: number;
  color?: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  iupacName: string;
  molarMass: number;
  vseprGeometry: string;
  bondAngle: string;
  bondLengths: string;
  polarity: 'Polaire' | 'Apolaire';
  dipoleMoment: string;
  description: string;
  atoms: MoleculeAtom[];
  bonds: [number, number, number?][]; // [indexA, indexB, bondOrder]
}

export const ATOM_COLORS: Record<string, string> = {
  H: '#f8fafc', // blanc
  C: '#334155', // gris foncé
  O: '#ef4444', // rouge
  N: '#3b82f6', // bleu
  S: '#eab308', // jaune
  P: '#f97316', // orange
  Cl: '#10b981', // vert
  F: '#14b8a6', // turquoise
  Br: '#991b1b', // rouge foncé
  I: '#7c3aed', // violet
};

export const ATOM_RADII: Record<string, number> = {
  H: 0.35,
  C: 0.70,
  N: 0.65,
  O: 0.60,
  F: 0.55,
  P: 1.00,
  S: 1.02,
  Cl: 0.99,
  Br: 1.14,
  I: 1.33,
};

export const MOLECULES_LIST: MoleculeData[] = [
  {
    id: 'h2o',
    name: 'Eau',
    formula: 'H₂O',
    iupacName: 'Oxydane',
    molarMass: 18.015,
    vseprGeometry: 'AX₂E₂ (Coudée / Angulaire)',
    bondAngle: '104.5°',
    bondLengths: 'O–H : 95.8 pm',
    polarity: 'Polaire',
    dipoleMoment: '1.85 D (très élevé)',
    description: "Molécule essentielle à la vie terrestre. Ses liaisons hydrogène lui confèrent une tension superficielle et des points de changement d'état exceptionnels.",
    atoms: [
      { element: 'O', x: 0, y: 0.117, z: 0 },
      { element: 'H', x: -0.757, y: -0.469, z: 0 },
      { element: 'H', x: 0.757, y: -0.469, z: 0 },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
    ],
  },
  {
    id: 'co2',
    name: 'Dioxyde de carbone',
    formula: 'CO₂',
    iupacName: 'Dioxyde de carbone',
    molarMass: 44.01,
    vseprGeometry: 'AX₂ (Linéaire)',
    bondAngle: '180.0°',
    bondLengths: 'C=O : 116.3 pm',
    polarity: 'Apolaire',
    dipoleMoment: '0.00 D (moments symétriques opposés)',
    description: "Gaz à effet de serre majeur issu de la respiration et des combustions d'hydrocarbures, absorbé par les plantes lors de la photosynthèse.",
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0 },
      { element: 'O', x: -1.16, y: 0, z: 0 },
      { element: 'O', x: 1.16, y: 0, z: 0 },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
    ],
  },
  {
    id: 'ch4',
    name: 'Méthane',
    formula: 'CH₄',
    iupacName: 'Méthane',
    molarMass: 16.04,
    vseprGeometry: 'AX₄ (Tétraédrique régulière)',
    bondAngle: '109.5°',
    bondLengths: 'C–H : 108.7 pm',
    polarity: 'Apolaire',
    dipoleMoment: '0.00 D (symétrie tétraédrique parfaite)',
    description: "Le plus simple des alcanes et le composant principal du gaz naturel. Gaz à fort pouvoir réchauffant.",
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0 },
      { element: 'H', x: 0.63, y: 0.63, z: 0.63 },
      { element: 'H', x: -0.63, y: -0.63, z: 0.63 },
      { element: 'H', x: -0.63, y: 0.63, z: -0.63 },
      { element: 'H', x: 0.63, y: -0.63, z: -0.63 },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ],
  },
  {
    id: 'nh3',
    name: 'Ammoniac',
    formula: 'NH₃',
    iupacName: 'Azane',
    molarMass: 17.031,
    vseprGeometry: 'AX₃E (Pyramidale trigonale)',
    bondAngle: '107.8°',
    bondLengths: 'N–H : 101.7 pm',
    polarity: 'Polaire',
    dipoleMoment: '1.47 D',
    description: "Gaz piquant produit à l'échelle de mégatonnes par le procédé Haber-Bosch pour synthétiser les engrais agricoles.",
    atoms: [
      { element: 'N', x: 0, y: 0.12, z: 0 },
      { element: 'H', x: 0, y: -0.28, z: 0.94 },
      { element: 'H', x: 0.81, y: -0.28, z: -0.47 },
      { element: 'H', x: -0.81, y: -0.28, z: -0.47 },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
    ],
  },
  {
    id: 'c2h5oh',
    name: 'Éthanol',
    formula: 'C₂H₅OH',
    iupacName: 'Éthanol',
    molarMass: 46.069,
    vseprGeometry: 'AX₄ tétraédrique (C) + AX₂E₂ coudée (O)',
    bondAngle: 'C-C-O : ~109.5°, C-O-H : 104.5°',
    bondLengths: 'C–C : 154 pm, C–O : 143 pm',
    polarity: 'Polaire',
    dipoleMoment: '1.69 D',
    description: "Alcool courant soluble dans l'eau en toutes proportions, utilisé comme solvant universel de chimie, désinfectant et biocarburant.",
    atoms: [
      { element: 'C', x: -1.2, y: 0.1, z: 0 },
      { element: 'C', x: 0.2, y: -0.3, z: 0 },
      { element: 'O', x: 1.1, y: 0.8, z: 0 },
      { element: 'H', x: 2.0, y: 0.5, z: 0 },
      { element: 'H', x: -1.5, y: 0.6, z: 0.9 },
      { element: 'H', x: -1.5, y: 0.6, z: -0.9 },
      { element: 'H', x: -1.7, y: -0.9, z: 0 },
      { element: 'H', x: 0.4, y: -0.9, z: 0.9 },
      { element: 'H', x: 0.4, y: -0.9, z: -0.9 },
    ],
    bonds: [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 1],
      [0, 4, 1],
      [0, 5, 1],
      [0, 6, 1],
      [1, 7, 1],
      [1, 8, 1],
    ],
  },
  {
    id: 'c6h6',
    name: 'Benzène',
    formula: 'C₆H₆',
    iupacName: 'Cyclohexa-1,3,5-triène (Arène)',
    molarMass: 78.11,
    vseprGeometry: 'AX₃ (Planaire trigonale circulaire)',
    bondAngle: '120.0°',
    bondLengths: 'C–C aromatique : 139.7 pm',
    polarity: 'Apolaire',
    dipoleMoment: '0.00 D (plan parfait)',
    description: "Le prototype de la molécule aromatique avec son nuage délocalisé de 6 électrons π selon la règle de Hückel.",
    atoms: [
      { element: 'C', x: 1.4, y: 0, z: 0 },
      { element: 'C', x: 0.7, y: 1.21, z: 0 },
      { element: 'C', x: -0.7, y: 1.21, z: 0 },
      { element: 'C', x: -1.4, y: 0, z: 0 },
      { element: 'C', x: -0.7, y: -1.21, z: 0 },
      { element: 'C', x: 0.7, y: -1.21, z: 0 },
      { element: 'H', x: 2.48, y: 0, z: 0 },
      { element: 'H', x: 1.24, y: 2.15, z: 0 },
      { element: 'H', x: -1.24, y: 2.15, z: 0 },
      { element: 'H', x: -2.48, y: 0, z: 0 },
      { element: 'H', x: -1.24, y: -2.15, z: 0 },
      { element: 'H', x: 1.24, y: -2.15, z: 0 },
    ],
    bonds: [
      [0, 1, 2],
      [1, 2, 1],
      [2, 3, 2],
      [3, 4, 1],
      [4, 5, 2],
      [5, 0, 1],
      [0, 6, 1],
      [1, 7, 1],
      [2, 8, 1],
      [3, 9, 1],
      [4, 10, 1],
      [5, 11, 1],
    ],
  },
  {
    id: 'glucose',
    name: 'D-Glucose',
    formula: 'C₆H₁₂O₆',
    iupacName: '(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal',
    molarMass: 180.16,
    vseprGeometry: 'Cycle pyranose en conformation chaise',
    bondAngle: 'C-C-C : ~109.5°',
    bondLengths: 'C–C : ~152 pm, C–O : ~142 pm',
    polarity: 'Polaire',
    dipoleMoment: 'Très polaire (multiples liaisons H)',
    description: "Sucre simple universel et carburant énergétique primaire des cellules vivantes via la glycolyse et la respiration mitochondriale.",
    atoms: [
      { element: 'C', x: 1.3, y: 0.5, z: 0.2 },
      { element: 'C', x: 0.8, y: 1.8, z: -0.3 },
      { element: 'C', x: -0.7, y: 1.9, z: -0.1 },
      { element: 'C', x: -1.4, y: 0.6, z: 0.4 },
      { element: 'C', x: -0.7, y: -0.7, z: -0.1 },
      { element: 'O', x: 0.7, y: -0.6, z: 0.3 },
      { element: 'O', x: 2.6, y: 0.4, z: -0.2 },
      { element: 'O', x: 1.5, y: 2.8, z: 0.3 },
      { element: 'O', x: -1.3, y: 3.0, z: -0.7 },
      { element: 'O', x: -2.7, y: 0.6, z: -0.1 },
      { element: 'C', x: -1.2, y: -1.9, z: 0.6 },
      { element: 'O', x: -0.6, y: -3.1, z: 0.1 },
    ],
    bonds: [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 1],
      [3, 4, 1],
      [4, 5, 1],
      [5, 0, 1],
      [0, 6, 1],
      [1, 7, 1],
      [2, 8, 1],
      [3, 9, 1],
      [4, 10, 1],
      [10, 11, 1],
    ],
  },
  {
    id: 'aspirin',
    name: 'Aspirine',
    formula: 'C₉H₈O₄',
    iupacName: 'Acide 2-(acétyloxy)benzoïque',
    molarMass: 180.16,
    vseprGeometry: 'Noyau benzénique plan + groupements ester et carboxylique',
    bondAngle: 'Cycles : 120°, esters : 109.5° / 120°',
    bondLengths: 'C=O : 121 pm, C–O : 136 pm',
    polarity: 'Polaire',
    dipoleMoment: '1.92 D',
    description: "Le médicament antalgique et antipyrétique le plus prescrit au monde, inhibiteur irréversible des cyclooxygénases COX-1 et COX-2.",
    atoms: [
      { element: 'C', x: -1.2, y: 0, z: 0 },
      { element: 'C', x: -0.5, y: 1.2, z: 0 },
      { element: 'C', x: 0.9, y: 1.2, z: 0 },
      { element: 'C', x: 1.6, y: 0, z: 0 },
      { element: 'C', x: 0.9, y: -1.2, z: 0 },
      { element: 'C', x: -0.5, y: -1.2, z: 0 },
      { element: 'C', x: 3.1, y: 0.1, z: 0 },
      { element: 'O', x: 3.7, y: 1.1, z: 0 },
      { element: 'O', x: 3.7, y: -1.1, z: 0 },
      { element: 'O', x: 1.6, y: 2.4, z: 0 },
      { element: 'C', x: 2.9, y: 2.6, z: 0 },
      { element: 'O', x: 3.6, y: 1.7, z: 0 },
      { element: 'C', x: 3.4, y: 4.0, z: 0 },
    ],
    bonds: [
      [0, 1, 2],
      [1, 2, 1],
      [2, 3, 2],
      [3, 4, 1],
      [4, 5, 2],
      [5, 0, 1],
      [3, 6, 1],
      [6, 7, 2],
      [6, 8, 1],
      [2, 9, 1],
      [9, 10, 1],
      [10, 11, 2],
      [10, 12, 1],
    ],
  },
  {
    id: 'caffeine',
    name: 'Caféine',
    formula: 'C₈H₁₀N₄O₂',
    iupacName: '1,3,7-triméthylxanthine',
    molarMass: 194.19,
    vseprGeometry: 'Système bicyclique purine quasi-planaire',
    bondAngle: 'Hétérocycles : ~108°–120°',
    bondLengths: 'C=O : 122 pm, C=N : 132 pm',
    polarity: 'Polaire',
    dipoleMoment: '3.64 D',
    description: "Alcaloïde stimulant du système nerveux central, antagoniste compétitif des récepteurs de l'adénosine présent dans le café et le thé.",
    atoms: [
      { element: 'N', x: -0.8, y: 1.4, z: 0 },
      { element: 'C', x: 0.5, y: 1.4, z: 0 },
      { element: 'N', x: 1.2, y: 0.3, z: 0 },
      { element: 'C', x: 0.5, y: -0.9, z: 0 },
      { element: 'C', x: -0.8, y: -0.9, z: 0 },
      { element: 'C', x: -1.5, y: 0.3, z: 0 },
      { element: 'O', x: 1.1, y: 2.5, z: 0 },
      { element: 'O', x: -2.7, y: 0.3, z: 0 },
      { element: 'N', x: 0.9, y: -2.2, z: 0 },
      { element: 'C', x: -0.2, y: -2.9, z: 0 },
      { element: 'N', x: -1.2, y: -2.2, z: 0 },
      { element: 'C', x: -1.5, y: 2.7, z: 0 },
      { element: 'C', x: 2.6, y: 0.3, z: 0 },
      { element: 'C', x: 2.3, y: -2.6, z: 0 },
    ],
    bonds: [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 1],
      [3, 4, 2],
      [4, 5, 1],
      [5, 0, 1],
      [1, 6, 2],
      [5, 7, 2],
      [3, 8, 1],
      [8, 9, 1],
      [9, 10, 2],
      [10, 4, 1],
      [0, 11, 1],
      [2, 12, 1],
      [8, 13, 1],
    ],
  },
];
