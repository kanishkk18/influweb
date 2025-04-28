import { toast } from "sonner";

// Mock data function - replace with actual API in production
const getMockVideos = () => {
  return [
    {
      id: "1",
      title: "music video reels",
      description: "bollywood's music",
      creator: "kartik",
      platform: "youtube",
      category: "Acting",
      url: "https://youtu.be/qifZNcuhDyo?si=485k2ihPu8vDV2Gv",
      thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2340&auto=format&fit=crop",
      views: 24500,
      likes: 2100,
      status: "pending",
      submittedAt: "2025-05-04T14:48:00.000Z",
    },
    {
      id: "2",
      title: "Modern UI Animation Techniques",
      description: "Learn advanced animation techniques that can elevate your UI design. This tutorial covers timing, easing, and psychological impact of motion in interfaces.",
      creator: "AnimationPro",
      platform: "instagram",
      category: "Animation",
      url: "https://www.instagram.com/reel/DHSglNsys7K/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop",
      views: 18300,
      likes: 1840,
      status: "pending",
      submittedAt: "2023-12-02T09:30:00.000Z",
    },
    
  ];
};

// Production-ready fetch functions
export const fetchVideos = async () => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch('https://api.example.com/videos');
    // if (!response.ok) throw new Error('Failed to fetch videos');
    // return await response.json();
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockVideos();
  } catch (error) {
    console.error("Error fetching videos:", error);
    toast.error("Failed to load videos. Please try again later.");
    return [];
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch(`https://api.example.com/videos/${videoId}`);
    // if (!response.ok) throw new Error('Failed to fetch video details');
    // return await response.json();
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const video = getMockVideos().find(v => v.id === videoId);
    if (!video) return null;
    
    // Add extra details for the details view
    return {
      ...video,
      comments: [
        {
          id: "c1",
          author: "DesignEnthusiast",
          text: "This is exactly what I needed to improve my design process. Great insights!",
          timestamp: "2023-12-10T09:15:00.000Z"
        },
        {
          id: "c2",
          author: "CreativeMind",
          text: "Love the examples and practical applications. Would be great to see a follow-up on advanced techniques.",
          timestamp: "2023-12-11T14:30:00.000Z"
        }
      ],
      tags: ["design", "ux", "minimalism", "interface"],
      duration: "14:25"
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    toast.error("Failed to load video details. Please try again later.");
    return null;
  }
};

export const updateVideoStatus = async (
  videoId, 
  status, 
  rejectionReason
) => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch(`https://api.example.com/videos/${videoId}/status`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status, rejectionReason })
    // });
    // if (!response.ok) throw new Error('Failed to update video status');
    // return true;
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Video ${videoId} status updated to ${status}`, rejectionReason ? `Reason: ${rejectionReason}` : '');
    toast.success(`Video has been ${status === 'approved' ? 'approved' : 'rejected'}`);
    return true;
  } catch (error) {
    console.error("Error updating video status:", error);
    toast.error("Failed to update video status. Please try again later.");
    return false;
  }
};