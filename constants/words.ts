import { WordItem } from '../types';

export const WORD_LIST: WordItem[] = [
  // Programming & Tech
  { word: 'TYPESCRIPT', category: 'Programming', hint: 'A typed superset of JavaScript that compiles to plain JavaScript.' },
  { word: 'REACT', category: 'Programming', hint: 'A popular frontend library developed by Meta for building user interfaces.' },
  { word: 'NEXTJS', category: 'Programming', hint: 'The React Framework for the Web with built-in routing and rendering features.' },
  { word: 'TAILWIND', category: 'Programming', hint: 'A utility-first CSS framework for rapid UI development.' },
  { word: 'ALGORITHM', category: 'Programming', hint: 'A step-by-step procedure or formula for solving a problem.' },
  
  // Astronomy & Science
  { word: 'NEBULA', category: 'Astronomy', hint: 'An interstellar cloud of dust, hydrogen, helium and other ionized gases.' },
  { word: 'GALAXY', category: 'Astronomy', hint: 'A gravitationally bound system of stars, stellar remnants, gas, and dark matter.' },
  { word: 'SUPERNOVA', category: 'Astronomy', hint: 'A powerful and luminous stellar explosion.' },
  { word: 'BLACKHOLE', category: 'Astronomy', hint: 'A region of spacetime where gravity is so strong nothing can escape.' },
  
  // Geography
  { word: 'ARCHIPELAGO', category: 'Geography', hint: 'A group or chain of islands clustered together in a body of water.' },
  { word: 'EQUATOR', category: 'Geography', hint: 'An imaginary line drawn around the earth equidistant from both poles.' },
  { word: 'PENINSULA', category: 'Geography', hint: 'A piece of land almost surrounded by water or projecting out into a body of water.' },
  { word: 'FJORD', category: 'Geography', hint: 'A long, narrow, deep inlet of the sea between high cliffs.' },
  
  // Animals & Nature
  { word: 'PLATYPUS', category: 'Animals', hint: 'A semiaquatic egg-laying mammal endemic to eastern Australia.' },
  { word: 'CHAMELEON', category: 'Animals', hint: 'A distinctive branch of highly specialized lizards known for color change.' },
  { word: 'OCTOPUS', category: 'Animals', hint: 'A soft-bodied, eight-limbed mollusc.' },
  { word: 'AVALANCHE', category: 'Nature', hint: 'A rapid flow of snow down a sloping surface.' },

  // Food & Culinary
  { word: 'CROISSANT', category: 'Food & Drink', hint: 'A buttery, flaky, viennoiserie pastry named for its crescent shape.' },
  { word: 'ESPRESSO', category: 'Food & Drink', hint: 'A concentrated coffee beverage brewed by forcing hot water under pressure.' },
  { word: 'CHOCOLATE', category: 'Food & Drink', hint: 'A preparation of roasted and ground cacao seeds, typically sweetened.' }
];

export const DEFAULT_MAX_GUESSES = 6;
