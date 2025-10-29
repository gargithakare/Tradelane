/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Midnight Teal - Backgrounds
        'bg-primary': '#0A0E1A',
        'bg-secondary': '#111827',
        'bg-tertiary': '#1a2332',

        // Accent colors - Teal
        'accent-primary': '#00B8A9',
        'accent-hover': '#00E0C6',
        'accent-dark': '#008B7F',

        // Status colors
        'success': '#4ADE80',
        'error': '#F87171',
        'warning': '#FBBF24',
        'info': '#3B82F6',

        // Text colors
        'text-primary': '#F1F5F9',
        'text-secondary': '#9BA3B0',
        'text-muted': '#6B7280',

        // Highlights
        'yellow-glow': '#FFE28A',

        // Borders
        'border-default': '#1F2937',
        'border-light': '#2D3748',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        dmSans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Monaco', 'monospace'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '40px',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
      },
      shadowColor: '#000000',
      boxShadow: {
        xs: '0 1px 3px rgba(0, 0, 0, 0.3)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.4)',
        md: '0 4px 8px rgba(0, 0, 0, 0.5)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.6)',
        xl: '0 12px 20px rgba(0, 0, 0, 0.7)',
        'teal-glow': '0 0 12px rgba(0, 184, 169, 0.3)',
        'teal-glow-hover': '0 0 16px rgba(0, 224, 198, 0.4)',
        'yellow-glow': '0 0 8px rgba(255, 226, 138, 0.2)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '300ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
}
