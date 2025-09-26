import { 
  Home, 
  MoonIcon, 
  Shield, 
  Thermometer, 
  Music, 
  Lightbulb,
  Lock,
  Coffee
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickActions = [
  { id: 'good-night', label: 'Good Night', icon: MoonIcon, color: 'bg-blue-500' },
  { id: 'away-mode', label: 'Away Mode', icon: Shield, color: 'bg-red-500' },
  { id: 'movie-time', label: 'Movie Time', icon: Music, color: 'bg-purple-500' },
  { id: 'party-mode', label: 'Party Mode', icon: Lightbulb, color: 'bg-pink-500' },
  { id: 'morning-routine', label: 'Morning', icon: Coffee, color: 'bg-orange-500' },
  { id: 'secure-home', label: 'Lock All', icon: Lock, color: 'bg-green-500' },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-16 flex flex-col gap-2 hover:bg-accent hover:scale-105 transition-all"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
