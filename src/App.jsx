import React from "react";
import Navbar from "./maincomponents/Navbar";
import Hero from "./maincomponents/Hero";
import BooksInfo from "./ApiSec/BooksInfo";




export default function App() {
  return (
    <div >
      <Navbar />
      <Hero/>
<BooksInfo/>
    </div>
  );
}
