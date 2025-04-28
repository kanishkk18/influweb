"use client";

import { useState } from 'react';
import Layout from '../brand/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";
import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { useUser } from "@clerk/nextjs";
import { useEffect} from "react";
import JobApplicants from "@/components/job-applicants";



const MyOrders = ({ searchParams , jobItem}) => {
  const Router = useRouter();
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
    const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
    const [
      showCurrentCandidateDetailsModal,
      setShowCurrentCandidateDetailsModal,
    ] = useState(false);
  


  // State for managing dialogs
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    campaignName: "",
    experience: "",
    location: "",
    description: ""
  });
   const { user } = useUser();
    const [profileInfo, setProfileInfo] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [jobApplications, setJobApplications] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        if (user?.id) {
          const profile = await fetchProfileAction(user.id);
          setProfileInfo(profile);
  
          if (profile?.role === "candidate") {
            setJobList(await fetchJobsForCandidateAction(searchParams));
            setJobApplications(await fetchJobApplicationsForCandidate(user.id));
          } else {
            setJobList(await fetchJobsForRecruiterAction(user.id));
            setJobApplications(await fetchJobApplicationsForRecruiter(user.id));
          }
  
          setFilterCategories(await createFilterCategoryAction());
        }
      }
      fetchData();
    }, [user, searchParams]);
  

  // Handle viewing order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  // Handle opening edit dialog
  const handleEditOpen = (order) => {
    setSelectedOrder(order);
    setEditFormData({
      campaignName: order.campaignName,
      budget: order.budget.replace("$", ""),
      status: order.status,
      description: order.description || ""
    });
    setIsEditOpen(true);
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status change in dropdown
  const handleStatusChange = (value) => {
    setEditFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  // Handle saving edit changes
  const handleSaveChanges = () => {
    const updatedOrders = jobList.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          companyName: editFormData.companyName,
          budget: `$${editFormData.budget}`,
          status: editFormData.status,
          description: editFormData.description
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setIsEditOpen(false);
    
    toast({
      title: "Campaign updated",
      description: "Your campaign has been successfully updated."
    });
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
    setOrders(updatedOrders);
    setIsDeleteOpen(false);
    
    toast({
      title: "Campaign deleted",
      description: "Your campaign has been successfully deleted."
    });
  };

  // Handle opening delete dialog
  const handleDeleteOpen = (order) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  return (
    <Layout>
        
      <div className="mb-6 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">My Orders</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Manage and track all your influencer marketing campaigns
          </p>
        </div>
        
        <Button 
          onClick={() => Router.push('/create')}
          className="animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Create New Order
        </Button>
      </div>

     
      
      <div className="space-y-6">
  {jobList.map(order => (
    <Card 
      key={order.id} 
      className="animate-fade-in shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <CardHeader className="pb-2 px-6 pt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 uppercase rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {order.title[0]}
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                {order.title}
              </CardTitle>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Brand: {order.companyName}
                 {/* • Created: {order.date} */}
              </div>
            </div>
          </div>
          <Badge 
            className={`px-3 py-1 text-sm font-medium capitalize ${
              order.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200" :
              order.status === "Completed" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200" :
              "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
            }`}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 justify-center dark:text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Budget
            </div>
            <div className="font-semibold text-center text-gray-900 dark:text-white text-lg">
              {order.experience}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 justify-center dark:text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Influencers
            </div>
            <div className="font-semibold text-center text-gray-900 dark:text-white text-lg">
            { jobApplications.filter((item) => item.jobID === order?._id).length}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 text-center justify-center dark:text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Reels
            </div>
            <div className="font-semibold text-center text-gray-900 dark:text-white text-lg">
              {order.location}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-center justify-center text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Category
            </div>
            <div className="font-semibold text-center text-gray-900 dark:text-white text-lg">
              {order.skills}
            </div>
          </div>
        </div>
        
        {order.description && (
          <div className="mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</div>
            <p className="text-gray-600 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700/30 p-3 rounded-md line-clamp-2">
              {order.description}
            </p>
          </div>
        )}
        
        <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
        
        <div className="flex justify-end gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => handleViewDetails(order)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Button>
          {/* <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => handleEditOpen(order)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a多元 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button> */}
          {/* <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 hover:text-red-700 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20 transition-colors duration-200"
            onClick={() => handleDeleteOpen(order)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
            </svg>
            Delete
          </Button> */}
          <Button 
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200"
            onClick={() => setShowApplicantsDrawer(true)}
            disabled={
              jobApplications.filter((item) => item.jobID === order?._id)
                .length === 0
            }>
            {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> */}
            {
                        jobApplications.filter((item) => item.jobID === order?._id)
                          .length
                      } {" "} Manage Applicants
          </Button>
        </div>
      </CardContent>
       <JobApplicants
          showApplicantsDrawer={showApplicantsDrawer}
          setShowApplicantsDrawer={setShowApplicantsDrawer}
          showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
          setShowCurrentCandidateDetailsModal={
            setShowCurrentCandidateDetailsModal
          }
          currentCandidateDetails={currentCandidateDetails}
          setCurrentCandidateDetails={setCurrentCandidateDetails}
          jobItem={jobItem}
          jobApplications={jobApplications.filter(
            (jobApplicantItem) => jobApplicantItem.jobID === order?._id
          )}
        />
    </Card>
  ))}

  
</div>

      {/* View Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Campaign Details</DialogTitle>
      <DialogDescription>
        Detailed information about your campaign.
      </DialogDescription>
    </DialogHeader>

    {selectedOrder && (
      <div className="space-y-4 py-4">

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Campaign ID:</Label>
          <div className="col-span-3">{selectedOrder?._id || selectedOrder?.id}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Brand:</Label>
          <div className="col-span-3">{selectedOrder?.companyName || N/A}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Campaign Name:</Label>
          <div className="col-span-3">{selectedOrder.title}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Campaign Type:</Label>
          <div className="col-span-3">{selectedOrder?.type || "N/A"}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Budget:</Label>
          <div className="col-span-3">{selectedOrder.experience}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Status:</Label>
          <div className="col-span-3">
            <Badge
              className={
                selectedOrder?.status === "Active"
                  ? "bg-green-500"
                  : selectedOrder?.status === "Completed"
                  ? "bg-blue-500"
                  : "bg-amber-500"
              }
            >
              {selectedOrder?.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Total Influencers:</Label>
          <div className="col-span-3">
            {jobApplications.filter((item) => item.jobID === selectedOrder?._id).length}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Reels Required:</Label>
          <div className="col-span-3">{selectedOrder.location}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Total Views:</Label>
          <div className="col-span-3">{selectedOrder?.skills || "N/A"}</div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right align-top">Description:</Label>
          <div className="col-span-3">{selectedOrder.description || "No description available"}</div>
        </div>
      </div>
    )}

    <DialogFooter>
      <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Make changes to your campaign here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                name="campaignName"
                value={editFormData.campaignName}
                onChange={handleEditChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                name="budget"
                value={editFormData.budget}
                onChange={handleEditChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editFormData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign 
              "{selectedOrder?.campaignName}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default MyOrders;