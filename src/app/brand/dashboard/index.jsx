"use client";

import Layout from '../Layout';
// import ActiveCampaigns from './ActiveCampaigns';
import RecentActivity from './RecentActivity';
import Link from 'next/link';
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
import { useEffect, useState } from "react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = ({ searchParams, jobItem }) => {
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

      const incrementReels = () => {
        setJobList(prevJobList => ({
          ...prevJobList,
          location: prevJobList.location + 1
        }));
      };
    

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">Dashboard</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Welcome back to your influencer marketing platform
          </p>
        </div>
        
        <Link
          href="/create"
          className="animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <Button variant="default">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Create New Order
          </Button>
        </Link>
      </div>
      
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="card-glow animate-fade-in">
        <CardHeader className="pb-2">
          <CardDescription>Total campaigns</CardDescription>
          <CardTitle className="text-3xl font-normal">{jobList.length} 
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{jobList.length} active campaigns</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
              +27% this month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-glow animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-2">
          <CardDescription>Total Reels</CardDescription>
          <CardTitle className="text-3xl font-normal">{jobList.location || "0"}</CardTitle>
        </CardHeader>
       
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground"></span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              0% this month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="pb-2">
          <CardDescription>Budget Spent</CardDescription>
          <CardTitle className="text-3xl font-normal">${jobList.experience || "0"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">$8,240 available</span>
            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">
              75% of total
            </span>
          </div>
        </CardContent>
      </Card>
    </div>      
      <div className="grid grid-cols-1 md:flex md:w-full md:gap-6 ">
                <ScrollArea className="md:h-[390px] flex mt-6 border rounded-lg p-4 w-fit">
  <div className="flex items-center justify-between">
    <h1 className='font-bold'>Active Campaigns</h1>
    <Link href="/campaigns">
    <Button variant="ghost" className="invisible" size="sm"></Button>
    </Link>
  </div>
  <h1 className='font-medium text-neutral-500 mb-3'>Monitor your ongoing campaigns</h1>
  
  {jobList.length > 0 ? (
    <JobListing
      user={user}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={jobApplications}
      filterCategories={filterCategories}
    />
  ) : (
    <div className="flex flex-col items-center w-[750px] justify-center h-64 text-center">
      <div className="text-gray-400 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-500">No campaigns available</h3>
      <p className="text-sm text-gray-400 mt-1">Create your first campaign to get started</p>
      <JobListing
      user={user}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={jobApplications}
      filterCategories={filterCategories}
    />
      <Link href="/create">
      <Button className="mt-4" size="sm">
        Create Campaign
      </Button>
      </Link>
    </div>
  )}
</ScrollArea>
       <RecentActivity />
        {/* <ActiveCampaigns />  */}
      </div>
    </Layout>
  );
};

export default Index;
