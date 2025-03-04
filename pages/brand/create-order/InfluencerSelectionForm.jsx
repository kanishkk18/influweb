
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';




const grades = [
  { id: 1, name: "Grade 1", followers: "1M+", engagement: "5%+", pricePerReel: 1000 },
  { id: 2, name: "Grade 2", followers: "500K-1M", engagement: "4-5%", pricePerReel: 800 },
  { id: 3, name: "Grade 3", followers: "250K-500K", engagement: "3-4%", pricePerReel: 600 },
  { id: 4, name: "Grade 4", followers: "100K-250K", engagement: "2-3%", pricePerReel: 400 },
  { id: 5, name: "Grade 5", followers: "50K-100K", engagement: "1.5-2%", pricePerReel: 300 },
  { id: 6, name: "Grade 6", followers: "25K-50K", engagement: "1-1.5%", pricePerReel: 200 },
  { id: 7, name: "Grade 7", followers: "10K-25K", engagement: "0.8-1%", pricePerReel: 150 },
  { id: 8, name: "Grade 8", followers: "5K-10K", engagement: "0.6-0.8%", pricePerReel: 100 },
  { id: 9, name: "Grade 9", followers: "2K-5K", engagement: "0.4-0.6%", pricePerReel: 75 },
  { id: 10, name: "Grade 10", followers: "1K-2K", engagement: "0.2-0.4%", pricePerReel: 50 }
];

// Mock data for influencers
const mockInfluencers = [
  { id: 1, name: "Emma Johnson", username: "@emmaj", avatar: "https://randomuser.me/api/portraits/women/1.jpg", grade: 2, followers: "750K", engagement: "4.5%", pricePerReel: 800, niches: ["Fashion", "Beauty"] },
  { id: 2, name: "Alex Smith", username: "@alexsmith", avatar: "https://randomuser.me/api/portraits/men/1.jpg", grade: 3, followers: "320K", engagement: "3.8%", pricePerReel: 600, niches: ["Fitness", "Nutrition"] },
  { id: 3, name: "Sarah Parker", username: "@sarahp", avatar: "https://randomuser.me/api/portraits/women/2.jpg", grade: 1, followers: "1.2M", engagement: "5.2%", pricePerReel: 1000, niches: ["Lifestyle", "Travel"] },
  { id: 4, name: "James Wilson", username: "@jwilson", avatar: "https://randomuser.me/api/portraits/men/2.jpg", grade: 4, followers: "150K", engagement: "2.7%", pricePerReel: 400, niches: ["Gaming", "Tech"] },
  { id: 5, name: "Olivia Davis", username: "@oliviad", avatar: "https://randomuser.me/api/portraits/women/3.jpg", grade: 3, followers: "420K", engagement: "3.5%", pricePerReel: 600, niches: ["Food", "Cooking"] },
  { id: 6, name: "Michael Brown", username: "@mbrown", avatar: "https://randomuser.me/api/portraits/men/3.jpg", grade: 5, followers: "85K", engagement: "1.9%", pricePerReel: 300, niches: ["Music", "Art"] },
  { id: 7, name: "Sophia Miller", username: "@sophiam", avatar: "https://randomuser.me/api/portraits/women/4.jpg", grade: 2, followers: "680K", engagement: "4.1%", pricePerReel: 800, niches: ["Beauty", "Skincare"] },
  { id: 8, name: "David Garcia", username: "@davidg", avatar: "https://randomuser.me/api/portraits/men/4.jpg", grade: 6, followers: "35K", engagement: "1.3%", pricePerReel: 200, niches: ["Sports", "Fitness"] },
  { id: 9, name: "Mia Anderson", username: "@miaa", avatar: "https://randomuser.me/api/portraits/women/5.jpg", grade: 4, followers: "230K", engagement: "2.5%", pricePerReel: 400, niches: ["Fashion", "Lifestyle"] },
  { id: 10, name: "Ethan Thompson", username: "@ethant", avatar: "https://randomuser.me/api/portraits/men/5.jpg", grade: 5, followers: "72K", engagement: "1.7%", pricePerReel: 300, niches: ["Tech", "Gadgets"] },
  { id: 11, name: "Isabella White", username: "@isabellaw", avatar: "https://randomuser.me/api/portraits/women/6.jpg", grade: 7, followers: "18K", engagement: "0.9%", pricePerReel: 150, niches: ["DIY", "Crafts"] },
  { id: 12, name: "Noah Martinez", username: "@noahm", avatar: "https://randomuser.me/api/portraits/men/6.jpg", grade: 8, followers: "9K", engagement: "0.7%", pricePerReel: 100, niches: ["Gaming", "Streaming"] },
];

const InfluencerSelectionForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: '',
    productName: '',
    reelRequirements: '',
  });
  
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (selectedGrades.length > 0) {
      const filtered = mockInfluencers.filter(influencer => 
        selectedGrades.includes(influencer.grade) &&
        (searchTerm === '' || 
          influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          influencer.niches.some(niche => niche.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
      setFilteredInfluencers(filtered);
    } else {
      setFilteredInfluencers([]);
    }
  }, [selectedGrades, searchTerm]);
  
  const toggleGradeSelection = (gradeId) => {
    setSelectedGrades(prev => {
      if (prev.includes(gradeId)) {
        return prev.filter(id => id !== gradeId);
      } else {
        return [...prev, gradeId].sort((a, b) => a - b);
      }
    });
  };
  
  const toggleInfluencerSelection = (influencer) => {
    setSelectedInfluencers(prev => {
      if (prev.some(i => i.id === influencer.id)) {
        return prev.filter(i => i.id !== influencer.id);
      } else {
        return [...prev, influencer];
      }
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const totalBudget = selectedInfluencers.reduce((sum, influencer) => sum + influencer.pricePerReel, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedInfluencers.length === 0) {
      toast({
        title: "No influencers selected",
        description: "Please select at least one influencer before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Order submitted successfully!",
      description: `Your order with ${selectedInfluencers.length} influencers has been created.`,
    });
    Router.push('/brand');
  };

  const handleCancel = () => {
    Router.push('/create-order');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={handleCancel} className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Options
        </Button>
        <h1 className="text-3xl font-medium mb-2">Select Specific Influencers</h1>
        <p className="text-muted-foreground">
          Choose the exact influencers you want to work with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
              <CardDescription>
                Provide details about your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    placeholder="Premium Product Launch"
                    value={formData.campaignName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productName">Product/Service</Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="Product or service being promoted"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reelRequirements">Reel Requirements</Label>
                  <Textarea
                    id="reelRequirements"
                    name="reelRequirements"
                    placeholder="Describe what you want influencers to showcase and mention in their reels"
                    value={formData.reelRequirements}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Select Influencer Grades</CardTitle>
              <CardDescription>
                First, choose which grades of influencers you're interested in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {grades.map((grade) => (
                  <Badge
                    key={grade.id}
                    variant={selectedGrades.includes(grade.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleGradeSelection(grade.id)}
                  >
                    {grade.name} (${grade.pricePerReel}/reel)
                  </Badge>
                ))}
              </div>
              
              {selectedGrades.length > 0 && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="searchInfluencers">Search Influencers</Label>
                    <Input
                      id="searchInfluencers"
                      placeholder="Search by name, username, or niche"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="mb-2 text-sm">
                    Showing {filteredInfluencers.length} influencers
                  </div>
                  
                  <ScrollArea className="h-[400px] rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {filteredInfluencers.map((influencer) => (
                        <div
                          key={influencer.id}
                          className={`p-4 border rounded-lg ${
                            selectedInfluencers.some(i => i.id === influencer.id)
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          } transition-colors cursor-pointer`}
                          onClick={() => toggleInfluencerSelection(influencer)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10">
                              <img src={influencer.avatar} alt={influencer.name} />
                            </Avatar>
                            <div>
                              <div className="font-medium">{influencer.name}</div>
                              <div className="text-sm text-muted-foreground">{influencer.username}</div>
                            </div>
                            <Checkbox
                              checked={selectedInfluencers.some(i => i.id === influencer.id)}
                              className="ml-auto"
                              onCheckedChange={() => toggleInfluencerSelection(influencer)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Grade:</span>{" "}
                              <Badge variant="outline" className="ml-1">
                                {grades.find(g => g.id === influencer.grade)?.name}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Followers:</span>{" "}
                              <span>{influencer.followers}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Engagement:</span>{" "}
                              <span>{influencer.engagement}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {influencer.niches.map((niche, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {niche}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-right font-medium">
                            ${influencer.pricePerReel}/reel
                          </div>
                        </div>
                      ))}
                      
                      {filteredInfluencers.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">
                          No influencers found matching your criteria
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </>
              )}
              
              {selectedGrades.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Please select at least one grade to view available influencers
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Selection</CardTitle>
                <CardDescription>
                  Selected influencers: {selectedInfluencers.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedInfluencers.length > 0 ? (
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {selectedInfluencers.map((influencer) => (
                        <div key={influencer.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <img src={influencer.avatar} alt={influencer.name} />
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{influencer.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Grade {influencer.grade}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">${influencer.pricePerReel}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No influencers selected yet
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Influencers:</span>
                    <span className="font-medium">{selectedInfluencers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Budget:</span>
                    <span className="font-medium">${totalBudget.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6"
                  disabled={selectedInfluencers.length === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Create Order
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSelectionForm;
