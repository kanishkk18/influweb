import React, { useState } from "react";
import HowItWorks from "@/components/home/HowItWorks";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import HomeCard from "@/components/home/HomeCard";

import Creator from "@/model/Creator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import Waitlist from "@/components/waitlist/page"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Navbar from '@/components/Navbar';
import GradientCard from "@/components/ui/gradientCard";



function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
              duration: 0.3,
              delay: index * 0.15,
              ease: "easeOut",
          }}
          className={cn(
              "group rounded-lg border-[0.5px] border-gray-800/50",
              "transition-all duration-200 ease-in-out",
              isOpen
                  ? "bg-linear-to-br from-white/5 dark:via-white/2 to-white/5"
                  : "hover:bg-white/[0.02]"
          )}
      >
          <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4"
          >
              <h3
                  className={cn(
                      "text-base font-medium transition-colors duration-200 text-left",
                      "text-gray-300",
                      isOpen && "text-white"
                  )}
              >
                  {question}
              </h3>
              <motion.div
                  animate={{
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.1 : 1,
                  }}
                  transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                  }}
                  className={cn(
                      "p-0.5 rounded-full shrink-0",
                      "transition-colors duration-200",
                      isOpen
                          ? "text-primary"
                          : "text-gray-500"
                  )}
              >
                  <ChevronDown className="h-4 w-4" />
              </motion.div>
          </button>
          <AnimatePresence initial={false}>
              {isOpen && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                              height: {
                                  duration: 0.4,
                                  ease: [0.04, 0.62, 0.23, 0.98],
                              },
                              opacity: {
                                  duration: 0.25,
                                  delay: 0.1,
                              },
                          },
                      }}
                      exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                              height: {
                                  duration: 0.3,
                                  ease: "easeInOut",
                              },
                              opacity: {
                                  duration: 0.25,
                              },
                          },
                      }}
                  >
                      <div className="px-6 pb-4 pt-2">
                          <motion.p
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -8, opacity: 0 }}
                              transition={{
                                  duration: 0.3,
                                  ease: "easeOut",
                              }}
                              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                          >
                              {answer}
                          </motion.p>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
      </motion.div>
  );
}

