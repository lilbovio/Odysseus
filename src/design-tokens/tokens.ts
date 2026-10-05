/**
 * Design Tokens for Odysseus Study Companion
 * Strictly flat colors, volumetric claymorphism shadows, and glassmorphism.
 * Zero gradients anywhere.
 */

export const colors = {
  surface: '#111418',
  surfaceDim: '#111418',
  surfaceBright: '#36393e',
  surfaceContainerLowest: '#0b0e12',
  surfaceContainerLow: '#191c20',
  surfaceContainer: '#1d2024',
  surfaceContainerClay: '#20252b',
  surfaceContainerHigh: '#272a2e',
  surfaceContainerHighest: '#323539',
  surfaceVariant: '#323539',
  
  onSurface: '#e1e2e8',
  onSurfaceVariant: '#bbcac2',
  inverseSurface: '#e1e2e8',
  inverseOnSurface: '#2e3135',
  
  outline: '#86948d',
  outlineVariant: '#3d4a44',
  surfaceTint: '#58dcb4',

  // Primary (Mint)
  primary: '#7bfdd3',
  onPrimary: '#00382a',
  primaryContainer: '#5ce0b8',
  onPrimaryContainer: '#00614b',
  inversePrimary: '#006c53',
  primaryFixed: '#77f9d0',
  primaryFixedDim: '#58dcb4',
  onPrimaryFixed: '#002117',
  onPrimaryFixedVariant: '#00513e',

  // Secondary (Amber / Gold)
  secondary: '#f4be4e',
  onSecondary: '#412d00',
  secondaryContainer: '#b8891a',
  onSecondaryContainer: '#382700',
  secondaryFixed: '#ffdea4',
  secondaryFixedDim: '#f4be4e',
  onSecondaryFixed: '#261900',
  onSecondaryFixedVariant: '#5d4200',

  // Tertiary (Coral / Peach)
  tertiary: '#ffe0d8',
  onTertiary: '#601401',
  tertiaryContainer: '#ffbaa8',
  onTertiaryContainer: '#92381f',
  tertiaryFixed: '#ffdbd2',
  tertiaryFixedDim: '#ffb4a1',
  onTertiaryFixed: '#3c0800',
  onTertiaryFixedVariant: '#7f2a13',

  // Semantic
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  // Subject color palettes (Strictly flat solid)
  subjects: {
    derecho: '#5ce0b8',      // Mint
    salud: '#f4be4e',        // Amber
    economia: '#6db8f2',     // Sky
    tecnologia: '#b8e06a',   // Lime
    arte: '#f28dae',         // Rose
  }
} as const;

export const shadows = {
  clayCard: '12px 16px 32px rgba(0, 0, 0, 0.45), -6px -6px 16px rgba(255, 255, 255, 0.03), inset 2px 2px 4px rgba(255, 255, 255, 0.07), inset -4px -6px 10px rgba(0, 0, 0, 0.35)',
  clayButton: '8px 10px 20px rgba(0, 0, 0, 0.35), inset 2px 2px 3px rgba(255, 255, 255, 0.25), inset -3px -4px 6px rgba(0, 0, 0, 0.2)',
  clayButtonPressed: 'inset 3px 3px 6px rgba(0, 0, 0, 0.60), inset -2px -2px 4px rgba(255, 255, 255, 0.05)',
  clayChip: '4px 6px 12px rgba(0, 0, 0, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.08), inset -2px -2px 4px rgba(0, 0, 0, 0.25)',
  clayChipActive: 'inset 3px 3px 6px rgba(0, 0, 0, 0.60), inset -2px -2px 4px rgba(255, 255, 255, 0.05)',
  clayInputInset: 'inset 2px 3px 6px rgba(0, 0, 0, 0.5)',
  glassCard: '0 8px 32px rgba(0, 0, 0, 0.35)',
} as const;

export const radii = {
  card: '28px',
  control: '20px',
  pill: '9999px',
  badge: '14px',
} as const;
