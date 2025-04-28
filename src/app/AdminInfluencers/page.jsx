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
  Briefcase,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { fetchAllCandidatesWithDetailsAction } from '@/actions';

const AdminCandidates = ({}) => {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await fetchAllCandidatesWithDetailsAction();
        // Add status field to candidates (example implementation)
        const candidatesWithStatus = data.map(candidate => ({
          ...candidate,
          status: candidate.status || 'active' // Default status
        }));
        setCandidates(candidatesWithStatus);
        setFilteredCandidates(candidatesWithStatus);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to fetch candidates" });
      }
    };
    
    fetchCandidates();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...candidates];
    
    // Search filter
    if (searchTerm) {
      results = results.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        return (
          candidateInfo.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          candidateInfo.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidateInfo.skills?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Skill filter
    if (skillFilter !== 'all') {
      results = results.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        return candidateInfo.skills?.includes(skillFilter);
      });
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      results = results.filter(candidate => candidate.status === statusFilter);
    }
    
    setFilteredCandidates(results);
  }, [searchTerm, skillFilter, statusFilter, candidates]);
  
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
  
  // Handle view candidate
  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setIsViewDialogOpen(true);
  };
  
  // Handle activate candidate
  const handleActivateCandidate = (candidate) => {
    const updatedCandidates = candidates.map(c => 
      c._id === candidate._id ? { ...c, status: "active" } : c
    );
    setCandidates(updatedCandidates);
    setIsViewDialogOpen(false);
    toast({ title: "Candidate Activated", description: `${candidate.name} has been activated` });
  };
  
  // Handle suspend candidate
  const handleSuspendCandidate = (candidate) => {
    const updatedCandidates = candidates.map(c => 
      c._id === candidate._id ? { ...c, status: "suspended"} : c
    );
    setCandidates(updatedCandidates);
    setIsViewDialogOpen(false);
    toast({ title: "Candidate Suspended", description: `${candidate.name} has been suspended` });
  };
  
  // Handle delete candidate
  const handleConfirmDelete = () => {
    if (!selectedCandidate) return;
    const updatedCandidates = candidates.filter(c => c._id !== selectedCandidate._id);
    setCandidates(updatedCandidates);
    setIsDeleteDialogOpen(false);
    toast({ title: "Candidate Deleted", description: `${selectedCandidate.name} has been deleted` });
  };

  // Get unique skills from all candidates
  const getUniqueSkills = () => {
    const allSkills = candidates.flatMap(c => (c.candidateInfo || c).skills || []);
    return [...new Set(allSkills)].slice(0, 10); // Limit to top 10 skills
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
                placeholder="Search by name, email, or skills" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {getUniqueSkills().map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Candidates Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No candidates found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const candidateInfo = candidate.candidateInfo || candidate;
                    return (
                      <TableRow key={candidate._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={candidateInfo.image} />
                              <AvatarFallback>{candidateInfo.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidateInfo.name}</div>
                              <div className="text-xs text-muted-foreground">{candidateInfo.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {/* {Array.isArray(candidateInfo.skills) && candidateInfo.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline">{skill}</Badge>
                            ))} */}
                            {candidateInfo?.preferedJobLocation}
                          </div>
                        </TableCell>
                        <TableCell>{candidateInfo.totalExperience}</TableCell>
                        <TableCell>{candidateInfo.currentCompany}</TableCell>
                        <TableCell>{candidateInfo.currentJobLocation}</TableCell>
                        <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewCandidate(candidate)}
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
                                {candidate.status !== 'active' && (
                                  <DropdownMenuItem 
                                    onClick={() => handleActivateCandidate(candidate)}
                                    className="text-green-600"
                                  >
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Activate
                                  </DropdownMenuItem>
                                  )
                                }
                                {candidate.status !== 'suspended' && (
                                  <DropdownMenuItem 
                                    onClick={() => handleSuspendCandidate(candidate)}
                                    className="text-amber-600"
                                  >
                                    <UserX className="h-4 w-4 mr-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setIsDeleteDialogOpen(true);
                                  }}
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
                    )
})
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Candidate Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedCandidate && (() => {
            const candidateInfo = selectedCandidate.candidateInfo || selectedCandidate;
            return (
              <div>
                <DialogHeader>
                  <DialogTitle>Candidate Profile</DialogTitle>
                  <DialogDescription>
                    {candidateInfo.currentJobLocation}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidateInfo.image} />
                      <AvatarFallback>{candidateInfo.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{candidateInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidateInfo.email}</p>
                      <p className="text-sm">{candidateInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Experience</Label>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{candidateInfo.totalExperience}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Education</Label>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{candidateInfo.education || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {candidateInfo.skills?.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Current Salary</Label>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${candidateInfo.currentSalary}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Status</Label>
                      <div>{getStatusBadge(selectedCandidate.status)}</div>
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  {selectedCandidate.status !== 'active' && (
                    <Button 
                      onClick={() => handleActivateCandidate(selectedCandidate)}
                      className="bg-green-500 hover:bg-green-600 sm:flex-1"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                  )}
                  
                  {selectedCandidate.status !== 'suspended' && (
                    <Button 
                      variant="outline"
                      onClick={() => handleSuspendCandidate(selectedCandidate)}
                      className="sm:flex-1"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  )}
                  
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setSelectedCandidate(selectedCandidate);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="sm:flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </DialogFooter>
              </div>
            )}
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this candidate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCandidates;