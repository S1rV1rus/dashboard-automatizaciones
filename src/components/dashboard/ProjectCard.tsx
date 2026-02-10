import { Project } from "@/data/projectsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Clock, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Calculate efficiency ratio
  const efficiency = Math.round((project.horasAhorradas / project.horasDesarrollo) * 100) / 100;

  return (
    <div
      className={cn(
        "glass-card glow-border p-6 space-y-5 opacity-0 group",
        isVisible && "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className={cn(
              "h-4 w-4 text-primary transition-all duration-500",
              isHovered && "animate-bounce-subtle text-secondary"
            )} />
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
              {project.nombre}
            </h3>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-all duration-300"
          >
            {project.area}
          </Badge>
        </div>
        <Badge
          className={cn(
            "shrink-0 transition-all duration-300 badge-glow",
            project.estado.includes("producción")
              ? "bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25"
              : "bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25"
          )}
        >
          <span className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            project.estado.includes("producción") ? "bg-accent animate-pulse" : "bg-warning"
          )} />
          {project.estado}
        </Badge>
      </div>

      {/* Description and Solution */}
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">El problema</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.problema}
          </p>
        </div>
        <div className="space-y-1 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Lo que soluciona</p>
          <p className="text-sm text-foreground leading-relaxed font-medium">
            {project.solucion}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 py-5 border-y border-border/30">
        <div className="text-center group/metric hover:scale-105 transition-transform duration-300 cursor-default">
          <div className="flex items-center justify-center gap-1.5 text-warning/80 mb-2">
            <Clock className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <p className="text-xl font-bold text-warning">{project.tiempoManual}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Trabajo Manual</p>
        </div>

        <div className="text-center group/metric hover:scale-105 transition-transform duration-300 cursor-default relative">
          <div className="flex items-center justify-center gap-1.5 text-accent mb-2">
            <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <p className="text-xl font-bold text-accent">{project.horasAhorradas}<span className="text-sm font-normal text-muted-foreground">h</span></p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Ahorro anual</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">{project.frecuencia}</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 bg-transparent border-primary/30 text-primary overflow-hidden relative group/btn",
            "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            "transition-all duration-300"
          )}
          asChild
        >
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <span className="relative z-10 flex items-center gap-2">
              Ver Demo
              <ArrowRight className={cn(
                "h-4 w-4 transition-transform duration-300",
                "group-hover/btn:translate-x-1"
              )} />
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
}
