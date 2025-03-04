// "use client"

// import { useState, useEffect } from "react"
// import { getWaitlistCount } from "@/actions/waitlist"
// import { Avatar } from "../ui/avatar"
// import { SocialIcon } from "../ui/social-icon"
// import { WaitlistForm } from "./waitlist-form"
// import { Facebook, Instagram, Linkedin, XCircleIcon } from "lucide-react"
// import { BiLogoDiscord } from "react-icons/bi"

// export function WaitlistSignup() {
//   const [waitlistCount, setWaitlistCount] = useState(0)

//   useEffect(() => {
//     getWaitlistCount().then((count) => setWaitlistCount(count + 100))
//   }, [])

//   const handleSuccess = (count) => {
//     setWaitlistCount(count + 100)
//   }

//   return (
//     <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
//       <div className="flex-1 flex flex-col justify-center items-center text-center">
//         <div>
//           <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
//             Join Our Product Launch Waitlist
//           </h2>
//         </div>
//         <div>
//           <p className="text-lg sm:text-xl mb-8 text-gray-300">
//             Be part of something truly extraordinary. Join thousands of others already gaining early access to our
//             revolutionary new product.
//           </p>
//         </div>
//         <div className="w-full">
//           <WaitlistForm onSuccess={handleSuccess} />
//         </div>
//         <div>
//           <div className="flex items-center justify-center mt-8">
//             <div className="flex -space-x-2 mr-4">
//               <Avatar initials="JD" index={0} />
//               <Avatar initials="AS" index={1} />
//               <Avatar initials="MK" index={2} />
//             </div>
//             <p className="text-white font-semibold">{waitlistCount}+ people on the waitlist</p>
//           </div>
//         </div>
//       </div>
//       <div className="pt-8 flex justify-center space-x-6">
//         <SocialIcon
//           href="https://x.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="X (formerly Twitter)"
//           icon={<XCircleIcon className="w-6 h-6" />}
//         />
//         <SocialIcon
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Instagram"
//           icon={<Instagram className="w-6 h-6" />}
//         />
//         <SocialIcon
//           href="https://discord.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Discord"
//           icon={<BiLogoDiscord className="w-6 h-6" />}
//         />
//         <SocialIcon
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Facebook"
//           icon={<Facebook className="w-6 h-6" />}
//         />
//         <SocialIcon
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="LinkedIn"
//           icon={<Linkedin className="w-6 h-6" />}
//         />
//       </div>
//     </div>
//   )
// }

