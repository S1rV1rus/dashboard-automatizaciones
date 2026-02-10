import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent";
  delay?: number;
}

const variantStyles = {
  default: "border-border/50 hover:border-muted-foreground/30",
  primary: "border-primary/20 hover:border-primary/50",
  secondary: "border-secondary/20 hover:border-secondary/50",
  accent: "border-accent/20 hover:border-accent/50",
};

const iconStyles = {
  default: "bg-muted/50 text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const glowStyles = {
  default: "",
  primary: "hover:shadow-[0_0_40px_hsl(199_89%_48%/0.2)]",
  secondary: "hover:shadow-[0_0_40px_hsl(258_90%_66%/0.2)]",
  accent: "hover:shadow-[0_0_40px_hsl(158_64%_52%/0.2)]",
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = "default",
  delay = 0 
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={cn(
        "stat-card opacity-0",
        isVisible && "animate-slide-up",
        variantStyles[variant],
        glowStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Decorative corner accent */}
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full",
        variant === "primary" && "bg-primary",
        variant === "secondary" && "bg-secondary",
        variant === "accent" && "bg-accent",
        variant === "default" && "bg-foreground"
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {title}
          </p>
          <p className="text-4xl font-bold tracking-tight number-counter">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground/80">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300 badge-glow",
              trend.isPositive 
                ? "bg-accent/15 text-accent border border-accent/20" 
                : "bg-destructive/15 text-destructive border border-destructive/20"
            )}>
              <span className={cn(
                "transition-transform duration-300",
                trend.isPositive ? "group-hover:translate-y-[-2px]" : "group-hover:translate-y-[2px]"
              )}>
                {trend.isPositive ? "↑" : "↓"}
              </span>
              {trend.value}% ROI promedio
            </div>
          )}
        </div>
        <div className={cn(
          "p-3.5 rounded-2xl transition-all duration-300 icon-float",
          iconStyles[variant]
        )}>
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
