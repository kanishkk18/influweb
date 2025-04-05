
// Generate mock influencers
export const generateMockInfluencers = (count = 20) => {
  const categories = ["Beauty", "Fashion", "Fitness", "Food", "Travel", "Technology", "Lifestyle"];
  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter"];
  const statuses = ["active", "pending", "suspended"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Influencer ${i + 1}`,
    username: `influencer_${i + 1}`,
    email: `influencer${i + 1}@example.com`,
    profilePicture: `https://api.dicebear.com/7.x/personas/svg?seed=influencer${i + 1}`,
    followers: Math.floor(Math.random() * 1000000) + 1000,
    engagement: Math.random() * 8 + 2, // 2% to 10%
    category: categories[Math.floor(Math.random() * categories.length)],
    platforms: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => platforms[Math.floor(Math.random() * platforms.length)]
    ).filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinedAt: new Date(
      Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random date within last 90 days
  }));
};

// Generate mock jobs
export const generateMockJobs = (count = 15) => {
  const categories = ["Beauty", "Fashion", "Fitness", "Food", "Travel", "Technology", "Lifestyle"];
  const platforms = ["Instagram", "YouTube", "TikTok"];
  const statuses = ["open", "in-progress", "completed", "cancelled"];
  const brands = ["Skyline", "UrbanEdge", "NatureBlend", "TechWave", "FreshStart", "GlowUp", "ActiveLife"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${brands[Math.floor(Math.random() * brands.length)]} ${categories[Math.floor(Math.random() * categories.length)]} Campaign`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    budget: Math.floor(Math.random() * 10000) + 500,
    category: categories[Math.floor(Math.random() * categories.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    description: `This is a job for creating content related to ${categories[Math.floor(Math.random() * categories.length)]} products.`,
    applications: Math.floor(Math.random() * 50),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random date within last 30 days
    deadline: new Date(
      Date.now() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random date within next 30 days
  }));
};

// Generate mock campaigns
export const generateMockCampaigns = (count = 10) => {
  const statuses = ["draft", "active", "completed", "cancelled"];
  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter"];
  const brands = ["Skyline", "UrbanEdge", "NatureBlend", "TechWave", "FreshStart", "GlowUp", "ActiveLife"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Campaign ${i + 1}`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    budget: Math.floor(Math.random() * 50000) + 5000,
    startDate: new Date(
      Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random date within last 60 days
    endDate: new Date(
      Date.now() + Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random date within next 90 days
    status: statuses[Math.floor(Math.random() * statuses.length)],
    platforms: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => platforms[Math.floor(Math.random() * platforms.length)]
    ).filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
    influencersCount: Math.floor(Math.random() * 20) + 1,
    videosCount: Math.floor(Math.random() * 50) + 5,
    performance: {
      views: Math.floor(Math.random() * 1000000) + 10000,
      engagements: Math.floor(Math.random() * 100000) + 1000,
      conversions: Math.floor(Math.random() * 5000) + 100,
    },
  }));
};

// Generate admin dashboard stats
export const generateAdminStats = (
  videos, 
  influencers, 
  jobs, 
  campaigns,
) => {
  return {
    totalInfluencers: influencers.length,
    activeInfluencers: influencers.filter(inf => inf.status === "active").length,
    totalVideos: videos.length,
    pendingVideos: videos.filter(video => video.status === "pending").length,
    totalJobs: jobs.length,
    openJobs: jobs.filter(job => job.status === "open").length,
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(camp => camp.status === "active").length,
    recentVideos: videos.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    ).slice(0, 5),
    popularInfluencers: influencers.sort((a, b) => b.followers - a.followers).slice(0, 5),
  };
};
