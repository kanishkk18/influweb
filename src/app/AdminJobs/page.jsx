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
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Calendar
} from 'lucide-react';
import { generateMockJobs } from '@/utils/adminMockData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminJobs = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    // Fetch jobs data
    const fetchedJobs = generateMockJobs();
    setJobs(fetchedJobs);
    setFilteredJobs(fetchedJobs);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...jobs];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(job => job.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(job => job.status === statusFilter);
    }
    
    setFilteredJobs(results);
  }, [searchTerm, categoryFilter, statusFilter, jobs]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  // Handle view job
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };
  
  // Handle mark as completed
  const handleMarkAsCompleted = (job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, status: "completed"} : j
    );
    
    setJobs(updatedJobs);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Job Marked as Completed",
      description: `"${job.title}" has been marked as completed.`,
    });
  };
  
  // Handle cancel job
  const handleCancelJob = (job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, status: "cancelled"} : j
    );
    
    setJobs(updatedJobs);
    setIsViewDialogOpen(false);
    
    toast({
      title: "Job Cancelled",
      description: `"${job.title}" has been cancelled.`,
    });
  };
  
  // Handle delete dialog open
  const openDeleteDialog = (job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!selectedJob) return;
    
    const updatedJobs = jobs.filter(j => j.id !== selectedJob.id);
    setJobs(updatedJobs);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Job Deleted",
      description: `"${selectedJob.title}" has been deleted.`,
    });
  };
  
  return (
    <AdminLayout title="Jobs Management">
      <Card>
        <CardContent className="p-6">
          {/* Search and Filter section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by title, description, or brand" 
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
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Jobs Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No jobs found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{job.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {job.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{job.brand}</TableCell>
                      <TableCell>{formatCurrency(job.budget)}</TableCell>
                      <TableCell className="capitalize">{job.platform}</TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>
                        {getStatusBadge(job.status)}
                      </TableCell>
                      <TableCell>
                        {new Date(job.deadline).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewJob(job)}
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
                              {(job.status === 'open' || job.status === 'in-progress') && (
                                <DropdownMenuItem 
                                  onClick={() => handleMarkAsCompleted(job)}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {(job.status === 'open' || job.status === 'in-progress') && (
                                <DropdownMenuItem 
                                  onClick={() => handleCancelJob(job)}
                                  className="text-amber-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Job
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => openDeleteDialog(job)}
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
      
      {/* View Job Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>
                  Posted on {new Date(selectedJob.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Brand</Label>
                    <div className="text-sm font-medium">{selectedJob.brand}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Status</Label>
                    <div>{getStatusBadge(selectedJob.status)}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Budget</Label>
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatCurrency(selectedJob.budget)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Platform</Label>
                    <div className="text-sm capitalize">{selectedJob.platform}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Category</Label>
                    <div className="text-sm">{selectedJob.category}</div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Description</Label>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {selectedJob.description}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Applications</Label>
                    <div className="text-sm font-medium">{selectedJob.applications} applications</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Deadline</Label>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(selectedJob.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {(selectedJob.status === 'open' || selectedJob.status === 'in-progress') && (
                  <>
                    <Button 
                      onClick={() => handleMarkAsCompleted(selectedJob)}
                      className="bg-green-500 hover:bg-green-600 sm:flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleCancelJob(selectedJob)}
                      className="sm:flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Job
                    </Button>
                  </>
                )}
                
                <Button 
                  variant="destructive"
                  onClick={() => openDeleteDialog(selectedJob)}
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
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
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

export default AdminJobs;
