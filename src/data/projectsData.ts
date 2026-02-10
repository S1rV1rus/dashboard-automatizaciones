export interface Project {
  id: number;
  nombre: string;
  area: string;
  problema: string;
  solucion: string;
  horasDesarrollo: number;
  horasAhorradas: number;
  roi: number;
  estado: string;
  url: string;
  costo: number;
  frecuencia: string;
  tiempoManual: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    nombre: "MSplitter - Recibos de Sueldo",
    area: "Recursos Humanos",
    problema: "Distribución manual de recibos de sueldo, propensa a errores y demoras en la entrega.",
    solucion: "Procesamiento seguro y local que permite separar un PDF único en archivos individuales por empleado y enviarlos automáticamente.",
    horasDesarrollo: 15,
    horasAhorradas: 48,
    roi: 320,
    estado: "En producción",
    url: "#",
    costo: 0,
    frecuencia: "Mensual",
    tiempoManual: "4 horas/mes"
  },
  {
    id: 2,
    nombre: "Control de Caja",
    area: "Administración / Tesorería",
    problema: "Conciliación manual diaria entre el sistema (Odoo) y el efectivo real, proceso lento y repetitivo.",
    solucion: "Dashboard de conciliación que procesa reportes de Odoo y permite validar ingresos por sucursal contra el físico al instante.",
    horasDesarrollo: 20,
    horasAhorradas: 240,
    roi: 1200,
    estado: "En producción",
    url: "#",
    costo: 0,
    frecuencia: "Diario",
    tiempoManual: "40 min/día"
  },
  {
    id: 3,
    nombre: "AutoID - Clasificación de Gastos",
    area: "Contabilidad",
    problema: "Asignación manual de IDs contables a cada gasto mensual, tarea de alta complejidad por volumen.",
    solucion: "Sistema de asignación automática con tabla de mapeo inteligente (29 cuentas a 61 IDs únicos) para resolución de conflictos.",
    horasDesarrollo: 12,
    horasAhorradas: 60,
    roi: 500,
    estado: "En producción",
    url: "#",
    costo: 0,
    frecuencia: "Mensual",
    tiempoManual: "5 horas/mes"
  },
  {
    id: 4,
    nombre: "Reporte 3CX",
    area: "Ventas Web",
    problema: "Análisis semanal manual de llamadas perdidas y atendidas para medir desempeño del equipo.",
    solucion: "Dashboard de análisis de llamadas en tiempo real enfocado en métricas de eficiencia y performance del equipo de ventas.",
    horasDesarrollo: 10,
    horasAhorradas: 35,
    roi: 350,
    estado: "En producción",
    url: "#",
    costo: 0,
    frecuencia: "Semanal",
    tiempoManual: "40 min/semana"
  }
];

export const getTotalStats = () => {
  const totalHorasDesarrollo = projectsData.reduce((acc, p) => acc + p.horasDesarrollo, 0);
  const totalHorasAhorradas = projectsData.reduce((acc, p) => acc + p.horasAhorradas, 0);
  const totalCosto = projectsData.reduce((acc, p) => acc + p.costo, 0);
  const promedioROI = projectsData.length > 0
    ? Math.round(projectsData.reduce((acc, p) => acc + p.roi, 0) / projectsData.length)
    : 0;

  return {
    totalProyectos: projectsData.length,
    totalHorasDesarrollo,
    totalHorasAhorradas,
    totalCosto,
    promedioROI
  };
};