const faqs = [] = [
  {
      question: "What makes your platform unique?",
      answer: "Our platform stands out through its intuitive design, powerful automation capabilities, and seamless integration options. We've focused on creating a user experience that combines simplicity with advanced features.",
  },
  {
      question: "How does the pricing structure work?",
      answer: "We offer flexible, transparent pricing tiers designed to scale with your needs. Each tier includes a core set of features, with additional capabilities as you move up. All plans start with a 14-day free trial.",
  },
  {
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support through multiple channels. This includes 24/7 live chat, detailed documentation, video tutorials, and dedicated account managers for enterprise clients.",
  },
  {
      question: "How can I get started?",
      answer: "You can get started by signing up for a free trial. Once you've signed up, you'll have access to our platform's full range of features. You can also contact our support team for assistance.",
  },
];
const index = () => {
  const creator = [
    {
      _id: "1",
      name: "john_doe",
      username: "john_doe",
      profileImage: "https://i.pinimg.com/736x/af/8a/b4/af8ab4550c6b7d2d6f61fe839a4580a5.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "Instagram" }],
      packages: [{ price: "$50" }],
      category: "Tech",
    },
    {
      _id: "2",
      username: "jane_smith",
      profileImage: "https://i.pinimg.com/474x/a6/e3/1b/a6e31b8357e6fe828b9c52f4c7d07b32.jpg",
      platforms: [{ platform: "TikTok" }, { platform: "Twitch" }],
      packages: [{ price: "$40" }],
      category: "Gaming",
    },
    {
      _id: "3",
      username: "mark_travel",
      profileImage: "https://i.pinimg.com/474x/89/b9/db/89b9dbb94d8bf13215c2e82d4ee94c33.jpg",
      platforms: [{ platform: "Facebook" }, { platform: "YouTube" }],
      packages: [{ price: "$60" }],
      category: "Travel",
    },
    {
      _id: "4",
      username: "lisa_fitness",
      profileImage: "https://i.pinimg.com/474x/d7/1f/9e/d71f9e2f67f2abeb495afeebc7351d34.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "YouTube" }],
      packages: [{ price: "$70" }],
      category: "Fitness",
    },
    {
      _id: "5",
      username: "alex_foodie",
      profileImage: "https://i.pinimg.com/736x/63/2d/aa/632daae3fcaa72624e32a4e9df3eed59.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "TikTok" }],
      packages: [{ price: "$55" }],
      category: "Food",
    },
    {
      _id: "6",
      username: "sara_art",
      profileImage: "https://i.pinimg.com/736x/61/25/d8/6125d88deaa06f6a546ad948cd008e12.jpg",
      platforms: [{ platform: "Pinterest" }, { platform: "Instagram" }],
      packages: [{ price: "$45" }],
      category: "Art",
    },
    {
      _id: "7",
      username: "mike_coder",
      profileImage: "https://i.pinimg.com/736x/51/23/8f/51238f09d25a4a82fa0ff8d5c7a6ea2b.jpg",
      platforms: [{ platform: "GitHub" }, { platform: "YouTube" }],
      packages: [{ price: "$80" }],
      category: "Programming",
    },
    {
      _id: "8",
      username: "emily_dance",
      profileImage: "https://i.pinimg.com/736x/8f/9e/d7/8f9ed7b2badaf48b1d9925253aec6ed6.jpg",
      platforms: [{ platform: "TikTok" }, { platform: "Instagram" }],
      packages: [{ price: "$50" }],
      category: "Dance",
    },
    {
      _id: "9",
      username: "robert_photography",
      profileImage: "https://i.pinimg.com/736x/be/fe/b5/befeb5b82031ada8b823a594707f1a9d.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "Flickr" }],
      packages: [{ price: "$65" }],
      category: "Photography",
    },
    {
      _id: "10",
      username: "chris_music",
      profileImage: "https://i.pinimg.com/736x/da/fe/15/dafe155b72be46e0c1f64b8a03540a36.jpg",
      platforms: [{ platform: "Spotify" }, { platform: "YouTube" }],
      packages: [{ price: "$75" }],
      category: "Music",
    },
    {
      _id: "11",
      username: "natalie_fashion",
      profileImage: "https://i.pinimg.com/736x/af/86/6f/af866fbd51e42f27c1a92e91c15aa1c5.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "Pinterest" }],
      packages: [{ price: "$90" }],
      category: "Fashion",
    },
    {
      _id: "12",

      username: "david_film",
      profileImage: "https://i.pinimg.com/736x/ad/cb/72/adcb72d1fc1942edce89f5a6258bab85.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "Vimeo" }],
      packages: [{ price: "$85" }],
      category: "Filmmaking",
    },
  ];


  return (
    <>
    <Navbar/>
 <div className=" min-h-screen justify-center items-center flex  mx-auto px-4 sm:px-6 lg:px-8 bg-black/90">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
        {/* Left Column */}

        <div className="relative">
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <p className="Welcome-text text-sm font-semibold cursor-pointer">
            Influwebhub is now public!
          </p>            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Influencer Marketing
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-orange-400">
              Made Easy.
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed">
            Find and hire top Instagram, YouTube and Facebook influencers to create unique content for your brand


            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors py-1.5 h-14 px-8 bg-white text-zinc-900 hover:bg-zinc-100 text-base group">
                Get Started 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <Link href="/featured/page" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border py-2 h-14 px-8 bg-black border-zinc-800 text-white hover:bg-white/5">
                Featured
              </Link>
            </div>

            {/* Awards Section */}
            <div className="pt-12 border-t border-zinc-800">
              <div className="flex gap-8">
                {[1, 2, 3].map((award) => (
                  <div key={award} className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
                    </div>
                    <div className="text-sm text-zinc-400">Award {award}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Grid Cards */}
        <div className="relative lg:h-[600px]">
  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-orange-500/10 rounded-3xl blur-3xl" />

  <div className="relative h-full grid grid-cols-2 grid-rows-2 gap-4">
  {/* Large Card */}
  <div className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-transform hover:scale-[1.02] row-span-2">
    <img src="https://i.pinimg.com/736x/e0/4f/2a/e04f2a52d851631a858ad0ccc07fd39a.jpg" alt="" />
  </div>

  {/* Small Cards with Dynamic Images */}
  {[
    {
      img: "https://i.pinimg.com/736x/e3/fe/ff/e3fefff1c28622a441609da145540ee8.jpg",
      name: "Sofia",
    },
    {
      img: "https://i.pinimg.com/736x/c9/24/50/c92450ced172f5c8270caa43affab948.jpg",
      name: "Emily",
    },
    {
      img: "https://i.pinimg.com/736x/b7/47/89/b74789abcbaee6d80a70b4df4c2fde21.jpg",
      name: "Olivia",
      small: true, // Mark this card as small
    },
  ].map((card, index) => (
    <div
      key={index}
      className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative z-10 flex justify-center items-center ">
        <div
          className={`rounded-xl bg-white/10 overflow-hidden ${
            card.small ? "w-full h-40" : "w-full h-full object-cover"
          }`} // Reduce size if marked as small
        >
          <img src={card.img} alt={card.name} className="w-full h-full object-fill" />
        </div>
      </div>
    </div>
  ))}
</div>

</div>

      </div>
    </div>

    
     
      <div className="mt-20">

        <div className='absolute -top-5 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#AE48FF] before:via-[#6C47FF] before:via-[25%] before:to-[#18CCFC] before:opacity-50 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-3/4 after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#AE48FF] after:via-[#6C47FF] after:via-[25%] after:to-[#18CCFC] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]' />
        <div className='absolute inset-0 isolate z-10 overflow-hidden before:absolute before:inset-0 before:bg-[url(/img/grid.svg)] before:[mask:radial-gradient(ellipse_farthest-side_at_50%_-25vw,black,transparent)] dark:before:opacity-10'>
          <div className='absolute left-1/2 top-0 h-12 w-1/2 -translate-x-1/2 -translate-y-3/4 rounded-[50%] bg-gradient-to-r from-[#AE48FF] via-[#6C47FF] via-[25%] to-[#18CCFC] opacity-20 blur-xl' />
        </div>
      </div>
      {/* value proposition section */}

  
      <div>
        <div className="relative isolate">
          <div>
            <div className="mx-auto max-w-7xl my-4">
              <h1 className="text-xl font-semibold">Featured</h1>
              <p className="max-w-prose text-zinc-400">
                Hire top influencers across all platforms
              </p>
          
              <ScrollArea className="w-full  whitespace-nowrap rounded-2xl p-4 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(0, 4).map((item) => (
      <Link
        key={item._id}
        href={`/creator/${item.username}`}
        className="block w-full max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

            </div>
            {/* Instagram */}
            <div className="mx-auto max-w-7xl px-6 my-16">
              <h1 className="text-xl font-semibold">Instagram</h1>
              <p className="max-w-prose text-zinc-400">
                Hire Instagram influencers
              </p>
              <ScrollArea className="w-full  whitespace-nowrap rounded-2xl p-4 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(4, 8).map((item) => (
      <Link
        key={item._id}
        href={`/creator/${item.username}`}
        className="block w-full max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

            </div>
            {/* Youtube */}
            <div className="mx-auto max-w-7xl px-6 my-16">
              <h1 className="text-xl font-semibold">Youtube</h1>
              <p className="max-w-prose text-zinc-400">
                Hire Youtube influencers
              </p>
              <ScrollArea className="w-full  whitespace-nowrap rounded-2xl p-4 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(8, 12).map((item) => (
      <Link
        key={item._id}
        href={`/creator/${item.username}`}
        className="block w-full max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>


            </div>
          </div>
        </div>
        <GradientCard/>
        <Waitlist/>
        <section className="py-10 min-w-full bg-black">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl font-semibold mb-3 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-400">
                        Everything you need to know about our platform
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto space-y-2 ">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={cn(
                        "max-w-md mx-auto mt-12 p-6 rounded-lg text-center"
                    )}
                >
                    <div className="inline-flex items-center justify-center p-1.5 rounded-full  mb-4">
                        <Mail className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">
                        Still have questions?
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                        We're here to help you
                    </p>
                    <button
                        type="button"
                        className={cn(
                            "px-4 py-2 text-sm rounded-md",
                            "bg-gray-900 dark:bg-white text-white dark:text-gray-900",
                            "hover:bg-gray-800 dark:hover:bg-gray-100",
                            "transition-colors duration-200",
                            "font-medium"
                        )}
                    >
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
 
      </div>
      
    </>
  );
};

export default index;
