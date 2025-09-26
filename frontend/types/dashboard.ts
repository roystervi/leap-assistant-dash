export interface Weather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
}

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'speaker';
  room: string;
  isOn: boolean;
  brightness?: number;
  temperature?: number;
}

export interface EnergyData {
  current: number;
  today: number;
  savings: number;
  hourlyUsage: number[];
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  location: string;
  time: string;
}

export interface SystemStatus {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'warning' | 'offline';
  details: string;
}

export interface DashboardData {
  weather: Weather;
  devices: Device[];
  energyData: EnergyData;
  recentActivity: Activity[];
  systemStatus: SystemStatus[];
}
