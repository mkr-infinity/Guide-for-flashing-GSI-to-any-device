import {
  SiSamsung,
  SiXiaomi,
  SiOneplus,
  SiVivo,
  SiMotorola,
  SiGoogle,
  SiAsus,
  SiSony,
  SiHuawei,
  SiLg,
  SiMediatek,
} from "react-icons/si";
import type { ComponentType, SVGProps } from "react";

type IconProps = { className?: string } & SVGProps<SVGSVGElement>;

export const NothingIcon: ComponentType<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8" cy="9" r="1.1" />
    <circle cx="12" cy="9" r="1.1" />
    <circle cx="16" cy="9" r="1.1" />
    <circle cx="8" cy="12" r="1.1" />
    <circle cx="12" cy="12" r="1.1" />
    <circle cx="16" cy="12" r="1.1" />
    <circle cx="8" cy="15" r="1.1" />
    <circle cx="12" cy="15" r="1.1" />
    <circle cx="16" cy="15" r="1.1" />
  </svg>
);

export const BRAND_ICONS = {
  samsung: SiSamsung,
  xiaomi: SiXiaomi,
  oppo: SiOneplus,
  vivo: SiVivo,
  motorola: SiMotorola,
  pixel: SiGoogle,
  nothing: NothingIcon,
  asus: SiAsus,
  sony: SiSony,
  huawei: SiHuawei,
  lg: SiLg,
  mediatek: SiMediatek,
} as const;

export type BrandKey = keyof typeof BRAND_ICONS;
