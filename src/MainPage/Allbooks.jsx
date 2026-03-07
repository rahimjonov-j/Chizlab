import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "./Loader";

const FALLBACK_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export default function Allbooks() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (loader) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loader]);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => {
        setState(res.data || []);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <div className="mx-auto mt-30 mb-10 w-full max-w-[1240px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {state.map((el) => (
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
      )}
    </>
  );
}

