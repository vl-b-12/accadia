import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			gray: {
  				'0': 'var(--gray-0)',
  				'5': 'var(--gray-5)',
  				'10': 'var(--gray-10)',
  				'25': 'var(--gray-25)',
  				'70': 'var(--gray-70)'
  			},
  			violent: {
  				'10': 'var(--violent-10)',
  				'20': 'var(--violent-20)',
  				'30': 'var(--violent-30)',
  				'40': 'var(--violent-40)',
  				'60': 'var(--violent-60)',
  				'80': 'var(--violent-80)',
  				'90': 'var(--violent-90)'
  			},
  			pink: {
  				default: 'var(--pink-default)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		padding: {
  			'42': '42px'
  		},
  		boxShadow: {
  			'1': '0px 4px 17.1px 0px rgba(0, 0, 0, 0.05)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
