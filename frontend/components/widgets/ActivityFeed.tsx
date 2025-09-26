import { Clock, Lightbulb, Lock, Thermometer, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardData } from '../../hooks/useDashboardData';

export function ActivityFeed() {
  const { recentActivity } = useDashboardData();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'light': return Lightbulb;
      case 'lock': return Lock;
      case 'thermostat': return Thermometer;
      case 'security': return Shield;
      default: return Clock;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="p-2 rounded-md bg-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.message}</div>
                  <div className="text-sm text-muted-foreground">{activity.location}</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
