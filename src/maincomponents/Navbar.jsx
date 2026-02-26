import React from 'react'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
export default function Navbar() {
  return (
    <div className='w-full fixed border  bg-white/90 dark:bg-gray-950/90 drop-shadow-md/20 overflow-x-hidden z-50'>
        <nav className='w-70 p-4 mx-auto   flex justify-between items-center sm:w-120 md:w-150 lg:w-240'>
      
            <div>
                <h1 className='text-6 font-bold text-black tracking-widest dark:text-white'>CHIZLAB</h1>
            </div>
         <div>
               <ul className=' text-dark hidden sm:flex gap-5 text-[16px]'>
                <a href="#"><li className='hover:text-gray-700  dark:hover:text-blue-400/80'>Bosh sahifa</li></a>
                <a href="#"><li className='hover:text-gray-700 dark:hover:text-blue-400/80'>Haqida</li></a>
                <a href="#"><li className='hover:text-gray-700 dark:hover:text-blue-400/80'>Kittoblar</li></a>
            </ul>
         </div>
         <div className='flex gap-4 items-center'>
               <button className='px-3 py-1.5 cursor-pointer bg-blue-500 text-white font-bold rounded-md'>
                login 
            </button>
        <AnimatedThemeToggler />
         </div>
     
        </nav>
    </div>
  )
}
