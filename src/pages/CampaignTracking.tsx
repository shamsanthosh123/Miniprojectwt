import { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';
import { 
  Search, 
  Download, 
  Filter, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

interface Donor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  displayPublicly: boolean;
  paymentStatus: string;
  transactionId?: string;
  date: string;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  collected: number;
  donorCount: number;
  status: string;
  creatorName: string;
  creatorEmail: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export function CampaignTracking({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [campaignDonors, setCampaignDonors] = useState<Record<string, Donor[]>>({});
  const [loadingDonors, setLoadingDonors] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Check authentication
  useEffect(() => {
    if (!adminAPI.isAuthenticated()) {
      toast.error('Please login to access campaign tracking');
      onNavigate?.('home');
    }
  }, [onNavigate]);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getAllCampaigns({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter === 'all' ? undefined : statusFilter,
        category: categoryFilter === 'all' ? undefined : categoryFilter,
      });

      if (response.success) {
        setCampaigns(response.data);
        setTotalPages(response.pages);
      }
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      
      if (error.message?.includes('Cannot connect to backend')) {
        toast.error(
          'Backend Server Not Running',
          {
            description: 'Please start the backend server first.',
            duration: 6000,
          }
        );
      } else if (error.message?.includes('authorized') || error.message?.includes('token')) {
        toast.error('Session expired. Please login again.');
        adminAPI.logout();
        onNavigate?.('home');
      } else {
        toast.error(error.message || 'Failed to load campaigns');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch donors for a specific campaign
  const fetchCampaignDonors = async (campaignId: string) => {
    if (campaignDonors[campaignId]) {
      return; // Already fetched
    }

    setLoadingDonors(prev => ({ ...prev, [campaignId]: true }));
    try {
      const response = await adminAPI.getAllDonors({
        campaignId,
        limit: 1000, // Get all donors for this campaign
      });

      if (response.success) {
        setCampaignDonors(prev => ({ ...prev, [campaignId]: response.data }));
      }
    } catch (error: any) {
      console.error('Error fetching campaign donors:', error);
      toast.error('Failed to load donor details');
    } finally {
      setLoadingDonors(prev => ({ ...prev, [campaignId]: false }));
    }
  };

  // Toggle campaign expansion
  const toggleCampaign = async (campaignId: string) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(campaignId);
      await fetchCampaignDonors(campaignId);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [currentPage, statusFilter, categoryFilter]);

  // Filter campaigns by search
  const filteredCampaigns = campaigns.filter(campaign => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      campaign.title.toLowerCase().includes(search) ||
      campaign.creatorName.toLowerCase().includes(search) ||
      campaign.creatorEmail.toLowerCase().includes(search)
    );
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; icon: any; color: string }> = {
      active: { variant: 'default', icon: CheckCircle2, color: 'text-green-600' },
      pending: { variant: 'secondary', icon: Clock, color: 'text-yellow-600' },
      completed: { variant: 'default', icon: CheckCircle2, color: 'text-blue-600' },
      cancelled: { variant: 'destructive', icon: AlertCircle, color: 'text-red-600' },
      rejected: { variant: 'destructive', icon: AlertCircle, color: 'text-red-600' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className={`flex items-center gap-1 w-fit ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  // Export campaign data to CSV
  const exportCampaignToCSV = (campaign: Campaign) => {
    const donors = campaignDonors[campaign._id] || [];
    
    const headers = ['Campaign Info', 'Value'];
    const campaignInfo = [
      ['Campaign Title', campaign.title],
      ['Campaign ID', campaign._id],
      ['Creator Name', campaign.creatorName],
      ['Creator Email', campaign.creatorEmail],
      ['Category', campaign.category],
      ['Goal Amount', formatCurrency(campaign.goal)],
      ['Amount Collected', formatCurrency(campaign.collected)],
      ['Amount Remaining', formatCurrency(campaign.goal - campaign.collected)],
      ['Total Donors', campaign.donorCount.toString()],
      ['Status', campaign.status],
      ['', ''],
      ['Donor Name', 'Email', 'Phone', 'Amount', 'Transaction ID', 'Date', 'Status'],
      ...donors.map(donor => [
        donor.name,
        donor.email,
        donor.phone,
        donor.amount.toString(),
        donor.transactionId || 'N/A',
        formatDate(donor.date),
        donor.paymentStatus,
      ])
    ];

    const csvContent = campaignInfo.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-${campaign._id}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Campaign data exported successfully');
  };

  // Export all campaigns to CSV
  const exportAllCampaignsToCSV = () => {
    const headers = ['Campaign ID', 'Title', 'Creator Name', 'Creator Email', 'Category', 'Goal', 'Collected', 'Remaining', 'Donors', 'Status', 'Created Date'];
    const csvData = filteredCampaigns.map(campaign => [
      campaign._id,
      campaign.title,
      campaign.creatorName,
      campaign.creatorEmail,
      campaign.category,
      campaign.goal,
      campaign.collected,
      campaign.goal - campaign.collected,
      campaign.donorCount,
      campaign.status,
      formatDate(campaign.createdAt),
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-campaigns-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('All campaigns data exported successfully');
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1>Campaign Tracking</h1>
          </div>
          <p className="text-gray-600">Track all campaigns and their donations</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
                <h3 className="text-[#00BCD4]">{campaigns.length}</h3>
              </div>
              <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-[#00BCD4]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Goal</p>
                <h3 className="text-[#00BCD4]">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.goal, 0))}
                </h3>
              </div>
              <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-[#00BCD4]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Collected</p>
                <h3 className="text-[#00BCD4]">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.collected, 0))}
                </h3>
              </div>
              <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#00BCD4]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donors</p>
                <h3 className="text-[#00BCD4]">
                  {campaigns.reduce((sum, c) => sum + c.donorCount, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00BCD4]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="p-6 mb-6 border border-gray-200 bg-white">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="schools">Schools</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchCampaigns}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={exportAllCampaignsToCSV}
                className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </Card>

        {/* Campaigns List */}
        <Card className="border border-gray-200 bg-white overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[#00BCD4]" />
              <p className="text-gray-600">Loading campaigns...</p>
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">No campaigns found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => {
                const isExpanded = expandedCampaign === campaign._id;
                const donors = campaignDonors[campaign._id] || [];
                const isLoadingDonors = loadingDonors[campaign._id];
                const remaining = campaign.goal - campaign.collected;
                const percentageCompleted = Math.min(Math.round((campaign.collected / campaign.goal) * 100), 100);

                return (
                  <div key={campaign._id} className="transition-colors hover:bg-gray-50">
                    {/* Campaign Header */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => toggleCampaign(campaign._id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-gray-900 truncate">{campaign.title}</h3>
                            {getStatusBadge(campaign.status)}
                            <Badge variant="outline" className="capitalize">
                              {campaign.category}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Campaign ID</p>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{campaign._id}</code>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Creator</p>
                              <p className="text-sm font-medium text-gray-900">{campaign.creatorName}</p>
                              <p className="text-xs text-gray-500">{campaign.creatorEmail}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Goal</p>
                              <p className="text-sm font-semibold text-[#00BCD4]">{formatCurrency(campaign.goal)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Collected</p>
                              <p className="text-sm font-semibold text-green-600">{formatCurrency(campaign.collected)}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress: {percentageCompleted}%</span>
                              <span className="text-gray-600">Remaining: {formatCurrency(remaining)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentageCompleted}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{campaign.donorCount} donors</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Created: {formatDate(campaign.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              exportCampaignToCSV(campaign);
                            }}
                            disabled={!donors.length && !isExpanded}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Donor Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50 p-6">
                        <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#00BCD4]" />
                          Donor Details ({donors.length})
                        </h4>
                        
                        {isLoadingDonors ? (
                          <div className="text-center py-8">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00BCD4]" />
                            <p className="text-sm text-gray-600">Loading donors...</p>
                          </div>
                        ) : donors.length === 0 ? (
                          <div className="text-center py-8">
                            <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm text-gray-600">No donors yet for this campaign</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-white">
                                  <TableHead>Donor ID</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Amount</TableHead>
                                  <TableHead>Transaction ID</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {donors.map((donor) => (
                                  <TableRow key={donor._id} className="bg-white hover:bg-gray-50">
                                    <TableCell>
                                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{donor._id}</code>
                                    </TableCell>
                                    <TableCell>
                                      <p className="font-medium text-gray-900">{donor.name}</p>
                                    </TableCell>
                                    <TableCell>
                                      <a href={`mailto:${donor.email}`} className="text-[#00BCD4] hover:underline text-sm">
                                        {donor.email}
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      <a href={`tel:${donor.phone}`} className="text-gray-600 hover:text-[#00BCD4] text-sm">
                                        {donor.phone}
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      <span className="font-semibold text-[#00BCD4]">
                                        {formatCurrency(donor.amount)}
                                      </span>
                                    </TableCell>
                                    <TableCell>
                                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {donor.transactionId || 'N/A'}
                                      </code>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-sm text-gray-600">{formatDate(donor.date)}</span>
                                    </TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={donor.paymentStatus === 'completed' ? 'default' : 'secondary'}
                                        className="text-xs"
                                      >
                                        {donor.paymentStatus}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
