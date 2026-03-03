import React from 'react'
import { LoaderIcon } from "lucide-react";
export default function Loader() {
  return (
    <div className=' fixed w-full h-screen inset-0 bg-gray-900/80 flex justify-center items-center z-100'>
        <LoaderIcon className="animate-spin text-white" />
    </div>
  )
}



// Second loader 

// import { Spinner } from "../components/ui/spinner";

// const Loader = () => {
//   return (
//      <div className=" gap-6 fixed w-full h-screen inset-0 bg-white/60 flex justify-center items-center z-100">

//       <Spinner className="size-8" />
  
//     </div>
//   );
// }



// export default Loader;
