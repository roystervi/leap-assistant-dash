import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import Settings from './components/Settings';
import { ExactDashboard } from './components/ExactDashboard';
import { WeatherCard } from './components/widgets/WeatherCard';
import { DeviceControls } from './components/widgets/DeviceControls';
import { EnergyChart } from './components/widgets/EnergyChart';
import { QuickActions } from './components/widgets/QuickActions';
import { ActivityFeed } from './components/widgets/ActivityFeed';
import { SystemStatus } from './components/widgets/SystemStatus';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'settings':
        return <Settings />;
      case 'overview':
      default:
        return <ExactDashboard />;
    }
  };

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
          
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
