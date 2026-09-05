import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: { sans: ["var(--font-sans)"], heading: ["var(--font-heading)"], display: ["var(--font-display)"] },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        aurora: { "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" }, "25%": { transform: "translate(50px, -50px) scale(1.1)", opacity: "0.4" }, "50%": { transform: "translate(-30px, 30px) scale(0.9)", opacity: "0.3" }, "75%": { transform: "translate(-50px, -30px) scale(1.05)", opacity: "0.35" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-15px)" } },
        breathe: { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.05)" } },
        "pulse-glow": { "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.7" }, "50%": { transform: "translate(-50%, -50%) scale(1.15)", opacity: "1" } },
        "glow-pulse": { "0%, 100%": { transform: "scale(1)", opacity: "0.6" }, "50%": { transform: "scale(1.2)", opacity: "1" } },
        "mesh-shift": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.7" } },
        scroll: { "0%": { transform: "translateY(0)", opacity: "1" }, "100%": { transform: "translateY(12px)", opacity: "0" } },
        "rippleAnim": { to: { transform: "scale(4)", opacity: "0" } },
        "hint-fade": { "0%, 100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out",
        aurora: "aurora 20s ease-in-out infinite", float: "float 6s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite", "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 8s ease-in-out infinite", "mesh-shift": "mesh-shift 15s ease-in-out infinite",
        scroll: "scroll 1.5s ease-in-out infinite", "rippleAnim": "rippleAnim 0.8s ease-out forwards",
        "hint-fade": "hint-fade 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config