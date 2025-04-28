"use client";

import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { formatOrderDetails, getAvailableOrders } from "@/utils";
import { ChevronRight, BarChart2, Star, TrendingUp, Users, Award, Instagram, Youtube, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";



export default function JobsPage({ searchParams, status }) {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      // Simulate loading data
      const loadData = () => {
        const availableOrders = getAvailableOrders();
        setOrders(availableOrders.map(order => formatOrderDetails(order)));
        setLoading(false);
      };
  
      // Add a small delay to simulate API call
      const timer = setTimeout(loadData, 500);
      return () => clearTimeout(timer);
    }, []);
  
    const stats = [
      { 
        title: "Total Earnings", 
        value: "₹500", 
        change: "+22%", 
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" /> 
      },
      { 
        title: "Jobs Completed", 
        value: "2", 
        change: "+1", 
        icon: <Award className="h-5 w-5 text-purple-500" /> 
      },
      { 
        title: "Current Grade", 
        value: "Grade 8", 
        change: "", 
        icon: <Star className="h-5 w-5 text-amber-500" /> 
      },
      { 
        title: "Campaigns", 
        value: "11", 
        change: "+1", 
        icon: <BarChart2 className="h-5 w-5 text-blue-500" /> 
      },
    ];
  
    const platforms = [
      {
        name: "Instagram",
        influencers: 9,
        icon: <Instagram className="h-5 w-5 text-text-white" />,
        color: "from-pink-500 to-purple-500",
        link: "/instagramInfluencers"
      },
      {
        name: "YouTube",
        influencers: 5,
        icon: <Youtube className="h-5 w-5 text-white" />,
        color: "from-red-500 to-orange-500",
        link: "/YoutubeInfluencers"
      }
    ];

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

  return (
    <div className="py-20 bg-black ">

      <div className="px-[66px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Dashboard</h1>
                  <p className="text-muted-foreground mt-1">Welcome back to your influencer dashboard</p>
                </div>
                
                <div className="flex gap-3">
                   <Link href="/grading">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                    Grade System
                  </Button></Link>
                  {/* <Button variant="outline" className="border-border bg-background/30 hover:bg-secondary/70 text-foreground">
                    View Analytics
                  </Button> */}
                   <Dialog >
                   <DialogTrigger>
                   <Button variant="outline" className="border-border bg-background/30 hover:bg-secondary/70 text-foreground">
                    Basic instructions
                  </Button>
                   </DialogTrigger>

                          <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>
                                instructions
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                You are about to claim a job for "job". You will have 48 hours to submit your reel.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="flex flex-col gap-4 py-4">
                              {/* {compensation && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-300">Compensation:</span>
                                  <span className="font-semibold text-green-400">$</span>
                                </div>
                              )} */}
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-300">Deadline after claiming:</span>
                                <span className="text-gray-200">48 hours</span>
                              </div>
                            </div>
                            
                            <DialogFooter className="sm:justify-between gap-2">
                            <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
                              <Button
                                type="button"
                             
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0"
                              >
                                {/* {isLoading ? ( */}

                                  <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Got It
                                  </span>
                                {/* ) : "Got It"} */}
                              </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                       
                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><TrendingUp className="h-5 w-5 text-emerald-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold flex justify-center items-center gap-1"><IndianRupee/>0</div>
                               
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Jobs Completed</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><Award className="h-5 w-5 text-purple-500" /> </div>
                            </CardHeader>
                            <CardContent>
                            <div className="flex items-baseline gap-2">
  <div className="text-2xl font-bold">
    {jobList && jobList.profileInfo && jobList.profileInfo.status
      ? jobList.profileInfo.status.length
      : "0"}
  </div>
</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Current Grade</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><Star className="h-5 w-5 text-amber-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">Grade 8</div>
                               
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Campaigns</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><BarChart2 className="h-5 w-5 text-blue-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">{jobList?.length}</div>
                               
                              </div>
                            </CardContent>
                          </Card>
                          
                       
                      </div>

                       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {jobList.map((stat, index) => (
                          <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md">{stat.icon}</div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">{stat.experience}</div>
                                {stat.change && (
                                  <p className="text-xs font-medium text-emerald-400">{stat.change}</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div> */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {platforms.map((platform, index) => (
                                  <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color}`}></div>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-md bg-gradient-to-br ${platform.color}`}>
                                          {platform.icon}
                                        </div>
                                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                                      </div>
                                      <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                                        <Link href={platform.link}>
                                          <span>View All</span>
                                          <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                      </Button>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-muted-foreground mb-1">Available Influencers</p>
                                          <div className="flex items-baseline gap-2">
                                            <p className="text-2xl font-bold">{platform.influencers.toLocaleString()}</p>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                          </div>
                                        </div>
                                        <Button asChild className={`bg-gradient-to-r ${platform.color} border-0 text-white`}>
                                          <Link href={platform.link}>Browse</Link>
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              </div>
      
      <JobListing
        user={user}
        profileInfo={profileInfo}
        jobList={jobList}
        jobApplications={jobApplications}
        filterCategories={filterCategories}
      />
     
    </div>
  );
}