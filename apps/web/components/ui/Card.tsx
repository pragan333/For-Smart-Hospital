import { cn } from "@/lib/cn";

interface CardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({ title, value, subtitle, className, children }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-6", className)}>
      {title && <h3 className="text-sm font-medium text-gray-500">{title}</h3>}
      {value !== undefined && <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>}
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      {children}
    </div>
  );
}
