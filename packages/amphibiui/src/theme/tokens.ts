export const themeNames = [
  "dark",
  "sky-blue",
  "natural-green",
  "midnight-cyber",
  "sunset-warmth",
  "clinical-clean",
  "nordic-minimal",
  "high-contrast",
] as const;

export type ThemeName = (typeof themeNames)[number];
export type FrameworkName = "tailwind" | "bootstrap";

export interface ThemeTokens {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryContrast: string;
  accent: string;
  danger: string;
  success: string;
  shadow: string;
}

export const themeTokens: Record<ThemeName, ThemeTokens> = {
  dark: {
    background: "#111827", surface: "#1f2937", surfaceMuted: "#273449", text: "#f9fafb",
    textMuted: "#aab5c5", border: "#3a4658", primary: "#60a5fa", primaryContrast: "#10223a",
    accent: "#a78bfa", danger: "#f87171", success: "#34d399", shadow: "0 12px 30px #0004",
  },
  "sky-blue": {
    background: "#f3f9ff", surface: "#ffffff", surfaceMuted: "#e7f4ff", text: "#12243a",
    textMuted: "#61758b", border: "#cfe4f7", primary: "#00a3ff", primaryContrast: "#ffffff",
    accent: "#63c5ff", danger: "#e5484d", success: "#0d9b70", shadow: "0 12px 30px #183a5c12",
  },
  "natural-green": {
    background: "#f1faf6", surface: "#ffffff", surfaceMuted: "#def5e9", text: "#12352a",
    textMuted: "#567367", border: "#c4e8d4", primary: "#10b981", primaryContrast: "#ffffff",
    accent: "#064e3b", danger: "#d9485f", success: "#07815c", shadow: "0 12px 30px #164e3b12",
  },
  "midnight-cyber": {
    background: "#111027", surface: "#1c1a3a", surfaceMuted: "#29254e", text: "#f4f0ff",
    textMuted: "#b1acd1", border: "#403b70", primary: "#a855f7", primaryContrast: "#ffffff",
    accent: "#f052c0", danger: "#ff4f87", success: "#4ee1a0", shadow: "0 12px 32px #05040e80",
  },
  "sunset-warmth": {
    background: "#fff8ee", surface: "#ffffff", surfaceMuted: "#fff0d8", text: "#29231d",
    textMuted: "#796b5b", border: "#ead9bd", primary: "#e99517", primaryContrast: "#241604",
    accent: "#ec6a43", danger: "#c93f3f", success: "#18815e", shadow: "0 12px 30px #56371012",
  },
  "clinical-clean": {
    background: "#f5f9fa", surface: "#ffffff", surfaceMuted: "#e9f3f4", text: "#142b32",
    textMuted: "#62777e", border: "#d3e1e4", primary: "#0d9488", primaryContrast: "#ffffff",
    accent: "#5dc8be", danger: "#dc4545", success: "#11805d", shadow: "0 12px 30px #143a4010",
  },
  "nordic-minimal": {
    background: "#eeefed", surface: "#fafaf8", surfaceMuted: "#e8e6df", text: "#101110",
    textMuted: "#64645e", border: "#d4d3cb", primary: "#242621", primaryContrast: "#ffffff",
    accent: "#b5a98f", danger: "#bd3f3f", success: "#42765b", shadow: "0 10px 24px #11120e0c",
  },
  "high-contrast": {
    background: "#ffffff", surface: "#ffffff", surfaceMuted: "#eeeeee", text: "#000000",
    textMuted: "#262626", border: "#000000", primary: "#000000", primaryContrast: "#ffffff",
    accent: "#ffff00", danger: "#b00000", success: "#005a00", shadow: "0 0 0 2px #000000",
  },
};
