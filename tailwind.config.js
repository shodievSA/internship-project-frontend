import defaultTheme from "tailwindcss/defaultTheme";
import scrollbar from "tailwind-scrollbar";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class", ".dark-mode"],
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				"2xl": "1440px"
			},
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				customLg: "var(--radius)",
				customMd: "calc(var(--radius) - 2px)",
				customSm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-up": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"bounce-in": {
					"0%": {
						transform: "scale(0) rotate(-45deg)",
						opacity: "0",
					},
					"50%": {
						transform: "scale(1.2) rotate(5deg)",
						opacity: "0.7",
					},
					"100%": { transform: "scale(1) rotate(0)", opacity: "1" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				floatLarge: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
				},
				"float-delayed": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-15px)" },
				},
				"float-slowed": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				sparkle: {
					"0%, 100%": { transform: "scale(1) rotate(0)" },
					"50%": { transform: "scale(1.2) rotate(15deg)" },
				},
				"pulse-subtle": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" },
				},
				"feature-pop": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"50%": { transform: "scale(1.02)" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"icon-spin": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"feature-bounce": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"task-ping-light": {
					"0%": {
						backgroundColor: "white",
					},
					"50%": {
						backgroundColor:
							"rgb(229 231 235 / var(--tw-bg-opacity, 1))",
					},
					"100%": {
						backgroundColor: "white",
					},
				},
				"task-ping-dark": {
					"0%": {
						backgroundColor: "black",
					},
					"50%": {
						backgroundColor:
							"rgb(23 23 23 / var(--tw-bg-opacity, 1))",
					},
					"100%": {
						backgroundColor: "black",
					},
				},
				"notification-ping-light": {
					"0%": {
						backgroundColor: "white",
					},
					"50%": {
						backgroundColor:
							"rgb(229 231 235 / var(--tw-bg-opacity, 1))",
					},
					"100%": {
						backgroundColor: "white",
					},
				},
				"notification-ping-dark": {
					"0%": {
						backgroundColor: "black",
					},
					"50%": {
						backgroundColor:
							"rgb(23 23 23 / var(--tw-bg-opacity, 1))",
					},
					"100%": {
						backgroundColor: "black",
					},
				},
			},
			animation: {
				"fade-in": "fade-in 0.6s ease-out",
				"fade-in-delay-1": "fade-in 0.6s ease-out 0.3s forwards",
				"fade-in-delay-2": "fade-in 0.6s ease-out 0.6s forwards",
				"fade-in-delay-3": "fade-in 0.6s ease-out 0.9s forwards",
				"slide-up": "slide-up 0.6s ease-out",
				"slide-up-delay-1": "slide-up 0.6s ease-out 0.2s both",
				"slide-up-delay-2": "slide-up 0.6s ease-out 0.4s both",
				"slide-up-delay-3": "slide-up 0.6s ease-out 0.6s both",
				"scale-in": "scale-in 0.6s ease-out",
				"bounce-in":
					"bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
				float: "float 1.5s ease-in-out infinite",
				floatLarge: "floatLarge 4s ease-in-out infinite",
				"float-delayed": "float-delayed 8s ease-in-out infinite",
				"float-slow": "float-slow 10s ease-in-out infinite",
				sparkle: "sparkle 2s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
				"feature-pop": "feature-pop 0.8s ease-out forwards",
				"feature-pop-delay-1":
					"feature-pop 0.8s ease-out 0.4s forwards",
				"feature-pop-delay-2":
					"feature-pop 0.8s ease-out 0.8s forwards",
				"feature-pop-delay-3":
					"feature-pop 0.8s ease-out 1.2s forwards",
				"icon-spin": "icon-spin 1s linear infinite",
				"feature-bounce": "feature-bounce 2s ease-in-out infinite",
				"fade-in-up": "fade-in-up 0.5s ease-out",
				"spin-slow": "spin 3s linear infinite",
				"task-ping-light": "task-ping-light 0.75s ease-in-out",
				"task-ping-dark": "task-ping-dark 0.75s ease-in-out",
				"notification-ping-light":
					"notification-ping-light 0.75s ease-in-out",
				"notification-ping-dark":
					"notification-ping-dark 0.75s ease-in-out",
			},
		},
	},
	plugins: [
		scrollbar(),
		animate,
	],
};
