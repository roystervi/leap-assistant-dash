import { Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardData } from '../../hooks/useDashboardData';

export function EnergyChart() {
  const { energyData } = useDashboardData();

  const maxUsage = Math.max(...energyData.hourlyUsage);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Energy Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold text-green-400">{energyData.current}kW</div>
            <div className="text-sm text-muted-foreground">Current Usage</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-500/10">
            <div className="text-2xl font-bold text-blue-400">{energyData.today}kWh</div>
            <div className="text-sm text-muted-foreground">Today</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-500/10">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-purple-400">
              <TrendingDown className="h-4 w-4" />
              {energyData.savings}%
            </div>
            <div className="text-sm text-muted-foreground">vs Last Month</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>24 Hour Usage</span>
            <span>Peak: {maxUsage}kW</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {energyData.hourlyUsage.map((usage, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${(usage / maxUsage) * 100}%` }}
                title={`${index}:00 - ${usage}kW`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
