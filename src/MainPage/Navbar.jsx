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
    setIsAuth(false);
  };

  return (
    <div className="w-full fixed border top-7 bg-white/90 dark:bg-black z-50">
      <nav className="w-90 p-4 mx-auto flex justify-between items-center sm:w-120 md:w-150 lg:w-[1140px]">
        <div>
          <a href="#">
            <h1 className="text-6 font-bold text-black tracking-widest dark:text-white cursor-pointer">
              CHIZLAB
            </h1>
          </a>
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
                <DropdownMenuItem>
                  {" "}
                  <Link to="/">Bosh sahifa</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link to="/about">Sayt haqida</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link to="/books">Kitoblar</Link>
                </DropdownMenuItem>
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
                      <AvatarFallback>
                        <img src="avatar2.png" alt="" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-white text-black dark:bg-black dark:text-white border"
                >
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profilga o'tish</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex items-center gap-2">
                      <span>
                        <svg className="text-red-700"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <p className="text-red-700"> Chiqish</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </TooltipProvider>

          {/* THEME BUTTON (tegmadim) */}
          <AnimatedThemeToggler className="cursor-pointer" />
        </div>
      </nav>
    </div>
  );
}
