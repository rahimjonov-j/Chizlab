import React, { useEffect, useState } from "react";

import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "../components/ui/card-hover-reveal";

import Loader from "../MainPage/Loader";
import BookCardSkeleton from "../MainPage/BookSkeleton";

export default function BooksInfo() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [pageLoading, setPageLoading] = useState(false);

  // Loader checker
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
  }, [currentPage]);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(state.length / itemsPerPage);

  // pagination loading
  const handlePageChange = (page) => {
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
    }, 400);
  };

  return (
    <>
      {/* error sec */}
      {error && (
        <div className="w-full h-screen mx-auto flex justify-center inset-0 fixed overflow-hidden overflow-y-hidden z-50 bg-white items-center">
          <div>
            <img src="./note.png" alt="" />
          </div>
        </div>
      )}
      {/* loader sec */}
      {loader && <Loader />}
      {!loader && (
        <div className="grid grid-cols-1 justify-center w-70 mt-30  overflow-x-hidden mx-auto items-center gap-5 md:grid-cols-2 md:w-[800px] lg:grid-cols-4 lg:w-[1240px]">
          {(pageLoading
            ? Array.from({ length: itemsPerPage })
            : currentItems
          ).map((el, i) =>
            pageLoading ? (
              <BookCardSkeleton key={i} />
            ) : (
              <CardHoverReveal
                key={el.id}
                className="h-[430px] w-[300px] rounded-xl"
              >
                <CardHoverRevealMain>
                  <img
                    src={
                      el.cover ||
                      "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                    }
                    alt={el.title}
                    className="inline-block size-full object-cover"
                  />
                </CardHoverRevealMain>

                <CardHoverRevealContent className="space-y-1 rounded-2xl bg-foreground/80 text-background p-4">
                  <div className="space-y-2">
                    <h3 className="text-md font-bold">{el.title}</h3>

                    <div className="flex flex-wrap gap-2">
                      <span className="font-semibold">Avtorlar:</span>
                      <div className="rounded-xl bg-blue-400 px-2 py-1">
                        <p className="text-xs font-semibold dark:text-white">
                          {el.authors}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold">Davlati:</span>
                      <h3>{el.country}</h3>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <span>O‘lchami:</span>
                        <span className="rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white">
                          {el.size}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span>Tili:</span>
                        <span className="rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white">
                          {el.language}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span>Yili:</span>
                        <span className="rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white">
                          {el.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-bold">Kitob haqida qisqacha</h3>
                    <p className="text-sm italic text-secondary">
                      {el.summary}
                    </p>
                  </div>
                </CardHoverRevealContent>
              </CardHoverReveal>
            ),
          )}
        </div>
      )}
      {/* pagination buttons and logics */}
      <div className="flex justify-center gap-2 mt-10 mb-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition
        ${
          currentPage === index + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-400 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700"
        }`}
          >
            {index + 1}-bo'lim
          </button>
        ))}
      </div>
    </>
  );
}
