// API Base URL - Update this when deploying to production
const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:5000/api';

// API utility class for making HTTP requests
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('adminToken');
  }

  // Set auth token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('adminToken', token);
  }

  // Remove auth token
  removeToken() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // Get auth token
  getToken() {
    return this.token || localStorage.getItem('adminToken');
  }

  // Make HTTP request
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      
      // Better error messages for common issues
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error(
          '❌ Cannot connect to backend server. Please ensure:\n' +
          '1. Backend server is running (npm run dev in /backend)\n' +
          '2. Server is accessible at ' + this.baseURL + '\n' +
          '3. Check backend terminal for errors'
        );
      }
      
      throw error;
    }
  }

  // GET request
  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT request
  async put(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create API instance
const api = new ApiService(API_BASE_URL);

// Export API service
export default api;

// Export individual API functions for easier use

// ==================== DONOR API ====================
export const donorAPI = {
  // Create new donation
  createDonation: async (donationData: {
    name: string;
    email: string;
    phone: string;
    amount: number;
    campaignId: string;
    message?: string;
    displayPublicly?: boolean;
  }) => {
    return api.post('/donors', donationData);
  },

  // Get all donations
  getAllDonations: async (params?: {
    campaignId?: string;
    limit?: number;
    page?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.campaignId) queryParams.append('campaignId', params.campaignId);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    
    const query = queryParams.toString();
    return api.get(`/donors${query ? `?${query}` : ''}`);
  },

  // Get donation by ID
  getDonationById: async (id: string) => {
    return api.get(`/donors/${id}`);
  },

  // Get donation statistics
  getDonationStats: async () => {
    return api.get('/donors/stats');
  },
};

// ==================== CAMPAIGN API ====================
export const campaignAPI = {
  // Create new campaign
  createCampaign: async (campaignData: {
    title: string;
    description: string;
    category: string;
    goal: number;
    duration: number;
    image?: string;
    documents?: string[];
    creatorName?: string;
    creatorEmail?: string;
    isUrgent?: boolean;
  }) => {
    return api.post('/campaigns', campaignData);
  },

  // Get all campaigns
  getAllCampaigns: async (params?: {
    category?: string;
    status?: string;
    search?: string;
    limit?: number;
    page?: number;
    sortBy?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const query = queryParams.toString();
    return api.get(`/campaigns${query ? `?${query}` : ''}`);
  },

  // Get campaign by ID
  getCampaignById: async (id: string) => {
    return api.get(`/campaigns/${id}`);
  },

  // Update campaign (Admin only)
  updateCampaign: async (id: string, updateData: any) => {
    return api.put(`/campaigns/${id}`, updateData);
  },

  // Delete campaign (Admin only)
  deleteCampaign: async (id: string) => {
    return api.delete(`/campaigns/${id}`);
  },

  // Get campaign statistics
  getCampaignStats: async () => {
    return api.get('/campaigns/stats/overview');
  },
};

// ==================== ADMIN API ====================
export const adminAPI = {
  // Admin login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/admin/login', credentials);
    if (response.success && response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  // Admin logout
  logout: () => {
    api.removeToken();
  },

  // Get admin dashboard summary
  getSummary: async () => {
    return api.get('/admin/summary');
  },

  // Get all donors (admin view)
  getAllDonors: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    campaignId?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.campaignId) queryParams.append('campaignId', params.campaignId);
    
    const query = queryParams.toString();
    return api.get(`/admin/donors${query ? `?${query}` : ''}`);
  },

  // Get all campaigns (admin view)
  getAllCampaigns: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    
    const query = queryParams.toString();
    return api.get(`/admin/campaigns${query ? `?${query}` : ''}`);
  },

  // Get campaign with donor details (admin view)
  getCampaignDonors: async (campaignId: string) => {
    return api.get(`/admin/campaigns/${campaignId}/donors`);
  },

  // Create default admin (for initial setup only)
  createDefaultAdmin: async () => {
    return api.post('/admin/create-default', {});
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!api.getToken();
  },
};

// Export API instance for custom requests
export { api };
