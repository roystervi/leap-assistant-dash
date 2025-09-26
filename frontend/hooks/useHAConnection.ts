import { useState, useEffect, useCallback } from 'react';

export type ConnectionStatus = 'unknown' | 'connecting' | 'connected' | 'disconnected';

interface HAConnectionState {
  haUrl: string;
  haToken: string;
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  lastChecked: Date | null;
}

const STORAGE_KEY = 'ha_connection_settings';

export function useHAConnection() {
  const [state, setState] = useState<HAConnectionState>({
    haUrl: '',
    haToken: '',
    connectionStatus: 'unknown',
    isConnected: false,
    lastChecked: null,
  });
  
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState(prev => ({
          ...prev,
          haUrl: parsed.haUrl || '',
          haToken: parsed.haToken || '',
          connectionStatus: 'unknown',
          isConnected: false,
        }));
        
        // Auto-test connection if we have both URL and token
        if (parsed.haUrl && parsed.haToken) {
          testConnectionSilent(parsed.haUrl, parsed.haToken);
        }
      } catch (error) {
        console.error('Failed to parse stored HA connection settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((url: string, token: string) => {
    const settings = {
      haUrl: url,
      haToken: token,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, []);

  // Test Home Assistant connection
  const testHAConnection = async (url: string, token: string): Promise<boolean> => {
    try {
      // Ensure URL has proper format
      const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const apiUrl = `${baseUrl}/api/`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.message === 'API running.';
      }
      
      return false;
    } catch (error) {
      console.error('HA connection test failed:', error);
      return false;
    }
  };

  // Silent connection test (for auto-testing on load)
  const testConnectionSilent = useCallback(async (url: string, token: string) => {
    setState(prev => ({ ...prev, connectionStatus: 'connecting' }));
    
    const isConnected = await testHAConnection(url, token);
    
    setState(prev => ({
      ...prev,
      connectionStatus: isConnected ? 'connected' : 'disconnected',
      isConnected,
      lastChecked: new Date(),
    }));
  }, []);

  // Public test connection method
  const testConnection = useCallback(async (url: string, token: string): Promise<boolean> => {
    setIsTestingConnection(true);
    setState(prev => ({ ...prev, connectionStatus: 'connecting' }));
    
    try {
      const isConnected = await testHAConnection(url, token);
      
      setState(prev => ({
        ...prev,
        connectionStatus: isConnected ? 'connected' : 'disconnected',
        isConnected,
        lastChecked: new Date(),
      }));
      
      return isConnected;
    } finally {
      setIsTestingConnection(false);
    }
  }, []);

  // Update connection settings
  const updateConnection = useCallback(async (url: string, token: string) => {
    setState(prev => ({
      ...prev,
      haUrl: url,
      haToken: token,
    }));
    
    saveSettings(url, token);
    
    // Test the new connection
    if (url && token) {
      await testConnection(url, token);
    } else {
      setState(prev => ({
        ...prev,
        connectionStatus: 'unknown',
        isConnected: false,
      }));
    }
  }, [saveSettings, testConnection]);

  // Get Home Assistant API client
  const getHAClient = useCallback(() => {
    if (!state.haUrl || !state.haToken || !state.isConnected) {
      return null;
    }

    const baseUrl = state.haUrl.endsWith('/') ? state.haUrl.slice(0, -1) : state.haUrl;
    
    return {
      baseUrl,
      headers: {
        'Authorization': `Bearer ${state.haToken}`,
        'Content-Type': 'application/json',
      },
      
      // Helper methods for common HA API calls
      async getStates() {
        const response = await fetch(`${baseUrl}/api/states`, {
          headers: this.headers,
        });
        return response.ok ? response.json() : null;
      },

      async getState(entityId: string) {
        const response = await fetch(`${baseUrl}/api/states/${entityId}`, {
          headers: this.headers,
        });
        return response.ok ? response.json() : null;
      },

      async callService(domain: string, service: string, serviceData?: any) {
        const response = await fetch(`${baseUrl}/api/services/${domain}/${service}`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(serviceData || {}),
        });
        return response.ok ? response.json() : null;
      },

      async getConfig() {
        const response = await fetch(`${baseUrl}/api/config`, {
          headers: this.headers,
        });
        return response.ok ? response.json() : null;
      },
    };
  }, [state.haUrl, state.haToken, state.isConnected]);

  return {
    haUrl: state.haUrl,
    haToken: state.haToken,
    connectionStatus: state.connectionStatus,
    isConnected: state.isConnected,
    lastChecked: state.lastChecked,
    isTestingConnection,
    updateConnection,
    testConnection,
    getHAClient,
  };
}