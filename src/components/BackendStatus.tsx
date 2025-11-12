import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

export function BackendStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const checkBackendHealth = async () => {
    setChecking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      setIsOnline(response.ok && data.success);
    } catch (error) {
      setIsOnline(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isOnline === null) {
    return null; // Still checking initially
  }

  if (isOnline) {
    return null; // Don't show anything if backend is working
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md animate-in slide-in-from-bottom">
      <Alert variant="destructive" className="border-red-300 bg-red-50">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>Backend Server Offline</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="text-sm">
            Cannot connect to backend server at <code className="text-xs bg-red-100 px-1 py-0.5 rounded">{API_BASE_URL}</code>
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-medium">To fix this:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Open a terminal in the <code className="bg-red-100 px-1 rounded">/backend</code> folder</li>
              <li>Run: <code className="bg-red-100 px-1 py-0.5 rounded">npm run dev</code></li>
              <li>Wait for "MongoDB connected successfully" message</li>
            </ol>
          </div>
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={checkBackendHealth}
              disabled={checking}
              className="text-xs"
            >
              {checking ? 'Checking...' : 'Retry Connection'}
            </Button>
            <a 
              href="/START_SERVERS.md" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="text-xs">
                View Setup Guide
              </Button>
            </a>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
