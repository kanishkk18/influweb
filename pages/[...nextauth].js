import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful!");
      
      localStorage.setItem("user", JSON.stringify({
        email: data.email,
        role: data.role,
        token: data.token,
      }));

      // Immediate redirect without setTimeout
      const redirectPath = data.role === "brand" ? "/brand" :
                         data.role === "creator" ? "/creator" : "/";
      router.push(redirectPath);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster
        position="top-left"
richColors  />
     
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block bg-neutral-100 dark:bg-neutral-950"></div>
        <div className="hidden lg:block bg-[#FF4D4D] dark:bg-[#CC3D3D]"></div>
      </div>
      
      <div className="relative">
        <div className="min-h-screen mx-auto">
          <div className="grid lg:grid-cols-2 min-h-screen">
            {/* Left Column - Login Form */}
            <div className="relative z-10 flex items-center justify-center px-4 lg:px-8 m-auto">
              <div className="w-full max-w-md">
                <a href="#" className="block mb-8">
                  <span className="text-2xl font-semibold tracking-tight">
                  Influeweb<span className="text-[#FF4D4D]">.</span>
                  </span>
                </a>

                <div className="mb-8">
                  <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome back</h1>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                  <Input
              onChange={handleChange}
              id="email"
              name="email"
              required
              type="email"
              value={userInfo.email}
              placeholder="Email address"
              className="w-full h-14 px-4 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl text-base focus:outline-hidden focus:border-[#FF4D4D] dark:focus:border-[#FF4D4D] transition-colors"

            />
                  </div>
                  
                  <div>
                  <Input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              required
              minLength={1}
              value={userInfo.password}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full h-14 px-4 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl text-base focus:outline-hidden focus:border-[#FF4D4D] dark:focus:border-[#FF4D4D] transition-colors"
            
            />
                   
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-2 border-neutral-300 dark:border-neutral-700 text-[#FF4D4D] focus:ring-[#FF4D4D]"
                      />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-[#FF4D4D] hover:text-[#FF6666] dark:hover:text-[#FF8080] transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 px-4 py-2 w-full h-14 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-base group"
                  >
                    Sign In
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
                      className="lucide lucide-arrow-right ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 px-4 py-2 h-12 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </button>
                    
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 px-4 py-2 h-12 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                     <Facebook/>
                      faceBook
                    </button>
                  </div>
                </div>

                <p className="mt-8 text-center text-neutral-600 dark:text-neutral-400">
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className="text-[#FF4D4D] hover:text-[#FF6666] dark:hover:text-[#FF8080] transition-colors"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Graphics */}
            <div className="relative lg:h-screen flex items-center">
              <div className="relative w-full aspect-square max-w-xl mx-auto">
                <div className="absolute w-72 h-72 rounded-2xl shadow-2xl transition-transform duration-500 ease-out hover:scale-105 bg-gradient-to-br from-[#FF4D4D] to-[#FF8080] rotate-[-10deg] z-30 left-0 top-1/2 -translate-y-1/2">
                  <div className="absolute inset-2 rounded-xl bg-neutral-100/10 backdrop-blur-xs overflow-hidden"><img className="rounded-lg" src="https://i.pinimg.com/736x/c8/dd/1a/c8dd1a29eada29364d331391507dbab8.jpg" alt="" /></div>
                </div>
                
                <div className="absolute w-72 h-72 rounded-2xl shadow-2xl transition-transform duration-500 ease-out hover:scale-105 bg-gradient-to-br from-neutral-900 to-neutral-800 rotate-[5deg] z-20 left-24 top-1/2 -translate-y-1/2">
                  <div className="absolute overflow-hidden inset-2 rounded-xl bg-neutral-100/10 backdrop-blur-xs"><img  className="rounded-lg" src="https://i.pinimg.com/474x/e7/4e/f0/e74ef0aaed855b60109d9fd12528fd73.jpg" alt="" /></div>
                </div>
                
                <div className="absolute w-72 h-72 rounded-2xl shadow-2xl transition-transform duration-500 ease-out hover:scale-105 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 rotate-[20deg] z-10 left-48 top-1/2 -translate-y-1/2">
                  <div className="absolute inset-2 rounded-xl overflow-hidden bg-neutral-100/10 backdrop-blur-xs"><img src="https://i.pinimg.com/736x/83/3d/51/833d51f009221321b8464473e3f97cf9.jpg" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
      {/* <Footer /> */}
    </>
  );
}

