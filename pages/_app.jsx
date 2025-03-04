
import { useState } from "react";
import { ThemeProvider } from '@/components/ThemeProvider.jsx';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider,  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,} from "@clerk/nextjs";





export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
    <ThemeProvider
            attribute="class"
           
            enableSystem
            disableTransitionOnChange
          >
       <QueryClientProvider client={queryClient}>       
     
      {/* <div className='absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]' /> */}
      <Component {...pageProps} />
      {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
    </QueryClientProvider>
    </ThemeProvider>
    </ClerkProvider>
  );
}
