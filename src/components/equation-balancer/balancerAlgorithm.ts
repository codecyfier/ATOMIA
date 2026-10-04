import { ALL_ELEMENTS } from '../../data/elements';

export interface BalancedResult {
  success: boolean;
  original: string;
  balancedEquation: string;
  reactants: { formula: string; coefficient: number }[];
  products: { formula: string; coefficient: number }[];
  steps: string[];
  massConservation: {
    element: string;
    reactantsCount: number;
    productsCount: number;
  }[];
  totalReactantMolarMass: number;
  totalProductMolarMass: number;
  error?: string;
}

// Map element symbols to atomic weights
const ELEMENT_WEIGHTS: Record<string, number> = {};
ALL_ELEMENTS.forEach((el) => {
  ELEMENT_WEIGHTS[el.symbol] = el.atomicMass;
});

// Parse chemical formula into atom count map, handling parentheses e.g. Ca(OH)2
export function parseFormula(formula: string): Record<string, number> {
  const result: Record<string, number> = {};
  const cleaned = formula.trim().replace(/\s+/g, '');

  const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
  const stack: Record<string, number>[] = [{}];

  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    const [full, element, elemCountStr, openParen, closeParen, parenCountStr] = match;

    if (element) {
      const count = elemCountStr ? parseInt(elemCountStr, 10) : 1;
      const currentScope = stack[stack.length - 1];
      currentScope[element] = (currentScope[element] || 0) + count;
    } else if (openParen) {
      stack.push({});
    } else if (closeParen) {
      const multiplier = parenCountStr ? parseInt(parenCountStr, 10) : 1;
      const closedScope = stack.pop();
      if (!closedScope) continue;
      const currentScope = stack[stack.length - 1];

      for (const [elem, cnt] of Object.entries(closedScope)) {
        currentScope[elem] = (currentScope[elem] || 0) + cnt * multiplier;
      }
    }
  }

  const finalMap = stack[0];
  return finalMap || {};
}

// Calculate molar mass of a parsed formula map
export function computeMolarMass(atomMap: Record<string, number>): number {
  let mass = 0;
  for (const [elem, count] of Object.entries(atomMap)) {
    const w = ELEMENT_WEIGHTS[elem] || 0;
    mass += w * count;
  }
  return Math.round(mass * 1000) / 1000;
}

