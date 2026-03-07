import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../MainPage/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooks, getCachedBooks } from "@/lib/books-cache";

const FALLBACK_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export default function BooksInfo() {
  const initialBooks = useMemo(() => getCachedBooks() || [], []);
  const [state, setState] = useState(() => initialBooks);
  const [loader, setLoader] = useState(() => initialBooks.length === 0);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    if (loader) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loader]);

  useEffect(() => {
    let mounted = true;

    if (initialBooks.length) {
      return () => {
        mounted = false;
      };
    }

    setLoader(true);
    getBooks()
      .then(({ data }) => {
        if (mounted) {
          setState(data || []);
        }
      })
      .catch(() => {
        if (mounted) setError(true);
      })
      .finally(() => {
        if (mounted) setLoader(false);
      });

    return () => {
      mounted = false;
    };
  }, [initialBooks.length]);

  const totalPages = Math.ceil(state.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return state.slice(indexOfFirstItem, indexOfLastItem);
  }, [state, currentPage]);

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 420, behavior: "smooth" });
  };

  const getPages = () => {
    if (totalPages === 0) return [];

    const pages = [];
    const delta = 2;
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i += 1) pages.push(i);

    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <>
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <img src="./note.png" alt="Error" />
        </div>
      )}

      {loader && <Loader />}

      {!loader && (
        <>
          <div className="mx-auto mt-30 w-full max-w-[1240px] px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {currentItems.map((el) => (
                <Card key={el.id} className="flex min-h-[620px] w-full flex-col overflow-hidden pt-0">
                  <img
                    className="h-[350px] w-full object-cover"
                    src={el.cover || FALLBACK_IMAGE}
                    alt={el.title}
                    width="300"
                    height="100"
                  />

                  <CardHeader>
                    <CardTitle>{el.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    <div className="flex gap-2">
                      <span className="font-bold">Davlati:</span>
                      <p>{el.country}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Tili:</span>
                      <p>{el.language}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">O&apos;lchami:</span>
                      <p>{el.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Nashr yili:</span>
                      <p>{el.publishedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Kitob turi:</span>
                      <p>{el.resourceType}</p>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {el.summary || el.summery}
                    </p>

                    <Button asChild className="mt-auto w-full" size="sm">
                      <Link to={`/information/${el.id}`}>Batafsil</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-6 mt-12 flex flex-wrap items-center justify-center gap-2 px-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border bg-white px-3 py-2 disabled:opacity-50 dark:bg-gray-800"
            >
              Prev
            </button>

            {pages.map((page, index) =>
              page === "..." ? (
                <span key={`dots-${index}`} className="px-3 py-2">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-md px-4 py-2 font-semibold transition ${
                    currentPage === page
                      ? "scale-105 bg-blue-600 text-white shadow-md"
                      : "border bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-md border bg-white px-3 py-2 disabled:opacity-50 dark:bg-gray-900"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
