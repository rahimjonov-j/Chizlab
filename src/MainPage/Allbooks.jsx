import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { getBooks, getCachedBooks } from "@/lib/books-cache";

const FALLBACK_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Hammasi" },
  { value: "ilmiy", label: "Ilmiy" },
  { value: "badiy", label: "Badiiy" },
  { value: "adabiy", label: "Adabiy" },
  { value: "drama", label: "Drama" },
  { value: "xalq_ijodi", label: "Xalq ijodi" },
  { value: "oquv_qollanma", label: "O'quv qo'llanma" },
  { value: "darslik", label: "Darslik" },
  { value: "diniy_marifiy", label: "Diniy-ma'rifiy" },
];

function getBookCategory(resourceType) {
  const value = String(resourceType || "").toLowerCase().trim();

  if (value.includes("ilm")) return "ilmiy";
  if (value.includes("badi")) return "badiy";
  if (value.includes("adab")) return "adabiy";
  if (value.includes("drama")) return "drama";
  if (value.includes("xalq")) return "xalq_ijodi";
  if (value.includes("oquv") || value.includes("qo'llanma") || value.includes("qollanma")) {
    return "oquv_qollanma";
  }
  if (value.includes("dars")) return "darslik";
  if (value.includes("diniy") || value.includes("marif") || value.includes("ma'rif")) {
    return "diniy_marifiy";
  }

  return "";
}

export default function Allbooks() {
  const initialBooks = useMemo(() => getCachedBooks() || [], []);
  const [state, setState] = useState(() => initialBooks);
  const [loader, setLoader] = useState(() => initialBooks.length === 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
        if (mounted) setState(data || []);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoader(false);
      });

    return () => {
      mounted = false;
    };
  }, [initialBooks.length]);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return state.filter((book) => {
      const title = String(book.title || "").toLowerCase();
      const matchesTitle = !term || title.includes(term);
      const category = getBookCategory(book.resourceType);
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;

      return matchesTitle && matchesCategory;
    });
  }, [state, searchTerm, selectedCategory]);

  return (
    <>
      {loader && <Loader />}

      {!loader && (
        <section className="mx-auto mt-30 mb-10 w-full max-w-[1240px] px-4 sm:px-6">
          <div className="mb-6 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_240px]">
              <div className="flex items-center gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Kitob nomi bo'yicha qidirish (title)..."
                />
                <Button type="button" size="icon" aria-label="Qidirish">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredBooks.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredBooks.map((el) => (
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
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                Qidiruv yoki category bo&apos;yicha kitob topilmadi.
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </>
  );
}
