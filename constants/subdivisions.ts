export const TRIPLET_SUBDIVISION = 2 / 3
export const DOTTED_SUBDIVISION = 3 / 4

export type SubdivisionName = keyof typeof SUBDIVISIONS

export const SUBDIVISIONS = {
    Whole: 1 * 4,
    'Dotted Whole': 1 * 4 * DOTTED_SUBDIVISION,
    'Triplet Whole': 1 * 4 * TRIPLET_SUBDIVISION,
    Half: 1 * 2,
    'Dotted Half': 1 * 2 * DOTTED_SUBDIVISION,
    'Triplet Half': 1 * 2 * TRIPLET_SUBDIVISION,
    Quarter: 1 * 1,
    'Dotted Quarter': 1 * 1 * DOTTED_SUBDIVISION,
    'Triplet Quarter': 1 * 1 * TRIPLET_SUBDIVISION,
    Eighth: 1 / 2,
    'Dotted Eighth': (1 / 2) * DOTTED_SUBDIVISION,
    'Triplet Eighth': (1 / 2) * TRIPLET_SUBDIVISION,
    Sixteenth: 1 / 4,
    'Dotted Sixteenth': (1 / 4) * DOTTED_SUBDIVISION,
    'Triplet Sixteenth': (1 / 4) * TRIPLET_SUBDIVISION,
}

export const DEFAULT_SETTINGS = {
    Whole: true,
    'Dotted Whole': false,
    'Triplet Whole': false,
    Half: true,
    'Dotted Half': false,
    'Triplet Half': false,
    Quarter: true,
    'Dotted Quarter': true,
    'Triplet Quarter': true,
    Eighth: true,
    'Dotted Eighth': true,
    'Triplet Eighth': true,
    Sixteenth: true,
    'Dotted Sixteenth': false,
    'Triplet Sixteenth': false,
}
