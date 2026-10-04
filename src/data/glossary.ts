export interface GlossaryTerm {
  term: string;
  category: 'Atomistique' | 'Liaisons' | 'Thermodynamique' | 'Cinétique' | 'Solutions & Acide-Base' | 'Chimie Organique' | 'Général';
  definition: string;
  formulaOrSymbol?: string;
  seeAlso?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Acide de Brønsted',
    category: 'Solutions & Acide-Base',
    definition: "Espèce chimique capable de céder un ou plusieurs protons H⁺ au cours d'une réaction chimique.",
    formulaOrSymbol: 'HA ➔ A⁻ + H⁺',
    seeAlso: ['Base de Brønsted', 'pH', 'pKa']
  },
  {
    term: 'Actinides',
    category: 'Atomistique',
    definition: "Série de 15 éléments métalliques radioactifs allant de l'actinium (Z=89) au lawrencium (Z=103), caractérisés par le remplissage de la sous-couche électronique 5f.",
    seeAlso: ['Lanthanides', 'Numéro atomique']
  },
  {
    term: 'Allotropie',
    category: 'Général',
    definition: "Propriété d'un élément chimique pur d'exister sous plusieurs formes cristallines ou moléculaires différentes dans les mêmes conditions physiques (ex: graphite, diamant et graphène pour le carbone).",
    seeAlso: ['Carbone']
  },
  {
    term: 'Amphotère (ou ampholyte)',
    category: 'Solutions & Acide-Base',
    definition: "Espèce chimique qui peut se comporter à la fois comme un acide ou comme une base selon le milieu. L'eau (H₂O) ou les acides aminés en sont des exemples typiques.",
    formulaOrSymbol: 'H₂O / OH⁻ et H₃O⁺ / H₂O',
    seeAlso: ['Acide de Brønsted', 'Base de Brønsted']
  },
  {
    term: 'Anion',
    category: 'Atomistique',
    definition: "Ion portant une ou plusieurs charges électriques négatives, formé lorsqu'un atome ou un groupe d'atomes gagne des électrons (ex: Cl⁻, SO₄²⁻).",
    seeAlso: ['Cation', 'Liaison ionique']
  },
  {
    term: 'Avancement de réaction (x)',
    category: 'Général',
    definition: "Grandeur notée x, exprimée en moles, quantifiant la progression d'une réaction chimique depuis son état initial jusqu'à son état final.",
    formulaOrSymbol: 'x (en mol)',
    seeAlso: ['Stœchiométrie', 'Réactif limitant']
  },
  {
    term: 'Base de Brønsted',
    category: 'Solutions & Acide-Base',
    definition: "Espèce chimique capable de capter un ou plusieurs protons H⁺ au cours d'une réaction chimique.",
    formulaOrSymbol: 'B + H⁺ ➔ BH⁺',
    seeAlso: ['Acide de Brønsted', 'pH']
  },
  {
    term: 'Catalyseur',
    category: 'Cinétique',
    definition: "Substance qui accélère la vitesse d'une réaction chimique en abaissant l'énergie d'activation globale, sans être consommée dans le bilan stœchiométrique.",
    seeAlso: ['Énergie d\'activation', 'Cinétique']
  },
  {
    term: 'Cation',
    category: 'Atomistique',
    definition: "Ion portant une ou plusieurs charges électriques positives, formé lorsqu'un atome ou un groupe d'atomes perd un ou plusieurs électrons (ex: Na⁺, Ca²⁺).",
    seeAlso: ['Anion', 'Liaison ionique']
  },
  {
    term: 'Configuration électronique',
    category: 'Atomistique',
    definition: "Description de la répartition des électrons d'un atome dans ses différentes couches et sous-couches (s, p, d, f) selon les règles de Klechkowski, Pauli et Hund.",
    formulaOrSymbol: 'Ex: 1s² 2s² 2p⁶',
    seeAlso: ['Orbitale atomique', 'Règle de Klechkowski']
  },
  {
    term: 'Constante d\'Avogadro (N_A)',
    category: 'Général',
    definition: "Nombre d'entités élémentaires (atomes, molécules ou ions) présentes dans exactement une mole de substance, valant 6.02214076 × 10²³ mol⁻¹.",
    formulaOrSymbol: 'N_A = 6.022 × 10²³ mol⁻¹',
    seeAlso: ['Mole', 'Masse molaire']
  },
  {
    term: 'Dipôle électrique & Polarité',
    category: 'Liaisons',
    definition: "Séparation spatiale entre un barycentre de charges positives et un barycentre de charges négatives au sein d'une liaison chimique ou d'une molécule.",
    formulaOrSymbol: 'μ = q · d (Debye)',
    seeAlso: ['Électronégativité', 'VSEPR']
  },
  {
    term: 'Électronégativité (χ)',
    category: 'Liaisons',
    definition: "Capacité relative d'un atome engagé dans une liaison chimique à attirer vers lui les électrons du doublet liant. Échelle de Pauling la plus utilisée (Fluor = 3.98).",
    seeAlso: ['Liaison covalente', 'Fluor']
  },
  {
    term: 'Énergie d\'activation (Ea)',
    category: 'Cinétique',
    definition: "Barrière d'énergie cinétique minimale que les molécules de réactifs doivent acquérir lors d'un choc pour rompre les liaisons et démarrer la réaction.",
    formulaOrSymbol: 'Loi d\'Arrhenius : k = A·e^(-Ea/RT)',
    seeAlso: ['Catalyseur', 'Cinétique']
  },
  {
    term: 'Enthalpie (H)',
    category: 'Thermodynamique',
    definition: "Fonction d'état thermodynamique mesurant l'énergie thermique totale d'un système à pression constante. ΔH < 0 caractérise une réaction exothermique.",
    formulaOrSymbol: 'ΔH = Q_p',
    seeAlso: ['Entropie', 'Loi de Hess']
  },
  {
    term: 'Entropie (S)',
    category: 'Thermodynamique',
    definition: "Mesure quantitative du désordre microscopique ou du nombre de micro-états accessibles à un système physico-chimique.",
    formulaOrSymbol: 'ΔS en J·K⁻¹·mol⁻¹',
    seeAlso: ['Enthalpie', 'Énergie libre de Gibbs']
  },
  {
    term: 'Gaz parfait',
    category: 'Général',
    definition: "Modèle thermodynamique idéal de gaz dans lequel les molécules n'ont pas de volume propre et n'exercent aucune interaction à distance.",
    formulaOrSymbol: 'P · V = n · R · T',
    seeAlso: ['Mole', 'Pression']
  },
  {
    term: 'Isotopes',
    category: 'Atomistique',
    definition: "Atomes possédant le même nombre de protons Z (même élément chimique) mais un nombre différent de neutrons N, d'où des masses atomiques différentes.",
    seeAlso: ['Numéro atomique', 'Nombre de masse']
  },
  {
    term: 'Liaison covalente',
    category: 'Liaisons',
    definition: "Liaison chimique formée par la mise en commun d'une ou plusieurs paires d'électrons (doublets liants) entre deux atomes.",
    seeAlso: ['Liaison ionique', 'VSEPR']
  },
  {
    term: 'Liaison hydrogène',
    category: 'Liaisons',
    definition: "Interaction intermoléculaire attractive particulièrement stable entre un atome d'hydrogène lié à un élément fortement électronégatif (F, O, N) et le doublet libre d'un autre atome (F, O, N).",
    seeAlso: ['Eau', 'Polarité']
  },
  {
    term: 'Mole (mol)',
    category: 'Général',
    definition: "Unité de base du Système International pour la quantité de matière, correspondant à exactement 6.02214076 × 10²³ entités élémentaires.",
    seeAlso: ['Constante d\'Avogadro', 'Masse molaire']
  },
  {
    term: 'Nombre d\'oxydation (n.o.)',
    category: 'Général',
    definition: "Charge fictive que porterait un atome si tous les doublets d'électrons liants étaient entièrement attribués à l'atome le plus électronégatif.",
    seeAlso: ['Oxydoréduction', 'Électronégativité']
  },
  {
    term: 'Orbitale atomique',
    category: 'Atomistique',
    definition: "Région de l'espace tridimensionnel autour du noyau où la probabilité de présence d'un électron d'énergie donnée est maximale (généralement 90% ou 95%).",
    seeAlso: ['Nombres quantiques', 'Configuration électronique']
  },
  {
    term: 'Oxydant & Réducteur',
    category: 'Général',
    definition: "Un oxydant capte des électrons (il est réduit) ; un réducteur cède des électrons (il est oxydé).",
    formulaOrSymbol: 'Ox + n e⁻ ⇌ Red',
    seeAlso: ['Nombre d\'oxydation']
  },
  {
    term: 'pH (Potentiel Hydrogène)',
    category: 'Solutions & Acide-Base',
    definition: "Mesure de l'acidité ou de la basicité d'une solution aqueuse, définie par l'opposé du logarithme décimal de l'activité des ions hydronium H₃O⁺.",
    formulaOrSymbol: 'pH = -log[H₃O⁺]',
    seeAlso: ['pKa', 'Acide de Brønsted']
  },
  {
    term: 'pKa',
    category: 'Solutions & Acide-Base',
    definition: "Opposé du logarithme décimal de la constante d'acidité Ka d'un couple acido-basique. Plus le pKa est faible, plus l'acide est fort.",
    formulaOrSymbol: 'pKa = -log(Ka)',
    seeAlso: ['pH', 'Solution tampon']
  },
  {
    term: 'Principe de Le Chatelier',
    category: 'Thermodynamique',
    definition: "Tout changement imposé à un système chimique en équilibre (température, pression, concentration) provoque un déplacement de l'équilibre dans le sens qui tend à s'opposer à cette perturbation.",
    seeAlso: ['Équilibres', 'Enthalpie']
  },
  {
    term: 'Règle de Klechkowski',
    category: 'Atomistique',
    definition: "Règle empirique de la mécanique quantique indiquant que les sous-couches électroniques se remplissent par ordre croissant de la valeur (n + l).",
    seeAlso: ['Configuration électronique', 'Orbitale atomique']
  },
  {
    term: 'Règle de l\'octet',
    category: 'Liaisons',
    definition: "Tendance des atomes (notamment de la deuxième période) à partager, donner ou recevoir des électrons pour avoir 8 électrons sur leur couche de valence, comme les gaz nobles.",
    seeAlso: ['Liaison covalente', 'Gaz nobles']
  },
  {
    term: 'Solution tampon',
    category: 'Solutions & Acide-Base',
    definition: "Solution aqueuse dont le pH varie très peu lors de l'ajout modéré d'un acide fort ou d'une base forte, ou lors d'une dilution raisonnable.",
    formulaOrSymbol: 'pH = pKa + log([A⁻]/[HA])',
    seeAlso: ['pH', 'pKa']
  },
  {
    term: 'VSEPR (Gillespie)',
    category: 'Liaisons',
    definition: "Valence Shell Electron Pair Repulsion : modèle géométrique prédisant la disposition tridimensionnelle des atomes d'une molécule en minimisant la répulsion électrostatique mutuelle des doublets d'électrons de valence.",
    seeAlso: ['Liaisons', 'Dipôle électrique']
  }
];
