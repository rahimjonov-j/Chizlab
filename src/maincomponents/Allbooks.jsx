
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardTitle,CardHeader } from "@/components/ui/card"
import React, { useEffect, useState } from "react";

import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "../components/ui/card-hover-reveal";

import Loader from "../maincomponents/Loader";

export default function Allbooks() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);
 
  if (loader) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res.data);
      })
      .catch(() => {
   
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
 
      {loader && <Loader />}
      {!loader && (
        <div className="grid  grid-cols-1  w-70 mt-30 mb-10 overflow-x-hidden mx-auto  items-center gap-5 md:grid-cols-2 md:w-[800px] lg:grid-cols-4 lg:w-[1240px] ">
          {state.map((el) => {
            return (
              <div key={el.id}>
       <Card className="w-full max-w-xs h-160 overflow-hidden pt-0">
      <img
        src={el.cover || "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
        alt={el.title}
     width="300px"
     height="100px"
      />
      <CardHeader>
        <CardTitle>{el.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <span className="font-bold">Davlati:</span>
<p>{el.country}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Tilli:</span>
<p>{el.language}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">O'lchami:</span>
<p>{el.size}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Nashir qilingan yil:</span>
<p>{el.publishedAt}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Kittob turi:</span>
<p>{el.resourceType}</p>
        </div>
 
        <p className="text-muted-foreground text-sm">
       {el.summery}
        </p>
      </CardContent>
  
    </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}