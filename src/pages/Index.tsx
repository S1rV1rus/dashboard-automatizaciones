import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { projectsData, getTotalStats } from "@/data/projectsData";
import { Briefcase, Clock, TrendingUp, DollarSign, LayoutGrid, Sparkles } from "lucide-react";

const Index = () => {
  const stats = getTotalStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Animated background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[80px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container py-8 md:py-12 space-y-12">
        <Header />

        {/* Stats Grid */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm animate-fade-in">
            <LayoutGrid className="h-4 w-4" />
            <span>Resumen de impacto</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              title="Proyectos Automatizados"
              value={stats.totalProyectos}
              subtitle="En producción"
              icon={Briefcase}
              variant="primary"
              delay={100}
            />
            <StatCard
              title="Ahorro de Tiempo"
              value={`${stats.totalHorasAhorradas}h`}
              subtitle="Horas anuales recuperadas"
              icon={TrendingUp}
              variant="accent"
              delay={250}
            />
            <StatCard
              title="Eficiencia Operativa"
              value="Optimizada"
              subtitle="Eliminación de errores"
              icon={Sparkles}
              variant="secondary"
              delay={325}
            />
          </div>
        </section>

        {/* Solutions Highlight Section */}
        <section className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Soluciones a Medida</h2>
            <p className="text-muted-foreground">
              Transformamos tareas manuales críticas en procesos automáticos eficientes,
              garantizando precisión y liberando talento humano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm">01</span>
                Gestión Digital de Documentos
              </h3>
              <p className="text-muted-foreground">
                Automatizamos la distribución de recibos y el procesamiento de archivos contables,
                eliminando el riesgo de error humano en operaciones repetitivas de RRHH y Contabilidad.
              </p>
            </div>
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent text-sm">02</span>
                Análisis de Datos en Tiempo Real
              </h3>
              <p className="text-muted-foreground">
                Convertimos reportes complejos de telefonía y cierres de caja en dashboards intuitivos
                que permiten una toma de decisiones inmediata basada en datos precisos.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold">Detalle de Proyectos</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Lo que cada implementación soluciona en el día a día
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">{stats.totalProyectos} activos</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={200 + (index * 100)}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-border/30 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Dashboard de automatización • Datos actualizados</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Sistema activo</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