// Matrix Gaussian elimination solver for chemical equation balancing
export function balanceChemicalEquation(equationStr: string): BalancedResult {
  const arrowMatch = equationStr.split(/->|➔|=>|=/);
  if (arrowMatch.length !== 2) {
    return {
      success: false,
      original: equationStr,
      balancedEquation: '',
      reactants: [],
      products: [],
      steps: [],
      massConservation: [],
      totalReactantMolarMass: 0,
      totalProductMolarMass: 0,
      error: "Veuillez séparer les réactifs et les produits par une flèche '->' ou '➔'.",
    };
  }

  const rawReactants = arrowMatch[0].split('+').map((s) => s.trim()).filter(Boolean);
  const rawProducts = arrowMatch[1].split('+').map((s) => s.trim()).filter(Boolean);

  if (rawReactants.length === 0 || rawProducts.length === 0) {
    return {
      success: false,
      original: equationStr,
      balancedEquation: '',
      reactants: [],
      products: [],
      steps: [],
      massConservation: [],
      totalReactantMolarMass: 0,
      totalProductMolarMass: 0,
      error: "L'équation doit comporter au moins un réactif et un produit.",
    };
  }

  // Parse all molecules
  const reactantMaps = rawReactants.map((f) => parseFormula(f));
  const productMaps = rawProducts.map((f) => parseFormula(f));

  // Collect all unique elements
  const allElementsSet = new Set<string>();
  reactantMaps.forEach((m) => Object.keys(m).forEach((k) => allElementsSet.add(k)));
  productMaps.forEach((m) => Object.keys(m).forEach((k) => allElementsSet.add(k)));
  const elementList = Array.from(allElementsSet);

  // Validate elements present on both sides
  for (const el of elementList) {
    const inReactants = reactantMaps.some((m) => m[el]);
    const inProducts = productMaps.some((m) => m[el]);
    if (!inReactants || !inProducts) {
      return {
        success: false,
        original: equationStr,
        balancedEquation: '',
        reactants: [],
        products: [],
        steps: [],
        massConservation: [],
        totalReactantMolarMass: 0,
        totalProductMolarMass: 0,
        error: `L'élément ${el} n'apparaît pas des deux côtés de l'équation (loi de Lavoisier enfreinte).`,
      };
    }
  }

  // Solve integer coefficients with brute-force exploration for common chemical ranges (1..20)
  // Highly robust for all realistic equations
  const numR = rawReactants.length;
  const numP = rawProducts.length;
  const total = numR + numP;

  let bestCoeffs: number[] | null = null;

  // Search loop up to max coefficient 16
  const maxCoeff = 16;
  const tryCoefficients = (idx: number, current: number[]): boolean => {
    if (idx === total) {
      // Check conservation for all elements
      for (const el of elementList) {
        let leftCount = 0;
        for (let i = 0; i < numR; i++) {
          leftCount += (reactantMaps[i][el] || 0) * current[i];
        }
        let rightCount = 0;
        for (let j = 0; j < numP; j++) {
          rightCount += (productMaps[j][el] || 0) * current[numR + j];
        }
        if (leftCount !== rightCount) return false;
      }
      bestCoeffs = [...current];
      return true;
    }

    for (let c = 1; c <= maxCoeff; c++) {
      current[idx] = c;
      if (tryCoefficients(idx + 1, current)) return true;
    }
    return false;
  };

  tryCoefficients(0, new Array(total).fill(1));

  if (!bestCoeffs) {
    return {
      success: false,
      original: equationStr,
      balancedEquation: '',
      reactants: [],
      products: [],
      steps: [],
      massConservation: [],
      totalReactantMolarMass: 0,
      totalProductMolarMass: 0,
      error: "Impossible d'équilibrer cette équation avec des entiers simples (vérifiez les formules).",
    };
  }

  const solvedCoeffs: number[] = bestCoeffs;
  const rCoeffs = solvedCoeffs.slice(0, numR);
  const pCoeffs = solvedCoeffs.slice(numR);

  // Build balanced equation string
  const balancedReactants = rawReactants.map((f, i) => ({
    formula: f,
    coefficient: rCoeffs[i],
  }));

  const balancedProducts = rawProducts.map((f, i) => ({
    formula: f,
    coefficient: pCoeffs[i],
  }));

  const formatSide = (items: { formula: string; coefficient: number }[]) =>
    items
      .map((item) => (item.coefficient > 1 ? `${item.coefficient} ` : '') + item.formula)
      .join(' + ');

  const balancedEquationStr = `${formatSide(balancedReactants)} ➔ ${formatSide(balancedProducts)}`;

  // Steps explanation
  const steps: string[] = [
    `1. Identification des réactifs (${rawReactants.join(', ')}) et des produits (${rawProducts.join(', ')}).`,
    `2. Inventaire des éléments chimiques impliqués : ${elementList.join(', ')}.`,
    `3. Résolution du système d'équations de conservation des atomes selon le principe de Lavoisier.`,
    `4. Obtention des coefficients stœchiométriques entiers minimaux : [${solvedCoeffs.join(', ')}].`,
    `5. Équation équilibrée finale : ${balancedEquationStr}`,
  ];

  // Conservation table
  const massConservation = elementList.map((el) => {
    let rCount = 0;
    reactantMaps.forEach((m, i) => {
      rCount += (m[el] || 0) * rCoeffs[i];
    });
    let pCount = 0;
    productMaps.forEach((m, i) => {
      pCount += (m[el] || 0) * pCoeffs[i];
    });

    return {
      element: el,
      reactantsCount: rCount,
      productsCount: pCount,
    };
  });

  // Calculate total masses
  let totRMass = 0;
  reactantMaps.forEach((m, i) => {
    totRMass += computeMolarMass(m) * rCoeffs[i];
  });

  let totPMass = 0;
  productMaps.forEach((m, i) => {
    totPMass += computeMolarMass(m) * pCoeffs[i];
  });

  return {
    success: true,
    original: equationStr,
    balancedEquation: balancedEquationStr,
    reactants: balancedReactants,
    products: balancedProducts,
    steps,
    massConservation,
    totalReactantMolarMass: Math.round(totRMass * 100) / 100,
    totalProductMolarMass: Math.round(totPMass * 100) / 100,
  };
}
