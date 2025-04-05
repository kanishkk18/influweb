"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Eye, 
  Trash2, 
  Instagram, 
  Youtube, 
} from 'lucide-react';
import { generateMockInfluencers } from '@/utils/adminMockData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminInfluencers = () => {
  const { toast } = useToast();
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    // Fetch influencers data
    const fetchedInfluencers = generateMockInfluencers();
    setInfluencers(fetchedInfluencers);
    setFilteredInfluencers(fetchedInfluencers);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...influencers];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(influencer => 
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(influencer => influencer.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(influencer => influencer.status === statusFilter);
    }
    
    setFilteredInfluencers(results);
  }, [searchTerm, categoryFilter, statusFilter, influencers]);
  
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
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };
  
  // Handle view influencer
  const handleViewInfluencer = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsViewDialogOpen(true);
  };
  
  // Handle activate influencer
  const handleActivateInfluencer = (influencer) => {
    const updatedInfluencers = influencers.map(inf => 
      inf.id === influencer.id ? { ...inf, status: "active" } : inf
    );
    
    setInfluencers(updatedInfluencers);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Influencer Activated",
      description: `${influencer.name} has been activated successfully.`,
    });
  };
  
  // Handle suspend influencer
  const handleSuspendInfluencer = (influencer) => {
    const updatedInfluencers = influencers.map(inf => 
      inf.id === influencer.id ? { ...inf, status: "suspended"} : inf
    );
    
    setInfluencers(updatedInfluencers);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Influencer Suspended",
      description: `${influencer.name} has been suspended.`,
    });
  };
  
  // Handle delete dialog open
  const openDeleteDialog = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!selectedInfluencer) return;
    
    const updatedInfluencers = influencers.filter(inf => inf.id !== selectedInfluencer.id);
    setInfluencers(updatedInfluencers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Influencer Deleted",
      description: `${selectedInfluencer.name} has been deleted.`,
    });
  };
  
  return (
    <AdminLayout title="Influencers Management">
      <Card>
        <CardContent className="p-6">
          {/* Search and Filter section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, username, or email" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Influencers Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInfluencers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No influencers found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInfluencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={influencer.profilePicture} alt={influencer.name} />
                            <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{influencer.name}</div>
                            <div className="text-xs text-muted-foreground">@{influencer.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{influencer.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {influencer.platforms.map((platform, index) => (
                            <div key={index} className="flex items-center">
                              {platform.toLowerCase() === 'instagram' && <Instagram className="h-4 w-4" />}
                              {platform.toLowerCase() === 'youtube' && <Youtube className="h-4 w-4" />}
                              {platform.toLowerCase() !== 'instagram' && platform.toLowerCase() !== 'youtube' && (
                                <span className="text-xs">{platform}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(influencer.followers)}</TableCell>
                      <TableCell>{influencer.engagement.toFixed(1)}%</TableCell>
                      <TableCell>
                        {getStatusBadge(influencer.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewInfluencer(influencer)}
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
                              {influencer.status !== 'active' && (
                                <DropdownMenuItem 
                                  onClick={() => handleActivateInfluencer(influencer)}
                                  className="text-green-600"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {influencer.status !== 'suspended' && (
                                <DropdownMenuItem 
                                  onClick={() => handleSuspendInfluencer(influencer)}
                                  className="text-amber-600"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => openDeleteDialog(influencer)}
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
      
      {/* View Influencer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedInfluencer && (
            <>
              <DialogHeader>
                <DialogTitle>Influencer Profile</DialogTitle>
                <DialogDescription>
                  Joined on {new Date(selectedInfluencer.joinedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedInfluencer.profilePicture} alt={selectedInfluencer.name} />
                    <AvatarFallback>{selectedInfluencer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{selectedInfluencer.name}</h3>
                    <p className="text-sm text-muted-foreground">@{selectedInfluencer.username}</p>
                    <p className="text-sm">{selectedInfluencer.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Category</Label>
                    <div className="text-sm">{selectedInfluencer.category}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Status</Label>
                    <div>{getStatusBadge(selectedInfluencer.status)}</div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Platforms</Label>
                  <div className="flex gap-2">
                    {selectedInfluencer.platforms.map((platform, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {platform.toLowerCase() === 'instagram' && <Instagram className="h-3 w-3" />}
                        {platform.toLowerCase() === 'youtube' && <Youtube className="h-3 w-3" />}
                        <span>{platform}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Followers</Label>
                    <div className="text-lg font-bold">{formatNumber(selectedInfluencer.followers)}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Engagement</Label>
                    <div className="text-lg font-bold">{selectedInfluencer.engagement.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedInfluencer.status !== 'active' && (
                  <Button 
                    onClick={() => handleActivateInfluencer(selectedInfluencer)}
                    className="bg-green-500 hover:bg-green-600 sm:flex-1"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate
                  </Button>
                )}
                
                {selectedInfluencer.status !== 'suspended' && (
                  <Button 
                    variant="outline"
                    onClick={() => handleSuspendInfluencer(selectedInfluencer)}
                    className="sm:flex-1"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Suspend
                  </Button>
                )}
                
                <Button 
                  variant="destructive"
                  onClick={() => openDeleteDialog(selectedInfluencer)}
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
            <DialogTitle>Delete Influencer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this influencer? This action cannot be undone.
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

export default AdminInfluencers;
