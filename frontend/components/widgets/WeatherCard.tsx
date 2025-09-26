import { Cloud, Sun, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardData } from '../../hooks/useDashboardData';

export function WeatherCard() {
  const { weather } = useDashboardData();

  const WeatherIcon = weather.condition === 'sunny' ? Sun : Cloud;

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <WeatherIcon className="h-5 w-5 text-blue-400" />
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°</div>
            <div className="text-muted-foreground capitalize">{weather.condition}</div>
          </div>
          <WeatherIcon className="h-12 w-12 text-blue-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <span>Humidity {weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-400" />
            <span>Wind {weather.windSpeed} mph</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-400" />
            <span>Visibility {weather.visibility} mi</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-blue-400" />
            <span>Pressure {weather.pressure} inHg</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
