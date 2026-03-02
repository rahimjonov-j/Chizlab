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
  const [pageLoading, setPageLoading] = useState(false);

  const itemsPerPage = 8;


  useEffect(() => {
    if (loader) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loader]);

  // fetch only once
  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => setState(res.data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  // pagination logigic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(state.length / itemsPerPage);

 
  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
      window.scrollTo({ top: 450, behavior: "smooth" });
    }, 800);
  };


  const getPages = () => {
    const pages = [];
    const delta = 2;

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <>
      {/* error */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <img src="./note.png" alt="Error" />
        </div>
      )}

      {/* loader */}
      {loader && <Loader />}

      {!loader && (
        <>
    
          <div className="grid grid-cols-1 justify-center w-70 mt-30 mx-auto gap-5 md:grid-cols-2 md:w-[800px] lg:grid-cols-4 lg:w-[1240px]">
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
                      className="size-full object-cover"
                    />
                  </CardHoverRevealMain>

                  <CardHoverRevealContent className="space-y-2 rounded-2xl bg-foreground/80 text-background p-4">
                    <h3 className="font-bold">{el.title}</h3>

                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">Avtor:</span> {el.authors}</p>
                      <p><span className="font-semibold">Davlati:</span> {el.country}</p>
                      <p><span className="font-semibold">Tili:</span> {el.language}</p>
                      <p><span className="font-semibold">Yili:</span> {el.publishedAt}</p>
                    </div>

                    <p className="text-xs italic">{el.summary}</p>
                  </CardHoverRevealContent>
                </CardHoverReveal>
              )
            )}
          </div>

          
          <div className="flex justify-center items-center gap-2 mt-12 mb-6 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800 disabled:opacity-50"
            >
              Prev
            </button>

            {pages.map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md font-semibold transition
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-white border hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700"
                    }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}