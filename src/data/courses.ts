export interface CourseSection {
  id: string;
  title: string;
  summary: string;
  content: string[]; // paragraphs
  keyFormulas?: { label: string; formula: string; note: string }[];
  mnemonics?: string[];
  examples?: { question: string; answer: string; explanation: string }[];
}

export interface CourseChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  level: 'Secondaire' | 'Supérieur' | 'Tous niveaux';
  readTimeMinutes: number;
  sections: CourseSection[];
}

export const COURSES_DATA: CourseChapter[] = [
  {
    id: 'atomistique',
    number: 1,
    title: 'Atomistique & Structure de la Matière',
    subtitle: 'Noyau, cortège électronique, nombres quantiques et règle de Klechkowski',
    iconName: 'Atom',
    level: 'Tous niveaux',
    readTimeMinutes: 8,
    sections: [
      {
        id: 'noyau-particules',
        title: '1. Constitution du noyau atomique',
        summary: "L'atome est constitué d'un noyau central dense chargé positivement et d'électrons qui gravitent autour.",
        content: [
          "Un atome est désigné par la notation conventionnelle ^A_Z X, où Z représente le numéro atomique (nombre de protons) et A le nombre de masse (nombre total de nucléons = protons + neutrons).",
          "Le nombre de neutrons est donné par N = A - Z. Dans un atome électriquement neutre, le nombre d'électrons est égal au nombre de protons Z.",
          "Les isotopes d'un même élément possèdent le même numéro atomique Z mais un nombre de masse A différent (ex: le Carbone 12, 13 et 14)."
        ],
        keyFormulas: [
          { label: 'Nombre de masse', formula: 'A = Z + N', note: 'Z = protons, N = neutrons' },
          { label: 'Charge du noyau', formula: 'Q = + Z · e', note: 'e = 1.602 × 10⁻¹⁹ C' }
        ],
        mnemonics: [
          "« A » comme « Au-dessus » (en haut à gauche de la lettre) = nombre de masse.",
          "« Z » comme « Zéro » (au sol, en bas) = numéro atomique."
        ]
      },
      {
        id: 'nombres-quantiques',
        title: '2. Nombres quantiques et couches',
        summary: "Quatre nombres quantiques décrivent l'état individuel de chaque électron dans un atome.",
        content: [
          "1. Nombre quantique principal (n ≥ 1) : définit le niveau d'énergie et la taille de l'orbitale (couches K, L, M, N...).",
          "2. Nombre quantique secondaire ou azimutal (0 ≤ l ≤ n - 1) : définit la forme géométrique de l'orbitale (l=0 : s, l=1 : p, l=2 : d, l=3 : f).",
          "3. Nombre quantique magnétique (-l ≤ ml ≤ +l) : définit l'orientation spatiale de l'orbitale.",
          "4. Nombre quantique de spin (ms = +1/2 ou -1/2) : moment cinétique intrinsèque de l'électron."
        ],
        keyFormulas: [
          { label: 'Capacité d\'une couche n', formula: '2n²', note: 'Ex: n=1 -> 2 e⁻, n=2 -> 8 e⁻, n=3 -> 18 e⁻' }
        ]
      },
      {
        id: 'regles-remplissage',
        title: '3. Règles de remplissage électronique',
        summary: "Klechkowski, Pauli et Hund régissent l'ordre de remplissage des sous-couches.",
        content: [
          "Principe d'exclusion de Pauli : deux électrons d'un même atome ne peuvent avoir leurs quatre nombres quantiques identiques (2 électrons par case quantique, de spins opposés).",
          "Règle de Klechkowski : les sous-couches se remplissent par ordre croissant de la somme (n + l). En cas d'égalité, celle avec le plus petit n se remplit en premier : 1s -> 2s -> 2p -> 3s -> 3p -> 4s -> 3d -> 4p...",
          "Règle de Hund : au sein d'une même sous-couche dégénérée (ex: 2p), les électrons occupent le maximum d'orbitales avec des spins parallèles avant de s'apparier."
        ],
        mnemonics: [
          "Ordre de Klechkowski : 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d... Suivre les diagonales du tableau."
        ]
      }
    ]
  },
  {
    id: 'liaisons-vsepr',
    number: 2,
    title: 'Liaisons Chimiques, Polarité & VSEPR',
    subtitle: 'Liaison covalente, ionique, électronégativité et géométrie moléculaire 3D',
    iconName: 'Share2',
    level: 'Tous niveaux',
    readTimeMinutes: 10,
    sections: [
      {
        id: 'nature-liaisons',
        title: '1. Les types de liaisons chimiques',
        summary: "Les atomes s'associent pour acquérir une configuration stable en octet ou duet semblable à celle d'un gaz noble.",
        content: [
          "Liaison covalente : mise en commun d'un ou plusieurs doublets d'électrons entre deux atomes de même électronégativité ou d'électronégativités proches (Δχ < 1.7).",
          "Liaison ionique : transfert complet d'électrons d'un métal électropositif vers un non-métal électronégatif (Δχ ≥ 1.7), formant des ions attirés par force électrostatique coulombienne.",
          "Liaison hydrogène : interaction intermoléculaire attractive forte entre un hydrogène lié à un atome très électronégatif (F, O, N) et le doublet non-liant d'un autre atome (F, O, N)."
        ],
        mnemonics: [
          "Liaison hydrogène : se souvient du mot « FON » (Fluor, Oxygène, Azote) !"
        ]
      },
      {
        id: 'methode-vsepr',
        title: '2. Théorie VSEPR (Gillespie)',
        summary: "La géométrie d'une molécule dépend de la répulsion maximale entre doublets liants et doublets non-liants.",
        content: [
          "Notation AXmEn : A = atome central, X = atomes liés (m liaisons simples, doubles ou triples comptent chacune pour 1), E = doublets non-liants (n).",
          "AX2 (m=2, n=0) : Linéaire (180°), ex: CO2, BeCl2.",
          "AX3 (m=3, n=0) : Triangulaire plane (120°), ex: BF3, SO3.",
          "AX4 (m=4, n=0) : Tétraédrique (109.5°), ex: CH4, CCl4.",
          "AX3E1 (m=3, n=1) : Pyramide trigonale (~107°), ex: NH3.",
          "AX2E2 (m=2, n=2) : Coudée ou angulaire (~104.5°), ex: H2O."
        ],
        keyFormulas: [
          { label: 'Nombre stérique', formula: 'NS = m + n', note: '2: linéaire, 3: plan, 4: tétraèdre' }
        ]
      }
    ]
  },
  {
    id: 'reactions-equilibres',
    number: 3,
    title: 'Équilibres Chimiques & Stœchiométrie',
    subtitle: 'Loi de conservation, avancement de réaction et réactif limitant',
    iconName: 'Equal',
    level: 'Secondaire',
    readTimeMinutes: 7,
    sections: [
      {
        id: 'lavoisier-stoechio',
        title: '1. Conservation de la matière',
        summary: "« Rien ne se perd, rien ne se crée, tout se transforme » — Antoine de Lavoisier.",
        content: [
          "Dans une réaction chimique, les atomes présents dans les réactifs se réarrangent pour former les produits. Le nombre d'atomes de chaque élément doit être rigoureusement conservé de part et d'autre de la flèche.",
          "La charge électrique globale doit également être strictement conservée.",
          "Les nombres placés devant chaque formule chimique sont appelés coefficients stœchiométriques et sont toujours choisis comme les plus petits entiers possibles."
        ]
      },
      {
        id: 'tableau-avancement',
        title: '2. Tableau d\'avancement & Réactif limitant',
        summary: "L'avancement x (en moles) permet de suivre l'évolution des quantités de matière au cours de la réaction.",
        content: [
          "Pour une réaction aA + bB -> cC + dD : à l'instant t, n(A) = n₀(A) - ax et n(B) = n₀(B) - bx.",
          "Le réactif limitant est celui qui s'épuise en premier. Il correspond à la plus petite valeur d'avancement maximal : x_max = min(n₀(A)/a, n₀(B)/b).",
          "À l'état final, la quantité de réactif limitant restante est nulle !"
        ],
        keyFormulas: [
          { label: 'Condition de stœchiométrie', formula: 'n₀(A) / a = n₀(B) / b', note: 'Mélange stœchiométrique parfait' },
          { label: 'Avancement maximal', formula: 'x_max = min(n₀ / ν)', note: 'ν = coefficient stœchiométrique' }
        ]
      }
    ]
  },
  {
    id: 'acide-base-ph',
    number: 4,
    title: 'Solutions Aqueuses & Équilibres Acide-Base',
    subtitle: 'Définition de Brønsted, produit ionique de l\'eau et calculs de pH',
    iconName: 'FlaskConical',
    level: 'Tous niveaux',
    readTimeMinutes: 9,
    sections: [
      {
        id: 'bronsted-definition',
        title: '1. Théorie de Brønsted-Lowry',
        summary: "Un acide cède un proton H+, une base capte un proton H+.",
        content: [
          "Un couple acide/base HA / A⁻ est relié par la demi-équation : HA ⇌ A⁻ + H⁺.",
          "L'eau est une espèce amphotère (ou ampholyte) : elle se comporte comme une base dans le couple H3O⁺/H2O et comme un acide dans le couple H2O/OH⁻.",
          "Autoprotolyse de l'eau : 2 H2O ⇌ H3O⁺ + OH⁻, avec pour produit ionique Ke = [H3O⁺][OH⁻] = 1.0 × 10⁻¹⁴ à 25°C."
        ],
        keyFormulas: [
          { label: 'Produit ionique', formula: 'Ke = [H3O⁺] · [OH⁻] = 10⁻¹⁴', note: 'À 25°C' },
          { label: 'Relation pKe', formula: 'pH + pOH = 14', note: 'En solution aqueuse diluée' }
        ]
      },
      {
        id: 'calcul-ph',
        title: '2. Formules de calcul de pH',
        summary: "Le pH (potentiel hydrogène) mesure la concentration d'ions hydronium H3O+ en solution.",
        content: [
          "1. Acide fort en solution diluée : dissociation totale -> pH = -log(C).",
          "2. Base forte en solution diluée : pH = 14 + log(C).",
          "3. Acide faible (dissociation partielle, Ka) : pH = 1/2 · (pKa - log(C)).",
          "4. Base faible : pH = 7 + 1/2 · (pKa + log(C)).",
          "5. Solution tampon : pH = pKa + log([Base]/[Acide]) (équation d'Henderson-Hasselbalch)."
        ],
        keyFormulas: [
          { label: 'Définition générale', formula: 'pH = -log[H₃O⁺]', note: '[H₃O⁺] en mol/L' },
          { label: 'Henderson-Hasselbalch', formula: 'pH = pKa + log([A⁻]/[HA])', note: 'Solutions tampons' }
        ]
      }
    ]
  },
  {
    id: 'thermochimie',
    number: 5,
    title: 'Thermochimie & Énergétique Réactionnelle',
    subtitle: 'Premier et second principes, enthalpie, entropie et énergie libre de Gibbs',
    iconName: 'Flame',
    level: 'Supérieur',
    readTimeMinutes: 8,
    sections: [
      {
        id: 'enthalpie-chaleur',
        title: '1. Enthalpie et chaleurs de réaction',
        summary: "Une réaction peut libérer de la chaleur (exothermique) ou en absorber (endothermique).",
        content: [
          "L'enthalpie H est une fonction d'état représentative de l'énergie thermique échangée à pression constante : ΔH = Qp.",
          "Si ΔH < 0 : la réaction dégage de la chaleur vers l'extérieur (exothermique).",
          "Si ΔH > 0 : la réaction absorbe de la chaleur du milieu extérieur (endothermique).",
          "Loi de Hess : l'enthalpie standard de réaction est la somme des enthalpies de formation des produits moins celle des réactifs."
        ],
        keyFormulas: [
          { label: 'Loi de Hess', formula: 'ΔrH° = Σ ν_p · ΔfH°(produits) - Σ ν_r · ΔfH°(réactifs)', note: 'ν = coefficients' }
        ]
      },
      {
        id: 'enthalpie-libre',
        title: '2. Enthalpie libre de Gibbs et spontanéité',
        summary: "Le signe de ΔG détermine si une réaction est spontanée à température et pression données.",
        content: [
          "L'équation de Gibbs relie enthalpie ΔH, température T (en Kelvin) et entropie ΔS : ΔG = ΔH - T·ΔS.",
          "Si ΔG < 0 : réaction spontanée (exergonique).",
          "Si ΔG = 0 : état d'équilibre thermodynamique.",
          "Si ΔG > 0 : réaction impossible spontanément dans ce sens (endergonique)."
        ],
        keyFormulas: [
          { label: 'Énergie libre de Gibbs', formula: 'ΔG = ΔH - T · ΔS', note: 'T en Kelvin obligatoire !' }
        ]
      }
    ]
  },
  {
    id: 'cinetique-chimique',
    number: 6,
    title: 'Cinétique Chimique & Catalyse',
    subtitle: 'Vitesse de réaction, ordre, loi d\'Arrhenius et rôle des catalyseurs',
    iconName: 'Timer',
    level: 'Supérieur',
    readTimeMinutes: 7,
    sections: [
      {
        id: 'vitesse-reaction',
        title: '1. Facteurs cinétiques et vitesse volumique',
        summary: "La cinétique étudie le temps nécessaire aux réactifs pour se transformer en produits.",
        content: [
          "La vitesse d'une réaction dépend de plusieurs facteurs cinétiques majeurs : la concentration des réactifs, la température du milieu, l'état de division des solides et la présence d'un catalyseur.",
          "Loi d'Arrhenius : la constante de vitesse k augmente de manière exponentielle avec la température : k = A · exp(-Ea / RT).",
          "Un catalyseur accélère la vitesse d'une réaction chimique en abaissant l'énergie d'activation Ea sans être consommé dans le bilan global."
        ],
        keyFormulas: [
          { label: 'Loi d\'Arrhenius', formula: 'k = A · e^(-Ea / (R·T))', note: 'Ea en J/mol, T en Kelvin' }
        ]
      }
    ]
  },
  {
    id: 'chimie-organique',
    number: 7,
    title: 'Bases de la Chimie Organique',
    subtitle: 'Groupes fonctionnels, nomenclature IUPAC et isomérie',
    iconName: 'Dna',
    level: 'Tous niveaux',
    readTimeMinutes: 9,
    sections: [
      {
        id: 'groupes-fonctionnels',
        title: '1. Principales familles de composés organiques',
        summary: "La chimie organique est la chimie des composés du carbone et de leurs groupements fonctionnels.",
        content: [
          "Alcanes : liaisons simples C-C (CnH2n+2). Ex: Méthane, Éthane.",
          "Alcènes : au moins une double liaison C=C (CnH2n).",
          "Alcools : groupe hydroxyle -OH (suffixe -ol).",
          "Aldéhydes : groupe carbonyle terminal -CHO (suffixe -al).",
          "Cétones : groupe carbonyle intérieur C=O (suffixe -one).",
          "Acides carboxyliques : groupe carboxyle -COOH (acide ...-oïque).",
          "Esters : groupe -COO-C (suffixe -oate d'...yle).",
          "Amines : groupe amino -NH2, -NHR ou -NR2."
        ]
      },
      {
        id: 'isomeric',
        title: '2. Isomérie de constitution et stéréoisomérie',
        summary: "Deux molécules sont isomères si elles possèdent la même formule brute mais des structures différentes.",
        content: [
          "Isomères de constitution : de chaîne (squelette carboné ramifié), de position (emplacement du groupement ou de l'insaturation) ou de fonction (ex: alcool et éther-oxyde).",
          "Stéréoisomérie de conformation : différentes dispositions spatiales obtenues par simple rotation autour d'une liaison simple C-C.",
          "Stéréoisomérie de configuration : nécessite de briser une liaison chimique pour passer d'un isomère à l'autre (énantiomères images l'un de l'autre dans un miroir, et diastéréoisomères Z/E)."
        ]
      }
    ]
  }
];
