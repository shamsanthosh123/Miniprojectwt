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
  Users,
  TrendingUp,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle
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
  campaignId: {
    _id: string;
    title: string;
    category: string;
  };
  message?: string;
  displayPublicly: boolean;
  paymentStatus: string;
  transactionId?: string;
  date: string;
  createdAt: string;
}

interface DashboardStats {
  totalDonations: number;
  totalAmount: number;
  totalDonors: number;
  averageAmount: number;
}

export function AdminDashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDonors, setTotalDonors] = useState(0);
  const itemsPerPage = 20;

  // Check authentication
  useEffect(() => {
    if (!adminAPI.isAuthenticated()) {
      toast.error('Please login to access admin dashboard');
      onNavigate?.('home');
    }
  }, [onNavigate]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch donors
      const donorsResponse = await adminAPI.getAllDonors({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (donorsResponse.success) {
        setDonors(donorsResponse.data);
        setTotalPages(donorsResponse.pages);
        setTotalDonors(donorsResponse.total);
      }

      // Fetch summary stats
      const summaryResponse = await adminAPI.getSummary();
      if (summaryResponse.success) {
        setStats({
          totalDonations: summaryResponse.data.overview.totalDonations,
          totalAmount: summaryResponse.data.overview.totalFundsRaised,
          totalDonors: summaryResponse.data.overview.totalDonors,
          averageAmount: summaryResponse.data.overview.averageDonation,
        });
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      
      // Show detailed error message in toast
      if (error.message?.includes('Cannot connect to backend')) {
        toast.error(
          'Backend Server Not Running',
          {
            description: 'Please start the backend server first. Run "npm run dev" in the /backend directory.',
            duration: 6000,
          }
        );
      } else if (error.message?.includes('authorized') || error.message?.includes('token')) {
        toast.error('Session expired. Please login again.');
        adminAPI.logout();
        onNavigate?.('home');
      } else {
        toast.error(error.message || 'Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentPage, searchTerm]);

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Amount', 'Campaign', 'Status', 'Transaction ID', 'Date'];
    const csvData = donors.map(donor => [
      donor.name,
      donor.email,
      donor.phone,
      donor.amount,
      donor.campaignId?.title || 'N/A',
      donor.paymentStatus,
      donor.transactionId || 'N/A',
      formatDate(donor.date),
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Donors data exported successfully');
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; icon: any }> = {
      completed: { variant: 'default', icon: CheckCircle2 },
      pending: { variant: 'secondary', icon: Clock },
      failed: { variant: 'destructive', icon: AlertCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  // Filter donors by status
  const filteredDonors = statusFilter === 'all' 
    ? donors 
    : donors.filter(donor => donor.paymentStatus === statusFilter);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and view all donor information</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Donations</p>
                  <h3 className="text-[#00BCD4]">{stats.totalDonations.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#00BCD4]" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <h3 className="text-[#00BCD4]">{formatCurrency(stats.totalAmount)}</h3>
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
                  <h3 className="text-[#00BCD4]">{stats.totalDonors.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#00BCD4]" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Donation</p>
                  <h3 className="text-[#00BCD4]">{formatCurrency(stats.averageAmount)}</h3>
                </div>
                <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#00BCD4]" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters and Actions */}
        <Card className="p-6 mb-6 border border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDashboardData}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={exportToCSV}
                className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Donors Table */}
        <Card className="border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex items-center justify-center gap-2 text-gray-500">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Loading donors...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredDonors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No donors found</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">Try adjusting your search terms</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonors.map((donor) => (
                    <TableRow key={donor._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{donor.name}</p>
                          {donor.displayPublicly ? (
                            <Badge variant="outline" className="mt-1 text-xs">Public</Badge>
                          ) : (
                            <Badge variant="secondary" className="mt-1 text-xs">Private</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${donor.email}`} className="hover:text-[#00BCD4] hover:underline">
                              {donor.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${donor.phone}`} className="hover:text-[#00BCD4]">
                              {donor.phone}
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {donor.campaignId?.title || 'N/A'}
                          </p>
                          {donor.campaignId?.category && (
                            <Badge variant="outline" className="mt-1 text-xs capitalize">
                              {donor.campaignId.category}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-[#00BCD4]">
                          {formatCurrency(donor.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(donor.paymentStatus)}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {donor.transactionId || 'N/A'}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {formatDate(donor.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {donor.message ? (
                          <p className="text-sm text-gray-600 max-w-xs truncate" title={donor.message}>
                            {donor.message}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-400">No message</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalDonors)} of {totalDonors} donors
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
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? 'bg-[#00BCD4] hover:bg-[#00ACC1] text-white' : ''}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
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
