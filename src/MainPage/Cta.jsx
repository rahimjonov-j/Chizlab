import React from "react";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section id="cta" className="relative w-full py-24 overflow-hidden">

      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Cta.png')" }}
      />


      <div className="absolute inset-0 bg-black/60" />

 
      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Sevimli kitobingizni <span className="text-blue-500">bugun toping</span>
          </h2>

          <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Eng sara asarlar, bestsellerlar va yangi kitoblar bir joyda.
            O‘zingizga mos kitobni toping va bilim sayohatini boshlang.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
        <Link to="books">
            <button className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-xl hover:scale-105">
              Kitoblarni ko‘rish
            </button>
        </Link>

           <Link to="/about">
            <button className="px-8 py-4 rounded-2xl border border-white/40 text-white hover:bg-white/10 transition-all duration-300">
              Batafsil ma'lumot
            </button>
           </Link>
          </div>
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>
    </section>
  );
}