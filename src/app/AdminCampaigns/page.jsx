"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { useToast } from "../../components/ui/use-toast";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  DollarSign,
  Users,
  Video
} from 'lucide-react';
import { generateMockCampaigns } from '@/utils/adminMockData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    // Fetch campaigns data
    const fetchedCampaigns = generateMockCampaigns();
    setCampaigns(fetchedCampaigns);
    setFilteredCampaigns(fetchedCampaigns);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...campaigns];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(campaign => 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(campaign => campaign.status === statusFilter);
    }
    
    setFilteredCampaigns(results);
  }, [searchTerm, statusFilter, campaigns]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
 
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  // Handle view campaign
  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsViewDialogOpen(true);
  };
  
  // Handle activate campaign
  const handleActivateCampaign = (campaign) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id ? { ...c, status: "active" } : c
    );
    
    setCampaigns(updatedCampaigns);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Campaign Activated",
      description: `"${campaign.name}" has been activated.`,
    });
  };
  
  // Handle mark as completed
  const handleMarkAsCompleted = (campaign) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id ? { ...c, status: "completed" } : c
    );
    
    setCampaigns(updatedCampaigns);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Campaign Completed",
      description: `"${campaign.name}" has been marked as completed.`,
    });
  };
  
  // Handle cancel campaign
  const handleCancelCampaign = (campaign) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id ? { ...c, status: "cancelled" } : c
    );
    
    setCampaigns(updatedCampaigns);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Campaign Cancelled",
      description: `"${campaign.name}" has been cancelled.`,
    });
  };
  
  // Handle delete dialog open
  const openDeleteDialog = (campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!selectedCampaign) return;
    
    const updatedCampaigns = campaigns.filter(c => c.id !== selectedCampaign.id);
    setCampaigns(updatedCampaigns);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Campaign Deleted",
      description: `"${selectedCampaign.name}" has been deleted.`,
    });
  };
  
  return (
    <AdminLayout title="Campaigns Management">
      <Card>
        <CardContent className="p-6">
          {/* Search and Filter section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by campaign name or brand" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Campaigns Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Influencers</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No campaigns found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {campaign.platforms.join(', ')}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.brand}</TableCell>
                      <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                      <TableCell>
                        {getStatusBadge(campaign.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>Start: {new Date(campaign.startDate).toLocaleDateString()}</div>
                          <div>End: {new Date(campaign.endDate).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          {campaign.influencersCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                          {campaign.videosCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewCampaign(campaign)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {campaign.status === 'draft' && (
                                <DropdownMenuItem 
                                  onClick={() => handleActivateCampaign(campaign)}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {(campaign.status === 'draft' || campaign.status === 'active') && (
                                <DropdownMenuItem 
                                  onClick={() => handleMarkAsCompleted(campaign)}
                                  className="text-blue-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {(campaign.status === 'draft' || campaign.status === 'active') && (
                                <DropdownMenuItem 
                                  onClick={() => handleCancelCampaign(campaign)}
                                  className="text-amber-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Campaign
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => openDeleteDialog(campaign)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Campaign Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCampaign.name}</DialogTitle>
                <DialogDescription>
                  Campaign by {selectedCampaign.brand}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Status</Label>
                    <div>{getStatusBadge(selectedCampaign.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Budget</Label>
                    <div className="flex items-center text-lg font-bold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatCurrency(selectedCampaign.budget)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Start Date</Label>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(selectedCampaign.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">End Date</Label>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(selectedCampaign.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCampaign.platforms.map((platform, index) => (
                      <Badge key={index} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Influencers</Label>
                    <div className="flex items-center text-sm font-medium">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {selectedCampaign.influencersCount} influencers
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Videos</Label>
                    <div className="flex items-center text-sm font-medium">
                      <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                      {selectedCampaign.videosCount} videos
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Performance</Label>
                  <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-md">
                    <div>
                      <div className="text-xs text-muted-foreground">Views</div>
                      <div className="font-medium">{formatNumber(selectedCampaign.performance.views)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Engagements</div>
                      <div className="font-medium">{formatNumber(selectedCampaign.performance.engagements)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Conversions</div>
                      <div className="font-medium">{formatNumber(selectedCampaign.performance.conversions)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedCampaign.status === 'draft' && (
                  <Button 
                    onClick={() => handleActivateCampaign(selectedCampaign)}
                    className="bg-green-500 hover:bg-green-600 sm:flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate
                  </Button>
                )}
                
                {(selectedCampaign.status === 'draft' || selectedCampaign.status === 'active') && (
                  <>
                    <Button 
                      variant={selectedCampaign.status === 'draft' ? 'outline' : 'default'} 
                      onClick={() => handleMarkAsCompleted(selectedCampaign)}
                      className="sm:flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleCancelCampaign(selectedCampaign)}
                      className="sm:flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                
                <Button 
                  variant="destructive"
                  onClick={() => openDeleteDialog(selectedCampaign)}
                  className="sm:flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCampaigns;
