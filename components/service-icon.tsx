import {
  Wrench,
  Sparkles,
  FlaskConical,
  Settings,
  Gauge,
  LayoutGrid,
  Move,
  Plug,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  wrench: Wrench,
  sparkles: Sparkles,
  "flask-conical": FlaskConical,
  settings: Settings,
  gauge: Gauge,
  "layout-grid": LayoutGrid,
  move: Move,
  plug: Plug,
};

export const ServiceIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} />;
};
