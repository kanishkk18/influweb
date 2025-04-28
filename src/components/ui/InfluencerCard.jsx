"use client";

import React from 'react';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { ScrollArea } from './scroll-area';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { InstagramIcon, YoutubeIcon } from 'lucide-react';
import { createClient } from "@supabase/supabase-js";


// interface CandidateProfile {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   resume: string;
//   skills: string[];
//   totalExperience: string;
//   currentJobLocation: string;
//   state: string;
//   currentSalary: string;
//   linkedinProfile?: string;
//   githubProfile?: string;
// }

const supabaseClient = createClient(
  "https://ymsijpnegskkoiuerthi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
);

export default function CandidateCard({ candidate, profileInfo , }) {
const { user } = useUser();

function getResumeUrl() {
  if (!profileInfo?.resume) return null;
  const { data } = supabaseClient.storage
    .from("job-board-public")
    .getPublicUrl(profileInfo.resume);
  return data?.publicUrl;
}

const instagramUsername = profileInfo.linkedinProfile 
  ? extractInstagramUsername(profileInfo.linkedinProfile)
  : null;

  const youtubeIdentifier = extractYouTubeIdentifier(profileInfo.githubProfile);

  return (
    <div className="md:col-span-3">
                <div className="">
                  
                    <div className="space-y-4 pr-4">
                      
                        <Card  className="animate-fade-in">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-shrink-0">
                                <img 
                                  src={getResumeUrl() || "https://ymsijpnegskkoiuerthi.supabase.co/storage/v1/object/public/job-board-public/resumes/1743899471252_influencer.jpg"}
                                  alt=""
                                  className="w-24 h-24 rounded-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                  <div>
                                    <h3 className="text-lg font-medium">{profileInfo.name}</h3>
                                    <div className="flex space-x-2">
                  {instagramUsername && (
                    <a 
                      href={profileInfo.linkedinProfile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center mt-1 text-sm text-muted-foreground"
                    >
                      <InstagramIcon className="h-5 w-5 text-pink-600 mr-1" />
                      @{instagramUsername}
                    </a>
                  )}
                 
                </div>

                {/* <div className="flex space-x-2">
                  {youtubeIdentifier && (
                    <a 
                      href={profileInfo.githubProfile} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm hover:underline"
                    >
                      <YouTubeIcon className="h-5 w-5 text-red-600 mr-1" />
                      {youtubeIdentifier}
                    </a>
                  )}
                </div> */}
                                    {/* <p className="text-sm text-muted-foreground">handle</p> */}
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                                    <Badge>{profileInfo.preferedJobLocation}</Badge>
                                    <Badge variant="outline" className="font-bold">Grade </Badge>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                                  <div>
                                    <div className="text-xs text-muted-foreground">Followers</div>
                                    <div className="font-medium">{profileInfo.currentCompany}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Engagement</div>
                                    <div className="font-medium">{profileInfo.currentJobLocation}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Skills</div>
                                    <div className="font-medium">{profileInfo.skills}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Avg. Delivery</div>
                                    <div className="font-medium">{profileInfo.noticePeriod}</div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end gap-2">

                                  <Button variant="outline" className="bg-red-500" size="sm">{profileInfo.githubProfile && (
            <a href={profileInfo.githubProfile} target="_blank">
              <YoutubeIcon className="h-5 w-5 text-white" />
            </a>
          )}</Button>
                                  <Button variant="outline" className="bg-gradient-to-tr from-[#DD7BFF] to-[#FF6C6C] " size="sm">{profileInfo.linkedinProfile && (
            <a href={profileInfo.linkedinProfile} target="_blank">
              <InstagramIcon className="h-5 w-5 text-white" />
            </a>
          )}</Button>
                                  <Button variant="outline" size="sm">View Profile</Button>
                                  <Button 
                                    size="sm"
                                    // onClick={() => addToCart(influencer.id)}
                                    // variant={cart.includes(influencer.id) ? "secondary" : "default"}
                                  >
                                    {/* {cart.includes(influencer.id) ? "Added to Order" : "Add to Order"} */}
                                    Add To Order
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      {/* ))} */}
                    </div>
                  {/* ) : ( */}
                    {/* <div className="flex flex-col items-center justify-center h-64 text-center">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium mb-2">No influencers found</h3>
                      <p className="text-muted-foreground max-w-md">
                        We couldn't find any influencers matching your criteria. Try adjusting your filters or search term.
                      </p>
                      <Button variant="outline" className="mt-4" >
                        Reset Filters
                      </Button>
                    </div> */}
                  {/* )} */}
                </div>
             
    </div>
  );
}

// Function to extract Instagram username from URL
const extractInstagramUsername = (url) => {
  if (!url) return null;

  // Remove query params and trailing slashes
  const cleanedUrl = url.split('?')[0].replace(/\/+$/, '');

  // Extract username after 'instagram.com/'
  const match = cleanedUrl.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/);
  
  return match ? match[1] : null;
};

const extractYouTubeIdentifier = (url) => {
  if (!url) return null;

  // Handle various YouTube URL formats
  const patterns = [
    // Channel URL (username format)
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:c\/|user\/)?([a-zA-Z0-9_-]+)/,
    // Channel URL (ID format)
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
    // Short URL
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};


// import React, { useState } from 'react';
// import { Users, BarChart3 } from 'lucide-react';

// const InfluencerCard = ({ influencer = {}, index }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className="glass-card rounded-2xl overflow-hidden card-hover animate-scale-in"
//       style={{ animationDelay: `${150 * index}ms` }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Section */}
//       <div className="relative overflow-hidden h-52">
//         <img 
//           src={influencer?.imageUrl || "/placeholder.png"}  
//           alt={influencer?.name || "Unknown"}
//           className="w-full h-full object-cover transition-transform duration-700 ease-out"
//           style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
//         <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
//           <span className="category-label bg-white/80 text-primary">
//             {influencer?.category || "Unknown"}
//           </span>
//           <span className="category-label bg-black/60 text-white">
//             {influencer?.platform === 'instagram' ? 'Instagram' : 'YouTube'}
//           </span>
//         </div>
//       </div>
      
//       {/* Info Section */}
//       <div className="p-5">
//         <h3 
//           className="text-xl font-semibold mb-2 transition-colors duration-300"
//           style={{ color: isHovered ? 'hsl(var(--primary))' : 'inherit' }}
//         >
//           {influencer?.name || "Unknown"}
//         </h3>
        
//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//           {influencer?.description || "No description available"}
//         </p>
        
//         {/* Stats Section */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center text-sm text-gray-500">
//             <Users size={16} className="mr-1" />
//             <span>{influencer?.followers?.toLocaleString() || "0"}</span>
//           </div>
          
//           <div className="flex items-center text-sm text-gray-500">
//             <BarChart3 size={16} className="mr-1" />
//             <span>{influencer?.engagement?.toLocaleString() || "0"}</span>
//           </div>
//         </div>
        
//         {/* Price & Button */}
//         <div className="flex justify-between items-center">
//           <p className="text-xl font-bold text-primary">
//             ₹{influencer?.price ? influencer.price.toLocaleString() : "N/A"}
//           </p>
          
//           <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
//             View Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfluencerCard;
