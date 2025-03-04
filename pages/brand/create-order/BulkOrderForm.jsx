
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

const BulkOrderForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: '',
    productName: '',
    reelRequirements: '',
    quantity: 500,
    budget: 5000
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'budget' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Order submitted successfully!",
      description: "Your bulk order has been created.",
    });
    Router.push('/brand');
  };

  const handleCancel = () => {
    Router.push('/create-order');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={handleCancel} className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Options
        </Button>
        <h1 className="text-3xl font-medium mb-2">Create Bulk Order</h1>
        <p className="text-muted-foreground">
          Any influencer who meets your criteria can pick up this job
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
            <CardDescription>
              Provide details about your campaign and requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  name="campaignName"
                  placeholder="Summer Collection Launch"
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
                  rows={4}
                  required
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Minimum Quantity</Label>
                <div className="relative">
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={100}
                    step={50}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground text-sm">
                    Reels
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Minimum 100 reels required</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Total Budget</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    $
                  </div>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    min={1000}
                    step={100}
                    className="pl-8"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Estimated cost per reel: ${(formData.budget / formData.quantity).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Order Summary</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Total Reels:</span>
                  <span>{formData.quantity}</span>
                </li>
                <li className="flex justify-between">
                  <span>Total Budget:</span>
                  <span>${formData.budget.toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                  <span>Average Cost Per Reel:</span>
                  <span>${(formData.budget / formData.quantity).toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Bulk Order
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BulkOrderForm;
