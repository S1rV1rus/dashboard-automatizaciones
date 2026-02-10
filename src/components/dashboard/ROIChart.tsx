import { projectsData } from "@/data/projectsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const chartData = projectsData.map(p => ({
  name: p.area,
  roi: p.roi,
  desarrollo: p.horasDesarrollo,
  ahorro: p.horasAhorradas
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 min-w-[180px] border-primary/20 animate-scale-in">
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
            <span className="font-mono font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ROIChart() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const maxROI = Math.max(...chartData.map(d => d.roi));

  return (
    <div 
      className={`glass-card p-6 opacity-0 ${isVisible ? 'animate-slide-up' : ''}`}
      style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">ROI por Proyecto</h3>
            <p className="text-xs text-muted-foreground">Retorno sobre inversión</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">{maxROI}%</p>
          <p className="text-xs text-muted-foreground">Máximo ROI</p>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={12}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
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
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Bar 
              dataKey="roi" 
              name="ROI" 
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {chartData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={index === 0 ? 'url(#primaryGradient)' : 'url(#secondaryGradient)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
