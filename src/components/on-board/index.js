// "use client"

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
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#cc76f4] dark:via-[#3793FF]  dark:to-[#4300B1] flex items-center justify-center p-6">
//     <div className="max-w-2xl w-full bg-white mt-6 dark:bg-transparent/30 shadow-lg rounded-xl p-8 transition-colors duration-300">
//       <Tabs value={currentTab} onValueChange={handleTabChange}>
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
//             Join the Influence Network
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-2">
//             Set up your profile as an Influencer or Vendor
//           </p>
//           <TabsList className="mt-6 justify-center w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full ">
//             <TabsTrigger
//               value="influencer"
//               className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500"
//             >
//               Influencer
//             </TabsTrigger>
//             <TabsTrigger
//               value="vendor"
//               className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
//             >
//               Vendor
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="influencer" className="mt-6">
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//               Influencer Profile
//             </h2>
//           <CommonForm
//             action={createProfile}
//             formData={candidateFormData}
//             setFormData={setCandidateFormData}
//             formControls={candidateOnboardFormControls}
//             buttonText={"Onboard as Influencer"}
//             handleFileChange={handleFileChange}
//             isBtnDisabled={!handleCandidateFormValid()}
//           />
//           </div>
//         </TabsContent>
//         <TabsContent value="vendor" className="mt-6">
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
//                 Vendor Profile
//               </h2>
//           <CommonForm
//             formControls={recruiterOnboardFormControls}
//             buttonText={"Onboard as Vendor"}
//             formData={recruiterFormData}
//             setFormData={setRecruiterFormData}
//             // isBtnDisabled={!handleRecuiterFormValid()}
//             action={createProfile}
//           />
//        </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default OnBoard;


"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function CommonForm({
  action,
  formControls,
  buttonText,
  isBtnDisabled,
  formData,
  setFormData,
  handleFileChange,
  isLoading,
}) {
  function renderInputByComponentType(control) {
    switch (control.componentType) {
      case "input":
        return (
          <div className="relative flex items-center mt-8">
            <Input
              type={control.type || "text"}
              disabled={control.disabled}
              placeholder={control.placeholder}
              name={control.name}
              id={control.name}
              value={formData[control.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
            />
          </div>
        );

      case "file":
        return (
          <Label className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer">
            <h2>{control.label}</h2>
            <Input
              onChange={handleFileChange}
              id={control.name}
              type="file"
              className="hidden"
            />
          </Label>
        );

      default:
        return (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={control.disabled}
              placeholder={control.placeholder}
              name={control.name}
              id={control.name}
              value={formData[control.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full rounded-xl h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
            />
          </div>
        );
    }
  }

  return (
    <form onSubmit={action}>
      {formControls.map((control) => (
        <div key={control.name}>{renderInputByComponentType(control)}</div>
      ))}
      <div className="mt-6 w-full">
        <Button
          type="submit"
          className={`flex h-11 items-center justify-center px-5 ${
            isBtnDisabled || isLoading ? "opacity-60" : ""
          }`}
          disabled={isBtnDisabled || isLoading}
        >
          {isLoading ? "Processing..." : buttonText}
        </Button>
      </div>
    </form>
  );
}

export default function OnBoard() {
  const router = useRouter();
  const { user } = useUser();
  const [currentTab, setCurrentTab] = useState("candidate");
  const [formData, setFormData] = useState(
    currentTab === "candidate" ? initialCandidateFormData : initialRecruiterFormData
  );
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadResume = async () => {
    if (!file) return null;
    
    try {
      const fileName = `resumes/${Date.now()}_${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from("job-board-public")
        .upload(fileName, file);
      
      if (error) throw error;
      return data.path;
    } catch (err) {
      setError("Failed to upload resume");
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let resumePath = null;
      if (currentTab === "candidate" && file) {
        resumePath = await uploadResume();
        if (!resumePath) return;
      }

      const profileData = {
        ...(currentTab === "candidate" 
          ? { candidateInfo: { ...formData, resume: resumePath } }
          : { recruiterInfo: formData }),
        role: currentTab,
        isPremiumUser: false,
        userId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
      };

      await createProfileAction(profileData, "/");
      router.push("/");
    } catch (err) {
      setError("Onboarding failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = currentTab === "candidate"
      ? ["name", "email", "skills", "currentJobLocation"]
      : ["name", "companyName", "email"];
    
    return requiredFields.every(field => 
      formData[field] && formData[field].toString().trim().length > 0
    );
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#cc76f4] dark:via-[#3793FF]  dark:to-[#4300B1] flex items-center justify-center p-6">
<div className="max-w-2xl w-full bg-white mt-6 dark:bg-transparent/30 shadow-lg rounded-xl p-8 transition-colors duration-300">      <Tabs 
        value={currentTab} 
        onValueChange={(tab) => {
          setCurrentTab(tab);
          setFormData(tab === "candidate" ? initialCandidateFormData : initialRecruiterFormData);
          setFile(null);
          setError(null);
        }}
        className="w-full"
      >
         <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Join the Influence Network
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Set up your profile as an Influencer or Vendor
          </p>
          <TabsList className="mt-6 justify-center w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full ">
            <TabsTrigger
              value="candidate"
              className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500"
            >
              Influencer
            </TabsTrigger>
            <TabsTrigger
              value="recruiter"
              className="rounded-full w-full py-2 text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
            >
              Vendor
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="candidate" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Influencer Profile
            </h2>
          <CommonForm
            action={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            formControls={candidateOnboardFormControls}
            buttonText="Onboard as Influencer"
            handleFileChange={handleFileChange}
            // isBtnDisabled={!isFormValid()}
            isLoading={isLoading}
          />
</div>
</TabsContent>


<TabsContent value="recruiter" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Vendor Profile
              </h2>
          <CommonForm
            action={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            formControls={recruiterOnboardFormControls}
            buttonText="Onboard as recruiter"
            // isBtnDisabled={!isFormValid()}
            isLoading={isLoading}
          />
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  </div>
  );
}