import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FALLBACK_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export default function Information() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => setBooks(res.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const selectedBook = useMemo(
    () => books.find((book) => String(book.id) === String(id)),
    [books, id]
  );

  const recommendedBooks = useMemo(
    () => books.filter((book) => String(book.id) !== String(id)),
    [books, id]
  );

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const totalPages = Math.ceil(recommendedBooks.length / itemsPerPage);
  const paginatedBooks = recommendedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPages = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const delta = 2;
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (start > 2) pages.push("...");

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  if (loading) return <Loader />;

  if (error || !selectedBook) {
    return (
      <section className="mx-auto mt-32 mb-10 flex w-[92%] max-w-5xl flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold">Kitob topilmadi</h2>
        <p className="mt-2 text-muted-foreground">
          So&apos;ralgan ma&apos;lumotni yuklab bo&apos;lmadi yoki bu ID mavjud emas.
        </p>
        <Button className="mt-6" onClick={() => navigate("/books")}>
          Kitoblar sahifasiga qaytish
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-32 mb-12 w-[92%] max-w-6xl">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/books">
          <ArrowLeft className="size-4" />
          Orqaga
        </Link>
      </Button>

      <div className="grid gap-6 rounded-3xl border bg-gradient-to-br from-slate-50 to-white p-5 shadow-md md:grid-cols-[360px_1fr] md:p-8 dark:from-slate-900 dark:to-slate-950">
        <div className="overflow-hidden rounded-2xl border bg-white p-2 dark:bg-slate-900">
          <img
            className="h-[480px] w-full rounded-xl object-cover"
            src={selectedBook.cover || FALLBACK_IMAGE}
            alt={selectedBook.title}
          />
        </div>

        <div className="flex flex-col justify-between gap-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Kitob ma&apos;lumoti
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
              {selectedBook.title}
            </h1>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 sm:text-base">
              <InfoItem label="Davlati" value={selectedBook.country} />
              <InfoItem label="Tili" value={selectedBook.language} />
              <InfoItem label="Nashr yili" value={selectedBook.publishedAt} />
              <InfoItem label="O&apos;lchami" value={selectedBook.size} />
              <InfoItem label="Turi" value={selectedBook.resourceType} />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4">
            <h2 className="text-lg font-semibold">Qisqacha tavsif</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {selectedBook.summary || "Bu kitob uchun tavsif kiritilmagan."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border bg-card p-5 md:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Tavsiya etiladigan kitoblar</h2>
          <p className="text-sm text-muted-foreground">Gorizontal scroll + pagination</p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {paginatedBooks.map((book) => (
              <Link key={book.id} to={`/information/${book.id}`} className="block">
                <Card className="w-[240px] shrink-0 overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
                  <img
                    className="h-[280px] w-full object-cover"
                    src={book.cover || FALLBACK_IMAGE}
                    alt={book.title}
                  />
                  <CardContent className="p-4">
                    <h3 className="min-h-12 overflow-hidden text-base font-semibold leading-5">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{book.country}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                      Batafsil ko&apos;rish
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>

          {getPages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-sm text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(Number(page))}
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border bg-background px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
    </div>
  );
}


