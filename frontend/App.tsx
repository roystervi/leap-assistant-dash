import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WeatherCard } from './components/widgets/WeatherCard';
import { DeviceControls } from './components/widgets/DeviceControls';
import { EnergyChart } from './components/widgets/EnergyChart';
import { QuickActions } from './components/widgets/QuickActions';
import { ActivityFeed } from './components/widgets/ActivityFeed';
import { SystemStatus } from './components/widgets/SystemStatus';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        <Sidebar 
          collapsed={sidebarCollapsed}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Header 
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Smart Home Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening in your home.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <WeatherCard />
                </div>
                
                <div className="xl:col-span-2">
                  <DeviceControls />
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <EnergyChart />
                </div>
                
                <div>
                  <SystemStatus />
                </div>
                
                <div className="md:col-span-2">
                  <QuickActions />
                </div>
                
                <div className="lg:col-span-2">
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
