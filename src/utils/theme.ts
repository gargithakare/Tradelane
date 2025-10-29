// Midnight Teal Premium Color Palette
export const colors = {
  // Backgrounds
  bg: {
    primary: '#0A0E1A',      // Main dark background
    secondary: '#111827',    // Card/Surface background
    tertiary: '#1a2332',     // Subtle darker shade
  },
  
  // Accent colors - Primary CTA
  accent: {
    primary: '#00B8A9',      // Main teal accent
    hover: '#00E0C6',        // Lighter teal on hover/active
    dark: '#008B7F',         // Darker teal for pressed state
    teal: '#00B8A9',         // Alias for primary
    tealLight: '#00E0C6',    // Alias for hover
  },
  
  // Status colors
  status: {
    positive: '#4ADE80',     // Green for profit/gains
    negative: '#F87171',     // Red for losses
    warning: '#FBBF24',      // Amber for warnings
    info: '#3B82F6',         // Blue for info
  },
  
  // Text colors
  text: {
    primary: '#F1F5F9',      // Main text - light white
    secondary: '#9BA3B0',    // Secondary text - medium gray
    muted: '#6B7280',        // Muted/disabled text
    tertiary: '#6B7280',     // Alias for muted
  },
  
  // Highlights & Borders
  highlight: {
    glow: '#FFE28A',         // Yellow/amber glow
    yellow: '#FFE28A',       // Alias for glow
  },
  
  border: {
    default: '#1F2937',      // Divider/border color
    light: '#2D3748',        // Lighter border
  },
};

// Typography Configuration
export const typography = {
  family: {
    inter: 'Inter',
    poppins: 'Poppins',
    dmSans: 'DM Sans',
  },
  weight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
};

// Border Radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows & Glows - Dark Mode Premium
export const shadows = {
  xs: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 16,
  },
  
  // Glow effects for premium feel
  tealglow: {
    shadowColor: '#00B8A9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  
  glowHover: {
    shadowColor: '#00E0C6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  
  yellowGlow: {
    shadowColor: '#FFE28A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
};

// Animation timings
export const animation = {
  fast: 150,
  base: 300,
  slow: 500,
};
