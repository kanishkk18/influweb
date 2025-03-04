import { InstagramInfluencer, YouTubeInfluencer } from "./influencers";

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