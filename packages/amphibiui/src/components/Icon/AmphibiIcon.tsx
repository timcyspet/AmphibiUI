import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";

export type AmphibiIconProps = Omit<FontAwesomeIconProps, "color"> & {
  color?: string;
};

export function AmphibiIcon({ className, color = "currentColor", ...props }: AmphibiIconProps) {
  const { framework } = useAmphibiUIOptional();

  return (
    <FontAwesomeIcon
      {...props}
      className={["aui-icon", `aui-icon-${framework}`, className].filter(Boolean).join(" ")}
      color={color}
    />
  );
}

export default AmphibiIcon;
