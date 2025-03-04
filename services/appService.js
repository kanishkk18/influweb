import { 
    formatDeadline, 
    getClientById, 
    getGradeName, 
    getHoursRemaining, 
    getJobById, 
    getOrderById, 
    getStatusLabel, 
    hasClaimedJob, 
    mockInfluencers, 
    mockOrders, 
    mockReelJobs 
  } from "./mockData";
  import { toast } from "sonner";
  
  // Current user (in a real app this would come from auth)
  let currentUser = mockInfluencers[0];
  
  // Get the current logged-in user
  export const getCurrentUser = () => {
    return currentUser;
  };
  
  // Switch user (for demo purposes)
  export const switchUser = (userId) => {
    const user = mockInfluencers.find(infl => infl.id === userId);
    if (user) {
      currentUser = user;
      toast({
        title: "User switched",
        description: `Now logged in as ${user.name}`,
      });
      return user;
    }
    return currentUser;
  };
  
  // Get all available orders for the current user's grade
  export const getAvailableOrders = () => {
    const userGrade = currentUser.grade;
    
    return mockOrders
      .filter(order => 
        order.status === "open" && 
        order.remainingReels > 0 &&
        order.minGrade <= userGrade && 
        order.maxGrade >= userGrade
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  
  // Get all orders, including those not available to the current user
  export const getAllOrders = () => {
    const userGrade = currentUser.grade;
    
    return mockOrders.map(order => ({
      ...order,
      isAvailable: order.status === "open" && 
                   order.remainingReels > 0 &&
                   order.minGrade <= userGrade && 
                   order.maxGrade >= userGrade
    }));
  };
  
  // Get user's jobs
  export const getUserJobs = () => {
    return mockReelJobs
      .filter(job => job.influencerId === currentUser.id)
      .sort((a, b) => new Date(b.claimedAt) - new Date(a.claimedAt));
  };
  
  // Claim a job
  export const claimJob = (orderId) => {
    const order = getOrderById(orderId);
    
    if (!order) return { success: false, message: "Order not found" };
    
    if (order.remainingReels <= 0) return { success: false, message: "No reels remaining for this order" };
    
    if (hasClaimedJob(currentUser.id, orderId)) {
      return { success: false, message: "You have already claimed a job for this order" };
    }
  
    const userGrade = currentUser.grade;
    if (userGrade < order.minGrade || userGrade > order.maxGrade) {
      return { 
        success: false, 
        message: `This order is for grades ${order.minGrade}-${order.maxGrade}. Your grade is ${userGrade}.` 
      };
    }
  
    const now = new Date();
    const deadline = new Date(now);
    deadline.setHours(deadline.getHours() + 48); // 48-hour deadline
  
    const newJob = {
      id: `job${mockReelJobs.length + 1}`,
      orderId,
      influencerId: currentUser.id,
      status: "pending-submission",
      claimedAt: now.toISOString(),
      submissionDeadline: deadline.toISOString(),
      compensationAmount: order.compensation,
      isPaid: false
    };
  
    order.remainingReels -= 1;
    mockReelJobs.push(newJob);
  
    return { 
      success: true, 
      message: "Job claimed successfully! You have 48 hours to submit your reel.", 
      job: newJob 
    };
  };
  
  // Submit a reel
  export const submitReel = (jobId, reelLink) => {
    const job = getJobById(jobId);
    
    if (!job) return { success: false, message: "Job not found" };
    
    if (job.influencerId !== currentUser.id) {
      return { success: false, message: "This job doesn't belong to you" };
    }
    
    if (!["pending-submission", "admin-rejected", "client-rejected"].includes(job.status)) {
      return { success: false, message: `Cannot submit a reel when job status is ${job.status}` };
    }
  
    const now = new Date();
    const deadline = new Date(job.submissionDeadline);
    
    if (now > deadline && job.status === "pending-submission") {
      job.status = "expired";
  
      const order = getOrderById(job.orderId);
      if (order) order.remainingReels += 1;
  
      return { success: false, message: "Submission deadline has passed. Job has been marked as expired." };
    }
  
    job.reelLink = reelLink;
    job.submittedAt = now.toISOString();
    job.status = "submitted";
  
    return { success: true, message: "Reel submitted successfully! It will be reviewed by the admin team." };
  };
  
  // Admin review (simplified for this demo)
  export const adminReview = (jobId, isApproved, feedback) => {
    const job = getJobById(jobId);
    
    if (!job) return { success: false, message: "Job not found" };
  
    job.adminReviewedAt = new Date().toISOString();
    job.status = isApproved ? "admin-approved" : "admin-rejected";
  
    if (feedback) job.feedbackNotes = feedback;
  
    return { 
      success: true, 
      message: isApproved 
        ? "Reel approved by admin! Awaiting client review." 
        : "Reel rejected by admin. Feedback provided to the influencer." 
    };
  };
  
  // Client review (simplified for this demo)
  export const clientReview = (jobId, isApproved, feedback) => {
    const job = getJobById(jobId);
    
    if (!job) return { success: false, message: "Job not found" };
  
    job.clientReviewedAt = new Date().toISOString();
    job.status = isApproved ? "client-approved" : "client-rejected";
  
    if (feedback) job.feedbackNotes = feedback;
  
    return { 
      success: true, 
      message: isApproved 
        ? "Reel approved by client! Compensation is now available for withdrawal." 
        : "Reel rejected by client. Feedback provided to the influencer." 
    };
  };
  
  // Format job details
  export const formatJobDetails = (job) => {
    const order = getOrderById(job.orderId);
    const client = order ? getClientById(order.clientId) : undefined;
    const status = getStatusLabel(job.status);
  
    return {
      ...job,
      orderTitle: order?.title || "Unknown Order",
      clientName: client?.name || "Unknown Client",
      statusLabel: status.label,
      statusColor: status.color,
      deadlineFormatted: formatDeadline(job.submissionDeadline),
      hoursRemaining: getHoursRemaining(job.submissionDeadline),
      compensation: order?.compensation || 0,
    };
  };
  
  // Get influencer grade details
  export const getGradeDetails = (grade) => {
    return {
      grade,
      gradeName: getGradeName(grade),
    };
  };
  
  // Format order details for display
  export const formatOrderDetails = (order) => {
    const client = getClientById(order.clientId);
    const userGrade = currentUser.grade;
    const isAvailable = order.status === "open" && 
                        order.remainingReels > 0 &&
                        order.minGrade <= userGrade && 
                        order.maxGrade >= userGrade;
    const hasAlreadyClaimed = hasClaimedJob(currentUser.id, order.id);
  
    return {
      ...order,
      clientName: client?.name || "Unknown Client",
      clientAvatar: client?.logo || "/placeholder.svg",
      minGradeName: getGradeName(order.minGrade),
      maxGradeName: getGradeName(order.maxGrade),
      isAvailable,
      hasAlreadyClaimed,
      deadlineFormatted: formatDeadline(order.deadline),
      isInGradeRange: userGrade >= order.minGrade && userGrade <= order.maxGrade,
      progress: Math.round(((order.totalReels - order.remainingReels) / order.totalReels) * 100),
    };
  };
  