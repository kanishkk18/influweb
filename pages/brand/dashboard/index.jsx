
import Layout from '../Layout';
import OrderSummary from './OrderSummary';
import ActiveCampaigns from './ActiveCampaigns';
import RecentActivity from './RecentActivity';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">Dashboard</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Welcome back to your influencer marketing platform
          </p>
        </div>
        
        <Link
          href="/brand/CreateOrder"
          className="animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <Button variant="default">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Create New Order
          </Button>
        </Link>
      </div>
      
      <OrderSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ActiveCampaigns />
        <RecentActivity />
      </div>
    </Layout>
  );
};

export default Index;
