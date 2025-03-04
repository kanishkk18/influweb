
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const campaignsData = [
  {
    id: 1,
    name: "Summer Collection Launch",
    budget: "$9,500",
    reels: 48,
    influencers: 25,
    status: "Active",
    completion: 65,
  },
  {
    id: 2,
    name: "New Product Unboxing",
    budget: "$7,200",
    reels: 36,
    influencers: 18,
    status: "Active",
    completion: 42,
  },
  {
    id: 3,
    name: "Holiday Special",
    budget: "$12,000",
    reels: 60,
    influencers: 30,
    status: "Pending",
    completion: 10,
  },
];

const ActiveCampaigns = () => {
  return (
    <Card className="col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Active Campaigns</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <CardDescription>Monitor your ongoing campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {campaignsData.map((campaign) => (
              <div 
                key={campaign.id} 
                className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <Badge variant={campaign.status === 'Active' ? 'default' : 'outline'}>
                    {campaign.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">{campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reels</p>
                    <p className="font-medium">{campaign.reels}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Influencers</p>
                    <p className="font-medium">{campaign.influencers}</p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${campaign.completion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-muted-foreground">{campaign.completion}% Complete</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveCampaigns;
