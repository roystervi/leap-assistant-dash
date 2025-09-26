import { useState, useEffect } from 'react';
import type { DashboardData, Device } from '../types/dashboard';
import { generateMockData } from '../utils/mockData';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(generateMockData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        energyData: {
          ...prevData.energyData,
          current: Math.round((Math.random() * 2 + 1.5) * 10) / 10,
        },
        weather: {
          ...prevData.weather,
          temperature: Math.round((Math.random() * 4 + 70)),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setData(prevData => ({
      ...prevData,
      devices: prevData.devices.map(device =>
        device.id === deviceId ? { ...device, ...updates } : device
      ),
    }));
  };

  return {
    ...data,
    updateDevice,
  };
}
