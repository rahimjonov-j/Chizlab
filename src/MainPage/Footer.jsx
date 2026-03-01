import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="shadow-md  w-full  bg-gray-950  text-white   dark:bg-gray-900 gap-y-3 ">
      <footer className="flex  flex-col mx-auto justify-between p-7  md:flex-row lg:w-[1140px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-6 font-bold text-white tracking-widest  ">
            CHIZLAB
          </h1>
          <p className="pt-3">Manzil: Najot ta'lim</p>
          <p>Aloqa: (+998) 77 777 77 77</p>
          <h4 className="pt-3">© 2026 BookStore. All rights reserved.</h4>
        </div>
        <ul className=" text-dark hidden md:flex gap-7 text-[16px] lg:pr-15">
          <Link to="/">
            <li
              className="relative cursor-pointer 
hover:text-gray-400 dark:hover:text-blue-400/80
after:content-[''] after:absolute after:left-0 after:bottom-0 
after:h-[2px] after:w-0 after:bg-current 
after:transition-all after:duration-300
hover:after:w-full"
            >
              Bosh sahifa
            </li>
          </Link>

          <Link to="about">
            <li
              className="relative cursor-pointer 
hover:text-gray-400 dark:hover:text-blue-400/80
after:content-[''] after:absolute after:left-0 after:bottom-0 
after:h-[2px] after:w-0 after:bg-current 
after:transition-all after:duration-300
hover:after:w-full"
            >
              Haqida
            </li>
          </Link>
          <Link to="books">
            <li
              className="relative cursor-pointer 
hover:text-gray-400 dark:hover:text-blue-400/80
after:content-[''] after:absolute after:left-0 after:bottom-0 
after:h-[2px] after:w-0 after:bg-current 
after:transition-all after:duration-300
hover:after:w-full"
            >
              Kittoblar
            </li>
          </Link>
        </ul>
        <div>
          <a href="https://javohirwebuz.qurl.uz/" target="blank">
            <button className="px-4 py-2 bg-blue-500 font-semibold mt-5 cursor-pointer text-white rounded-md md:mt-0 hover:bg-blue-500/70 transition  duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
              Biz bilan bog'lanish{" "}
            </button>
          </a>
        </div>
      </footer>
    </div>
  );
}
