"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, ThumbsUp, ThumbsDown, Eye, MoreVertical, Trash2, Video, Youtube, Instagram } from 'lucide-react';
import { generateMockVideos } from '@/utils/mockData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminVideos = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    // Fetch videos data
    const fetchedVideos = generateMockVideos();
    setVideos(fetchedVideos);
    setFilteredVideos(fetchedVideos);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...videos];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      results = results.filter(video => video.platform === platformFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(video => video.status === statusFilter);
    }
    
    setFilteredVideos(results);
  }, [searchTerm, platformFilter, statusFilter, videos]);
  
  // Platform Icon component
  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
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
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };
  
  // Handle view video
  const handleViewVideo = (video) => {
    setSelectedVideo(video);
    setIsViewDialogOpen(true);
  };
  
  // Handle approve video
  const handleApproveVideo = (video) => {
    const updatedVideos = videos.map(v => 
      v.id === video.id ? { ...v, status: "approved" } : v
    );
    
    setVideos(updatedVideos);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Video Approved",
      description: `"${video.title}" has been approved successfully.`,
    });
  };
  
  // Handle reject dialog open
  const openRejectDialog = (video) => {
    setSelectedVideo(video);
    setRejectionReason('');
    setIsRejectDialogOpen(true);
    setIsViewDialogOpen(false);
  };
  
  // Handle confirm rejection
  const handleConfirmRejection = () => {
    if (!selectedVideo) return;
    
    const updatedVideos = videos.map(v => 
      v.id === selectedVideo.id 
        ? { ...v, status: "rejected", rejectionReason } 
        : v
    );
    
    setVideos(updatedVideos);
    setIsRejectDialogOpen(false);
    
    toast({
      title: "Video Rejected",
      description: `"${selectedVideo.title}" has been rejected.`,
    });
  };
  
  // Handle delete dialog open
  const openDeleteDialog = (video) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!selectedVideo) return;
    
    const updatedVideos = videos.filter(v => v.id !== selectedVideo.id);
    setVideos(updatedVideos);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Video Deleted",
      description: `"${selectedVideo.title}" has been deleted.`,
    });
  };
  
  return (
    <AdminLayout title="Videos Management">
      <Card>
        <CardContent className="p-6">
          {/* Search and Filter section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search videos by title, description, or creator" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={platformFilter} 
                onValueChange={setPlatformFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Videos Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No videos found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{video.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(video.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{video.creator}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <PlatformIcon platform={video.platform} />
                          <span className="capitalize">{video.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formatNumber(video.views)} views</div>
                          <div>{formatNumber(video.likes)} likes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(video.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewVideo(video)}
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
                              {video.status === 'pending' && (
                                <>
                                  <DropdownMenuItem 
                                    onClick={() => handleApproveVideo(video)}
                                    className="text-green-600"
                                  >
                                    <ThumbsUp className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => openRejectDialog(video)}
                                    className="text-red-600"
                                  >
                                    <ThumbsDown className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem 
                                onClick={() => openDeleteDialog(video)}
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
      
      {/* View Video Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedVideo && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedVideo.title}</DialogTitle>
                <DialogDescription>
                  By {selectedVideo.creator} • {new Date(selectedVideo.submittedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Platform & Category</Label>
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={selectedVideo.platform} />
                    <span className="capitalize">{selectedVideo.platform}</span>
                    <span className="mx-1">•</span>
                    <span>{selectedVideo.category}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Description</Label>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {selectedVideo.description}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Content Link</Label>
                  <a 
                    href={selectedVideo.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {selectedVideo.url}
                  </a>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Statistics</Label>
                  <div className="flex items-center gap-4 text-sm">
                    <div>{formatNumber(selectedVideo.views)} views</div>
                    <div>{formatNumber(selectedVideo.likes)} likes</div>
                  </div>
                </div>
                
                {selectedVideo.status === 'rejected' && selectedVideo.rejectionReason && (
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Rejection Reason</Label>
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm">
                      {selectedVideo.rejectionReason}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                {selectedVideo.status === 'pending' && (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => openRejectDialog(selectedVideo)}
                      className="flex-1"
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleApproveVideo(selectedVideo)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Video</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this video. This information will be shared with the creator.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason" className="mb-2 block">Rejection Reason</Label>
            <Textarea 
              id="rejection-reason"
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmRejection}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
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

export default AdminVideos;
