import React from 'react'

export default function Banner() {
  return (
<div className="fixed top-0 left-0 w-full z-50 overflow-hidden bg-yellow-400 text-black">
  <div className="whitespace-nowrap py-1 text-sm flex items-center font-medium animate-[marquee_20s_linear_infinite]">
    ⚠️ Sayt test rejimida ishlayapti ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ 
    <span>⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️</span>
    <span>⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️ ⚠️ Sayt test rejimida ishlayapti ⚠️</span>
  </div>

  <style>
    {`
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}
  </style>
</div>
  )
}
