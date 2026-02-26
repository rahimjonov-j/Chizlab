import React, { useEffect, useState } from "react";

import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "../components/ui/card-hover-reveal";

import Loader from "../maincomponents/Loader";

export default function BooksInfo() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
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
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      {error && (
        <div className="w-full h-screen mx-auto flex justify-center inset-0 fixed overflow-hidden overflow-y-hidden z-50 bg-white items-center">
          <div>
            <img src="./note.png" alt="" />
          </div>
        </div>
      )}
      {loader && <Loader />}
      {!loader && (
        <div className="grid  grid-cols-1 justify-center w-70 mt-30  overflow-x-hidden mx-auto  items-center gap-5 md:grid-cols-2 md:w-[800px] lg:grid-cols-3 lg:w-[1240px] ">
          {state.map((el) => {
            return (
              <div key={el.id}>
                <CardHoverReveal className="h-[512px] w-[385px] rounded-xl ">
                  <CardHoverRevealMain>
                    <img
                      width={400}
                      height={300}
                      alt={el.title}
                      src={el.cover}
                      className="inline-block size-full max-h-full max-w-full object-cover align-middle"
                    />
                  </CardHoverRevealMain>

                  <CardHoverRevealContent className="space-y-4 rounded-2xl bg-foreground/80 text-background p-4">
                    <div className="space-y-2">
                      <h3 className="text-md font-bold">{el.title}</h3>
                      <div className="flex flex-wrap gap-2 ">
                        <span className="font-semibold">Avtorlar:</span>
                        <div className=" rounded-xl bg-blue-400 px-2 py-1">
                          <p className=" text-xs leading-normal font-semibold dark:text-white">
                            {el.authors}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 ">
                      <div className="flex gap-2 items-center">
                        <span className="font-semibold">Davlati:</span>
                        <h3 className=" text-md ">{el.country}</h3>
                      </div>
                      <div className="flex w-15 gap-2 flex-col ">
                        <div className="flex gap-2 ">
                          <span>O'lchami:</span>
                          <div className=" rounded-full bg-blue-400 px-2 py-1">
                            <p className=" text-xs leading-normal font-semibold dark:text-white">
                              {el.size}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span>Tili:</span>
                          <div className=" rounded-full bg-blue-400 px-2 py-1">
                            <p className=" text-xs leading-normal font-semibold dark:text-white">
                              {el.language}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span>Yilli:</span>
                          <div className=" rounded-full bg-blue-400 px-2 py-1">
                            <p className=" text-xs leading-normal font-semibold dark:text-white">
                              {el.publishedAt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-md font-bold ">
                        Kitob haqida qisqacha
                      </h3>
                      {/* tag */}
                      <div className="flex flex-wrap gap-2 ">
                        <p className="text-sm text-secondary italic">
                          {el.summary}
                        </p>
                      </div>
                    </div>
                  </CardHoverRevealContent>
                </CardHoverReveal>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
