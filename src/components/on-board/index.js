"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://ymsijpnegskkoiuerthi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
);   

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  console.log(candidateFormData);

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleRecuiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== ""
    );
  }

  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data, "/onboard");
  }

  console.log(candidateFormData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#cc76f4] dark:via-[#3793FF]  dark:to-[#4300B1] flex items-center justify-center p-6">
    <div className="max-w-2xl w-full bg-white mt-6 dark:bg-transparent/30 shadow-lg rounded-xl p-8 transition-colors duration-300">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Join the Influence Network
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Set up your profile as an Influencer or Vendor
          </p>
          <TabsList className="mt-6 justify-center w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full ">
            <TabsTrigger
              value="influencer"
              className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500"
            >
              Influencer
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
            >
              Vendor
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="influencer" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Influencer Profile
            </h2>
          <CommonForm
            action={createProfile}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as candidate"}
            handleFileChange={handleFileChange}
            // isBtnDisabled={!handleCandidateFormValid()}
          />
          </div>
        </TabsContent>
        <TabsContent value="vendor" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Vendor Profile
              </h2>
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            // isBtnDisabled={!handleRecuiterFormValid()}
            action={createProfile}
          />
       </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default OnBoard;


// "use client";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { TabsContent } from "@radix-ui/react-tabs";
// import { useEffect, useState } from "react";
// import CommonForm from "../common-form";
// import {
//   candidateOnboardFormControls,
//   initialCandidateFormData,
//   initialRecruiterFormData,
//   recruiterOnboardFormControls,
// } from "@/utils";
// import { useUser } from "@clerk/nextjs";
// import { createProfileAction } from "@/actions";
// import { createClient } from "@supabase/supabase-js";

// const supabaseClient = createClient(
//   "https://ymsijpnegskkoiuerthi.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
// );

// function OnBoard() {
//   const [currentTab, setCurrentTab] = useState("candidate");
//   const [recruiterFormData, setRecruiterFormData] = useState(
//     initialRecruiterFormData
//   );
//   const [candidateFormData, setCandidateFormData] = useState(
//     initialCandidateFormData
//   );
//   const [file, setFile] = useState(null);

//   const currentAuthUser = useUser();
//   const { user } = currentAuthUser;

//   function handleFileChange(event) {
//     event.preventDefault();
//     setFile(event.target.files[0]);
//   }

//   async function handleUploadPdfToSupabase() {
//     const { data, error } = await supabaseClient.storage
//       .from("job-board-public")
//       .upload(`/public/${file.name}`, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//     console.log(data, error);
//     if (data) {
//       setCandidateFormData({
//         ...candidateFormData,
//         resume: data.path,
//       });
//     }
//   }

//   console.log(candidateFormData);

//   useEffect(() => {
//     if (file) handleUploadPdfToSupabase();
//   }, [file]);

//   function handleTabChange(value) {
//     setCurrentTab(value);
//   }

//   function handleRecuiterFormValid() {
//     return (
//       recruiterFormData &&
//       recruiterFormData.name.trim() !== "" &&
//       recruiterFormData.companyName.trim() !== "" &&
//       recruiterFormData.companyRole.trim() !== ""
//     );
//   }

//   function handleCandidateFormValid() {
//     return Object.keys(candidateFormData).every(
//       (key) => candidateFormData[key].trim() !== ""
//     );
//   }

//   async function createProfile() {
//     const data =
//       currentTab === "candidate"
//         ? {
//             candidateInfo: candidateFormData,
//             role: "candidate",
//             isPremiumUser: false,
//             userId: user?.id,
//             email: user?.primaryEmailAddress?.emailAddress,
//           }
//         : {
//             recruiterInfo: recruiterFormData,
//             role: "recruiter",
//             isPremiumUser: false,
//             userId: user?.id,
//             email: user?.primaryEmailAddress?.emailAddress,
//           };

//     await createProfileAction(data, "/onboard");
//   }

//   console.log(candidateFormData);

//   return (
//     <div className="bg-white">
//       <Tabs value={currentTab} onValueChange={handleTabChange}>
//         <div className="w-full">
//           <div className="flex items-baseline justify-between border-b pb-6 pt-24">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Welcome to onboarding
//             </h1>
//             <TabsList>
//               <TabsTrigger value="candidate">Influencer</TabsTrigger>
//               <TabsTrigger value="recruiter">Vendor</TabsTrigger>
//             </TabsList>
//           </div>
//         </div>
//         <TabsContent value="candidate">
//           <CommonForm
//             action={createProfile}
//             formData={candidateFormData}
//             setFormData={setCandidateFormData}
//             formControls={candidateOnboardFormControls}
//             buttonText={"Onboard as candidate"}
//             handleFileChange={handleFileChange}
//             isBtnDisabled={!handleCandidateFormValid()}
//           />
//         </TabsContent>
//         <TabsContent value="recruiter">
//           <CommonForm
//             formControls={recruiterOnboardFormControls}
//             buttonText={"Onboard as recruiter"}
//             formData={recruiterFormData}
//             setFormData={setRecruiterFormData}
//             isBtnDisabled={!handleRecuiterFormValid()}
//             action={createProfile}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default OnBoard;

{/* <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#cc76f4] dark:via-[#3793FF]  dark:to-[#4300B1] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white mt-6 dark:bg-transparent/30 shadow-lg rounded-xl p-8 transition-colors duration-300">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Join the Influence Network
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Set up your profile as an Influencer or Vendor
            </p>
            <TabsList className="mt-6 justify-center w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full ">
              <TabsTrigger
                value="influencer"
                className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500"
              >
                Influencer
              </TabsTrigger>
              <TabsTrigger
                value="vendor"
                className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
              >
                Vendor
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="influencer" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Influencer Profile
              </h2>
              <CommonForm
                action={createProfile}
                formData={influencerFormData}
                setFormData={setInfluencerFormData}
                formControls={candidateOnboardFormControls}
                buttonText={"Join as Influencer"}
                handleFileChange={handleFileChange}
                isBtnDisabled={!handleInfluencerFormValid()}
              />
            </div>
          </TabsContent>

          <TabsContent value="vendor" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Vendor Profile
              </h2>
              <CommonForm
                formControls={recruiterOnboardFormControls}
                buttonText={"Join as Vendor"}
                formData={vendorFormData}
                setFormData={setVendorFormData}
                isBtnDisabled={!handleVendorFormValid()}
                action={createProfile}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div> */}