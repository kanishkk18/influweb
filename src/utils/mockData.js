
export const generateMockVideos = () => {
  const platforms = ['youtube', 'instagram', 'tiktok'];
  const categories = ['Beauty', 'Fashion', 'Fitness', 'Food', 'Travel', 'Technology'];
  const statuses = ['pending', 'approved', 'rejected'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    url: `https://example.com/video${i + 1}`,
    title: `Video Title ${i + 1}`,
    description: `This is a description for video ${i + 1}. It showcases product features and benefits.`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    creator: `Creator ${Math.floor(i / 5) + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    likes: Math.floor(Math.random() * 10000),
    views: Math.floor(Math.random() * 1000000),
    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    rejectionReason: statuses[Math.floor(Math.random() * statuses.length)] === 'rejected' ? 'Content guidelines violation' : undefined
  }));
};

export const fetchInstagramUsers = async () => {
  try {
    // The RapidAPI endpoint is not working (403 - not subscribed)
    // Attempting to fetch data from a different endpoint
    const response = await fetch(
      'https://instagram-data-api.p.rapidapi.com/user/business-discovery?username=instagram',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '1b9cff9d44msh49fd7c5c6f584b1p19cb51jsn80dda13ab4e2',
          'x-rapidapi-host': 'instagram-data-api.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.log('API response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch Instagram data');
    }

    const responseData = await response.json();
    console.log('Instagram API response:', responseData);

    // Try to extract business account data if available
    let businessAccounts = [];
    
    // If we have business data in the response, transform it
    if (responseData && responseData.business_discovery) {
      const businessData = responseData.business_discovery;
      
      businessAccounts.push({
        id: `ig-1`,
        name: businessData.name || businessData.username,
        username: businessData.username,
        profilePic: businessData.profile_picture_url || `https://picsum.photos/seed/${businessData.username}/200`,
        followers: businessData.followers_count || 0,
        engagementRate: Math.random() * 5 + 1, // Calculated engagement rate
        avgLikes: businessData.media_count ? Math.floor(businessData.followers_count / businessData.media_count * 0.05) : 0,
        avgViews: businessData.media_count ? Math.floor(businessData.followers_count / businessData.media_count * 0.08) : 0,
        niche: businessData.category || 'Business',
        category: 'Business Account',
      });
      
      // If there are related accounts, add them too
      if (responseData.related_accounts && Array.isArray(responseData.related_accounts)) {
        responseData.related_accounts.forEach((account, index) => {
          businessAccounts.push({
            id: `ig-${index + 2}`,
            name: account.name || account.username,
            username: account.username,
            profilePic: account.profile_picture_url || `https://picsum.photos/seed/${account.username}/200`,
            followers: account.followers_count || Math.floor(100000 + Math.random() * 5000000),
            engagementRate: Math.random() * 5 + 1,
            avgLikes: Math.floor((account.followers_count || 500000) * 0.03),
            avgViews: Math.floor((account.followers_count || 500000) * 0.05),
            niche: account.category || 'Business',
            category: 'Business Account',
          });
        });
      }
    }
    
    // If we got business accounts, return them
    if (businessAccounts.length > 0) {
      return businessAccounts;
    }
    
    // Otherwise use our default array of popular business accounts
    return generateDefaultBusinessAccounts();
    
  } catch (error) {
    console.error('Error fetching Instagram users:', error);
    // Return mock data if API fails
    return generateDefaultBusinessAccounts();
  }
};

