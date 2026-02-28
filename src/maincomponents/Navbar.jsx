
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
 const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
   setIsAuth(false)
  };

  return (
    <div className="w-full fixed border top-7 bg-white/90 dark:bg-black z-50">
      <nav className="w-90 p-4 mx-auto flex justify-between items-center sm:w-120 md:w-150 lg:w-[1140px]">
        
       
        <div>
          <h1 className="text-6 font-bold text-black tracking-widest dark:text-white">
            CHIZLAB
          </h1>
        </div>

      
        <div>
          <ul className="text-dark hidden md:flex gap-7 text-[16px]">
            <Link to="/">
              <li className="relative cursor-pointer hover:text-gray-400 dark:hover:text-blue-400/80 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                Bosh sahifa
              </li>
            </Link>

            <Link to="/about">
              <li className="relative cursor-pointer hover:text-gray-400 dark:hover:text-blue-400/80 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                 Sayt haqida
              </li>
            </Link>

            <Link to="/books">
              <li className="relative cursor-pointer hover:text-gray-400 dark:hover:text-blue-400/80 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                Kitoblar
              </li>
            </Link>
          </ul>
          {/* Burger menu */}
          <div className="flex md:hidden">
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          {/* Burger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>     <Link to="/">
           
                Bosh sahifa
             
            </Link></DropdownMenuItem>
        <DropdownMenuItem>    <Link to="/about">
              Sayt haqida
           
            </Link></DropdownMenuItem>
        <DropdownMenuItem> <Link to="/books">
              Kitoblar
             
            </Link></DropdownMenuItem>
 
      </DropdownMenuContent>
    </DropdownMenu>
          </div>
        </div>


        <div className="flex gap-4 items-center">
          <TooltipProvider>

       {/* Login button */}
            {!isAuth && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/login">
                    <button className="px-3 py-1.5 cursor-pointer bg-blue-500 text-white font-semibold rounded-md">
                      Tizimga kirish
                    </button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Akauntga kirish uchun bosing!</p>
                </TooltipContent>
              </Tooltip>
            )}
{/* user Profile  */}
            {isAuth && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className=" border-gray-800 rounded-full border-1 p-0.5 shadow-md dark:border-white">
                    <Avatar className="cursor-pointer bg-black text-white dark:bg-white dark:text-black">
                      <AvatarFallback><img src="avatar2.png" alt="" /></AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-white text-black dark:bg-black dark:text-white border"
                >
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profil</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout}>
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

          </TooltipProvider>

          {/* THEME BUTTON (tegmadim) */}
          <AnimatedThemeToggler />
        </div>
      </nav>
    </div>
  );
}