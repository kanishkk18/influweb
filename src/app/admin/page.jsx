"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  BarChart3, 
  Users, 
  Video, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Eye,
  MessageSquare
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { generateMockVideos } from '../../utils/mockData';
import { generateMockInfluencers, generateMockJobs, generateMockCampaigns, generateAdminStats } from '../../utils/adminMockData';
import Link from 'next/link';


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data and set stats
    const videos = generateMockVideos();
    const influencers = generateMockInfluencers();
    const jobs = generateMockJobs();
    const campaigns = generateMockCampaigns();
    
    const dashboardStats = generateAdminStats(videos, influencers, jobs, campaigns);
    setStats(dashboardStats);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-white/5 rounded-xl backdrop-blur-md"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-[500px] bg-white/5 rounded-xl backdrop-blur-md"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) return null;

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        {/* Influencers Stat */}
        <Card className="overflow-hidden border-0 card-glow neo-blur bg-gradient-to-br from-blue-950/40 to-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300">
          <CardHeader className="pb-2 border-b border-white/10">
            <CardTitle className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Influencers
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gradient">{stats.totalInfluencers}</div>
                <div className="flex items-center text-sm text-blue-400 mt-1">
                  <span className="mr-2">{stats.activeInfluencers} active</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 shadow-inner">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos Stat */}
        <Card className="overflow-hidden border-0 card-glow neo-blur bg-gradient-to-br from-purple-950/40 to-purple-900/20 hover:shadow-purple-500/30 transition-all duration-300">
          <CardHeader className="pb-2 border-b border-white/10">
            <CardTitle className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gradient">{stats.totalVideos}</div>
                <div className="flex items-center text-sm text-purple-400 mt-1">
                  <span className="mr-2">{stats.pendingVideos} pending</span>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 shadow-inner">
                <Video className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Stat */}
        {/* <Card className="overflow-hidden border-0 card-glow neo-blur bg-gradient-to-br from-amber-950/40 to-amber-900/20 hover:shadow-amber-500/30 transition-all duration-300">
          <CardHeader className="pb-2 border-b border-white/10">
            <CardTitle className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
              Jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gradient">{stats.totalJobs}</div>
                <div className="flex items-center text-sm text-amber-400 mt-1">
                  <span className="mr-2">{stats.openJobs} open positions</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-600/20 to-amber-800/20 border border-amber-500/30 shadow-inner">
                <Briefcase className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Campaigns Stat */}
        <Card className="overflow-hidden border-0 card-glow neo-blur bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 hover:shadow-emerald-500/30 transition-all duration-300">
          <CardHeader className="pb-2 border-b border-white/10">
            <CardTitle className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gradient">{stats.totalCampaigns}</div>
                <div className="flex items-center text-sm text-emerald-400 mt-1">
                  <span className="mr-2">{stats.activeCampaigns} active campaigns</span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 shadow-inner">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Videos */}
        <Card className="overflow-hidden border-0 neo-blur bg-white/5 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
          <CardHeader className="border-b border-white/10 bg-black/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gradient">Recent Videos</CardTitle>
                <CardDescription className="text-gray-400">Latest content submissions</CardDescription>
              </div>
              <Link href="/AdminVideos" className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10 text-white">
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/10">
              {stats.recentVideos.map((video) => (
                <div key={video.id} className="flex items-start space-x-4 p-4 hover:bg-white/5 transition-colors duration-200">
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden relative group">
                    {/* Video thumbnail with play hover effect */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{video.title}</p>
                    <p className="text-xs text-gray-400">By {video.creator}</p>
                    <div className="mt-2 flex items-center">
                      {video.status === 'approved' && (
                        <div className="flex items-center text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approved
                        </div>
                      )}
                      {video.status === 'pending' && (
                        <div className="flex items-center text-xs text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </div>
                      )}
                      {video.status === 'rejected' && (
                        <div className="flex items-center text-xs text-red-400 bg-red-950/50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(video.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Influencers */}
        <Card className="overflow-hidden border-0 neo-blur bg-white/5 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
          <CardHeader className="border-b border-white/10 bg-black/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gradient">Popular Influencers</CardTitle>
                <CardDescription className="text-gray-400">Top performing content creators</CardDescription>
              </div>
              <Link href="/AdminInfluencers" className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10 text-white">
                <Users className="h-3 w-3 mr-1" />
                View All
              </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/10">
              {stats.popularInfluencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center space-x-4 p-4 hover:bg-white/5 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10">
                    <img 
                      src={influencer.profilePicture} 
                      alt={influencer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{influencer.name}</p>
                    <p className="text-xs text-blue-400">@{influencer.username}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="font-medium text-white">{Math.floor(influencer.followers / 1000)}K</span>
                      <span className="text-gray-400 ml-1">followers</span>
                      <span className="mx-1.5 text-gray-600">•</span>
                      <span className="text-gray-400">{influencer.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="px-2 py-1 bg-blue-900/30 rounded-md border border-blue-500/30">
                      <span className="text-sm font-medium text-blue-300">{influencer.engagement.toFixed(1)}%</span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
