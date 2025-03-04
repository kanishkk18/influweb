import React from 'react';
import { Palette, Type, Grid, Image, BookOpen, Layers } from 'lucide-react';

function GradientCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-600 pb-10 flex flex-col items-center justify-center p-6">
      <div className="bg-purple-600 text-white font-medium px-6 py-2 rounded-full mb-4">
        influwebhub
      </div>
      
      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-16 text-center">
      How it Works
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl">
        {/* Card 1 - Logo System */}
        <Card 
          icon={<Layers className="w-10 h-10 text-purple-300" />}
          title="Search Influencers"
          description="Search through thousands of vetted Instagram and YouTube influencers."
        />
        
        {/* Card 2 - Color System */}
        <Card 
          icon={
            <div className="relative flex justify-center items-center p-1">
              <div className="absolute w-8 h-8 rounded-full bg-cyan-300 left-[0.1rem]"></div>
              <div className="absolute w-8 h-8 rounded-full bg-blue-600 right-[0.1rem]"></div>
            </div>
          }
          title="Purchase Securely"
          description="Safely purchase through us. We hold your payment until the work is completed"
        />
        
        {/* Card 3 - Type System */}
        <Card 
          icon={<Type className="w-10 h-10 text-white" />}
          title="Receive Quality Content"
          description="Receive your high quality content from influencers directly through the platform."
        />
        
        {/* Card 4 - Grid System */}
        <Card 
          icon={<Grid className="w-10 h-10 text-blue-400" />}
          title="Grid System"
          description="Professional scale logo management & guidelines"
        />
        
        {/* Card 5 - Icon & Image Library */}
        <Card 
          icon={<Image className="w-10 h-10 text-orange-400" />}
          title="Icon & Image Library"
          description="Professional scale logo management & guidelines"
        />
        
        {/* Card 6 - Full Brand Book */}
        <Card 
          icon={<BookOpen className="w-10 h-10 text-white" />}
          title="Full Brand Book"
          description="Professional scale logo management & guidelines"
        />
      </div>
    </div>
  );
}

// Card component with shining border effect
function Card({ icon, title, description }) {
  return (
    <div className="relative group">
      {/* Shining border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600  rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
      
      <div className="relative flex flex-col items-center py-8 px-6 border-l-[1.7px] border-t-[1.7px] border-neutral-700 bg-black rounded-2xl shadow-xl">
        {/* Icon container */}
        <div className="w-24 h-24 flex items-center justify-center border border-gray-800 rounded-lg mb-6">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm text-center">{description}</p>
      </div>
    </div>
  );
}

export default GradientCard;