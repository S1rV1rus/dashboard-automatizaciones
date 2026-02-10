import { Zap, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="animate-fade-in relative">
      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse-glow" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 backdrop-blur-sm">
              <Zap className="h-7 w-7 text-primary icon-float" strokeWidth={1.5} />
            </div>
            {/* Orbiting sparkle */}
            <Sparkles
              className="absolute -top-1 -right-1 h-4 w-4 text-secondary animate-bounce-subtle"
              strokeWidth={2}
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Portfolio de{" "}
              <span className="gradient-text animate-gradient">Automatización</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-sm text-muted-foreground">
                Actualizado en tiempo real
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Explora nuestras soluciones de automatización inteligente.
          <span className="text-foreground/80"> Optimizamos procesos complejos para maximizar la eficiencia y el ahorro de tiempo</span> de tu equipo.
        </p>
      </div>
    </header>
  );
}