// Function to generate default business accounts
function generateDefaultBusinessAccounts() {
  return [
    {
      id: 'ig-1',
      name: 'Instagram Official',
      username: 'instagram',
      profilePic: 'https://picsum.photos/seed/instagram/200',
      followers: 569000000,
      engagementRate: 2.5,
      avgLikes: 1400000,
      avgViews: 2100000,
      niche: 'Social Media',
      category: 'Business',
    },
    {
      id: 'ig-2',
      name: 'Nike',
      username: 'nike',
      profilePic: 'https://picsum.photos/seed/nike/200',
      followers: 251000000,
      engagementRate: 1.8,
      avgLikes: 4500000,
      avgViews: 7800000,
      niche: 'Sports',
      category: 'Business',
    },
    {
      id: 'ig-3',
      name: 'Louis Vuitton',
      username: 'louisvuitton',
      profilePic: 'https://picsum.photos/seed/louisvuitton/200',
      followers: 50200000,
      engagementRate: 1.5,
      avgLikes: 752000,
      avgViews: 1200000,
      niche: 'Luxury',
      category: 'Business',
    },
    {
      id: 'ig-4',
      name: 'National Geographic',
      username: 'natgeo',
      profilePic: 'https://picsum.photos/seed/natgeo/200',
      followers: 265000000,
      engagementRate: 3.2,
      avgLikes: 8500000,
      avgViews: 12000000,
      niche: 'Education',
      category: 'Business',
    },
    {
      id: 'ig-5',
      name: 'Starbucks',
      username: 'starbucks',
      profilePic: 'https://picsum.photos/seed/starbucks/200',
      followers: 18000000,
      engagementRate: 1.2,
      avgLikes: 216000,
      avgViews: 350000,
      niche: 'Food & Drink',
      category: 'Business',
    },
    {
      id: 'ig-6',
      name: 'Airbnb',
      username: 'airbnb',
      profilePic: 'https://picsum.photos/seed/airbnb/200',
      followers: 5800000,
      engagementRate: 1.7,
      avgLikes: 98600,
      avgViews: 156000,
      niche: 'Travel',
      category: 'Business',
    },
    {
      id: 'ig-7',
      name: 'Sephora',
      username: 'sephora',
      profilePic: 'https://picsum.photos/seed/sephora/200',
      followers: 21000000,
      engagementRate: 0.9,
      avgLikes: 189000,
      avgViews: 310000,
      niche: 'Beauty',
      category: 'Business',
    },
    {
      id: 'ig-8',
      name: 'Glossier',
      username: 'glossier',
      profilePic: 'https://picsum.photos/seed/glossier/200',
      followers: 2700000,
      engagementRate: 2.3,
      avgLikes: 62100,
      avgViews: 95000,
      niche: 'Beauty',
      category: 'Business',
    },
    {
      id: 'ig-9',
      name: 'WeWork',
      username: 'wework',
      profilePic: 'https://picsum.photos/seed/wework/200',
      followers: 400000,
      engagementRate: 1.1,
      avgLikes: 4400,
      avgViews: 7200,
      niche: 'Business Services',
      category: 'Business',
    },
  ];
}

// import { InstagramInfluencer, YouTubeInfluencer } from "./influencers";

export const mockInstagramInfluencers = [
  {
    id: "insta1",
    name: "Emma Johnson",
    username: "emma.lifestyle",
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    followers: 156000,
    avgLikes: 8500,
    avgViews: 25000,
    engagementRate: 5.45,
    niche: "Lifestyle",
    category: "Fashion & Beauty"
  },
  {
    id: "insta2",
    name: "Alex Rodriguez",
    username: "alex.fitness",
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    followers: 392000,
    avgLikes: 18700,
    avgViews: 43000,
    engagementRate: 4.77,
    niche: "Fitness",
    category: "Health & Wellness"
  },
  {
    id: "insta3",
    name: "Sophia Chen",
    username: "sophiaeats",
    profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    followers: 215000,
    avgLikes: 12300,
    avgViews: 31000,
    engagementRate: 5.72,
    niche: "Food",
    category: "Culinary & Recipes"
  },
  {
    id: "insta4",
    name: "Marcus Williams",
    username: "marcus.travels",
    profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    followers: 578000,
    avgLikes: 26900,
    avgViews: 68000,
    engagementRate: 4.65,
    niche: "Travel",
    category: "Adventure & Lifestyle"
  },
  {
    id: "insta5",
    name: "Jasmine Taylor",
    username: "jasmine.creativity",
    profilePic: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces",
    followers: 189000,
    avgLikes: 9700,
    avgViews: 27000,
    engagementRate: 5.13,
    niche: "DIY & Crafts",
    category: "Arts & Creation"
  }
];

export const mockYouTubeInfluencers = [
  {
    id: "yt1",
    name: "Tech with Ryan",
    username: "TechWithRyan",
    profilePic: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces",
    subscribers: 1250000,
    avgViews: 358000,
    engagementRate: 8.2,
    niche: "Technology",
    category: "Tech Reviews"
  },
  {
    id: "yt2",
    name: "Cooking with Sarah",
    username: "SarahsCooking",
    profilePic: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=faces",
    subscribers: 875000,
    avgViews: 215000,
    engagementRate: 7.8,
    niche: "Food",
    category: "Cooking & Recipes"
  },
  {
    id: "yt3",
    name: "Fitness Revolution",
    username: "FitRevolution",
    profilePic: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=faces",
    subscribers: 3200000,
    avgViews: 687000,
    engagementRate: 9.1,
    niche: "Fitness",
    category: "Workout & Health"
  },
  {
    id: "yt4",
    name: "Global Explorer",
    username: "ExploreWithMike",
    profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    subscribers: 2100000,
    avgViews: 473000,
    engagementRate: 8.5,
    niche: "Travel",
    category: "Adventure & Documentary"
  },
  {
    id: "yt5",
    name: "Gaming Universe",
    username: "GamerUniverse",
    profilePic: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=faces",
    subscribers: 4500000,
    avgViews: 892000,
    engagementRate: 9.8,
    niche: "Gaming",
    category: "Gaming & eSports"
  }
];

// Helper functions to format numbers
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Mock API functions (these would be replaced with real API calls)
export async function fetchInstagramInfluencers() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInstagramInfluencers;
}

export async function fetchYouTubeInfluencers() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockYouTubeInfluencers;
}