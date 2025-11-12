import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2, RefreshCw, Server, Database, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: string;
}

export function ConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const runTests = async () => {
    setTesting(true);
    const testResults: TestResult[] = [];

    // Test 1: Health Check
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      testResults.push({
        name: 'Backend Server Health',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'Backend server is running' : 'Backend server returned error',
        details: `Status: ${response.status}, URL: ${API_BASE_URL}/health`
      });
    } catch (error: any) {
      testResults.push({
        name: 'Backend Server Health',
        status: 'error',
        message: 'Cannot connect to backend server',
        details: `Error: ${error.message}. Make sure backend is running on port 5000.`
      });
    }

    // Test 2: API Root
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      testResults.push({
        name: 'API Root Endpoint',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? `API v${data.version} responding` : 'API root not accessible',
        details: data.message || 'No details'
      });
    } catch (error: any) {
      testResults.push({
        name: 'API Root Endpoint',
        status: 'error',
        message: 'API root not accessible',
        details: error.message
      });
    }

    // Test 3: Campaigns Endpoint
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      testResults.push({
        name: 'Campaigns API',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? `${data.total || 0} campaigns found` : 'Campaigns API error',
        details: `Endpoint: ${API_BASE_URL}/api/campaigns`
      });
    } catch (error: any) {
      testResults.push({
        name: 'Campaigns API',
        status: 'error',
        message: 'Cannot reach campaigns endpoint',
        details: error.message
      });
    }

    // Test 4: Admin Login Endpoint (without credentials)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test', password: 'test' })
      });
      
      // Even if login fails, endpoint should respond
      testResults.push({
        name: 'Admin Login Endpoint',
        status: response.status === 401 || response.status === 400 ? 'success' : 'error',
        message: 'Admin endpoint is responding',
        details: `Status: ${response.status} (expected 400/401 for invalid credentials)`
      });
    } catch (error: any) {
      testResults.push({
        name: 'Admin Login Endpoint',
        status: 'error',
        message: 'Admin endpoint not accessible',
        details: error.message
      });
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
    }
  };

  const allTestsPassed = results.length > 0 && results.every(r => r.status === 'success');
  const hasErrors = results.some(r => r.status === 'error');

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E0F7FA] rounded-full flex items-center justify-center mx-auto mb-4">
            <Server className="w-8 h-8 text-[#00BCD4]" />
          </div>
          <h1 className="mb-2">Connection Test</h1>
          <p className="text-gray-600">
            Test the connection between frontend and backend services
          </p>
        </div>

        {/* Configuration Info */}
        <Card className="p-6 mb-6 border border-gray-200 bg-white">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#00BCD4]" />
            Configuration
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Backend URL:</span>
              <code className="bg-gray-100 px-3 py-1 rounded text-xs">{API_BASE_URL}</code>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">API Endpoint:</span>
              <code className="bg-gray-100 px-3 py-1 rounded text-xs">{API_BASE_URL}/api</code>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Frontend URL:</span>
              <code className="bg-gray-100 px-3 py-1 rounded text-xs">{window.location.origin}</code>
            </div>
          </div>
        </Card>

        {/* Run Tests Button */}
        <div className="text-center mb-6">
          <Button
            onClick={runTests}
            disabled={testing}
            className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
            size="lg"
          >
            {testing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Run Connection Tests
              </>
            )}
          </Button>
        </div>

        {/* Overall Status */}
        {results.length > 0 && (
          <Card className={`p-6 mb-6 border-2 ${
            allTestsPassed 
              ? 'border-green-300 bg-green-50' 
              : hasErrors 
              ? 'border-red-300 bg-red-50'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center gap-3">
              {allTestsPassed ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="text-green-900">All Tests Passed!</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Backend server is running and all endpoints are accessible.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="text-red-900">Connection Issues Detected</h3>
                    <p className="text-red-700 text-sm mt-1">
                      Please check the errors below and ensure backend server is running.
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Test Results */}
        {results.length > 0 && (
          <Card className="border border-gray-200 bg-white overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00BCD4]" />
                Test Results
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {results.map((result, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base">{result.name}</h3>
                        <Badge 
                          variant={result.status === 'success' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {result.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {result.message}
                      </p>
                      {result.details && (
                        <code className="block text-xs bg-gray-100 p-2 rounded mt-2 text-gray-700">
                          {result.details}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Help Section */}
        {hasErrors && (
          <Card className="p-6 mt-6 border border-amber-300 bg-amber-50">
            <h3 className="text-amber-900 mb-3">🛠️ How to Fix</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-amber-800">
              <li>Make sure MongoDB is running</li>
              <li>Open a terminal in the <code className="bg-amber-100 px-1 rounded">/backend</code> folder</li>
              <li>Run: <code className="bg-amber-100 px-2 py-1 rounded">npm run dev</code></li>
              <li>Wait for "MongoDB connected successfully" message</li>
              <li>Come back here and click "Run Connection Tests" again</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-sm text-amber-800 mb-2">Need detailed help?</p>
              <div className="flex gap-2">
                <a href="/QUICK_FIX.md" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="text-xs">
                    Quick Fix Guide
                  </Button>
                </a>
                <a href="/START_SERVERS.md" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="text-xs">
                    Complete Setup Guide
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
