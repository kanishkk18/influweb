import { AppHeader } from "../../../components/appHeader";
import { GradeTag } from "../../../components/gradeTag";
import { gradeTable } from "@/services/mockData";
import { getCurrentUser, getGradeDetails } from "@/services/appService";
import { CheckCircle2, HelpCircle, Info } from "lucide-react";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const GradeSystem = () => {
  const user = getCurrentUser();
  const { grade, gradeName } = getGradeDetails(user.grade);
  const [appealDialogOpen, setAppealDialogOpen] = useState(false);
  const [appealReason, setAppealReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAppealSubmit = () => {
    if (!appealReason.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a reason for your appeal",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a delay for better UX
    setTimeout(() => {
      toast({
        title: "Appeal Submitted",
        description: "Your grade appeal has been submitted for review. You will be notified once it's processed.",
      });
      
      setIsSubmitting(false);
      setAppealDialogOpen(false);
      setAppealReason("");
    }, 1000);
  };

  const currentGradeInfo = gradeTable.find(g => g.grade === grade);
  const nextGradeInfo = grade < 10 ? gradeTable.find(g => g.grade === grade + 1) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-1 container py-6 md:py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Influencer Grading System</h1>
          <p className="text-muted-foreground mt-2">
            Understanding how influencers are categorized based on their metrics
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="glass-card rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">About the Grading System</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Our 10-tier grading system categorizes influencers based on their Instagram metrics, 
                making it easier for clients to find the right match for their campaigns. Each grade 
                represents a specific level of influence and audience reach.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <p>Access to orders is determined by your influencer grade</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <p>Grades are calculated automatically based on your Instagram metrics</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <p>You can appeal your grade if you believe it doesn't reflect your current influence</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <p>Higher grades unlock access to higher-paying opportunities</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-semibold mb-2">Grading Tiers Explained</h2>
                <p className="text-sm text-muted-foreground">
                  Each tier has specific requirements based on followers, engagement rate, and average metrics
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr className="text-left text-xs">
                      <th className="px-4 py-3 font-medium">Grade</th>
                      <th className="px-4 py-3 font-medium">Tier Name</th>
                      <th className="px-4 py-3 font-medium">Followers</th>
                      <th className="px-4 py-3 font-medium">Engagement</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Avg. Likes</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Avg. Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {gradeTable.map((gradeInfo) => (
                      <tr 
                        key={gradeInfo.grade} 
                        className={
                          gradeInfo.grade === grade 
                            ? "bg-primary/5 font-medium" 
                            : ""
                        }
                      >
                        <td className="px-4 py-3 align-middle">
                          <GradeTag grade={gradeInfo.grade} />
                        </td>
                        <td className="px-4 py-3 text-sm align-middle">
                          {gradeInfo.name}
                          {gradeInfo.grade === grade && (
                            <span className="text-xs text-primary ml-2">(Your Grade)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm align-middle">{gradeInfo.followers}</td>
                        <td className="px-4 py-3 text-sm align-middle">{gradeInfo.engagementRate}</td>
                        <td className="px-4 py-3 text-sm align-middle hidden md:table-cell">{gradeInfo.averageLikes}</td>
                        <td className="px-4 py-3 text-sm align-middle hidden md:table-cell">{gradeInfo.averageViews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Current Grade</h3>
              
              <div className="flex items-center gap-2 mb-6">
                <GradeTag grade={grade} className="text-sm" />
                <span className="text-xl font-bold">{gradeName}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Followers:</span>
                    <span className="text-sm font-medium">{user.followers.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${Math.min(
                          (user.followers / 
                          (grade === 10 ? 10000000 : parseInt(currentGradeInfo?.followers.split(' - ')[1]?.replace('K', '000').replace('M', '000000') || '0'))) * 100, 
                          100
                        )}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Engagement Rate:</span>
                    <span className="text-sm font-medium">{user.engagementRate}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${Math.min(
                          (user.engagementRate / 
                          parseFloat(currentGradeInfo?.engagementRate.split(' - ')[1]?.replace('%', '') || '0')) * 100, 
                          100
                        )}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Likes:</span>
                    <span className="text-sm font-medium">{user.averageLikes.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${Math.min(
                          (user.averageLikes / 
                          parseInt(currentGradeInfo?.averageLikes.split(' - ')[1]?.replace('K', '000').replace('M', '000000') || '0')) * 100, 
                          100
                        )}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Views:</span>
                    <span className="text-sm font-medium">{user.averageViews.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${Math.min(
                          (user.averageViews / 
                          parseInt(currentGradeInfo?.averageViews.split(' - ')[1]?.replace('K', '000').replace('M', '000000') || '0')) * 100, 
                          100
                        )}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => setAppealDialogOpen(true)}
              >
                Request Grade Review
              </Button>
            </div>
            
            {nextGradeInfo && (
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Next Grade Requirements</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Grade:</span>
                    <GradeTag grade={(grade + 1)} name={nextGradeInfo.name} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Followers Needed:</span>
                    <span className="text-sm font-medium">{nextGradeInfo.followers}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engagement Rate:</span>
                    <span className="text-sm font-medium">{nextGradeInfo.engagementRate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Likes:</span>
                    <span className="text-sm font-medium">{nextGradeInfo.averageLikes}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Views:</span>
                    <span className="text-sm font-medium">{nextGradeInfo.averageViews}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary/5 rounded-md text-xs">
                  <p>{nextGradeInfo.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Dialog open={appealDialogOpen} onOpenChange={setAppealDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Grade Review</DialogTitle>
            <DialogDescription>
              If you believe your current grade doesn't reflect your Instagram metrics, 
              you can request a review. Please provide details and evidence.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Grade:</span>
                <GradeTag grade={grade} name={gradeName} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Followers:</span>
                <span>{user.followers.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Engagement Rate:</span>
                <span>{user.engagementRate}%</span>
              </div>
            </div>
            
            <div className="mt-2">
              <label htmlFor="appealReason" className="text-sm font-medium mb-1 block">
                Reason for Appeal
              </label>
              <Textarea
                id="appealReason"
                value={appealReason}
                onChange={(e) => setAppealReason(e.target.value)}
                placeholder="Explain why you believe your grade should be higher. Include any recent growth or metrics that support your case."
                className="h-24"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can only submit one appeal every 30 days. Our team will review your request within 3-5 business days.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAppealDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAppealSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Appeal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradeSystem;