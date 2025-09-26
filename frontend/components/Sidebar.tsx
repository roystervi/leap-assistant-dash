import { 
  Home, 
  Lightbulb, 
  Thermometer, 
  Shield, 
  Zap, 
  Camera,
  Music,
  Settings,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'lighting', label: 'Lighting', icon: Lightbulb },
  { id: 'climate', label: 'Climate', icon: Thermometer },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'energy', label: 'Energy', icon: Zap },
  { id: 'cameras', label: 'Cameras', icon: Camera },
  { id: 'media', label: 'Media', icon: Music },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ collapsed, activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className={cn(
          "flex items-center gap-3 mb-8",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">SmartHome</h1>
              <p className="text-xs text-muted-foreground">Control Center</p>
            </div>
          )}
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11 transition-all hover:bg-accent",
                collapsed && "justify-center px-2",
                activeSection === item.id && "bg-accent"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
