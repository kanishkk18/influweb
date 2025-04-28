// "use client";

// import { useState, useEffect } from 'react';
// import Layout from '@/app/brand/Layout';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { toast } from "sonner";
// import { fetchAllCandidatesWithDetailsAction } from '@/actions';
// import CandidateCard from '@/components/ui/InfluencerCard';

// // export async function CandidatesPage({ profileInfo}) {
// //   try {
// //     console.log("Fetching candidates..."); // Debug log
// //     const candidates = await fetchAllCandidatesWithDetailsAction();
// //     console.log("Fetched candidates:", candidates); // Debug log

// //     return (
// //       <div className="container mx-auto px-4 py-8">
        
// //         <h1 className="text-3xl font-bold mb-8">Available Influencers</h1>
        
// //         {candidates.length === 0 ? (
// //           <p className="text-gray-500">No candidates found</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {candidates.map((candidate) => {
// //               console.log("Rendering candidate:", candidate._id); // Debug log
// //               return (
// //                 <CandidateCard 
// //                   key={candidate._id} 
// //                   candidate={candidate}
// //                   profileInfo={candidate.candidateInfo || candidate} // Adjusted for likely data structure
// //                 />
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   } catch (error) {
// //     console.error("Error fetching candidates:", error);
// //     return (
// //       <div className="container mx-auto px-4 py-8">
// //         <h1 className="text-3xl font-bold mb-8">Available Candidates</h1>
// //         <p className="text-red-500">Error loading candidates. Please try again later.</p>
// //       </div>
// //     );
// //   }
// // }


// const Influencers = ({ profileInfo }) => {
    
//     // Sample influencers data (in a real app, this would come from an API)
//   const influencers = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       handle: "@sarahstyle",
//       avatar: "https://xsgames.co/randomusers/avatar.php?g=female&i=1",
//       grade: "Macro",
//       niche: "Fashion",
//       followers: "450K",
//       engagement: "4.2%",
//       reelsCreated: 42,
//       averageViews: "25K"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       handle: "@mikefitness",
//       avatar: "https://xsgames.co/randomusers/avatar.php?g=male&i=2",
//       grade: "Celebrity Lite",
//       niche: "Fitness",
//       followers: "1.2M",
//       engagement: "3.8%",
//       reelsCreated: 86,
//       averageViews: "76K"
//     },
//     {
//       id: 3,
//       name: "Emma Rodriguez",
//       handle: "@emmafoodie",
//       avatar: "https://xsgames.co/randomusers/avatar.php?g=female&i=3",
//       grade: "Macro",
//       niche: "Food",
//       followers: "280K",
//       engagement: "5.1%",
//       reelsCreated: 38,
//       averageViews: "18K"
//     },
//     {
//       id: 4,
//       name: "David Park",
//       handle: "@davidtech",
//       avatar: "https://xsgames.co/randomusers/avatar.php?g=male&i=4",
//       grade: "Mega",
//       niche: "Technology",
//       followers: "520K",
//       engagement: "3.5%",
//       reelsCreated: 54,
//       averageViews: "32K"
//     },
//     {
//       id: 5,
//       name: "Olivia Wilson",
//       handle: "@livtravel",
//       avatar: "https://xsgames.co/randomusers/avatar.php?g=female&i=5",
//       grade: "Macro",
//       niche: "Travel",
//       followers: "320K",
//       engagement: "4.7%",
//       reelsCreated: 29,
//       averageViews: "22K"
//     }
//   ];

//   // State for search and filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedNiches, setSelectedNiches] = useState([]);
//   const [selectedGrades, setSelectedGrades] = useState([]);
//   const [selectedFollowerRanges, setSelectedFollowerRanges] = useState([]);
//   const [filteredInfluencers, setFilteredInfluencers] = useState(influencers);
//   const [cart, setCart] = useState([]);

//   // Filter options
//   const niches = ["Fashion", "Fitness", "Food", "Technology", "Travel", "Beauty", "Lifestyle"];
//   const grades = ["Nano", "Micro", "Rising Star", "Mid-Tier", "Macro", "Mega", "Celebrity Lite", "Celebrity	", "Superstar", "Icon"];
//   const followerRanges = [
//     { id: "followers-1", label: "10K - 50K", range: [10000, 50000] },
//     { id: "followers-2", label: "50K - 100K", range: [50000, 100000] },
//     { id: "followers-3", label: "100K - 500K", range: [100000, 500000] },
//     { id: "followers-4", label: "500K - 1M", range: [500000, 1000000] },
//     { id: "followers-5", label: "1M+", range: [1000000, Infinity] }
//   ];



//   // Helper function to convert followers string to number
//   const getFollowersNumber = (followersStr) => {
//     if (followersStr.includes('K')) {
//       return parseFloat(followersStr.replace('K', '')) * 1000;
//     }
//     if (followersStr.includes('M')) {
//       return parseFloat(followersStr.replace('M', '')) * 1000000;
//     }
//     return parseFloat(followersStr);
//   };

//   // Apply filters
//   useEffect(() => {
//     let result = influencers;
    
//     // Apply search
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(influencer => 
//         influencer.name.toLowerCase().includes(term) || 
//         influencer.handle.toLowerCase().includes(term) ||
//         influencer.niche.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply niche filter
//     if (selectedNiches.length > 0) {
//       result = result.filter(influencer => 
//         selectedNiches.includes(influencer.niche)
//       );
//     }
    
//     // Apply grade filter
//     if (selectedGrades.length > 0) {
//       result = result.filter(influencer => 
//         selectedGrades.includes(influencer.grade)
//       );
//     }

    
//     // Apply followers range filter
//     if (selectedFollowerRanges.length > 0) {
//       const selectedRanges = followerRanges.filter(range => 
//         selectedFollowerRanges.includes(range.id)
//       );
      
//       result = result.filter(influencer => {
//         const followersNum = getFollowersNumber(influencer.followers);
//         return selectedRanges.some(range => 
//           followersNum >= range.range[0] && followersNum <= range.range[1]
//         );
//       });
//     }
    
//     setFilteredInfluencers(result);
//   }, [searchTerm, selectedNiches, selectedGrades, selectedFollowerRanges]);

//   // Toggle handlers for filters
//   const toggleNicheFilter = (niche) => {
//     setSelectedNiches(prev => 
//       prev.includes(niche) 
//         ? prev.filter(n => n !== niche) 
//         : [...prev, niche]
//     );
//   };

//   const toggleGradeFilter = (grade) => {
//     setSelectedGrades(prev => 
//       prev.includes(grade) 
//         ? prev.filter(g => g !== grade) 
//         : [...prev, grade]
//     );
//   };

//   const toggleFollowerRangeFilter = (rangeId) => {
//     setSelectedFollowerRanges(prev => 
//       prev.includes(rangeId) 
//         ? prev.filter(r => r !== rangeId) 
//         : [...prev, rangeId]
//     );
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setSelectedNiches([]);
//     setSelectedGrades([]);
//     setSelectedFollowerRanges([]);
//   };

//   // Add to cart handler
//   const addToCart = (influencerId) => {
//     if (cart.includes(influencerId)) {
//       toast({
//         title: "Already in cart",
//         description: "This influencer is already in your cart.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setCart(prev => [...prev, influencerId]);
//     toast({
//       title: "Added to cart",
//       description: "Influencer added to your order.",
//       variant: "default",
//     });
//   };

//   return (
//     <Layout>
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-medium animate-slide-down">Influencers</h1>
//           <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
//             Browse and connect with our network of content creators
//           </p>
//         </div>
        
//         <div className="flex gap-2 animate-slide-down" style={{ animationDelay: "0.2s" }}>
//           <Input 
//             placeholder="Search influencers..." 
//             className="max-w-xs" 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Button onClick={() => setSearchTerm('')}>Clear</Button>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Filters */}
//         <Card className="h-fit md:col-span-1">
//           <CardHeader className="pb-2">
//             <div className="flex items-center justify-between">
//               <h3 className="font-medium">Filters</h3>
//               {(selectedNiches.length > 0 || selectedGrades.length > 0 || selectedFollowerRanges.length > 0) && (
//                 <Button variant="ghost" size="sm" onClick={resetFilters}>
//                   Reset
//                 </Button>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="text-sm font-medium mb-2">Niche</h4>
//                 <div className="space-y-2">
//                   {niches.map(niche => (
//                     <div key={niche} className="flex items-center space-x-2">
//                       <Checkbox 
//                         id={`niche-${niche}`} 
//                         checked={selectedNiches.includes(niche)}
//                         onCheckedChange={() => toggleNicheFilter(niche)}
//                       />
//                       <label htmlFor={`niche-${niche}`} className="text-sm cursor-pointer">{niche}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div>
//                 <h4 className="text-sm font-medium mb-2">Grade</h4>
//                 <div className="space-y-2">
//                   {grades.map(grade => (
//                     <div key={grade} className="flex items-center space-x-2">
//                       <Checkbox 
//                         id={`grade-${grade}`} 
//                         checked={selectedGrades.includes(grade)}
//                         onCheckedChange={() => toggleGradeFilter(grade)}
//                       />
//                       <label htmlFor={`grade-${grade}`} className="text-sm cursor-pointer">{grade}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div>
//                 <h4 className="text-sm font-medium mb-2">Followers</h4>
//                 <div className="space-y-2">
//                   {followerRanges.map(range => (
//                     <div key={range.id} className="flex items-center space-x-2">
//                       <Checkbox 
//                         id={range.id} 
//                         checked={selectedFollowerRanges.includes(range.id)}
//                         onCheckedChange={() => toggleFollowerRangeFilter(range.id)}
//                       />
//                       <label htmlFor={range.id} className="text-sm cursor-pointer">{range.label}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <Button 
//                 className="w-full"
//                 variant={cart.length > 0 ? "default" : "outline"}
//                 onClick={() => {
//                   if (cart.length > 0) {
//                     toast({
//                       title: "Proceeding to checkout",
//                       description: `${cart.length} influencers selected for your campaign.`,
//                     });
//                     // In a real app, we would navigate to checkout or order placement page
//                   } else {
//                     toast({
//                       title: "No influencers selected",
//                       description: "Please add at least one influencer to your order.",
//                       variant: "destructive",
//                     });
//                   }
//                 }}
//               >
//                 {cart.length > 0 ? `Checkout (${cart.length})` : "Apply Filters"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
        
//         {/* Influencer list */}
//         <div className="md:col-span-3">
//           <ScrollArea className="h-[calc(100vh-10rem)]">
//             {filteredInfluencers.length > 0 ? (
//               <div className="space-y-4 pr-4">
//                 {filteredInfluencers.map(influencer => (
//                   <Card key={influencer.id} className="animate-fade-in">
//                     <CardContent className="p-6">
//                       <div className="flex flex-col md:flex-row gap-4">
//                         <div className="flex-shrink-0">
//                           <img 
//                             src={influencer.avatar} 
//                             alt={influencer.name} 
//                             className="w-24 h-24 rounded-full object-cover"
//                           />
//                         </div>
                        
//                         <div className="flex-1">
//                           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
//                             <div>
//                               <h3 className="text-lg font-medium">{influencer.name}</h3>
//                               <p className="text-sm text-muted-foreground">{influencer.handle}</p>
//                             </div>
//                             <div className="flex items-center gap-2 mt-2 md:mt-0">
//                               <Badge>{influencer.niche}</Badge>
//                               <Badge variant="outline" className="font-bold">Grade {influencer.grade}</Badge>
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
//                             <div>
//                               <div className="text-xs text-muted-foreground">Followers</div>
//                               <div className="font-medium">{influencer.followers}</div>
//                             </div>
//                             <div>
//                               <div className="text-xs text-muted-foreground">Engagement</div>
//                               <div className="font-medium">{influencer.engagement}</div>
//                             </div>
//                             <div>
//                               <div className="text-xs text-muted-foreground">Reels Created</div>
//                               <div className="font-medium">{influencer.reelsCreated}</div>
//                             </div>
//                             <div>
//                               <div className="text-xs text-muted-foreground">Avg. Views</div>
//                               <div className="font-medium">{influencer.averageViews}</div>
//                             </div>
//                           </div>
                          
//                           <div className="flex justify-end gap-2">
//                             {/* <Button variant="outline" size="sm">View Profile</Button> */}
//                             <Button 
//                               size="sm"
//                               onClick={() => addToCart(influencer.id)}
//                               variant={cart.includes(influencer.id) ? "secondary" : "default"}
//                             >
//                               {cart.includes(influencer.id) ? "Added to Order" : "Add to Order"}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-64 text-center">
//                 <div className="text-4xl mb-4">🔍</div>
//                 <h3 className="text-lg font-medium mb-2">No influencers found</h3>
//                 <p className="text-muted-foreground max-w-md">
//                   We couldn't find any influencers matching your criteria. Try adjusting your filters or search term.
//                 </p>
//                 <Button variant="outline" className="mt-4" onClick={resetFilters}>
//                   Reset Filters
//                 </Button>
//               </div>
//             )}
//           </ScrollArea>
//         </div>
 
//       </div>
//      </Layout>
//    );
//  };

//  export default Influencers;


"use client";

import { useState, useEffect } from 'react';
import Layout from '@/app/brand/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { fetchAllCandidatesWithDetailsAction } from '@/actions';
import CandidateCard from '@/components/ui/InfluencerCard';

const Influencers = ({ profileInfo }) => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedFollowerRanges, setSelectedFollowerRanges] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter options
  const niches = ["Fashion", "Fitness", "Food", "Technology", "Travel", "Beauty", "Lifestyle"];
  const grades = ["Nano", "Micro", "Rising Star", "Mid-Tier", "Macro", "Mega", "Celebrity Lite", "Celebrity", "Superstar", "Icon"];
  const followerRanges = [
    { id: "followers-1", label: "10K - 50K", range: [10000, 50000] },
    { id: "followers-2", label: "50K - 100K", range: [50000, 100000] },
    { id: "followers-3", label: "100K - 500K", range: [100000, 500000] },
    { id: "followers-4", label: "500K - 1M", range: [500000, 1000000] },
    { id: "followers-5", label: "1M+", range: [1000000, Infinity] }
  ];

  // Fetch candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const candidates = await fetchAllCandidatesWithDetailsAction();
        setAllCandidates(candidates);
        setFilteredCandidates(candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCandidates();
  }, []);

  // Helper function to convert salary string to number
  const getSalaryNumber = (salaryStr) => {
    if (!salaryStr) return 0;
    if (salaryStr.includes('K')) {
      return parseFloat(salaryStr.replace('K', '')) * 1000;
    }
    if (salaryStr.includes('M')) {
      return parseFloat(salaryStr.replace('M', '')) * 1000000;
    }
    return parseFloat(salaryStr);
  };

  // Apply filters
  useEffect(() => {
    let result = allCandidates;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        return (
          candidateInfo.name?.toLowerCase().includes(term) || 
          candidateInfo.skills?.some(skill => skill.toLowerCase().includes(term)) ||
          candidateInfo.currentJobLocation?.toLowerCase().includes(term)
        );
      });
    }
    
    // Apply niche filter (using skills as niche)
    if (selectedNiches.length > 0) {
      result = result.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        return selectedNiches.some(niche => 
          candidateInfo.skills?.includes(niche)
        );
      });
    }
    
    // Apply grade filter (using experience as grade)
    if (selectedGrades.length > 0) {
      result = result.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        const experience = parseFloat(candidateInfo.totalExperience) || 0;
        
        // Map experience to grades
        let grade;
        if (experience < 2) grade = "Nano";
        else if (experience < 5) grade = "Micro";
        else if (experience < 8) grade = "Mid-Tier";
        else if (experience < 12) grade = "Macro";
        else grade = "Mega";
        
        return selectedGrades.includes(grade);
      });
    }
    
    // Apply salary range filter (using salary as follower range)
    if (selectedFollowerRanges.length > 0) {
      const selectedRanges = followerRanges.filter(range => 
        selectedFollowerRanges.includes(range.id)
      );
      
      result = result.filter(candidate => {
        const candidateInfo = candidate.candidateInfo || candidate;
        const salaryNum = getSalaryNumber(candidateInfo.currentSalary);
        return selectedRanges.some(range => 
          salaryNum >= range.range[0] && salaryNum <= range.range[1]
        );
      });
    }
    
    setFilteredCandidates(result);
  }, [searchTerm, selectedNiches, selectedGrades, selectedFollowerRanges, allCandidates]);

  // Toggle handlers for filters
  const toggleNicheFilter = (niche) => {
    setSelectedNiches(prev => 
      prev.includes(niche) 
        ? prev.filter(n => n !== niche) 
        : [...prev, niche]
    );
  };

  const toggleGradeFilter = (grade) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade) 
        : [...prev, grade]
    );
  };

  const toggleFollowerRangeFilter = (rangeId) => {
    setSelectedFollowerRanges(prev => 
      prev.includes(rangeId) 
        ? prev.filter(r => r !== rangeId) 
        : [...prev, rangeId]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedNiches([]);
    setSelectedGrades([]);
    setSelectedFollowerRanges([]);
  };

  // Add to cart handler
  const addToCart = (candidateId) => {
    if (cart.includes(candidateId)) {
      toast({
        title: "Already in cart",
        description: "This candidate is already in your cart.",
        variant: "destructive",
      });
      return;
    }

    setCart(prev => [...prev, candidateId]);
    toast({
      title: "Added to cart",
      description: "Candidate added to your order.",
      variant: "default",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Available Candidates</h1>
          <p>Loading candidates...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">Candidates</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Browse and connect with our network of professional candidates
          </p>
        </div>
        
        <div className="flex gap-2 animate-slide-down" style={{ animationDelay: "0.2s" }}>
          <Input 
            placeholder="Search candidates..." 
            className="max-w-xs" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setSearchTerm('')}>Clear</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <Card className="h-fit md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              {(selectedNiches.length > 0 || selectedGrades.length > 0 || selectedFollowerRanges.length > 0) && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Skills</h4>
                <div className="space-y-2">
                  {niches.map(niche => (
                    <div key={niche} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`niche-${niche}`} 
                        checked={selectedNiches.includes(niche)}
                        onCheckedChange={() => toggleNicheFilter(niche)}
                      />
                      <label htmlFor={`niche-${niche}`} className="text-sm cursor-pointer">{niche}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Experience Level</h4>
                <div className="space-y-2">
                  {grades.map(grade => (
                    <div key={grade} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`grade-${grade}`} 
                        checked={selectedGrades.includes(grade)}
                        onCheckedChange={() => toggleGradeFilter(grade)}
                      />
                      <label htmlFor={`grade-${grade}`} className="text-sm cursor-pointer">{grade}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Salary Range</h4>
                <div className="space-y-2">
                  {followerRanges.map(range => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={range.id} 
                        checked={selectedFollowerRanges.includes(range.id)}
                        onCheckedChange={() => toggleFollowerRangeFilter(range.id)}
                      />
                      <label htmlFor={range.id} className="text-sm cursor-pointer">{range.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full"
                variant={cart.length > 0 ? "default" : "outline"}
                onClick={() => {
                  if (cart.length > 0) {
                    toast({
                      title: "Proceeding to checkout",
                      description: `${cart.length} candidates selected for your campaign.`,
                    });
                  } else {
                    toast({
                      title: "No candidates selected",
                      description: "Please add at least one candidate to your order.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                {cart.length > 0 ? `Checkout (${cart.length})` : "Apply Filters"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Candidate list */}
        <div className="md:col-span-3">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            {filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4">
                {filteredCandidates.map(candidate => {
                  const candidateInfo = candidate.candidateInfo || candidate;
                  return (
                    <CandidateCard 
                      key={candidate._id} 
                      candidate={candidate}
                      profileInfo={candidateInfo}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium mb-2">No candidates found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any candidates matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Influencers;