
  // Helper to get random date within last X days
  const getRandomDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    return date.toISOString();
  };
  // Helper to get date X days from now
  const getDateInFuture = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };
  // Mock clients
  export const mockClients = [
    {
      id: "client1",
      name: "Eco Essentials",
      email: "contact@ecosentials.com",
      role: "client",
      company: "Eco Essentials",
      industry: "Sustainable Products",
      websiteUrl: "https://ecosentials.com",
      logo: "/placeholder.svg",
      createdAt: getRandomDate(100)
    },
    {
      id: "client2",
      name: "Tech Innovations",
      email: "marketing@techinnovations.com",
      role: "client",
      company: "Tech Innovations",
      industry: "Technology",
      websiteUrl: "https://techinnovations.com",
      logo: "/placeholder.svg",
      createdAt: getRandomDate(100)
    },
    {
      id: "client3",
      name: "Fitness Revolution",
      email: "partnerships@fitnessrevolution.com",
      role: "client",
      company: "Fitness Revolution",
      industry: "Health & Fitness",
      websiteUrl: "https://fitnessrevolution.com",
      logo: "/placeholder.svg",
      createdAt: getRandomDate(100)
    }
  ];
  // Mock influencers
  export const mockInfluencers = [
    {
      id: "influencer1",
      name: "Alex Johnson",
      email: "alex@influencer.com",
      role: "influencer",
      followers: 15000,
      engagementRate: 7.2,
      averageLikes: 3000,
      averageViews: 8000,
      contentQuality: 8,
      grade: 2,
      completionRate: 98,
      bio: "Lifestyle and fitness content creator passionate about wellness.",
      instagramHandle: "@alexjfitness",
      location: "Los Angeles, CA",
      avatar: "/placeholder.svg",
      createdAt: getRandomDate(200)
    },
    {
      id: "influencer2",
      name: "Sarah Williams",
      email: "sarah@influencer.com",
      role: "influencer",
      followers: 89000,
      engagementRate: 5.1,
      averageLikes: 15000,
      averageViews: 37000,
      contentQuality: 9,
      grade: 3,
      completionRate: 95,
      bio: "Travel enthusiast sharing adventures and travel tips.",
      instagramHandle: "@sarahwanderlust",
      location: "New York, NY",
      avatar: "/placeholder.svg",
      createdAt: getRandomDate(180)
    },
    {
      id: "influencer3",
      name: "Mark Davis",
      email: "mark@influencer.com",
      role: "influencer",
      followers: 320000,
      engagementRate: 3.8,
      averageLikes: 45000,
      averageViews: 90000,
      contentQuality: 9.5,
      grade: 5,
      completionRate: 92,
      bio: "Tech reviewer and gadget enthusiast. Always exploring the latest innovations.",
      instagramHandle: "@markstechworld",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg",
      createdAt: getRandomDate(150)
    },
    {
      id: "influencer4",
      name: "Emma Chen",
      email: "emma@influencer.com",
      role: "influencer",
      followers: 1200000,
      engagementRate: 2.5,
      averageLikes: 150000,
      averageViews: 300000,
      contentQuality: 9.8,
      grade: 7,
      completionRate: 97,
      bio: "Fashion and beauty content creator. Sharing style tips and makeup tutorials.",
      instagramHandle: "@emmastyle",
      location: "Miami, FL",
      avatar: "/placeholder.svg",
      createdAt: getRandomDate(130)
    }
  ];
  // Mock orders
  export const mockOrders = [
    {
      id: "order1",
      title: "Eco-Friendly Product Demo",
      description: "Create engaging content showcasing our sustainable household products. Highlight the eco-friendly benefits and practical everyday use.",
      clientId: "client1",
      totalReels: 50,
      remainingReels: 32,
      minGrade: 1,
      maxGrade: 4,
      compensation: 250,
      requirements: [
        "15-30 second reel",
        "Showcase product in use",
        "Mention key sustainability features",
        "Include brand hashtags in caption"
      ],
      deadline: getDateInFuture(21),
      status: "open",
      createdAt: getRandomDate(10)
    },
    {
      id: "order2",
      title: "Tech Gadget Unboxing",
      description: "Unbox and share first impressions of our new smart home device. Focus on ease of setup and key features that make it stand out.",
      clientId: "client2",
      totalReels: 30,
      remainingReels: 20,
      minGrade: 3,
      maxGrade: 7,
      compensation: 500,
      requirements: [
        "30-60 second reel",
        "Unboxing experience",
        "Setup demonstration",
        "Highlight 3 main features",
        "Include provided link in bio"
      ],
      deadline: getDateInFuture(14),
      status: "open",
      createdAt: getRandomDate(7)
    },
    {
      id: "order3",
      title: "Morning Fitness Routine",
      description: "Share a quick morning workout incorporating our fitness products. Emphasize how our products help make fitness more accessible and effective.",
      clientId: "client3",
      totalReels: 40,
      remainingReels: 25,
      minGrade: 2,
      maxGrade: 6,
      compensation: 350,
      requirements: [
        "45-60 second reel",
        "Show 3-5 exercises",
        "Feature product prominently",
        "Include voiceover explaining benefits",
        "Add our branded music (provided)"
      ],
      deadline: getDateInFuture(30),
      status: "open",
      createdAt: getRandomDate(5)
    },
    {
      id: "order4",
      title: "Premium Phone Case Review",
      description: "Show off our luxury phone cases. Highlight durability, premium materials, and style options.",
      clientId: "client2",
      totalReels: 25,
      remainingReels: 25,
      minGrade: 4,
      maxGrade: 8,
      compensation: 600,
      requirements: [
        "20-40 second reel",
        "Drop test demonstration",
        "Show at least 2 case designs",
        "Mention premium materials",
        "Tag our account and use campaign hashtag"
      ],
      deadline: getDateInFuture(24),
      status: "open",
      createdAt: getRandomDate(3)
    },
    {
      id: "order5",
      title: "Plant-Based Recipe Creation",
      description: "Create a quick and easy recipe using our plant-based ingredients. Show how delicious and simple plant-based cooking can be.",
      clientId: "client1",
      totalReels: 35,
      remainingReels: 28,
      minGrade: 1,
      maxGrade: 5,
      compensation: 300,
      requirements: [
        "60 second recipe reel",
        "Show ingredients clearly",
        "Demonstrate simple preparation",
        "Taste test at the end",
        "Share one health benefit"
      ],
      deadline: getDateInFuture(18),
      status: "open",
      createdAt: getRandomDate(4)
    }
  ];
  // Mock reel jobs
  export const mockReelJobs = [
    {
      id: "job1",
      orderId: "order1",
      influencerId: "influencer1",
      status: "admin-approved",
      reelLink: "https://instagram.com/p/example1",
      claimedAt: getRandomDate(5),
      submissionDeadline: getDateInFuture(2),
      submittedAt: getRandomDate(3),
      adminReviewedAt: getRandomDate(2),
      compensationAmount: 250,
      isPaid: false
    },
    {
      id: "job2",
      orderId: "order2",
      influencerId: "influencer2",
      status: "submitted",
      reelLink: "https://instagram.com/p/example2",
      claimedAt: getRandomDate(4),
      submissionDeadline: getDateInFuture(1),
      submittedAt: getRandomDate(1),
      compensationAmount: 500,
      isPaid: false
    },
    {
      id: "job3",
      orderId: "order3",
      influencerId: "influencer1",
      status: "pending-submission",
      claimedAt: getRandomDate(1),
      submissionDeadline: getDateInFuture(1),
      compensationAmount: 350,
      isPaid: false
    }
  ];
  // Mock grade table
  export const gradeTable = [
    {
      grade: 1,
      name: "Nano Influencer",
      followers: "1K - 10K",
      engagementRate: "5% - 10%",
      averageLikes: "500 - 2K",
      averageViews: "1K - 5K",
      description: "Small but highly engaged audience, ideal for niche campaigns."
    },
    {
      grade: 2,
      name: "Micro Influencer",
      followers: "10K - 50K",
      engagementRate: "4% - 8%",
      averageLikes: "2K - 10K",
      averageViews: "5K - 20K",
      description: "Strong local or niche influence, cost-effective for small brands."
    },
    {
      grade: 3,
      name: "Rising Star",
      followers: "50K - 100K",
      engagementRate: "3.5% - 7%",
      averageLikes: "10K - 20K",
      averageViews: "20K - 50K",
      description: "Growing audience with high potential, suitable for emerging brands."
    },
    {
      grade: 4,
      name: "Mid-Tier Influencer",
      followers: "100K - 250K",
      engagementRate: "3% - 6%",
      averageLikes: "20K - 50K",
      averageViews: "50K - 100K",
      description: "Established influence, ideal for mid-sized campaigns."
    },
    {
      grade: 5,
      name: "Macro Influencer",
      followers: "250K - 500K",
      engagementRate: "2.5% - 5%",
      averageLikes: "50K - 100K",
      averageViews: "100K - 250K",
      description: "Large audience, suitable for broader campaigns."
    },
    {
      grade: 6,
      name: "Mega Influencer",
      followers: "500K - 1M",
      engagementRate: "2% - 4.5%",
      averageLikes: "100K - 200K",
      averageViews: "250K - 500K",
      description: "High reach, ideal for national or regional campaigns."
    },
    {
      grade: 7,
      name: "Celebrity Lite",
      followers: "1M - 2M",
      engagementRate: "1.5% - 4%",
      averageLikes: "200K - 500K",
      averageViews: "500K - 1M",
      description: "Near-celebrity status, suitable for large-scale campaigns."
    },
    {
      grade: 8,
      name: "Celebrity",
      followers: "2M - 5M",
      engagementRate: "1% - 3.5%",
      averageLikes: "500K - 1M",
      averageViews: "1M - 2M",
      description: "Celebrity-level influence, ideal for high-budget campaigns."
    },
    {
      grade: 9,
      name: "Superstar",
      followers: "5M - 10M",
      engagementRate: "0.8% - 3%",
      averageLikes: "1M - 2M",
      averageViews: "2M - 5M",
      description: "Massive reach, suitable for global or high-impact campaigns."
    },
    {
      grade: 10,
      name: "Icon",
      followers: "10M+",
      engagementRate: "0.5% - 2.5%",
      averageLikes: "2M+",
      averageViews: "5M+",
      description: "Top-tier influencers with global recognition, ideal for premium campaigns."
    }
  ];
  // Get grade name from grade number
  export const getGradeName = (grade) => {
    return gradeTable.find(g => g.grade === grade)?.name || `Grade ${grade}`;
  };
  // Get order by ID
  export const getOrderById = (orderId) => {
    return mockOrders.find(order => order.id === orderId);
  };
  // Get client by ID
  export const getClientById = (clientId) => {
    return mockClients.find(client => client.id === clientId);
  };
  // Get influencer jobs
  export const getInfluencerJobs = (influencerId) => {
    return mockReelJobs.filter(job => job.influencerId === influencerId);
  };
  // Get order jobs
  export const getOrderJobs = (orderId) => {
    return mockReelJobs.filter(job => job.orderId === orderId);
  };
  // Check if influencer has claimed a job for an order
  export const hasClaimedJob = (influencerId, orderId) => {
    return mockReelJobs.some(job => 
      job.influencerId === influencerId && job.orderId === orderId
    );
  };
  // Get job by ID
  export const getJobById = (jobId) => {
    return mockReelJobs.find(job => job.id === jobId);
  };
  // Calculate time remaining in hours
  export const getHoursRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  };
  // Format deadline to user-friendly string
  export const formatDeadline = (deadline) => {
    const hours = getHoursRemaining(deadline);
    
    if (hours < 1) {
      return "Less than 1 hour";
    } else if (hours < 24) {
      return `${hours} hours`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  };
  // Get status label with color
  export const getStatusLabel = (status) => {
    switch (status) {
      case 'pending-submission':
        return { label: 'Pending Submission', color: 'bg-yellow-100 text-yellow-800' };
      case 'submitted':
        return { label: 'Under Review', color: 'bg-blue-100 text-blue-800' };
      case 'admin-review':
        return { label: 'Admin Reviewing', color: 'bg-purple-100 text-purple-800' };
      case 'admin-approved':
        return { label: 'Admin Approved', color: 'bg-green-100 text-green-800' };
      case 'admin-rejected':
        return { label: 'Needs Revision', color: 'bg-orange-100 text-orange-800' };
      case 'client-approved':
        return { label: 'Client Approved', color: 'bg-emerald-100 text-emerald-800' };
      case 'client-rejected':
        return { label: 'Client Rejected', color: 'bg-red-100 text-red-800' };
      case 'expired':
        return { label: 'Expired', color: 'bg-gray-100 text-gray-800' };
      case 'completed':
        return { label: 'Completed', color: 'bg-green-100 text-green-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };