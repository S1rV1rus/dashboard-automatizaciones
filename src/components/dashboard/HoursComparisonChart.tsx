import { projectsData } from "@/data/projectsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const chartData = projectsData.map(p => ({
  name: p.area,
  desarrollo: p.horasDesarrollo,
  ahorro: p.horasAhorradas
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const desarrollo = payload.find((p: any) => p.dataKey === 'desarrollo')?.value || 0;
    const ahorro = payload.find((p: any) => p.dataKey === 'ahorro')?.value || 0;
    const ratio = (ahorro / desarrollo).toFixed(1);

    return (
      <div className="glass-card p-4 min-w-[200px] border-accent/20 animate-scale-in">
        <p className="font-semibold text-foreground mb-3">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm py-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-mono font-semibold">{entry.value}h</span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Eficiencia</span>
            <span className="font-mono font-bold text-accent">×{ratio}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function HoursComparisonChart() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalSaved = chartData.reduce((acc, d) => acc + d.ahorro, 0);

  return (
    <div 
      className={`glass-card p-6 opacity-0 ${isVisible ? 'animate-slide-up' : ''}`}
      style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/10">
            <Clock className="h-5 w-5 text-accent" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Horas: Inversión vs Ahorro</h3>
            <p className="text-xs text-muted-foreground">Comparativa anual</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{totalSaved}h</p>
          <p className="text-xs text-muted-foreground">Ahorro total/año</p>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4} barCategoryGap="20%">
            <defs>
              <linearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--warning))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--warning))" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Legend content={<CustomLegend />} />
            <Bar 
              dataKey="desarrollo" 
              name="Horas Desarrollo" 
              fill="url(#warningGradient)" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="ahorro" 
              name="Horas Ahorradas/año" 
              fill="url(#accentGradient)" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
