import { useMemo } from "react";
import Select, { mergeStyles, type GroupBase, type Props as ReactSelectProps, type StylesConfig } from "react-select";
import { themeTokens } from "../../theme/tokens.js";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";

export type AmphibiSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, "classNamePrefix" | "styles"> & {
  className?: string;
  styles?: StylesConfig<Option, IsMulti, Group>;
};

export function AmphibiSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  className,
  styles,
  ...props
}: AmphibiSelectProps<Option, IsMulti, Group>) {
  const { framework, theme } = useAmphibiUIOptional();
  const tokens = themeTokens[theme];
  const themedStyles = useMemo<StylesConfig<Option, IsMulti, Group>>(() => ({
    control: (base, state) => ({
      ...base,
      minHeight: 38,
      borderColor: state.isFocused ? tokens.primary : tokens.border,
      borderRadius: framework === "bootstrap" ? "0.375rem" : "0.5rem",
      backgroundColor: tokens.surface,
      boxShadow: state.isFocused ? `0 0 0 3px color-mix(in srgb, ${tokens.primary} 16%, transparent)` : "none",
      "&:hover": { borderColor: tokens.primary },
    }),
    input: (base) => ({ ...base, color: tokens.text }),
    placeholder: (base) => ({ ...base, color: tokens.textMuted }),
    singleValue: (base) => ({ ...base, color: tokens.text }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      border: `1px solid ${tokens.border}`,
      borderRadius: framework === "bootstrap" ? "0.375rem" : "0.5rem",
      backgroundColor: tokens.surface,
      boxShadow: tokens.shadow,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 20 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? tokens.primary
        : state.isFocused ? tokens.surfaceMuted : tokens.surface,
      color: state.isSelected ? tokens.primaryContrast : tokens.text,
      cursor: "pointer",
      "&:active": { backgroundColor: tokens.surfaceMuted },
    }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: tokens.border }),
    dropdownIndicator: (base) => ({ ...base, color: tokens.textMuted, "&:hover": { color: tokens.primary } }),
    clearIndicator: (base) => ({ ...base, color: tokens.textMuted, "&:hover": { color: tokens.danger } }),
    multiValue: (base) => ({ ...base, borderRadius: framework === "bootstrap" ? "0.25rem" : "0.375rem", backgroundColor: tokens.surfaceMuted }),
    multiValueLabel: (base) => ({ ...base, color: tokens.text }),
    multiValueRemove: (base) => ({ ...base, color: tokens.textMuted, "&:hover": { backgroundColor: tokens.danger, color: tokens.primaryContrast } }),
    noOptionsMessage: (base) => ({ ...base, color: tokens.textMuted }),
    loadingMessage: (base) => ({ ...base, color: tokens.textMuted }),
  }), [framework, tokens]);
  const selectStyles = useMemo(
    () => mergeStyles(themedStyles, styles),
    [styles, themedStyles],
  );

  return (
    <Select<Option, IsMulti, Group>
      {...props}
      className={["aui-react-select", `aui-react-select-${framework}`, className].filter(Boolean).join(" ")}
      classNamePrefix="aui-select"
      styles={selectStyles}
    />
  );
}

export default AmphibiSelect;
