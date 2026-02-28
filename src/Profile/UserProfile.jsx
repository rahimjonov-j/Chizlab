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
import { useNavigate } from "react-router-dom";

// Rasmni import qilish Vite uchun
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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const navigate = useNavigate();

  const fetchData = () => {
    if (!token) return;
    fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("GET error");
        return res.json();
      })
      .then((res) => setMaterials(res.data || []))
      .catch((err) => console.log(err));
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
      summary: item.summary || "",
    });

    setOpen(true);
  };

  const handleSubmit = () => {
    if (!token) {
      alert("Token topilmadi! Login qiling.");
      return;
    }

    const payload = {
      ...form,
      authors: form.authors.split(",").map((a) => a.trim()),
    };

    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit ? `${BASE_URL}/${selectedId}` : BASE_URL;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Xatolik: " + res.status);
          throw new Error("Save error");
        }
        return res.json();
      })
      .then(() => {
        setOpen(false);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-muted/40 mt-25">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-white border-r p-6 flex flex-col justify-between dark:bg-gray-900">
        <div>
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar1} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">F.I.SH</h2>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            <Button variant="ghost">Profil</Button>
            <Button variant="ghost">Kitoblar</Button>
          </div>
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Chiqish
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kitoblar</h1>
          <Button onClick={openAdd}>+ Qo'shish</Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {materials.map((item) => (
            <Card key={item.id} className="relative group overflow-hidden">
              <CardContent className="p-4 flex flex-col gap-y-1 pb-10">
                <img
                  src={item.cover}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p>
                  {Array.isArray(item.authors) ? item.authors.join(", ") : ""}
                </p>
                <p>{item.resourceType}</p>
                <p>{item.publishedAt}</p>
                <p>{item.summary}</p>
              </CardContent>

              <div className="absolute left-4 bottom-4">
                <Button onClick={() => openEdit(item)}>Edit</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Tahrirlash" : "Yangi qo'shish"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="title"
              placeholder="Nomi"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              name="authors"
              placeholder="Mualliflar (vergul bilan)"
              value={form.authors}
              onChange={handleChange}
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
              placeholder="Rasm URL"
              value={form.cover}
              onChange={handleChange}
            />
            <Textarea
              name="summary"
              placeholder="Tavsif"
              value={form.summary}
              onChange={handleChange}
            />

            <Button onClick={handleSubmit} className="w-full">
              Saqlash
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}