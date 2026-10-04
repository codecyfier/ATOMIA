export interface QuizQuestion {
  id: string;
  category: string;
  level: 'Secondaire' | 'Supérieur';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Tableau Périodique',
    level: 'Secondaire',
    question: "Quel est l'élément le plus électronégatif du tableau périodique ?",
    options: ['L\'Oxygène (O)', 'Le Chlore (Cl)', 'Le Fluor (F)', 'L\'Azote (N)'],
    correctIndex: 2,
    explanation: "Le Fluor (F) a une électronégativité de 3.98 sur l'échelle de Pauling, la plus élevée de tous les éléments chimiques connus."
  },
  {
    id: 'q2',
    category: 'Structure Atomique',
    level: 'Secondaire',
    question: "Combien d'électrons peut contenir au maximum une sous-couche p ?",
    options: ['2 électrons', '6 électrons', '10 électrons', '14 électrons'],
    correctIndex: 1,
    explanation: "Une sous-couche p (l=1) possède 3 cases quantiques (ml = -1, 0, +1). Selon le principe de Pauli, chaque case accueille 2 électrons de spins opposés, soit 2 × 3 = 6 électrons au maximum."
  },
  {
    id: 'q3',
    category: 'Liaisons & VSEPR',
    level: 'Secondaire',
    question: "Quelle est la géométrie VSEPR de la molécule d'eau H₂O ?",
    options: ['Linéaire (180°)', 'Triangulaire plane (120°)', 'Coudée / Angulaire (~104.5°)', 'Tétraédrique (109.5°)'],
    correctIndex: 2,
    explanation: "L'atome central d'oxygène possède 2 doublets liants (O-H) et 2 doublets non-liants (forme AX₂E₂). La forte répulsion des doublets non-liants referme l'angle de liaison à environ 104.5°."
  },
  {
    id: 'q4',
    category: 'Équilibres & Calculs',
    level: 'Secondaire',
    question: "Pour équilibrer l'équation C₃H₈ + ? O₂ ➔ 3 CO₂ + 4 H₂O, quel est le coefficient de l'oxygène O₂ ?",
    options: ['3', '4', '5', '7'],
    correctIndex: 2,
    explanation: "Dans les produits, il y a (3 × 2) + (4 × 1) = 10 atomes d'oxygène. Comme le dioxygène est une molécule diatomique O₂, il faut 10 / 2 = 5 molécules de O₂."
  },
  {
    id: 'q5',
    category: 'Acide-Base & Solutions',
    level: 'Secondaire',
    question: "Quel est le pH d'une solution d'acide chlorhydrique (acide fort) de concentration C = 0.001 mol/L ?",
    options: ['pH = 1', 'pH = 2', 'pH = 3', 'pH = 11'],
    correctIndex: 2,
    explanation: "Pour un acide fort totalement dissocié, pH = -log[H₃O⁺] = -log(10⁻³) = 3."
  },
  {
    id: 'q6',
    category: 'Structure Atomique',
    level: 'Supérieur',
    question: "Quelle est la configuration électronique fondamentale de l'atome de Fer (Z = 26) ?",
    options: ['[Ar] 4s² 3d⁶', '[Ar] 3d⁸', '[Ar] 4s¹ 3d⁷', '[Ar] 4p⁶'],
    correctIndex: 0,
    explanation: "Selon la règle de Klechkowski, l'argon [Ar] (18 e⁻) est complété par la sous-couche 4s (2 e⁻) puis par la sous-couche 3d (6 e⁻), soit [Ar] 4s² 3d⁶."
  },
  {
    id: 'q7',
    category: 'Chimie Organique',
    level: 'Secondaire',
    question: "Quel groupement fonctionnel caractérise les alcools ?",
    options: ['Le groupe carbonyle (C=O)', 'Le groupe hydroxyle (-OH)', 'Le groupe carboxyle (-COOH)', 'Le groupe amino (-NH₂)'],
    correctIndex: 1,
    explanation: "Les alcools comportent un groupement hydroxyle (-OH) fixé sur un atome de carbone tétragonal saturé (ex: CH₃-CH₂-OH)."
  },
  {
    id: 'q8',
    category: 'Tableau Périodique',
    level: 'Supérieur',
    question: "Quel est le seul métal de la classification qui se trouve à l'état liquide à 20°C et 1 atm ?",
    options: ['Le Gallium (Ga)', 'Le Césium (Cs)', 'Le Mercure (Hg)', 'Le Brome (Br)'],
    correctIndex: 2,
    explanation: "Le Mercure (Hg) fond à -38.83°C et est donc liquide à température ambiante. Le brome est également liquide à 20°C mais c'est un halogène non-métallique."
  },
  {
    id: 'q9',
    category: 'Équilibres & Calculs',
    level: 'Supérieur',
    question: "Selon l'équation de Gibbs ΔG = ΔH - T·ΔS, dans quelle condition une réaction endothermique (ΔH > 0) avec augmentation d'entropie (ΔS > 0) est-elle spontanée ?",
    options: ['À basse température uniquement', 'À haute température uniquement', 'À toute température', 'Jamais'],
    correctIndex: 1,
    explanation: "Pour que ΔG < 0 lorsque ΔH > 0 et ΔS > 0, le terme -T·ΔS doit l'emporter sur ΔH, ce qui nécessite une température T suffisamment élevée (T > ΔH / ΔS)."
  },
  {
    id: 'q10',
    category: 'Acide-Base & Solutions',
    level: 'Supérieur',
    question: "À 25°C, quel est le pH d'une solution équimolaire d'acide éthanoïque et d'éthanoate de sodium (pKa = 4.75) ?",
    options: ['pH = 7.00', 'pH = 4.75', 'pH = 1.00', 'pH = 9.50'],
    correctIndex: 1,
    explanation: "D'après l'équation d'Henderson-Hasselbalch : pH = pKa + log([Base]/[Acide]). À l'équimolarité, [Base] = [Acide], donc log(1) = 0 et pH = pKa = 4.75 (solution tampon optimale)."
  },
  {
    id: 'q11',
    category: 'Liaisons & VSEPR',
    level: 'Supérieur',
    question: "La molécule de dioxyde de carbone CO₂ est-elle polaire ou apolaire ?",
    options: [
      'Polaire, car les liaisons C=O sont polarisées',
      'Apolaire, car la géométrie est linéaire et les moments dipolaires s\'annulent',
      'Polaire en raison des doublets non-liants sur le carbone',
      'Amphotère'
    ],
    correctIndex: 1,
    explanation: "Bien que chaque liaison C=O soit fortement polarisée en raison de la différence d'électronégativité entre C (2.55) et O (3.44), la géométrie linéaire (AX₂, 180°) fait que la somme vectorielle des deux moments dipolaires est strictement nulle."
  },
  {
    id: 'q12',
    category: 'Structure Atomique',
    level: 'Secondaire',
    question: "Deux atomes isotopes possèdent obligatoirement :",
    options: [
      'Le même nombre de neutrons',
      'Le même nombre de protons (numéro atomique Z)',
      'Le même nombre de masse A',
      'La même radioactivité'
    ],
    correctIndex: 1,
    explanation: "Par définition, des isotopes ont le même numéro atomique Z (même nombre de protons, donc même élément chimique) mais un nombre de neutrons N différent, ce qui donne un nombre de masse A différent."
  }
];
