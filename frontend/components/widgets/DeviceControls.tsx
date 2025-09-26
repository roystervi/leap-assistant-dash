import { Lightbulb, Thermometer, Lock, Volume2, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useDashboardData } from '../../hooks/useDashboardData';

export function DeviceControls() {
  const { devices, updateDevice } = useDashboardData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Quick Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-background">
                {device.type === 'light' && <Lightbulb className="h-4 w-4" />}
                {device.type === 'thermostat' && <Thermometer className="h-4 w-4" />}
                {device.type === 'lock' && <Lock className="h-4 w-4" />}
                {device.type === 'speaker' && <Volume2 className="h-4 w-4" />}
              </div>
              <div>
                <div className="font-medium">{device.name}</div>
                <div className="text-sm text-muted-foreground">{device.room}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {device.type === 'light' && device.brightness !== undefined && (
                <div className="w-20">
                  <Slider
                    value={[device.brightness]}
                    onValueChange={(value) => updateDevice(device.id, { brightness: value[0] })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
              
              <Switch
                checked={device.isOn}
                onCheckedChange={(checked) => updateDevice(device.id, { isOn: checked })}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
