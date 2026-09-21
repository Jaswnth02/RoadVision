/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F3F5',
          subtle: '#F8F9FB',
          border: '#E5E7EB',
        },
        primary: {
          DEFAULT: '#4A6FA5',
          dark: '#3A5785',
          light: '#EBF1F8',
          subtle: '#6B8BB9',
        },
        teal: {
          DEFAULT: '#3E7C8C',
          dark: '#2F606D',
          light: '#EAF3F5',
        },
        sand: {
          DEFAULT: '#D9A441',
          dark: '#B8852B',
          light: '#FAF5EA',
        },
        charcoal: {
          DEFAULT: '#2B2F36',
          muted: '#4B5563',
          light: '#6B7280',
        },
        status: {
          success: {
            DEFAULT: '#5D9C7C',
            light: '#EBF5F0',
            border: '#BFE0CE',
            text: '#2C5E45',
          },
          warning: {
            DEFAULT: '#D8A657',
            light: '#FAF4E8',
            border: '#F2DCB3',
            text: '#825B1D',
          },
          error: {
            DEFAULT: '#C4635C',
            light: '#FAEEED',
            border: '#EDBEBB',
            text: '#7A2C26',
          },
          info: {
            DEFAULT: '#5B8DBE',
            light: '#ECF3FA',
            border: '#C3DCF2',
            text: '#2B5780',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(43, 47, 54, 0.04)',
        'soft': '0 2px 6px -1px rgba(43, 47, 54, 0.06), 0 1px 4px -1px rgba(43, 47, 54, 0.03)',
        'soft-md': '0 4px 14px -2px rgba(43, 47, 54, 0.08), 0 2px 6px -2px rgba(43, 47, 54, 0.03)',
        'soft-lg': '0 10px 24px -3px rgba(43, 47, 54, 0.09), 0 4px 10px -2px rgba(43, 47, 54, 0.04)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
