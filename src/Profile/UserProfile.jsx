"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";

import avatar1 from "../../public/avatar1.png";

const BASE_URL = "https://json-api.uz/api/project/chizmachilik/materials";

export default function ProfilePage() {
  const emptyForm = {
    title: "",
    authors: "",
    publishedAt: "",
    size: "",
    country: "",
    language: "",
    resourceType: "",
    cover: "",
    summary: "",
  };

  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const fetchData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("GET error");

      const data = await res.json();

      const materialsData = data.data || [];

      const uniqueMaterials = materialsData.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          console.warn(`Duplicate ID found: ${current.id}`);
          return acc;
        }
      }, []);

      setMaterials(uniqueMaterials);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setSelectedId(null);

    setTimeout(() => {
      setOpen(true);
    }, 0);
  };

  const openEdit = (item) => {
    setIsEdit(true);
    setSelectedId(item.id);

    setForm({
      title: item.title || "",
      authors: Array.isArray(item.authors) ? item.authors.join(", ") : "",
      publishedAt: item.publishedAt || "",
      size: item.size || "",
      country: item.country || "",
      language: item.language || "",
      resourceType: item.resourceType || "",
      cover: item.cover || "",
      summary: item.summary || "",
    });

    setTimeout(() => {
      setOpen(true);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Token topilmadi! Login qiling.");
      return;
    }

    if (!form.title || !form.authors) {
      alert("Nomi va mualliflar majburiy maydonlar!");
      return;
    }

    const payload = {
      ...form,
      authors: form.authors.split(",").map((a) => a.trim()),
    };

    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit ? `${BASE_URL}/${selectedId}` : BASE_URL;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Xatolik: " + res.status);
        throw new Error("Save error");
      }

      const data = await res.json();

      setOpen(false);
      await fetchData();
    } catch (err) {
      console.log("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  // img check
  const getValidImageUrl = (url) => {
    if (!url || url.trim() === "") {
      return "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
    }
    return url;
  };

  return (
    <div className="flex h-screen bg-muted/40 mt-25">
      {/* SIDEBAR */}
      <div className="w-[280px]  bg-white border-r p-6 flex flex-col justify-between dark:bg-gray-900 fixed h-120 z-0">
        <div>
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar1} alt="Profile" />
              <AvatarFallback>F.I</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">F.I.SH</h2>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer"
            >
              Profil
            </Button>
            <Link to="/books">
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer"
              >
                Kitoblar
              </Button>
            </Link>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full cursor-pointer flex gap-2 items-center dark:bg-red-700"
        >
          <span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>{" "}
          Chiqish
        </Button>
      </div>

      {/* book and add btn */}
      <div className="flex-1 justify-center overflow-y-auto p-10 ml-[280px] lg:w-[1000px] mx-auto">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-bold">Kitoblar</h1>
          <Button onClick={openAdd} className="cursor-pointer">
            + Qo'shish
          </Button>
        </div>

        {loading && !materials.length ? (
          <div className="text-center py-10">Yuklanmoqda...</div>
        ) : (
          <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-6">
            {materials.map((item) => (
              <Card
                key={`material-${item.id}`}
                className="relative group overflow-hidden"
              >
                <CardContent className="p-4 flex flex-col gap-y-1 pb-10">
                  <img
                    src={getValidImageUrl(item.cover)}
                    alt={item.title || "Book cover"}
                    className="w-full h-60 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                    }}
                  />
                  <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {Array.isArray(item.authors) ? item.authors.join(", ") : ""}
                  </p>
                  <p className="text-sm text-gray-500">{item.resourceType}</p>
                  <p className="text-sm text-gray-500">{item.publishedAt}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.summary}
                  </p>
                </CardContent>

                <div className="absolute left-4 bottom-4 ">
                  <Button
                    onClick={() => openEdit(item)}
                    size="sm"
                    className="bg-gray-950 text-white dark:bg-gray-800 cursor-pointer "
                  >
                    Tahrirlash
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Materialni tahrirlash" : "Yangi material qo'shish"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
            <Input
              name="title"
              placeholder="Nomi *"
              value={form.title}
              onChange={handleChange}
              required
            />
            <Input
              name="authors"
              placeholder="Mualliflar (vergul bilan) *"
              value={form.authors}
              onChange={handleChange}
              required
            />
            <Input
              name="publishedAt"
              placeholder="Yili"
              value={form.publishedAt}
              onChange={handleChange}
            />
            <Input
              name="size"
              placeholder="Hajmi"
              value={form.size}
              onChange={handleChange}
            />
            <Input
              name="country"
              placeholder="Davlat"
              value={form.country}
              onChange={handleChange}
            />
            <Input
              name="language"
              placeholder="Til"
              value={form.language}
              onChange={handleChange}
            />
            <Input
              name="resourceType"
              placeholder="Turi"
              value={form.resourceType}
              onChange={handleChange}
            />
            <Input
              name="cover"
              placeholder="Rasm URL (agar bo'lmasa placeholder ishlatiladi)"
              value={form.cover}
              onChange={handleChange}
            />
            <Textarea
              name="summary"
              placeholder="Tavsif"
              value={form.summary}
              onChange={handleChange}
              rows={4}
            />

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
