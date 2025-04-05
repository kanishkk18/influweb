import { getCalApi } from "@calcom/embed-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function FloatingBubble ()  {
  const { isSignedIn, isLoaded } = useUser();
  const [showBubble, setShowBubble] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // 1. Calendly Initialization Effect - Runs only once when component mounts
  useEffect(() => {
    // Only load Calendly when the bubble is shown to non-signed-in users
    if (!isLoaded || isSignedIn) return;

    (async function () {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi({ namespace: "15min" });
        cal("ui", { 
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      } catch (error) {
        console.error("Failed to load Calendly", error);
      }
    })();
  }, [isLoaded, isSignedIn]); // Only re-run if auth status changes

  // 2. Bubble Visibility Effect (your existing effect)
  useEffect(() => {
    if (!isLoaded) return;
    
    let intervalId;
    let timeoutId;

    if (!isSignedIn) {
      const showBubbleWithTimeout = () => {
        setShowBubble(true);
        timeoutId = setTimeout(() => setShowBubble(false), 10000);
      };

      if (initialLoad) {
        showBubbleWithTimeout();
        setInitialLoad(false);
      }
      
      intervalId = setInterval(showBubbleWithTimeout, 20000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isSignedIn, isLoaded, initialLoad]);

  if (!isLoaded || isSignedIn) return null;

    return (
        <div className="fixed bottom-10 right-10 z-[1000]">
              <div
                data-cal-namespace="15min"
                data-cal-link="kanishkkb18/15min"
                data-cal-config='{"layout":"month_view"}'
                className="cursor-pointer group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-pulse shadow-lg flex items-center justify-center relative">
                  <span className="text-white text-2xl">✨</span>
                  {showBubble && (
                    <div className="absolute bottom-full right-0 mb-3 w-56 bg-white text-sm text-gray-800 px-4 py-2 rounded shadow-lg">
                       don't wanna log in? click here 👇
                    </div>
                  )}
                </div>
              </div>
            </div>
          
          );
        };