import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Settings2, Wifi, WifiOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useHAConnection } from '../hooks/useHAConnection';

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
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Appearance settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}