import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from "react";
import { themeTokens, type FrameworkName, type ThemeName } from "../theme/tokens.js";

export interface AmphibiUIConfig {
  framework: FrameworkName;
  theme: ThemeName;
}

interface AmphibiUIContextValue extends AmphibiUIConfig {
  setFramework?: (framework: FrameworkName) => void;
  setTheme?: (theme: ThemeName) => void;
}

const AmphibiUIContext = createContext<AmphibiUIContextValue | null>(null);

export interface AmphibiUIProviderProps extends AmphibiUIConfig {
  children: ReactNode;
  className?: string;
  setFramework?: (framework: FrameworkName) => void;
  setTheme?: (theme: ThemeName) => void;
}

export function AmphibiUIProvider({
  children, framework, theme, className, setFramework, setTheme,
}: AmphibiUIProviderProps) {
  const value = useMemo(
    () => ({ framework, theme, setFramework, setTheme }),
    [framework, theme, setFramework, setTheme],
  );
  const tokens = themeTokens[theme];
  const style = {
    "--aui-bg": tokens.background,
    "--aui-surface": tokens.surface,
    "--aui-surface-muted": tokens.surfaceMuted,
    "--aui-text": tokens.text,
    "--aui-text-muted": tokens.textMuted,
    "--aui-border": tokens.border,
    "--aui-primary": tokens.primary,
    "--aui-primary-contrast": tokens.primaryContrast,
    "--aui-accent": tokens.accent,
    "--aui-danger": tokens.danger,
    "--aui-success": tokens.success,
    "--aui-shadow": tokens.shadow,
  } as CSSProperties;

  return (
    <AmphibiUIContext.Provider value={value}>
      <div className={["aui-root", `aui-framework-${framework}`, className].filter(Boolean).join(" ")}
        data-framework={framework} data-theme={theme} style={style}>
        {children}
      </div>
    </AmphibiUIContext.Provider>
  );
}

export function useAmphibiUI(): AmphibiUIContextValue {
  const context = useContext(AmphibiUIContext);
  if (!context) throw new Error("AmphibiUI components must be used inside AmphibiUIProvider.");
  return context;
}

export function useAmphibiUIOptional(): AmphibiUIContextValue {
  return useContext(AmphibiUIContext) ?? { framework: "tailwind", theme: "sky-blue" };
}
