import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Settings2, Wifi, WifiOff, CheckCircle, AlertCircle, Loader2, Monitor, Smartphone, Tablet, Tv } from 'lucide-react';
import { useHAConnection } from '../hooks/useHAConnection';
import { useResponsiveDesign } from '../hooks/useResponsiveDesign';

export default function Settings() {
  const { toast } = useToast();
  const {
    haUrl,
    haToken,
    connectionStatus,
    isConnected,
    updateConnection,
    testConnection,
    isTestingConnection
  } = useHAConnection();
  
  const {
    screenSize,
    orientation,
    dimensions,
    breakpointInfo,
    isMobile,
    isTablet,
    isDesktop,
    isTV,
    isPortrait
  } = useResponsiveDesign();

  const [formData, setFormData] = useState({
    url: haUrl,
    token: haToken
  });

  const handleSaveConnection = async () => {
    try {
      await updateConnection(formData.url, formData.token);
      toast({
        title: "Connection saved",
        description: "Home Assistant connection settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save connection settings.",
        variant: "destructive",
      });
    }
  };

  const handleTestConnection = async () => {
    try {
      const success = await testConnection(formData.url, formData.token);
      if (success) {
        toast({
          title: "Connection successful",
          description: "Successfully connected to Home Assistant.",
        });
      } else {
        toast({
          title: "Connection failed",
          description: "Failed to connect to Home Assistant. Please check your settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "An error occurred while testing the connection.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      case 'connecting':
        return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge variant="default" className="bg-green-600">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">Disconnected</Badge>;
      case 'connecting':
        return <Badge variant="secondary">Connecting...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings2 className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Home Assistant Connection
                  </CardTitle>
                  <CardDescription>
                    Configure your Home Assistant server connection to sync device data
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  {getStatusBadge()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectionStatus === 'connected' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Successfully connected to Home Assistant. Dashboard data will sync automatically.
                  </AlertDescription>
                </Alert>
              )}
              
              {connectionStatus === 'disconnected' && haUrl && haToken && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Connection to Home Assistant failed. Please check your settings and try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ha-url">Home Assistant URL</Label>
                  <Input
                    id="ha-url"
                    type="url"
                    placeholder="https://homeassistant.local:8123"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    The full URL to your Home Assistant instance (including port if needed)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ha-token">Long-Lived Access Token</Label>
                  <Input
                    id="ha-token"
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={formData.token}
                    onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Generate a long-lived access token in Home Assistant → Profile → Security
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleTestConnection}
                    variant="outline"
                    disabled={!formData.url || !formData.token || isTestingConnection}
                  >
                    {isTestingConnection ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Wifi className="h-4 w-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleSaveConnection}
                    disabled={!formData.url || !formData.token}
                  >
                    Save Connection
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">How to get your access token:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open your Home Assistant web interface</li>
                  <li>Click on your profile (bottom left corner)</li>
                  <li>Scroll down to "Long-Lived Access Tokens"</li>
                  <li>Click "Create Token"</li>
                  <li>Give it a name (e.g., "Smart Dashboard")</li>
                  <li>Copy the generated token and paste it above</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">General settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Display Settings</CardTitle>
              <CardDescription>Configure how the dashboard adapts to different screen sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Current Screen Information</h4>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      {isTV && <Tv className="h-5 w-5 text-primary" />}
                      {isDesktop && <Monitor className="h-5 w-5 text-primary" />}
                      {isTablet && <Tablet className="h-5 w-5 text-primary" />}
                      {isMobile && <Smartphone className="h-5 w-5 text-primary" />}
                      <div>
                        <p className="font-medium">{breakpointInfo?.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {dimensions.width}px × {dimensions.height}px
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{screenSize.toUpperCase()}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {orientation} mode
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-sm font-medium">Width Range</p>
                      <p className="text-xs text-muted-foreground">
                        {breakpointInfo?.min}px - {breakpointInfo?.max === Infinity ? '∞' : breakpointInfo?.max + 'px'}
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-sm font-medium">Orientation</p>
                      <p className="text-xs text-muted-foreground capitalize">{orientation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Screen Size Breakpoints</h4>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">📺 TV Display</p>
                      <p className="text-sm text-muted-foreground">1920px and above</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expanded layout with larger elements
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">🖥️ Desktop Monitor</p>
                      <p className="text-sm text-muted-foreground">1200px - 1920px</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Standard desktop layout
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">📱 Tablet</p>
                      <p className="text-sm text-muted-foreground">768px - 1024px</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Collapsible sidebar, stacked layout
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">📱 Mobile Phone</p>
                      <p className="text-sm text-muted-foreground">320px - 768px</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overlay sidebar, single column
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Responsive Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Automatic layout adaptation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Touch-friendly controls on mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Collapsible navigation for tablets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Overlay navigation for mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Optimized text and button sizes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Portrait and landscape mode support</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Layout Behavior</h4>
                <div className="grid gap-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">TV/Large Desktop</p>
                    <p className="text-xs text-muted-foreground">16-column grid, expanded sidebar, larger typography</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">Desktop</p>
                    <p className="text-xs text-muted-foreground">12-column grid, full sidebar, standard typography</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">Tablet</p>
                    <p className="text-xs text-muted-foreground">2-column grid, hover-expandable sidebar</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">Mobile</p>
                    <p className="text-xs text-muted-foreground">Single column, overlay sidebar, compact header</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}