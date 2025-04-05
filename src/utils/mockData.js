
export const generateMockVideos = () => {
  const platforms = ['youtube', 'instagram', 'tiktok'];
  const categories = ['Beauty', 'Fashion', 'Fitness', 'Food', 'Travel', 'Technology'];
  const statuses = ['pending', 'approved', 'rejected'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    url: `https://example.com/video${i + 1}`,
    title: `Video Title ${i + 1}`,
    description: `This is a description for video ${i + 1}. It showcases product features and benefits.`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    creator: `Creator ${Math.floor(i / 5) + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    likes: Math.floor(Math.random() * 10000),
    views: Math.floor(Math.random() * 1000000),
    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    rejectionReason: statuses[Math.floor(Math.random() * statuses.length)] === 'rejected' ? 'Content guidelines violation' : undefined
  }));
};
