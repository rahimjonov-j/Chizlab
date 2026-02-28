"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const BASE_URL = "https://json-api.uz/api/project/chizmachilik/materials"

export default function ProfilePage() {

  const [materials, setMaterials] = useState([])
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

const [form, setForm] = useState({
  title: "",
  authors: "",
  publishedAt: "",
  size: "",
  country: "",
  language: "",
  resourceType: "",
  image: "",
  description: ""
})

  const token = localStorage.getItem("token")

  // GET DATA
  const fetchData = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()
    setMaterials(data.data || data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // OPEN ADD MODAL
  const openAdd = () => {
    setIsEdit(false)
    setForm({ title: "", description: "", image: "", author: "" })
    setOpen(true)
  }

  // OPEN EDIT MODAL
const openEdit = (item) => {
  setIsEdit(true)
  setSelectedId(item.id)

  setForm({
    title: item.title || "",
    authors: item.authors?.join(", ") || "",
    publishedAt: item.publishedAt || "",
    size: item.size || "",
    country: item.country || "",
    language: item.language || "",
    resourceType: item.resourceType || "",
    image: item.image || "",
    description: item.description || ""
  })

  setOpen(true)
}

  // SAVE (POST or PATCH)
const handleSubmit = async () => {

  const payload = {
    ...form,
    authors: form.authors.split(",").map(a => a.trim())
  }

  if (isEdit) {
    await fetch(`${BASE_URL}/${selectedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
  } else {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
  }

  setOpen(false)
  fetchData()
}

  return (
    <div className="flex min-h-screen bg-muted/40 mt-25">

      {/* SIDEBAR */}
      <div className="w-[280px] bg-white border-r p-6 flex flex-col justify-between">

        <div>
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">Azizbek Karimov</h2>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              Profil
            </Button>
            <Button variant="ghost" className="justify-start">
              Kitoblar
            </Button>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={handleLogout}
        >
          Chiqish
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Materiallar</h1>
          <Button onClick={openAdd}>+ Qo'shish</Button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6">

          {materials.map(item => (
            <Card
              key={item.id}
              className="relative group overflow-hidden"
            >
              <CardContent className="p-4">
                <img
                  src={item.image}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="font-semibold mt-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.author}
                </p>
              </CardContent>

              {/* HOVER EDIT BUTTON */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Button
                  onClick={() => openEdit(item)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          ))}

        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Tahrirlash" : "Yangi qo'shish"}
            </DialogTitle>
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
    placeholder="Muallif (vergul bilan ajrating)"
    value={form.authors}
    onChange={handleChange}
  />

  <Input
    name="publishedAt"
    placeholder="Nashr yili"
    value={form.publishedAt}
    onChange={handleChange}
  />

  <Input
    name="size"
    placeholder="Hajmi (betlar)"
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
    placeholder="Resurs turi"
    value={form.resourceType}
    onChange={handleChange}
  />

  <Input
    name="image"
    placeholder="Rasm URL"
    value={form.image}
    onChange={handleChange}
  />

  <Textarea
    name="description"
    placeholder="Tavsif"
    value={form.description}
    onChange={handleChange}
  />

  <Button onClick={handleSubmit} className="w-full">
    Saqlash
  </Button>

</div>
        </DialogContent>
      </Dialog>

    </div>
  )
}