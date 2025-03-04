import React from "react";
import { motion } from "framer-motion";
import { SearchInfluencer } from "@/components/SearchInfluencer";
import HomeCard from "@/components/home/HomeCard";
import Navbar from "@/components/Navbar";

// Add this to your main CSS file:
// @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

const ElegantShape = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration:2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
};

const Index = ({
  badge = "influWebHub",
  title1 = "Connect, Collaborate,",
  title2 = " Influence",
}) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-amber-500/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <img 
                src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1740647241/CONFERIO/dbbzjpqczmrz7cw8pf3w.png" 
                alt="" 
                style={{ width: 20, height: 20 }}
              />
              <span className="text-sm text-white/60 tracking-wide">{badge}</span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  {title1}
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 font-pacifico">
                  {title2}
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Connecting Brands with Influencers Through Smart Technology.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </div>

      <SearchInfluencer />
      
      {/* Featured Section */}
      <div className="mx-auto max-w-7xl px-6 my-4">
        <h1 className="text-xl font-semibold">Featured</h1>
        <p className="max-w-prose text-zinc-400">
          Hire top influencers across all platforms
        </p>
        <div className="mt-10 flow-root">
          <div className="m-2 flex flex-row justify-evenly gap-4 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {[
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Kabita-Singh-one-of-the-leading-Indian-Instagram-influencers-shares-her-easy-going-homemade-recipes-with-her-857K-large-family-on-Instagram..png",
                platform: "Instagram",
                price: 8500,
                categories: ["Cooking", "Humor", "Lifestyle", "Fun"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Siddhartha-Joshi-is-one-of-the-best-Indian-Instagram-influencers-with-adventurous-travelogues-and-beautiful-trip-clicks..png",
                platform: "Youtube",
                price: 500,
                categories: ["Professional Mermaid", "Zoologist", "Entrepreneur"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Ankush-Bahuguna-one-of-the-most-famous-young-influencers-in-India-known-for-his-funny-satires-and-roasts..png",
                platform: "Youtube",
                price: 2500,
                categories: ["Fashion", "Travel", "Lifestyle Content Creator"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Aashna-Shroff-a-leading-Indian-fashion-and-lifestyle-influencer-with-a-918K-follower-count-on-Instagram.png",
                platform: "Instagram",
                price: 1600,
                categories: ["Entrepreneur", "Business Owner & Lifestyle Content"]
              }
            ].map((card, index) => (
              <HomeCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="mx-auto max-w-7xl px-6 my-16">
        <h1 className="text-xl font-semibold">Instagram</h1>
        <p className="max-w-prose text-zinc-400">Hire Instagram influencers</p>
        <div className="mt-10 flow-root">
          <div className="m-2 flex flex-row justify-evenly gap-4 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {[
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Sahil-Khan-a-leading-health-and-fitness-influencer-in-India-with-a-family-of-10.4M-on-Instagram.png",
                platform: "Instagram",
                price: 1800,
                categories: ["Cooking", "Humor", "Lifestyle", "Fun"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Bani-J-a-popular-name-amongst-the-young-influencers-in-India-has-a-following-of-about-1.5M-on-Instagram..png",
                platform: "Instagram",
                price: 5600,
                categories: ["Fitness", "Gym", "Healthy Lifestyle"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Sonali-Swami-one-of-the-top-Instagram-influencers-in-India-with-a-326K-following-that-loves-her-determination-and-idolizes-her-passion-for-fitness..png",
                platform: "Instagram",
                price: 3200,
                categories: ["Fashion", "Gym", "Fitness Content Creator"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Deepa-Khosla-is-one-of-the-leading-Indian-influencers-in-USA-who-is-known-for-her-fashion-tips-and-the-latest-style-updates.png",
                platform: "Instagram",
                price: 1200,
                categories: ["Fashion", "Entrepreneur", "Lifestyle Content"]
              }
            ].map((card, index) => (
              <HomeCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mx-auto max-w-7xl px-6 my-16">
        <h1 className="text-xl font-semibold">Youtube</h1>
        <p className="max-w-prose text-zinc-400">Hire Youtube influencers</p>
        <div className="mt-10 flow-root">
          <div className="m-2 flex flex-row justify-evenly gap-4 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {[
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Ganesh-Vanare-is-an-Indian-Instagram-influencer-who-loves-seeing-new-places-and-vlogs-it-for-his-506K-followers-on-Instagram-to-enjoy-as-well..png",
                platform: "Youtube",
                price: 3000,
                categories: ["Comedy Content", "Humor", "Fun"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Komal-Pandey-a-top-Indian-Instagram-influencer-who-shares-the-latest-trends-fashion-ideas-and-lifestyle-updates-to-her-1.5-million-followers..png",
                platform: "Youtube",
                price: 500,
                categories: ["Ads Specialist", "Zoologist", "Entrepreneur"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Kritika-Khurana-A.K.A-%E2%80%98that-Boho-Girl-with-her-trending-style-updates-and-fashion-ideas-that-her-1.5M-followers-love-her-for..png",
                platform: "Youtube",
                price: 800,
                categories: ["Fashion", "Travel", "Luxury Brands"]
              },
              {
                imageLink: "https://www.influencer.in/wp-content/uploads/2020/12/Sadaf-Hussain-a-famous-Indian-Instagrammer-shares-his-amazing-make-at-home-recipes-with-his-29.3K-followers..png",
                platform: "Youtube",
                price: 600,
                categories: ["Daily Life Hacks", "Fun", "Business Owner"]
              }
            ].map((card, index) => (
              <HomeCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-[540px] w-full mx-auto my-4 overflow-hidden">
      
      <iframe
        src="https://www.instagram.com/reel/DEnFz9AhDCx/embed"
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
        className="w-full"
      ></iframe>

      
    </div> */}
    </section>
  );
};

export default Index;