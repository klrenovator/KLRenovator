import { FaSnowflake, FaTools, FaWrench } from "react-icons/fa";
import { GiChemicalDrop, GiGasPump } from "react-icons/gi";
import { LuLayoutGrid, LuMove, LuPlug, LuSettings } from "react-icons/lu";
import type { IconType } from "react-icons";

const map: Record<string, IconType> = {
  wrench: FaWrench,
  sparkles: FaSnowflake,
  "flask-conical": GiChemicalDrop,
  settings: LuSettings,
  gauge: GiGasPump,
  "layout-grid": LuLayoutGrid,
  move: LuMove,
  plug: LuPlug,
};

export const ServiceIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = map[name] ?? FaTools;
  return <Icon className={className} />;
};
