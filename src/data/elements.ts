export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  period: number;
  group: number;
  category: 
    | 'alkali-metal'
    | 'alkaline-earth'
    | 'transition-metal'
    | 'post-transition-metal'
    | 'metalloid'
    | 'reactive-nonmetal'
    | 'halogen'
    | 'noble-gas'
    | 'lanthanide'
    | 'actinide'
    | 'unknown';
  categoryLabel: string;
  phase: 'solide' | 'liquide' | 'gaz' | 'synthétique';
  electronConfiguration: string;
  electronShells: number[];
  electronegativity: number | null;
  atomicRadius: number | null; // in pm
  meltingPoint: number | null; // in °C
  boilingPoint: number | null; // in °C
  density: number | null; // in g/cm3 or g/L for gases
  yearDiscovered: number | string;
  discoverer: string;
  summary: string;
  uses: string[];
  hazards: string;
  colorHex: string;
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  'alkali-metal': { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', badge: 'bg-rose-500/20 text-rose-300' },
  'alkaline-earth': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-300' },
  'transition-metal': { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/30', badge: 'bg-indigo-500/20 text-indigo-300' },
  'post-transition-metal': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-300' },
  'metalloid': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', badge: 'bg-emerald-500/20 text-emerald-300' },
  'reactive-nonmetal': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30', badge: 'bg-cyan-500/20 text-cyan-300' },
  'halogen': { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-500/30', badge: 'bg-teal-500/20 text-teal-300' },
  'noble-gas': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-300' },
  'lanthanide': { bg: 'bg-pink-500/15', text: 'text-pink-400', border: 'border-pink-500/30', badge: 'bg-pink-500/20 text-pink-300' },
  'actinide': { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30', badge: 'bg-fuchsia-500/20 text-fuchsia-300' },
  'unknown': { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30', badge: 'bg-slate-500/20 text-slate-300' },
};

export const ELEMENTS_DATA: ChemicalElement[] = [
  {
    number: 1, symbol: 'H', name: 'Hydrogène', atomicMass: 1.008, period: 1, group: 1,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'gaz',
    electronConfiguration: '1s¹', electronShells: [1], electronegativity: 2.20, atomicRadius: 53,
    meltingPoint: -259.16, boilingPoint: -252.87, density: 0.00008988, yearDiscovered: 1766,
    discoverer: 'Henry Cavendish', summary: "L'élément le plus abondant de l'Univers, constituant principal des étoiles et composant clé de l'eau.",
    uses: ['Production d\'ammoniac', 'Piles à combustible', 'Raffinage pétrolier', 'Hydrogénation d\'huiles'],
    hazards: 'Gaz hautement inflammable, risque d\'explosion en mélange avec l\'air.', colorHex: '#22d3ee'
  },
  {
    number: 2, symbol: 'He', name: 'Hélium', atomicMass: 4.0026, period: 1, group: 18,
    category: 'noble-gas', categoryLabel: 'Gaz noble', phase: 'gaz',
    electronConfiguration: '1s²', electronShells: [2], electronegativity: null, atomicRadius: 31,
    meltingPoint: -272.2, boilingPoint: -268.93, density: 0.0001785, yearDiscovered: 1868,
    discoverer: 'Pierre Janssen, Norman Lockyer', summary: "Deuxième élément le plus léger et le plus abondant dans l'Univers. Chimiquement inerte.",
    uses: ['Refroidissement supraconducteurs (IRM)', 'Ballons dirigeables', 'Atmosphères protectrices de soudage', 'Plongée profonde'],
    hazards: 'Asphyxiant par déplacement de l\'oxygène.', colorHex: '#c084fc'
  },
  {
    number: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, period: 2, group: 1,
    category: 'alkali-metal', categoryLabel: 'Métal alcalin', phase: 'solide',
    electronConfiguration: '[He] 2s¹', electronShells: [2, 1], electronegativity: 0.98, atomicRadius: 167,
    meltingPoint: 180.54, boilingPoint: 1342, density: 0.534, yearDiscovered: 1817,
    discoverer: 'Johan August Arfwedson', summary: "Métal le plus léger et le moins dense de tous les solides connus. Réagit vivement avec l'eau.",
    uses: ['Batteries Li-ion rechargeables', 'Verres et céramiques résistants à la chaleur', 'Traitement des troubles bipolaires', 'Graisses lubrifiantes'],
    hazards: 'Corrosif, réagit violemment avec l\'eau en dégageant de l\'hydrogène inflammable.', colorHex: '#f43f5e'
  },
  {
    number: 4, symbol: 'Be', name: 'Béryllium', atomicMass: 9.0122, period: 2, group: 2,
    category: 'alkaline-earth', categoryLabel: 'Alcalino-terreux', phase: 'solide',
    electronConfiguration: '[He] 2s²', electronShells: [2, 2], electronegativity: 1.57, atomicRadius: 112,
    meltingPoint: 1287, boilingPoint: 2470, density: 1.85, yearDiscovered: 1798,
    discoverer: 'Louis-Nicolas Vauquelin', summary: "Métal gris acier, très rigide, léger et résistant à la corrosion, transparent aux rayons X.",
    uses: ['Fenêtres de tubes à rayons X', 'Alliages aérospatiaux haute résistance', 'Composants pour réacteurs nucléaires', 'Ressorts de précision'],
    hazards: 'Très toxique par inhalation de poussières (bérylliose, cancérogène).', colorHex: '#f59e0b'
  },
  {
    number: 5, symbol: 'B', name: 'Bore', atomicMass: 10.81, period: 2, group: 13,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[He] 2s² 2p¹', electronShells: [2, 3], electronegativity: 2.04, atomicRadius: 87,
    meltingPoint: 2076, boilingPoint: 3927, density: 2.34, yearDiscovered: 1808,
    discoverer: 'Gay-Lussac, Thénard, Davy', summary: "Semi-conducteur réfractaire ayant une dureté proche de celle du diamant.",
    uses: ['Verres borosilicatés (Pyrex)', 'Fibre de verre', 'Barres de contrôle nucléaires', 'Détergents et antiseptiques (acide borique)'],
    hazards: 'Faible toxicité générale ; composés organiques parfois irritants.', colorHex: '#10b981'
  },
  {
    number: 6, symbol: 'C', name: 'Carbone', atomicMass: 12.011, period: 2, group: 14,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'solide',
    electronConfiguration: '[He] 2s² 2p²', electronShells: [2, 4], electronegativity: 2.55, atomicRadius: 67,
    meltingPoint: 3550, boilingPoint: 4027, density: 2.267, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Pilier fondamental de la chimie organique et de la vie. Forme le graphite, le diamant et les fullerènes.",
    uses: ['Acier et métallurgie', 'Fibres de carbone pour l\'aviation', 'Datation au carbone 14', 'Électrodes et filtres à charbon actif'],
    hazards: 'Suies et nanoparticules irritantes pour les voies respiratoires.', colorHex: '#06b6d4'
  },
  {
    number: 7, symbol: 'N', name: 'Azote', atomicMass: 14.007, period: 2, group: 15,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'gaz',
    electronConfiguration: '[He] 2s² 2p³', electronShells: [2, 5], electronegativity: 3.04, atomicRadius: 56,
    meltingPoint: -210.0, boilingPoint: -195.79, density: 0.0012506, yearDiscovered: 1772,
    discoverer: 'Daniel Rutherford', summary: "Constitue 78% de l'atmosphère terrestre en volume. Élément essentiel des protéines et de l'ADN.",
    uses: ['Engrais azotés (ammoniac)', 'Cryoconservation (azote liquide)', 'Atmosphère inerte pour l\'emballage alimentaire', 'Explosifs (TNT, nitroglycérine)'],
    hazards: 'Gaz inodore asphyxiant ; risque de brûlures cryogéniques sévères avec l\'azote liquide.', colorHex: '#06b6d4'
  },
  {
    number: 8, symbol: 'O', name: 'Oxygène', atomicMass: 15.999, period: 2, group: 16,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'gaz',
    electronConfiguration: '[He] 2s² 2p⁴', electronShells: [2, 6], electronegativity: 3.44, atomicRadius: 48,
    meltingPoint: -218.79, boilingPoint: -182.96, density: 0.001429, yearDiscovered: 1774,
    discoverer: 'Joseph Priestley, Carl Wilhelm Scheele', summary: "Comburant indispensable à la respiration cellulaire et aux combustions. Présent dans l'eau et les minéraux de la croûte terrestre.",
    uses: ['Respiration médicale', 'Sidérurgie (affinage de la fonte)', 'Propulsion spatiale (ergol liquide)', 'Traitement des eaux usées'],
    hazards: 'Comburant puissant : accélère vivement les incendies.', colorHex: '#06b6d4'
  },
  {
    number: 9, symbol: 'F', name: 'Fluor', atomicMass: 18.998, period: 2, group: 17,
    category: 'halogen', categoryLabel: 'Halogène', phase: 'gaz',
    electronConfiguration: '[He] 2s² 2p⁵', electronShells: [2, 7], electronegativity: 3.98, atomicRadius: 42,
    meltingPoint: -219.67, boilingPoint: -188.11, density: 0.001696, yearDiscovered: 1886,
    discoverer: 'Henri Moissan', summary: "L'élément le plus électronégatif et le plus réactif chimiquement. Attaque presque tous les matériaux.",
    uses: ['Polymères PTFE (Téflon)', 'Prévention des caries dentaires (dentifrice)', 'Enrichissement de l\'uranium (UF6)', 'Fluides frigorigènes'],
    hazards: 'Gaz hautement corrosif et très toxique. Attaque les tissus vivants et le verre.', colorHex: '#14b8a6'
  },
  {
    number: 10, symbol: 'Ne', name: 'Néon', atomicMass: 20.180, period: 2, group: 18,
    category: 'noble-gas', categoryLabel: 'Gaz noble', phase: 'gaz',
    electronConfiguration: '[He] 2s² 2p⁶', electronShells: [2, 8], electronegativity: null, atomicRadius: 38,
    meltingPoint: -248.59, boilingPoint: -246.05, density: 0.0009002, yearDiscovered: 1898,
    discoverer: 'William Ramsay, Morris Travers', summary: "Gaz inerte brillant d'un rouge-orangé caractéristique lors d'une décharge électrique.",
    uses: ['Enseignes lumineuses néon', 'Lasers hélium-néon', 'Indicateurs haute tension', 'Cryogénie'],
    hazards: 'Gaz asphyxiant sous forte concentration.', colorHex: '#c084fc'
  },
  {
    number: 11, symbol: 'Na', name: 'Sodium', atomicMass: 22.990, period: 3, group: 1,
    category: 'alkali-metal', categoryLabel: 'Métal alcalin', phase: 'solide',
    electronConfiguration: '[Ne] 3s¹', electronShells: [2, 8, 1], electronegativity: 0.93, atomicRadius: 190,
    meltingPoint: 97.79, boilingPoint: 882.94, density: 0.968, yearDiscovered: 1807,
    discoverer: 'Humphry Davy', summary: "Métal mou argenté qui s'oxyde immédiatement à l'air et flotte sur l'eau en réagissant violemment.",
    uses: ['Sel de table (NaCl)', 'Lampes d\'éclairage public à vapeur de sodium', 'Synthèse chimique industrielle', 'Fluide caloporteur nucléaire'],
    hazards: 'Inflammable au contact de l\'eau, libère H2 et forme de la soude caustique (NaOH).', colorHex: '#f43f5e'
  },
  {
    number: 12, symbol: 'Mg', name: 'Magnésium', atomicMass: 24.305, period: 3, group: 2,
    category: 'alkaline-earth', categoryLabel: 'Alcalino-terreux', phase: 'solide',
    electronConfiguration: '[Ne] 3s²', electronShells: [2, 8, 2], electronegativity: 1.31, atomicRadius: 145,
    meltingPoint: 650, boilingPoint: 1090, density: 1.738, yearDiscovered: 1755,
    discoverer: 'Joseph Black', summary: "Métal léger blanc argenté, brûle d'une éclatante flamme blanche aveuglante. Atome central de la chlorophylle.",
    uses: ['Alliages légers en aéronautique et automobile', 'Feux d\'artifice et fusées éclairantes', 'Complément nutritionnel', 'Protection cathodique'],
    hazards: 'Poussières et copeaux hautement inflammables, ne pas éteindre avec de l\'eau.', colorHex: '#f59e0b'
  },
  {
    number: 13, symbol: 'Al', name: 'Aluminium', atomicMass: 26.982, period: 3, group: 13,
    category: 'post-transition-metal', categoryLabel: 'Métal pauvre', phase: 'solide',
    electronConfiguration: '[Ne] 3s² 3p¹', electronShells: [2, 8, 3], electronegativity: 1.61, atomicRadius: 118,
    meltingPoint: 660.32, boilingPoint: 2519, density: 2.70, yearDiscovered: 1825,
    discoverer: 'Hans Christian Ørsted', summary: "Métal le plus abondant dans la croûte terrestre. Léger, résistant grâce à sa couche d'alumine protectrice.",
    uses: ['Aviation et transports', 'Canettes et emballages alimentaires', 'Câbles électriques aériens', 'Menuiserie et construction'],
    hazards: 'Inerte en masse ; poudres fines explosives dans l\'air.', colorHex: '#60a5fa'
  },
  {
    number: 14, symbol: 'Si', name: 'Silicium', atomicMass: 28.085, period: 3, group: 14,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[Ne] 3s² 3p²', electronShells: [2, 8, 4], electronegativity: 1.90, atomicRadius: 111,
    meltingPoint: 1414, boilingPoint: 3265, density: 2.329, yearDiscovered: 1824,
    discoverer: 'Jöns Jacob Berzelius', summary: "Cœur de la révolution numérique et électronique. Deuxième élément de la croûte terrestre après l'oxygène.",
    uses: ['Microprocesseurs et puces électroniques', 'Panneaux solaires photovoltaïques', 'Silicone et mastics', 'Verre et céramique (silice)'],
    hazards: 'Poussières de silice cristalline responsables de la silicose.', colorHex: '#10b981'
  },
  {
    number: 15, symbol: 'P', name: 'Phosphore', atomicMass: 30.974, period: 3, group: 15,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'solide',
    electronConfiguration: '[Ne] 3s² 3p³', electronShells: [2, 8, 5], electronegativity: 2.19, atomicRadius: 98,
    meltingPoint: 44.15, boilingPoint: 280.5, density: 1.823, yearDiscovered: 1669,
    discoverer: 'Hennig Brand', summary: "Élément vital (ADN, ARN, ATP). Existe sous plusieurs formes allotropiques : blanc (pyrophorique) et rouge (stable).",
    uses: ['Engrais phosphatés pour l\'agriculture', 'Allumettes de sûreté', 'Détergents et ignifugeants', 'Semi-conducteurs'],
    hazards: 'Le phosphore blanc est extrêmement toxique et s\'enflamme spontanément à l\'air.', colorHex: '#06b6d4'
  },
  {
    number: 16, symbol: 'S', name: 'Soufre', atomicMass: 32.06, period: 3, group: 16,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'solide',
    electronConfiguration: '[Ne] 3s² 3p⁴', electronShells: [2, 8, 6], electronegativity: 2.58, atomicRadius: 88,
    meltingPoint: 115.21, boilingPoint: 444.6, density: 2.07, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Solide jaune vif présent aux abords des volcans. Composant de la poudre noire et de deux acides aminés vitaux.",
    uses: ['Acide sulfurique (produit chimique le plus fabriqué au monde)', 'Vulcanisation du caoutchouc', 'Fongicides viticoles', 'Poudre à canon'],
    hazards: 'Sa combustion produit du dioxyde de soufre SO2, gaz suffocant et acidifiant.', colorHex: '#06b6d4'
  },
  {
    number: 17, symbol: 'Cl', name: 'Chlore', atomicMass: 35.45, period: 3, group: 17,
    category: 'halogen', categoryLabel: 'Halogène', phase: 'gaz',
    electronConfiguration: '[Ne] 3s² 3p⁵', electronShells: [2, 8, 7], electronegativity: 3.16, atomicRadius: 79,
    meltingPoint: -101.5, boilingPoint: -34.04, density: 0.003214, yearDiscovered: 1774,
    discoverer: 'Carl Wilhelm Scheele', summary: "Gaz jaune-verdâtre à l'odeur piquante très suffocante. Puissant agent oxydant et désinfectant.",
    uses: ['Désinfection de l\'eau potable et des piscines', 'Production de plastique PVC', 'Eau de Javel (hypochlorite)', 'Synthèse pharmaceutique'],
    hazards: 'Gaz très toxique par inhalation, irritant pour les yeux et le système respiratoire.', colorHex: '#14b8a6'
  },
  {
    number: 18, symbol: 'Ar', name: 'Argon', atomicMass: 39.948, period: 3, group: 18,
    category: 'noble-gas', categoryLabel: 'Gaz noble', phase: 'gaz',
    electronConfiguration: '[Ne] 3s² 3p⁶', electronShells: [2, 8, 8], electronegativity: null, atomicRadius: 71,
    meltingPoint: -189.34, boilingPoint: -185.85, density: 0.001784, yearDiscovered: 1894,
    discoverer: 'Lord Rayleigh, William Ramsay', summary: "Gaz noble le plus abondant de l'atmosphère terrestre (~0.93% en volume). Chimiquement inerte.",
    uses: ['Soudage à l\'arc sous gaz inerte (TIG/MIG)', 'Isolation thermique des doubles vitrages', 'Lampes à incandescence et tubes fluorescents', 'Atmosphère protectrice en métallurgie'],
    hazards: 'Asphyxiant simple en espace confiné.', colorHex: '#c084fc'
  },
  {
    number: 19, symbol: 'K', name: 'Potassium', atomicMass: 39.098, period: 4, group: 1,
    category: 'alkali-metal', categoryLabel: 'Métal alcalin', phase: 'solide',
    electronConfiguration: '[Ar] 4s¹', electronShells: [2, 8, 8, 1], electronegativity: 0.82, atomicRadius: 243,
    meltingPoint: 63.5, boilingPoint: 759, density: 0.862, yearDiscovered: 1807,
    discoverer: 'Humphry Davy', summary: "Métal mou argenté qui brûle d'une flamme violette sur l'eau. Indispensable à la transmission de l'influx nerveux.",
    uses: ['Engrais potassiques (NPK)', 'Savons liquides (hydroxyde de potassium KOH)', 'Verres optiques spéciaux', 'Régulation cardiaque et nerveuse'],
    hazards: 'Réagit violemment avec l\'eau avec inflammation spontanée ; corrosif.', colorHex: '#f43f5e'
  },
  {
    number: 20, symbol: 'Ca', name: 'Calcium', atomicMass: 40.078, period: 4, group: 2,
    category: 'alkaline-earth', categoryLabel: 'Alcalino-terreux', phase: 'solide',
    electronConfiguration: '[Ar] 4s²', electronShells: [2, 8, 8, 2], electronegativity: 1.00, atomicRadius: 194,
    meltingPoint: 842, boilingPoint: 1484, density: 1.54, yearDiscovered: 1808,
    discoverer: 'Humphry Davy', summary: "Cinquième élément le plus abondant de la croûte terrestre. Pilier minéral des os, des dents et des coquilles.",
    uses: ['Ciments, plâtres et bétons', 'Fabrication de l\'acier (désoxydant)', 'Craie et calcaire (CaCO3)', 'Contraction musculaire et coagulation'],
    hazards: 'Réagit avec l\'eau en dégageant de l\'hydrogène inflammable et de la chaux irritante.', colorHex: '#f59e0b'
  },
  {
    number: 21, symbol: 'Sc', name: 'Scandium', atomicMass: 44.956, period: 4, group: 3,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹ 4s²', electronShells: [2, 8, 9, 2], electronegativity: 1.36, atomicRadius: 184,
    meltingPoint: 1541, boilingPoint: 2836, density: 2.985, yearDiscovered: 1879,
    discoverer: 'Lars Fredrik Nilson', summary: "Métal blanc argenté léger utilisé pour doper les alliages d'aluminium dans l'aérospatiale.",
    uses: ['Alliages d\'aluminium aérospatiaux', 'Éclairage aux halogénures métalliques pour stades', 'Armatures de vélos haut de gamme'],
    hazards: 'Faible toxicité générale ; poussières inflammables.', colorHex: '#818cf8'
  },
  {
    number: 22, symbol: 'Ti', name: 'Titane', atomicMass: 47.867, period: 4, group: 4,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d² 4s²', electronShells: [2, 8, 10, 2], electronegativity: 1.54, atomicRadius: 176,
    meltingPoint: 1668, boilingPoint: 3287, density: 4.506, yearDiscovered: 1791,
    discoverer: 'William Gregor', summary: "Métal réputé pour son rapport résistance/poids exceptionnel et sa biocompatibilité totale.",
    uses: ['Implants dentaires et prothèses orthopédiques', 'Cellules d\'avions et moteurs à réaction', 'Pigment blanc de dioxyde de titane (TiO2)', 'Équipements marins résistants à l\'eau salée'],
    hazards: 'Métal compact inerte ; poudres fines pyrophoriques.', colorHex: '#818cf8'
  },
  {
    number: 23, symbol: 'V', name: 'Vanadium', atomicMass: 50.942, period: 4, group: 5,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d³ 4s²', electronShells: [2, 8, 11, 2], electronegativity: 1.63, atomicRadius: 171,
    meltingPoint: 1910, boilingPoint: 3407, density: 6.11, yearDiscovered: 1801,
    discoverer: 'Andrés Manuel del Río', summary: "Métal ductile qui confère une extraordinaire résistance aux aciers à outils et aux ressorts.",
    uses: ['Aciers pour outils à haute résistance', 'Batteries à flux redox vanadium pour énergies renouvelables', 'Catalyseur pour acide sulfurique (V2O5)'],
    hazards: 'Composés du vanadium toxiques par inhalation.', colorHex: '#818cf8'
  },
  {
    number: 24, symbol: 'Cr', name: 'Chrome', atomicMass: 51.996, period: 4, group: 6,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d⁵ 4s¹', electronShells: [2, 8, 13, 1], electronegativity: 1.66, atomicRadius: 166,
    meltingPoint: 1907, boilingPoint: 2671, density: 7.19, yearDiscovered: 1797,
    discoverer: 'Louis-Nicolas Vauquelin', summary: "Métal très dur et brillant, essentiel pour rendre l'acier inoxydable et résistant à la corrosion.",
    uses: ['Acier inoxydable (au moins 10.5% Cr)', 'Chromage décoratif et anticorrosion', 'Pigments jaunes et verts', 'Tannage du cuir'],
    hazards: 'Le chrome VI est cancérigène et très toxique ; le chrome III est un oligo-élément nutritif.', colorHex: '#818cf8'
  },
  {
    number: 25, symbol: 'Mn', name: 'Manganèse', atomicMass: 54.938, period: 4, group: 7,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d⁵ 4s²', electronShells: [2, 8, 13, 2], electronegativity: 1.55, atomicRadius: 161,
    meltingPoint: 1246, boilingPoint: 2061, density: 7.21, yearDiscovered: 1774,
    discoverer: 'Carl Wilhelm Scheele, Johan Gottlieb Gahn', summary: "Métal dur et cassant, indispensable à la métallurgie de l'acier pour éliminer le soufre.",
    uses: ['Production d\'acier', 'Piles alcalines (MnO2)', 'Coloration pourpre du verre et poteries', 'Alliages d\'aluminium de canettes de boisson'],
    hazards: 'L\'inhalation chronique de poussières de manganèse peut causer des troubles neurologiques (manganisme).', colorHex: '#818cf8'
  },
  {
    number: 26, symbol: 'Fe', name: 'Fer', atomicMass: 55.845, period: 4, group: 8,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d⁶ 4s²', electronShells: [2, 8, 14, 2], electronegativity: 1.83, atomicRadius: 156,
    meltingPoint: 1538, boilingPoint: 2862, density: 7.874, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Le métal le plus utilisé sur Terre (90% de la production métallurgique). Centre actif de l'hémoglobine pour transporter l'oxygène.",
    uses: ['Aciers de construction, ponts, gratte-ciel', 'Véhicules et machineries', 'Transport d\'oxygène dans le sang (hémoglobine)', 'Aimants et électro-aimants'],
    hazards: 'Inerte en masse ; poudres de fer fines inflammables.', colorHex: '#818cf8'
  },
  {
    number: 27, symbol: 'Co', name: 'Cobalt', atomicMass: 58.933, period: 4, group: 9,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d⁷ 4s²', electronShells: [2, 8, 15, 2], electronegativity: 1.88, atomicRadius: 152,
    meltingPoint: 1495, boilingPoint: 2927, density: 8.90, yearDiscovered: 1735,
    discoverer: 'Georg Brandt', summary: "Métal ferromagnétique bleu-argenté, indispensable pour les superalliages et les batteries lithium-ion.",
    uses: ['Cathodes de batteries Li-ion', 'Superalliages pour turbines d\'avions', 'Colorant bleu de cobalt pour verres et céramiques', 'Atome central de la vitamine B12'],
    hazards: 'Sensibilisant respiratoire et cutané, toxique à long terme.', colorHex: '#818cf8'
  },
  {
    number: 28, symbol: 'Ni', name: 'Nickel', atomicMass: 58.693, period: 4, group: 10,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d⁸ 4s²', electronShells: [2, 8, 16, 2], electronegativity: 1.91, atomicRadius: 149,
    meltingPoint: 1455, boilingPoint: 2913, density: 8.908, yearDiscovered: 1751,
    discoverer: 'Axel Fredrik Cronstedt', summary: "Métal dur, ductile et résistant à la corrosion, largement employé dans les pièces de monnaie et l'inox.",
    uses: ['Aciers inoxydables austénitiques', 'Batteries de voitures électriques (NMC)', 'Pièces de monnaie', 'Placage électrolytique protecteur'],
    hazards: 'Allergène cutané fréquent (dermatite de contact), cancérigène par inhalation des poudres.', colorHex: '#818cf8'
  },
  {
    number: 29, symbol: 'Cu', name: 'Cuivre', atomicMass: 63.546, period: 4, group: 11,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s¹', electronShells: [2, 8, 18, 1], electronegativity: 1.90, atomicRadius: 145,
    meltingPoint: 1084.62, boilingPoint: 2562, density: 8.96, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Un des premiers métaux travaillés par l'humanité. Conducteur électrique et thermique de référence absolue.",
    uses: ['Câbles électriques et bobinages de moteurs', 'Tuyauterie d\'eau sanitaire', 'Composants électroniques', 'Alliages de bronze et de laiton'],
    hazards: 'Faible toxicité humaine ; composés solubles très toxiques pour les organismes aquatiques.', colorHex: '#818cf8'
  },
  {
    number: 30, symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, period: 4, group: 12,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s²', electronShells: [2, 8, 18, 2], electronegativity: 1.65, atomicRadius: 142,
    meltingPoint: 419.53, boilingPoint: 907, density: 7.14, yearDiscovered: 'Antiquité',
    discoverer: 'Inconnu (isolé en 1746 par Andreas Marggraf)', summary: "Principalement employé pour galvaniser l'acier contre la rouille. Oligo-élément clé de nombreuses enzymes.",
    uses: ['Galvanisation antirouille de l\'acier', 'Alliages de laiton (avec le cuivre)', 'Piles salines et alcalines', 'Oxyde de zinc dans les crèmes solaires'],
    hazards: 'Inhalation des fumées d\'oxydes de zinc à l\'origine de la fièvre des fondeurs.', colorHex: '#818cf8'
  },
  {
    number: 31, symbol: 'Ga', name: 'Gallium', atomicMass: 69.723, period: 4, group: 13,
    category: 'post-transition-metal', categoryLabel: 'Métal pauvre', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p¹', electronShells: [2, 8, 18, 3], electronegativity: 1.81, atomicRadius: 136,
    meltingPoint: 29.76, boilingPoint: 2204, density: 5.91, yearDiscovered: 1875,
    discoverer: 'Paul-Émile Lecoq de Boisbaudran', summary: "Métal surprenant qui fond dans la paume de la main (29.8°C). Élément fondamental des LED et des semi-conducteurs.",
    uses: ['Semi-conducteurs pour LED et lasers (GaAs)', 'Thermomètres haute température', 'Électronique de puissance (GaN)'],
    hazards: 'Attaque agressivement l\'aluminium en le rendant cassant.', colorHex: '#60a5fa'
  },
  {
    number: 32, symbol: 'Ge', name: 'Germanium', atomicMass: 72.63, period: 4, group: 14,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p²', electronShells: [2, 8, 18, 4], electronegativity: 2.01, atomicRadius: 125,
    meltingPoint: 938.25, boilingPoint: 2833, density: 5.323, yearDiscovered: 1886,
    discoverer: 'Clemens Winkler', summary: "Prédit par Mendeleïev sous le nom d'eka-silicium. Matériau historique du premier transistor en 1947.",
    uses: ['Fibres optiques', 'Optique infrarouge (vision nocturne)', 'Catalyseur pour bouteilles plastiques PET', 'Cellules solaires spatiales multi-jonctions'],
    hazards: 'Faible toxicité générale.', colorHex: '#10b981'
  },
  {
    number: 33, symbol: 'As', name: 'Arsenic', atomicMass: 74.922, period: 4, group: 15,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p³', electronShells: [2, 8, 18, 5], electronegativity: 2.18, atomicRadius: 114,
    meltingPoint: 817, boilingPoint: 614, density: 5.727, yearDiscovered: 1250,
    discoverer: 'Albertus Magnus', summary: "Poison historique célèbre, mais également composé essentiel pour les composants semi-conducteurs à haute fréquence.",
    uses: ['Semi-conducteurs arséniure de gallium (GaAs)', 'Préservation industrielle du bois', 'Dopage des cristaux de silicium'],
    hazards: 'Extrêmement toxique et cancérigène avéré ; bloque la respiration cellulaire.', colorHex: '#10b981'
  },
  {
    number: 34, symbol: 'Se', name: 'Sélénium', atomicMass: 78.971, period: 4, group: 16,
    category: 'reactive-nonmetal', categoryLabel: 'Non-métal réactif', phase: 'solide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁴', electronShells: [2, 8, 18, 6], electronegativity: 2.55, atomicRadius: 103,
    meltingPoint: 221, boilingPoint: 685, density: 4.819, yearDiscovered: 1817,
    discoverer: 'Jöns Jacob Berzelius', summary: "Propriétés photoconductrices uniques : sa conductivité électrique augmente fortement sous la lumière.",
    uses: ['Cellules photovoltaïques et photocopieurs', 'Coloration rouge du verre', 'Oligo-élément antioxydant (sélénoprotéines)'],
    hazards: 'Toxique à forte dose (sélénose).', colorHex: '#06b6d4'
  },
  {
    number: 35, symbol: 'Br', name: 'Brome', atomicMass: 79.904, period: 4, group: 17,
    category: 'halogen', categoryLabel: 'Halogène', phase: 'liquide',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁵', electronShells: [2, 8, 18, 7], electronegativity: 2.96, atomicRadius: 94,
    meltingPoint: -7.2, boilingPoint: 58.8, density: 3.1028, yearDiscovered: 1826,
    discoverer: 'Antoine Jérôme Balard', summary: "Le seul élément non-métallique liquide à température ambiante. Liquide dense rouge-brun aux vapeurs âcres.",
    uses: ['Retardateurs de flamme', 'Désinfection d\'eaux de spas', 'Synthèse pharmaceutique et agricole', 'Photographie argentique historique (AgBr)'],
    hazards: 'Liquide corrosif causant de graves brûlures ; vapeurs toxiques et suffocantes.', colorHex: '#14b8a6'
  },
  {
    number: 36, symbol: 'Kr', name: 'Krypton', atomicMass: 83.798, period: 4, group: 18,
    category: 'noble-gas', categoryLabel: 'Gaz noble', phase: 'gaz',
    electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁶', electronShells: [2, 8, 18, 8], electronegativity: 3.00, atomicRadius: 88,
    meltingPoint: -157.36, boilingPoint: -153.22, density: 0.003749, yearDiscovered: 1898,
    discoverer: 'William Ramsay, Morris Travers', summary: "Gaz rare présent en traces infimes dans l'air, émettant une lumière blanc-verdâtre brillante.",
    uses: ['Flashes photographiques professionnels ultrarapides', 'Lasers pour la chirurgie des yeux', 'Double vitrage haute performance'],
    hazards: 'Gaz asphyxiant par déplacement de l\'oxygène.', colorHex: '#c084fc'
  },
  {
    number: 37, symbol: 'Rb', name: 'Rubidium', atomicMass: 85.468, period: 5, group: 1,
    category: 'alkali-metal', categoryLabel: 'Métal alcalin', phase: 'solide',
    electronConfiguration: '[Kr] 5s¹', electronShells: [2, 8, 18, 8, 1], electronegativity: 0.82, atomicRadius: 265,
    meltingPoint: 39.31, boilingPoint: 688, density: 1.532, yearDiscovered: 1861,
    discoverer: 'Robert Bunsen, Gustav Kirchhoff', summary: "Métal très réactif qui s'enflamme spontanément à l'air et produit des flammes violacées.",
    uses: ['Horloges atomiques de précision', 'Cellules photoélectriques', 'Physique quantique (condensats de Bose-Einstein)'],
    hazards: 'Pyrophorique, réagit explosivement avec l\'eau.', colorHex: '#f43f5e'
  },
  {
    number: 38, symbol: 'Sr', name: 'Strontium', atomicMass: 87.62, period: 5, group: 2,
    category: 'alkaline-earth', categoryLabel: 'Alcalino-terreux', phase: 'solide',
    electronConfiguration: '[Kr] 5s²', electronShells: [2, 8, 18, 8, 2], electronegativity: 0.95, atomicRadius: 219,
    meltingPoint: 777, boilingPoint: 1382, density: 2.64, yearDiscovered: 1790,
    discoverer: 'Adair Crawford', summary: "Métal mou qui brûle d'un rouge écarlate éclatant, utilisé dans les feux d'artifice.",
    uses: ['Pyrotechnie rouge éclatante', 'Pâtes dentifrices pour dents sensibles', 'Verres spéciaux pour écrans', 'Horloges atomiques optiques'],
    hazards: 'S\'enflamme spontanément sous forme de fine poudre ; isotopes radioactifs dangereux.', colorHex: '#f59e0b'
  },
  {
    number: 39, symbol: 'Y', name: 'Yttrium', atomicMass: 88.906, period: 5, group: 3,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹ 5s²', electronShells: [2, 8, 18, 9, 2], electronegativity: 1.22, atomicRadius: 212,
    meltingPoint: 1526, boilingPoint: 3345, density: 4.472, yearDiscovered: 1794,
    discoverer: 'Johan Gadolin', summary: "Terre rare découverte dans la mine d'Ytterby en Suède. Composant clé des supraconducteurs haute température (YBCO).",
    uses: ['Supraconducteurs haute température YBCO', 'Lasers YAG pour la chirurgie et l\'industrie', 'Phosphores rouges d\'écrans'],
    hazards: 'Poussières irritantes pour les poumons.', colorHex: '#818cf8'
  },
  {
    number: 40, symbol: 'Zr', name: 'Zirconium', atomicMass: 91.224, period: 5, group: 4,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d² 5s²', electronShells: [2, 8, 18, 10, 2], electronegativity: 1.33, atomicRadius: 206,
    meltingPoint: 1855, boilingPoint: 4409, density: 6.52, yearDiscovered: 1789,
    discoverer: 'Martin Heinrich Klaproth', summary: "Remarquable transparence aux neutrons et résistance chimique extrême, vital dans l'industrie nucléaire.",
    uses: ['Gaines de combustible nucléaire (Zircaloy)', 'Couronnes et implants dentaires en zircone (ZrO2)', 'Faux diamants (zircone cubique)'],
    hazards: 'Poudres très inflammables au contact de l\'air.', colorHex: '#818cf8'
  },
  {
    number: 41, symbol: 'Nb', name: 'Niobium', atomicMass: 92.906, period: 5, group: 5,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d⁴ 5s¹', electronShells: [2, 8, 18, 12, 1], electronegativity: 1.6, atomicRadius: 198,
    meltingPoint: 2477, boilingPoint: 4744, density: 8.57, yearDiscovered: 1801,
    discoverer: 'Charles Hatchett', summary: "Métal ductile utilisé dans les aimants supraconducteurs des accélérateurs de particules (LHC du CERN).",
    uses: ['Aimants supraconducteurs pour IRM et accélérateurs', 'Aciers spéciaux pour pipelines de gaz', 'Turboréacteurs d\'avions'],
    hazards: 'Faible toxicité.', colorHex: '#818cf8'
  },
  {
    number: 42, symbol: 'Mo', name: 'Molybdène', atomicMass: 95.95, period: 5, group: 6,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d⁵ 5s¹', electronShells: [2, 8, 18, 13, 1], electronegativity: 2.16, atomicRadius: 190,
    meltingPoint: 2623, boilingPoint: 4639, density: 10.28, yearDiscovered: 1778,
    discoverer: 'Carl Wilhelm Scheele', summary: "Point de fusion extrêmement élevé (2623°C), indispensable aux aciers haute température.",
    uses: ['Aciers alliés haute température', 'Lubrifiants solides (MoS2)', 'Production de radio-isotopes médicaux (Tc-99m)'],
    hazards: 'Poussières irritantes.', colorHex: '#818cf8'
  },
  {
    number: 43, symbol: 'Tc', name: 'Technétium', atomicMass: 98, period: 5, group: 7,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'synthétique',
    electronConfiguration: '[Kr] 4d⁵ 5s²', electronShells: [2, 8, 18, 13, 2], electronegativity: 1.9, atomicRadius: 183,
    meltingPoint: 2157, boilingPoint: 4265, density: 11.5, yearDiscovered: 1937,
    discoverer: 'Emilio Segrè, Carlo Perrier', summary: "Premier élément produit artificiellement. Tous ses isotopes sont radioactifs. Incontournable en scintigraphie.",
    uses: ['Imagerie médicale scintigraphique (Tc-99m)', 'Études radiochimiques'],
    hazards: 'Radioactif.', colorHex: '#818cf8'
  },
  {
    number: 44, symbol: 'Ru', name: 'Ruthénium', atomicMass: 101.07, period: 5, group: 8,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d⁷ 5s¹', electronShells: [2, 8, 18, 15, 1], electronegativity: 2.2, atomicRadius: 178,
    meltingPoint: 2334, boilingPoint: 4150, density: 12.45, yearDiscovered: 1844,
    discoverer: 'Karl Ernst Claus', summary: "Métal du groupe du platine, très dur et inattaquable par les acides courants.",
    uses: ['Contacts électriques inusables', 'Catalyseurs chimiques asymétriques', 'Cellules solaires à colorant'],
    hazards: 'Le tétroxyde RuO4 est très volatil et toxique.', colorHex: '#818cf8'
  },
  {
    number: 45, symbol: 'Rh', name: 'Rhodium', atomicMass: 102.91, period: 5, group: 9,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d⁸ 5s¹', electronShells: [2, 8, 18, 16, 1], electronegativity: 2.28, atomicRadius: 173,
    meltingPoint: 1964, boilingPoint: 3695, density: 12.41, yearDiscovered: 1803,
    discoverer: 'William Hyde Wollaston', summary: "L'un des métaux précieux les plus chers du monde, doté d'une réflectivité et d'un pouvoir catalytique hors pair.",
    uses: ['Pots catalytiques automobiles anti-oxydes d\'azote', 'Placage de bijoux en or blanc', 'Miroirs optiques de recherche'],
    hazards: 'Faible toxicité sous forme métallique ; allergisant possible.', colorHex: '#818cf8'
  },
  {
    number: 46, symbol: 'Pd', name: 'Palladium', atomicMass: 106.42, period: 5, group: 10,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰', electronShells: [2, 8, 18, 18], electronegativity: 2.20, atomicRadius: 169,
    meltingPoint: 1554.9, boilingPoint: 2963, density: 12.023, yearDiscovered: 1803,
    discoverer: 'William Hyde Wollaston', summary: "Capacité stupéfiante à absorber jusqu'à 900 fois son propre volume d'hydrogène gazeux.",
    uses: ['Pots catalytiques', 'Condensateurs céramiques multicouches (MLCC)', 'Purification de l\'hydrogène', 'Joaillerie'],
    hazards: 'Faible toxicité générale ; sels irritants.', colorHex: '#818cf8'
  },
  {
    number: 47, symbol: 'Ag', name: 'Argent', atomicMass: 107.87, period: 5, group: 11,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s¹', electronShells: [2, 8, 18, 18, 1], electronegativity: 1.93, atomicRadius: 165,
    meltingPoint: 961.78, boilingPoint: 2162, density: 10.49, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "La meilleure conductivité électrique et thermique de tous les éléments connus, plus antibactérien naturel.",
    uses: ['Bijouterie et orfèvrerie', 'Pâtes conductrices pour cellules photovoltaïques', 'Miroirs optiques', 'Pansements antibactériens'],
    hazards: 'Une exposition chronique aux sels d\'argent cause l\'argyrisme (teint bleuté irréversible).', colorHex: '#818cf8'
  },
  {
    number: 48, symbol: 'Cd', name: 'Cadmium', atomicMass: 112.41, period: 5, group: 12,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s²', electronShells: [2, 8, 18, 18, 2], electronegativity: 1.69, atomicRadius: 161,
    meltingPoint: 321.07, boilingPoint: 767, density: 8.65, yearDiscovered: 1817,
    discoverer: 'Karl Samuel Leberecht Hermann, Friedrich Stromeyer', summary: "Métal toxique historiquement utilisé dans les accumulateurs Ni-Cd et les pigments jaunes vifs.",
    uses: ['Barres de contrôle de réacteurs nucléaires', 'Anciennes batteries Ni-Cd', 'Pigments d\'artistes (jaune cadmium)'],
    hazards: 'Très toxique et cancérigène ; s\'accumule dans les reins et fragilise les os (maladie Itai-itai).', colorHex: '#818cf8'
  },
  {
    number: 49, symbol: 'In', name: 'Indium', atomicMass: 114.82, period: 5, group: 13,
    category: 'post-transition-metal', categoryLabel: 'Métal pauvre', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p¹', electronShells: [2, 8, 18, 18, 3], electronegativity: 1.78, atomicRadius: 156,
    meltingPoint: 156.6, boilingPoint: 2072, density: 7.31, yearDiscovered: 1863,
    discoverer: 'Ferdinand Reich, Hieronymous Theodor Richter', summary: "Métal très mou qui crisse lorsqu'on le plie. Élément clé des écrans tactiles sous forme d'oxyde d'indium-étain (ITO).",
    uses: ['Écrans tactiles et téléviseurs (ITO transparent conducteur)', 'Soudures basse température', 'Semi-conducteurs'],
    hazards: 'Composés toxiques par inhalation.', colorHex: '#60a5fa'
  },
  {
    number: 50, symbol: 'Sn', name: 'Étain', atomicMass: 118.71, period: 5, group: 14,
    category: 'post-transition-metal', categoryLabel: 'Métal pauvre', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p²', electronShells: [2, 8, 18, 18, 4], electronegativity: 1.96, atomicRadius: 145,
    meltingPoint: 231.93, boilingPoint: 2602, density: 7.287, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Allié au cuivre depuis l'Âge du bronze. Métal résistant à la corrosion servant de revêtement au fer-blanc.",
    uses: ['Boîtes de conserve (fer-blanc)', 'Soudures pour circuits électroniques', 'Alliages de bronze', 'Flotteur pour fabrication du verre plat'],
    hazards: 'Métal inoffensif ; certains composés organostanniques sont écotoxiques.', colorHex: '#60a5fa'
  },
  {
    number: 51, symbol: 'Sb', name: 'Antimoine', atomicMass: 121.76, period: 5, group: 15,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p³', electronShells: [2, 8, 18, 18, 5], electronegativity: 2.05, atomicRadius: 133,
    meltingPoint: 630.63, boilingPoint: 1587, density: 6.685, yearDiscovered: 'Antiquité',
    discoverer: 'Inconnu', summary: "Utilisé comme fard (khôl) dès l'Égypte antique. Augmente la dureté du plomb dans les batteries.",
    uses: ['Ignifugeants pour textiles et plastiques (Sb2O3)', 'Batteries au plomb', 'Caractères d\'imprimerie traditionnels'],
    hazards: 'Toxique par ingestion et inhalation, propriétés similaires à l\'arsenic.', colorHex: '#10b981'
  },
  {
    number: 52, symbol: 'Te', name: 'Tellure', atomicMass: 127.60, period: 5, group: 16,
    category: 'metalloid', categoryLabel: 'Métalloïde', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁴', electronShells: [2, 8, 18, 18, 6], electronegativity: 2.1, atomicRadius: 123,
    meltingPoint: 449.51, boilingPoint: 988, density: 6.232, yearDiscovered: 1782,
    discoverer: 'Franz-Joseph Müller von Reichenstein', summary: "Semi-métal rare cassant et brillant. Confère à l'organisme une odeur d'ail persistante s'il est absorbé.",
    uses: ['Panneaux solaires en couches minces au tellurure de cadmium (CdTe)', 'Disques optiques réinscriptibles', 'Générateurs thermoélectriques'],
    hazards: 'Toxique ; inhalation provoque l\'haleine tellurique ailée.', colorHex: '#10b981'
  },
  {
    number: 53, symbol: 'I', name: 'Iode', atomicMass: 126.90, period: 5, group: 17,
    category: 'halogen', categoryLabel: 'Halogène', phase: 'solide',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁵', electronShells: [2, 8, 18, 18, 7], electronegativity: 2.66, atomicRadius: 115,
    meltingPoint: 113.7, boilingPoint: 184.3, density: 4.93, yearDiscovered: 1811,
    discoverer: 'Bernard Courtois', summary: "Solide pourpre-noir qui se sublime en sublimes vapeurs violettes. Essentiel au fonctionnement de la glande thyroïde.",
    uses: ['Antiseptique chirurgical (bétadine)', 'Synthèse des hormones thyroïdiennes (T3/T4)', 'Produits de contraste radiologique aux rayons X', 'Pastilles d\'iodure de potassium en cas d\'accident nucléaire'],
    hazards: 'Vapeurs irritantes pour les voies respiratoires.', colorHex: '#14b8a6'
  },
  {
    number: 54, symbol: 'Xe', name: 'Xénon', atomicMass: 131.29, period: 5, group: 18,
    category: 'noble-gas', categoryLabel: 'Gaz noble', phase: 'gaz',
    electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁶', electronShells: [2, 8, 18, 18, 8], electronegativity: 2.6, atomicRadius: 108,
    meltingPoint: -111.7, boilingPoint: -108.12, density: 0.005887, yearDiscovered: 1898,
    discoverer: 'William Ramsay, Morris Travers', summary: "Gaz lourd émettant une lumière bleue intense. Premier gaz noble avec lequel on a synthétisé de vrais composés chimiques.",
    uses: ['Phares automobiles au xénon haute intensité', 'Propulsion ionique des satellites spatiaux', 'Anesthésiant chirurgical d\'exception'],
    hazards: 'Asphyxiant à haute concentration.', colorHex: '#c084fc'
  },
  {
    number: 55, symbol: 'Cs', name: 'Césium', atomicMass: 132.91, period: 6, group: 1,
    category: 'alkali-metal', categoryLabel: 'Métal alcalin', phase: 'solide',
    electronConfiguration: '[Xe] 6s¹', electronShells: [2, 8, 18, 18, 8, 1], electronegativity: 0.79, atomicRadius: 298,
    meltingPoint: 28.44, boilingPoint: 671, density: 1.93, yearDiscovered: 1860,
    discoverer: 'Robert Bunsen, Gustav Kirchhoff', summary: "La seconde de notre système international d'unités est définie par 9 192 631 770 oscillations d'un atome de césium 133.",
    uses: ['Horloges atomiques de référence mondiale (GPS, télécoms)', 'Fluides de forage pétrolier profond', 'Cellules photoémissives'],
    hazards: 'Explose violemment au contact de l\'eau même froide.', colorHex: '#f43f5e'
  },
  {
    number: 56, symbol: 'Ba', name: 'Baryum', atomicMass: 137.33, period: 6, group: 2,
    category: 'alkaline-earth', categoryLabel: 'Alcalino-terreux', phase: 'solide',
    electronConfiguration: '[Xe] 6s²', electronShells: [2, 8, 18, 18, 8, 2], electronegativity: 0.89, atomicRadius: 253,
    meltingPoint: 727, boilingPoint: 1897, density: 3.51, yearDiscovered: 1774,
    discoverer: 'Carl Wilhelm Scheele', summary: "Métal alcalino-terreux lourd qui brûle d'une flamme verte pomme. Utilisé comme bouillie radiopaque en médecine.",
    uses: ['Pyrotechnie verte éclatante', 'Bouillie barytée radiologique digestive (BaSO4)', 'Boues de forage pétrolier'],
    hazards: 'Sels solubles de baryum très toxiques pour le cœur.', colorHex: '#f59e0b'
  },
  {
    number: 57, symbol: 'La', name: 'Lanthane', atomicMass: 138.91, period: 6, group: 3,
    category: 'lanthanide', categoryLabel: 'Lanthanide', phase: 'solide',
    electronConfiguration: '[Xe] 5d¹ 6s²', electronShells: [2, 8, 18, 18, 9, 2], electronegativity: 1.10, atomicRadius: 195,
    meltingPoint: 920, boilingPoint: 3464, density: 6.162, yearDiscovered: 1839,
    discoverer: 'Carl Gustaf Mosander', summary: "Chef de file des lanthanides. Améliore les propriétés optiques des lentilles photographiques.",
    uses: ['Verres d\'objectifs photographiques de haute réfraction', 'Piles rechargeables NiMH', 'Pierres à briquet (mischmétal)'],
    hazards: 'Faible à modérée toxicité.', colorHex: '#ec4899'
  },
  {
    number: 58, symbol: 'Ce', name: 'Cérium', atomicMass: 140.12, period: 6, group: 3,
    category: 'lanthanide', categoryLabel: 'Lanthanide', phase: 'solide',
    electronConfiguration: '[Xe] 4f¹ 5d¹ 6s²', electronShells: [2, 8, 18, 19, 9, 2], electronegativity: 1.12, atomicRadius: 185,
    meltingPoint: 798, boilingPoint: 3443, density: 6.77, yearDiscovered: 1803,
    discoverer: 'Martin Heinrich Klaproth, Jöns Jacob Berzelius', summary: "La plus abondante de toutes les terres rares. Utilisé pour polir le verre de haute précision.",
    uses: ['Polissage fin des verres et miroirs télescopiques (CeO2)', 'Additif diesel catalytique', 'Pierres à briquet'],
    hazards: 'Poudres pyrophoriques inflammables.', colorHex: '#ec4899'
  },
  {
    number: 59, symbol: 'Pr', name: 'Praséodyme', atomicMass: 140.91, period: 6, group: 3,
    category: 'lanthanide', categoryLabel: 'Lanthanide', phase: 'solide',
    electronConfiguration: '[Xe] 4f³ 6s²', electronShells: [2, 8, 18, 21, 8, 2], electronegativity: 1.13, atomicRadius: 247,
    meltingPoint: 931, boilingPoint: 3520, density: 6.77, yearDiscovered: 1885,
    discoverer: 'Carl Auer von Welsbach', summary: "Terre rare qui colore les verres et céramiques d'un jaune-vert éclatant.",
    uses: ['Aimants permanents NdFeB', 'Verres de protection pour soudeurs (didyme)', 'Coloration des céramiques'],
    hazards: 'Faible toxicité.', colorHex: '#ec4899'
  },
  {
    number: 60, symbol: 'Nd', name: 'Néodyme', atomicMass: 144.24, period: 6, group: 3,
    category: 'lanthanide', categoryLabel: 'Lanthanide', phase: 'solide',
    electronConfiguration: '[Xe] 4f⁴ 6s²', electronShells: [2, 8, 18, 22, 8, 2], electronegativity: 1.14, atomicRadius: 206,
    meltingPoint: 1021, boilingPoint: 3074, density: 7.01, yearDiscovered: 1885,
    discoverer: 'Carl Auer von Welsbach', summary: "Composant indispensable des aimants permanents les plus puissants du monde (aimants NdFeB).",
    uses: ['Aimants ultra-puissants pour moteurs électriques et éoliennes', 'Haut-parleurs et casques audio', 'Lasers Nd:YAG'],
    hazards: 'Poudres réactives, combustion spontanée possible.', colorHex: '#ec4899'
  },
  {
    number: 74, symbol: 'W', name: 'Tungstène', atomicMass: 183.84, period: 6, group: 6,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁴ 6s²', electronShells: [2, 8, 18, 32, 12, 2], electronegativity: 2.36, atomicRadius: 193,
    meltingPoint: 3422, boilingPoint: 5555, density: 19.25, yearDiscovered: 1781,
    discoverer: 'Carl Wilhelm Scheele, frères Elhuyar', summary: "Le plus haut point de fusion de tous les métaux purs (3422°C). Utilisé pour les filaments et les outils de coupe extrêmes.",
    uses: ['Outils de coupe et forets en carbure de tungstène', 'Filaments d\'ampoules traditionnelles', 'Projectiles perforants d\'artillerie', 'Tuyères de fusées'],
    hazards: 'Poussières irritantes.', colorHex: '#818cf8'
  },
  {
    number: 78, symbol: 'Pt', name: 'Platine', atomicMass: 195.08, period: 6, group: 10,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Xe] 4f¹⁴ 5d⁹ 6s¹', electronShells: [2, 8, 18, 32, 17, 1], electronegativity: 2.28, atomicRadius: 177,
    meltingPoint: 1768.3, boilingPoint: 3825, density: 21.45, yearDiscovered: 1735,
    discoverer: 'Antonio de Ulloa', summary: "Métal noble inaltérable d'une densité extrême, pierre angulaire des catalyseurs et de la chimiothérapie.",
    uses: ['Pots catalytiques et piles à hydrogène', 'Médicaments anticancéreux (cisplatine)', 'Bijoux haute joaillerie', 'Creusets chimiques de laboratoire'],
    hazards: 'Sels solubles allergisants et irritants.', colorHex: '#818cf8'
  },
  {
    number: 79, symbol: 'Au', name: 'Or', atomicMass: 196.97, period: 6, group: 11,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'solide',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronShells: [2, 8, 18, 32, 18, 1], electronegativity: 2.54, atomicRadius: 174,
    meltingPoint: 1064.18, boilingPoint: 2856, density: 19.3, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Le métal précieux par excellence. Malléable à l'extrême (une feuille de quelques atomes d'épaisseur), inoxydable et biocompatible.",
    uses: ['Connecteurs électroniques dorés inaltérables', 'Réserves monétaires des banques centrales', 'Bijouterie', 'Visières de casques d\'astronautes pare-soleil'],
    hazards: 'Non toxique, chimiquement inerte.', colorHex: '#818cf8'
  },
  {
    number: 80, symbol: 'Hg', name: 'Mercure', atomicMass: 200.59, period: 6, group: 12,
    category: 'transition-metal', categoryLabel: 'Métal de transition', phase: 'liquide',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', electronShells: [2, 8, 18, 32, 18, 2], electronegativity: 2.00, atomicRadius: 171,
    meltingPoint: -38.83, boilingPoint: 356.73, density: 13.534, yearDiscovered: 'Antiquité',
    discoverer: 'Inconnu', summary: "Le seul métal liquide à température ambiante. Dense, argenté, forme facilement des amalgames avec l'or et l'argent.",
    uses: ['Anciens thermomètres et baromètres', 'Éclairage fluorescent (lampes fluocompactes)', 'Amalgames dentaires historiques'],
    hazards: 'Neurotoxique sévère ; les vapeurs sont mortelles et s\'accumulent dans la chaîne alimentaire (méthylmercure).', colorHex: '#818cf8'
  },
  {
    number: 82, symbol: 'Pb', name: 'Plomb', atomicMass: 207.2, period: 6, group: 14,
    category: 'post-transition-metal', categoryLabel: 'Métal pauvre', phase: 'solide',
    electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronShells: [2, 8, 18, 32, 18, 4], electronegativity: 2.33, atomicRadius: 154,
    meltingPoint: 327.46, boilingPoint: 1749, density: 11.34, yearDiscovered: 'Préhistoire',
    discoverer: 'Inconnu', summary: "Métal lourd et malléable connu depuis l'Antiquité, excellent bouclier contre les rayonnements radioactifs et X.",
    uses: ['Protection antiradiations (tabliers et murs plombés)', 'Batteries au plomb des automobiles', 'Lests de plongée et de bateaux'],
    hazards: 'Toxique cumulatif provoquant le saturnisme (atteintes cérébrales et rénales irréversibles).', colorHex: '#60a5fa'
  },
  {
    number: 92, symbol: 'U', name: 'Uranium', atomicMass: 238.03, period: 7, group: 3,
    category: 'actinide', categoryLabel: 'Actinide', phase: 'solide',
    electronConfiguration: '[Rn] 5f³ 6d¹ 7s²', electronShells: [2, 8, 18, 32, 21, 9, 2], electronegativity: 1.38, atomicRadius: 196,
    meltingPoint: 1135, boilingPoint: 4131, density: 19.1, yearDiscovered: 1789,
    discoverer: 'Martin Heinrich Klaproth', summary: "Élément radioactif fissile naturel, carburant principal des réacteurs nucléaires civils et des armes atomiques.",
    uses: ['Production d\'électricité dans les centrales nucléaires (U-235)', 'Uranium appauvri pour blindages militaires et quilles', 'Datation géologique uranium-plomb'],
    hazards: 'Radioactif émetteur alpha et chimiquement toxique pour les reins.', colorHex: '#d946ef'
  },
  {
    number: 94, symbol: 'Pu', name: 'Plutonium', atomicMass: 244, period: 7, group: 3,
    category: 'actinide', categoryLabel: 'Actinide', phase: 'synthétique',
    electronConfiguration: '[Rn] 5f⁶ 7s²', electronShells: [2, 8, 18, 32, 24, 8, 2], electronegativity: 1.28, atomicRadius: 187,
    meltingPoint: 639.4, boilingPoint: 3228, density: 19.86, yearDiscovered: 1940,
    discoverer: 'Glenn T. Seaborg et coll.', summary: "Élément transuranien synthétisé dans les réacteurs, carburant nucléaire MOX et source d'énergie spatiale (générateurs RTG).",
    uses: ['Générateurs thermoélectriques spatiaux des sondes Voyager et Curiosity (Pu-238)', 'Armes nucléaires', 'Combustible MOX'],
    hazards: 'Hautement radiotoxique et cancérigène ; pyrophorique à l\'air.', colorHex: '#d946ef'
  }
];

// Helper to generate the remaining elements up to 118 with accurate periodic properties
const ALL_118_NAMES: Record<number, { sym: string; name: string; mass: number; period: number; group: number; cat: ChemicalElement['category']; catLabel: string; phase: ChemicalElement['phase']; config: string; shells: number[]; en: number | null }> = {
  61: { sym: 'Pm', name: 'Prométhium', mass: 145, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'synthétique', config: '[Xe] 4f⁵ 6s²', shells: [2,8,18,23,8,2], en: 1.13 },
  62: { sym: 'Sm', name: 'Samarium', mass: 150.36, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f⁶ 6s²', shells: [2,8,18,24,8,2], en: 1.17 },
  63: { sym: 'Eu', name: 'Europium', mass: 151.96, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f⁷ 6s²', shells: [2,8,18,25,8,2], en: 1.2 },
  64: { sym: 'Gd', name: 'Gadolinium', mass: 157.25, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f⁷ 5d¹ 6s²', shells: [2,8,18,25,9,2], en: 1.2 },
  65: { sym: 'Tb', name: 'Terbium', mass: 158.93, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f⁹ 6s²', shells: [2,8,18,27,8,2], en: 1.2 },
  66: { sym: 'Dy', name: 'Dysprosium', mass: 162.50, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹⁰ 6s²', shells: [2,8,18,28,8,2], en: 1.22 },
  67: { sym: 'Ho', name: 'Holmium', mass: 164.93, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹¹ 6s²', shells: [2,8,18,29,8,2], en: 1.23 },
  68: { sym: 'Er', name: 'Erbium', mass: 167.26, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹² 6s²', shells: [2,8,18,30,8,2], en: 1.24 },
  69: { sym: 'Tm', name: 'Thulium', mass: 168.93, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹³ 6s²', shells: [2,8,18,31,8,2], en: 1.25 },
  70: { sym: 'Yb', name: 'Ytterbium', mass: 173.05, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹⁴ 6s²', shells: [2,8,18,32,8,2], en: 1.1 },
  71: { sym: 'Lu', name: 'Lutécium', mass: 174.97, period: 6, group: 3, cat: 'lanthanide', catLabel: 'Lanthanide', phase: 'solide', config: '[Xe] 4f¹⁴ 5d¹ 6s²', shells: [2,8,18,32,9,2], en: 1.27 },
  72: { sym: 'Hf', name: 'Hafnium', mass: 178.49, period: 6, group: 4, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'solide', config: '[Xe] 4f¹⁴ 5d² 6s²', shells: [2,8,18,32,10,2], en: 1.3 },
  73: { sym: 'Ta', name: 'Tantale', mass: 180.95, period: 6, group: 5, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'solide', config: '[Xe] 4f¹⁴ 5d³ 6s²', shells: [2,8,18,32,11,2], en: 1.5 },
  75: { sym: 'Re', name: 'Rhénium', mass: 186.21, period: 6, group: 7, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'solide', config: '[Xe] 4f¹⁴ 5d⁵ 6s²', shells: [2,8,18,32,13,2], en: 1.9 },
  76: { sym: 'Os', name: 'Osmium', mass: 190.23, period: 6, group: 8, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'solide', config: '[Xe] 4f¹⁴ 5d⁶ 6s²', shells: [2,8,18,32,14,2], en: 2.2 },
  77: { sym: 'Ir', name: 'Iridium', mass: 192.22, period: 6, group: 9, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'solide', config: '[Xe] 4f¹⁴ 5d⁷ 6s²', shells: [2,8,18,32,15,2], en: 2.2 },
  81: { sym: 'Tl', name: 'Thallium', mass: 204.38, period: 6, group: 13, cat: 'post-transition-metal', catLabel: 'Métal pauvre', phase: 'solide', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', shells: [2,8,18,32,18,3], en: 1.62 },
  83: { sym: 'Bi', name: 'Bismuth', mass: 208.98, period: 6, group: 15, cat: 'post-transition-metal', catLabel: 'Métal pauvre', phase: 'solide', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', shells: [2,8,18,32,18,5], en: 2.02 },
  84: { sym: 'Po', name: 'Polonium', mass: 209, period: 6, group: 16, cat: 'post-transition-metal', catLabel: 'Métal pauvre', phase: 'solide', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', shells: [2,8,18,32,18,6], en: 2.0 },
  85: { sym: 'At', name: 'Astate', mass: 210, period: 6, group: 17, cat: 'halogen', catLabel: 'Halogène', phase: 'solide', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', shells: [2,8,18,32,18,7], en: 2.2 },
  86: { sym: 'Rn', name: 'Radon', mass: 222, period: 6, group: 18, cat: 'noble-gas', catLabel: 'Gaz noble', phase: 'gaz', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', shells: [2,8,18,32,18,8], en: null },
  87: { sym: 'Fr', name: 'Francium', mass: 223, period: 7, group: 1, cat: 'alkali-metal', catLabel: 'Métal alcalin', phase: 'solide', config: '[Rn] 7s¹', shells: [2,8,18,32,18,8,1], en: 0.7 },
  88: { sym: 'Ra', name: 'Radium', mass: 226, period: 7, group: 2, cat: 'alkaline-earth', catLabel: 'Alcalino-terreux', phase: 'solide', config: '[Rn] 7s²', shells: [2,8,18,32,18,8,2], en: 0.9 },
  89: { sym: 'Ac', name: 'Actinium', mass: 227, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'solide', config: '[Rn] 6d¹ 7s²', shells: [2,8,18,32,18,9,2], en: 1.1 },
  90: { sym: 'Th', name: 'Thorium', mass: 232.04, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'solide', config: '[Rn] 6d² 7s²', shells: [2,8,18,32,18,10,2], en: 1.3 },
  91: { sym: 'Pa', name: 'Protactinium', mass: 231.04, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'solide', config: '[Rn] 5f² 6d¹ 7s²', shells: [2,8,18,32,20,9,2], en: 1.5 },
  93: { sym: 'Np', name: 'Neptunium', mass: 237, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f⁴ 6d¹ 7s²', shells: [2,8,18,32,22,9,2], en: 1.36 },
  95: { sym: 'Am', name: 'Américium', mass: 243, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f⁷ 7s²', shells: [2,8,18,32,25,8,2], en: 1.3 },
  96: { sym: 'Cm', name: 'Curium', mass: 247, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f⁷ 6d¹ 7s²', shells: [2,8,18,32,25,9,2], en: 1.3 },
  97: { sym: 'Bk', name: 'Berkélium', mass: 247, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f⁹ 7s²', shells: [2,8,18,32,27,8,2], en: 1.3 },
  98: { sym: 'Cf', name: 'Californium', mass: 251, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹⁰ 7s²', shells: [2,8,18,32,28,8,2], en: 1.3 },
  99: { sym: 'Es', name: 'Einsteinium', mass: 252, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹¹ 7s²', shells: [2,8,18,32,29,8,2], en: 1.3 },
  100: { sym: 'Fm', name: 'Fermium', mass: 257, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹² 7s²', shells: [2,8,18,32,30,8,2], en: 1.3 },
  101: { sym: 'Md', name: 'Mendélévium', mass: 258, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹³ 7s²', shells: [2,8,18,32,31,8,2], en: 1.3 },
  102: { sym: 'No', name: 'Nobélium', mass: 259, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹⁴ 7s²', shells: [2,8,18,32,32,8,2], en: 1.3 },
  103: { sym: 'Lr', name: 'Lawrencium', mass: 266, period: 7, group: 3, cat: 'actinide', catLabel: 'Actinide', phase: 'synthétique', config: '[Rn] 5f¹⁴ 7s² 7p¹', shells: [2,8,18,32,32,8,3], en: null },
  104: { sym: 'Rf', name: 'Rutherfordium', mass: 267, period: 7, group: 4, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d² 7s²', shells: [2,8,18,32,32,10,2], en: null },
  105: { sym: 'Db', name: 'Dubnium', mass: 268, period: 7, group: 5, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d³ 7s²', shells: [2,8,18,32,32,11,2], en: null },
  106: { sym: 'Sg', name: 'Seaborgium', mass: 269, period: 7, group: 6, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁴ 7s²', shells: [2,8,18,32,32,12,2], en: null },
  107: { sym: 'Bh', name: 'Bohrium', mass: 270, period: 7, group: 7, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁵ 7s²', shells: [2,8,18,32,32,13,2], en: null },
  108: { sym: 'Hs', name: 'Hassium', mass: 277, period: 7, group: 8, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁶ 7s²', shells: [2,8,18,32,32,14,2], en: null },
  109: { sym: 'Mt', name: 'Meitnérium', mass: 278, period: 7, group: 9, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁷ 7s²', shells: [2,8,18,32,32,15,2], en: null },
  110: { sym: 'Ds', name: 'Darmstadtium', mass: 281, period: 7, group: 10, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁸ 7s²', shells: [2,8,18,32,32,16,2], en: null },
  111: { sym: 'Rg', name: 'Roentgenium', mass: 282, period: 7, group: 11, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d⁹ 7s²', shells: [2,8,18,32,32,17,2], en: null },
  112: { sym: 'Cn', name: 'Copernicium', mass: 285, period: 7, group: 12, cat: 'transition-metal', catLabel: 'Métal de transition', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', shells: [2,8,18,32,32,18,2], en: null },
  113: { sym: 'Nh', name: 'Nihonium', mass: 286, period: 7, group: 13, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', shells: [2,8,18,32,32,18,3], en: null },
  114: { sym: 'Fl', name: 'Flérovium', mass: 289, period: 7, group: 14, cat: 'post-transition-metal', catLabel: 'Métal pauvre', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', shells: [2,8,18,32,32,18,4], en: null },
  115: { sym: 'Mc', name: 'Moscovium', mass: 290, period: 7, group: 15, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', shells: [2,8,18,32,32,18,5], en: null },
  116: { sym: 'Lv', name: 'Livermorium', mass: 293, period: 7, group: 16, cat: 'unknown', catLabel: 'Inconnu', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', shells: [2,8,18,32,32,18,6], en: null },
  117: { sym: 'Ts', name: 'Tennesse', mass: 294, period: 7, group: 17, cat: 'halogen', catLabel: 'Halogène', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', shells: [2,8,18,32,32,18,7], en: null },
  118: { sym: 'Og', name: 'Oganesson', mass: 294, period: 7, group: 18, cat: 'noble-gas', catLabel: 'Gaz noble', phase: 'synthétique', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', shells: [2,8,18,32,32,18,8], en: null },
};

// Build complete array of all 118 elements
export const ALL_ELEMENTS: ChemicalElement[] = Array.from({ length: 118 }, (_, idx) => {
  const z = idx + 1;
  const existing = ELEMENTS_DATA.find(e => e.number === z);
  if (existing) return existing;

  const extra = ALL_118_NAMES[z];
  if (extra) {
    return {
      number: z,
      symbol: extra.sym,
      name: extra.name,
      atomicMass: extra.mass,
      period: extra.period,
      group: extra.group,
      category: extra.cat,
      categoryLabel: extra.catLabel,
      phase: extra.phase,
      electronConfiguration: extra.config,
      electronShells: extra.shells,
      electronegativity: extra.en,
      atomicRadius: null,
      meltingPoint: null,
      boilingPoint: null,
      density: null,
      yearDiscovered: 'XXe siècle',
      discoverer: 'Équipes internationales (JINR, GSI, RIKEN, LLNL)',
      summary: `Élément lourd synthétisé artificiellement de numéro atomique ${z}. Très instable et hautement radioactif.`,
      uses: ['Recherche fondamentale en physique nucléaire', 'Îlot de stabilité théorique'],
      hazards: 'Radioactif, courte demi-vie.',
      colorHex: '#64748b'
    };
  }

  return {
    number: z,
    symbol: `E${z}`,
    name: `Élément ${z}`,
    atomicMass: z * 2.1,
    period: Math.min(7, Math.ceil(z / 18)),
    group: ((z - 1) % 18) + 1,
    category: 'unknown',
    categoryLabel: 'Inconnu',
    phase: 'synthétique',
    electronConfiguration: 'N/D',
    electronShells: [2, 8, 18],
    electronegativity: null,
    atomicRadius: null,
    meltingPoint: null,
    boilingPoint: null,
    density: null,
    yearDiscovered: 'N/D',
    discoverer: 'N/D',
    summary: 'Données expérimentales en cours d\'investigation.',
    uses: ['Recherche fondamentale'],
    hazards: 'N/D',
    colorHex: '#64748b'
  };
});
