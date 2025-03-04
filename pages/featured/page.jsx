"use client"

import { useState } from "react"
import DynamicFrameLayout from "@/components/ui/DynamicFrameLayout"
import { ppEditorialNewUltralightItalic, inter } from "@/lib/font"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size

  return (
    <div className="">
      <Navbar/>
    <div
      className="min-h-screen bg-[#141414] flex items-center justify-center p-8"
    >

      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className=" text-4xl md:text-5xl font-light italic text-white/80 tracking-tighter leading-[100%]"
             
            >
              Brands
              <br />
              Influencers
              <br />
             collabration with influwebhub
            </h1>
            <div
              className=" flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]"
              
            >
              <div className="space-y-3">
              <div className="h-px bg-white/10 w-full" />
<p>
  InfluWebHub is the ultimate platform for brands and businesses to discover, connect with, and collaborate with top influencers across various industries. Whether you're looking for micro-influencers or global trendsetters, InfluWebHub makes influencer hiring seamless and effective.
</p>
<p>
  As part of our mission, we bridge the gap between brands and content creators, ensuring high-impact marketing campaigns driven by authentic engagement. With our advanced search, AI-powered recommendations, and in-depth analytics, we empower brands to find the perfect influencers for their needs.
</p>
<p>Explore some of our success stories and collaborations.</p>
<div className="h-px bg-white/10 w-full" />
</div>
            </div>
           
          </div>
         
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
    </div>
  )
}

