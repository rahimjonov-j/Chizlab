"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

import avatar1 from "../../public/avatar1.png";

const BASE_URL = "https://json-api.uz/api/project/chizmachilik/materials";
const STORAGE = {
  firstName: "profile_first_name",
  lastName: "profile_last_name",
  image: "profile_image",
  addedBooks: "profile_added_books",
};

const CENTRAL_ASIA_COUNTRIES = [
  "O'zbekiston",
  "Qozog'iston",
  "Qirg'iziston",
  "Tojikiston",
  "Turkmaniston",
];

const ASIAN_LANGUAGES = [
  "O'zbek",
  "Qozoq",
  "Qirg'iz",
  "Tojik",
  "Turkman",
  "Rus",
  "Ingliz",
  "Arab",
  "Fors",
  "Turk",
  "Xitoy",
  "Yapon",
  "Koreys",
  "Hindi",
  "Urdu",
  "Bengal",
  "Tamil",
  "Tailand",
  "Vetnam",
  "Malay",
  "Indonez",
  "Filippin",
];

const RESOURCE_TYPES = [
  "Darslik",
  "Ilmiy",
  "Badiiy",
  "Roman",
  "Qissa",
  "Hikoya",
  "She'riyat",
  "Biografiya",
  "Fantastika",
  "Detektiv",
  "Tarixiy",
  "Falsafa",
  "Psixologiya",
  "Biznes",
  "IT",
  "Bolalar adabiyoti",
];

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [addedBooks, setAddedBooks] = useState([]);

  const fileInputRef = useRef(null);
  const fieldRefs = useRef({});

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setFirstName(localStorage.getItem(STORAGE.firstName) || "");
    setLastName(localStorage.getItem(STORAGE.lastName) || "");
    setProfileImage(localStorage.getItem(STORAGE.image) || "");

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE.addedBooks) || "[]");
      setAddedBooks(Array.isArray(saved) ? saved : []);
    } catch {
      setAddedBooks([]);
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
        const exists = acc.find((item) => item.id === current.id);
        return exists ? acc : acc.concat([current]);
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

  const profileFullName = useMemo(() => {
    const full = `${firstName} ${lastName}`.trim();
    return full || "F.I.SH";
  }, [firstName, lastName]);

  const myAddedBooks = useMemo(() => {
    return addedBooks.map((saved) => {
      const fromApi = materials.find((item) => String(item.id) === String(saved.id));
      return fromApi || saved;
    });
  }, [addedBooks, materials]);

  const persistAddedBooks = (next) => {
    setAddedBooks(next);
    localStorage.setItem(STORAGE.addedBooks, JSON.stringify(next));
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Faqat rasm fayl yuklang", duration: 1500 });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem(STORAGE.firstName, firstName);
    localStorage.setItem(STORAGE.lastName, lastName);
    localStorage.setItem(STORAGE.image, profileImage);
    setProfileOpen(false);
    toast({ title: "Profil muvaffaqiyatli saqlandi", duration: 1500 });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setSelectedId(null);
    setOpen(true);
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
      summary: item.summary || item.summery || "",
    });

    setOpen(true);
  };

  const validateForm = () => {
    const requiredFields = [
      { key: "title", label: "Nomi" },
      { key: "authors", label: "Mualliflar" },
      { key: "publishedAt", label: "Yili" },
      { key: "size", label: "Hajmi" },
      { key: "country", label: "Davlat" },
      { key: "language", label: "Til" },
      { key: "resourceType", label: "Turi" },
      { key: "cover", label: "Rasm" },
      { key: "summary", label: "Tavsif" },
    ];

    for (const field of requiredFields) {
      const value = String(form[field.key] || "").trim();
      if (!value) {
        toast({ title: `${field.label} maydoni majburiy`, duration: 1500 });
        const target = fieldRefs.current[field.key];
        if (target && typeof target.focus === "function") {
          target.focus();
        }
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!token) {
      toast({ title: "Token topilmadi. Login qiling.", duration: 1500 });
      return;
    }

    if (!validateForm()) return;

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
        throw new Error("Xatolik: " + res.status);
      }

      const response = await res.json();
      const savedBook = response?.data || response;

      setOpen(false);
      await fetchData();

      if (!isEdit) {
        const newEntry = {
          id: savedBook?.id || Date.now(),
          title: savedBook?.title || payload.title,
          authors: savedBook?.authors || payload.authors,
          publishedAt: savedBook?.publishedAt || payload.publishedAt,
          resourceType: savedBook?.resourceType || payload.resourceType,
          cover: savedBook?.cover || payload.cover,
          summary: savedBook?.summary || payload.summary,
        };

        persistAddedBooks([newEntry, ...addedBooks]);
      } else {
        const updated = addedBooks.map((book) =>
          String(book.id) === String(selectedId)
            ? {
                ...book,
                ...payload,
              }
            : book
        );
        persistAddedBooks(updated);
      }

      toast({
        title: isEdit ? "Muvaffaqiyatli tahrirlandi" : "Kitob muvaffaqiyatli qo'shildi",
        duration: 1500,
      });
    } catch (err) {
      console.log("Save error:", err);
      toast({ title: "Saqlashda xatolik yuz berdi", duration: 1500 });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.setItem("auth-toast", "logout");
    navigate("/");
  };

  const getValidImageUrl = (url) => {
    if (!url || url.trim() === "") {
      return "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
    }
    return url;
  };

  const renderBookCard = (item) => (
    <Card key={item.id} className="group relative overflow-hidden">
      <CardContent className="flex flex-col gap-y-1 p-4 pb-12">
        <img
          src={getValidImageUrl(item.cover)}
          alt={item.title}
          className="h-60 w-full rounded-md object-cover"
          onError={(e) => {
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
          }}
        />

        <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

        <p className="text-sm text-gray-600">
          {Array.isArray(item.authors) ? item.authors.join(", ") : ""}
        </p>

        <p className="text-sm text-gray-500">{item.resourceType}</p>

        <p className="text-sm text-gray-500">{item.publishedAt}</p>

        <p className="line-clamp-2 text-sm text-gray-700">{item.summary || item.summery}</p>
      </CardContent>

      <div className="absolute bottom-4 left-4">
        <Button
          onClick={() => openEdit(item)}
          size="sm"
          className="bg-gray-950 text-white dark:bg-gray-800"
        >
          Tahrirlash
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-muted/40">
      <Button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-25 z-9 md:hidden"
        variant="outline"
      >
        Menu
      </Button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-9 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed left-0 top-0 z-10 h-screen w-[260px] border-r bg-white p-6
          flex flex-col justify-between transition-transform duration-300 dark:bg-gray-900
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="pt-25">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileImage || avatar1} />
              <AvatarFallback>F.I</AvatarFallback>
            </Avatar>
            <h2 className="text-center text-lg font-semibold">{profileFullName}</h2>

            <Button variant="outline" size="sm" onClick={() => setProfileOpen(true)}>
              Profilni tahrirlash
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            <Button
              variant={activeSection === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("profile")}
            >
              Profil kitoblar
            </Button>

            <Button
              variant={activeSection === "added" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("added")}
            >
              Siz qo'shgan kitoblar
            </Button>

            <Link to="/books">
              <Button variant="ghost" className="w-full justify-start">
                Kitoblar
              </Button>
            </Link>
          </div>
        </div>

        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Chiqish
        </Button>
      </div>

      <div className="h-full flex-1 overflow-y-auto md:ml-[260px]">
        <div className="mx-auto mt-25 w-full max-w-[1100px] p-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            <h1 className="pl-18 text-2xl font-bold capitalize md:pl-0">
              {activeSection === "profile" ? "Profil kitoblar" : "Siz qo'shgan kitoblar"}
            </h1>
            <Button onClick={openAdd}>+ Qo'shish</Button>
          </div>

          {activeSection === "profile" ? (
            loading && !materials.length ? (
              <div className="py-10 text-center">Yuklanmoqda...</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((item) => renderBookCard(item))}
              </div>
            )
          ) : myAddedBooks.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myAddedBooks.map((item) => renderBookCard(item))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                Hozircha siz qo'shgan kitoblar mavjud emas.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Materialni tahrirlash" : "Yangi material qo'shish"}</DialogTitle>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-3 overflow-y-auto p-1">
            <Input
              ref={(el) => {
                fieldRefs.current.title = el;
              }}
              name="title"
              placeholder="Nomi *"
              value={form.title}
              onChange={handleChange}
              required
            />

            <Input
              ref={(el) => {
                fieldRefs.current.authors = el;
              }}
              name="authors"
              placeholder="Mualliflar *"
              value={form.authors}
              onChange={handleChange}
              required
            />

            <Input
              ref={(el) => {
                fieldRefs.current.publishedAt = el;
              }}
              name="publishedAt"
              placeholder="Yili"
              value={form.publishedAt}
              onChange={handleChange}
            />

            <Input
              ref={(el) => {
                fieldRefs.current.size = el;
              }}
              name="size"
              placeholder="Hajmi"
              value={form.size}
              onChange={handleChange}
            />

            <select
              ref={(el) => {
                fieldRefs.current.country = el;
              }}
              name="country"
              value={form.country}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              <option value="">Davlatni tanlang</option>
              {CENTRAL_ASIA_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              ref={(el) => {
                fieldRefs.current.language = el;
              }}
              name="language"
              value={form.language}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              <option value="">Tilni tanlang</option>
              {ASIAN_LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            <select
              ref={(el) => {
                fieldRefs.current.resourceType = el;
              }}
              name="resourceType"
              value={form.resourceType}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              <option value="">Turini tanlang</option>
              {RESOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <Input
              ref={(el) => {
                fieldRefs.current.cover = el;
              }}
              name="cover"
              placeholder="Rasm URL"
              value={form.cover}
              onChange={handleChange}
            />

            <Textarea
              ref={(el) => {
                fieldRefs.current.summary = el;
              }}
              name="summary"
              placeholder="Tavsif"
              value={form.summary}
              onChange={handleChange}
              rows={4}
            />

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Profilni tahrirlash</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input placeholder="Ism" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder="Familya" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageUpload}
            />

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileImage || avatar1} />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Rasm yuklash
              </Button>
            </div>

            <Button onClick={saveProfile} className="w-full">
              Saqlash
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}




