"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section className="w-full py-20 bg-background mt-20">
      <div className="max-w-[1100px] mx-auto px-6 space-y-20">

        {/* 1️⃣ Sayt haqida */}
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Biz haqimizda
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ushbu platforma kitobxonlar uchun yaratilgan zamonaviy onlayn kutubxona
            bo‘lib, eng sara va mashhur asarlarni bir joyda jamlaydi.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sayt haqida qisqacha ma’lumot</CardTitle>
            <CardDescription>
              Platformaning maqsadi va imkoniyatlari
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Saytimiz foydalanuvchilarga turli janrdagi kitoblarni ko‘rish,
              qidirish va ular haqida ma’lumot olish imkonini beradi.
            </p>
            <p>
              Minimal dizayn va qulay interfeys orqali kitob topish jarayoni
              oson va tez amalga oshiriladi.
            </p>
          </CardContent>
        </Card>

        <Separator />

      {/* Accardion quesions */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            Ko‘p so‘raladigan savollar
          </h2>

          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>Sayt bepulmi?</AccordionTrigger>
              <AccordionContent>
                Ha, sayt orqali kitoblar haqida ma’lumot olish mutlaqo bepul.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Kitoblarni yuklab olish mumkinmi?</AccordionTrigger>
              <AccordionContent>
                Hozircha yuklab olish funksiyasi mavjud emas, faqat ma’lumot
                ko‘rish, o'zgartirish va qoshish funksiyalari mavjud.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Qanday janrlar mavjud?</AccordionTrigger>
              <AccordionContent>
                Geometrik, ilmiy,  tarixiy va boshqa ko‘plab janrlar
                mavjud.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Hisob ochish shartmi?</AccordionTrigger>
              <AccordionContent>
                Yo‘q, asosiy funksiyalardan foydalanish uchun ro‘yxatdan
                o‘tish talab qilinmaydi faqat o'zgartirmoqchi yoki kittob qo'shmoqchi bo'lsangiz hissob qo'shish kerak.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator />

        {/* 3️⃣ Kitoblar va foydalanish */}
        <div className="grid md:grid-cols-2 gap-10">

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>📚 Kitoblar haqida</CardTitle>
              <CardDescription>
                Platformadagi mavjud asarlar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex flex-wrap gap-2">
                <Badge>Geometriya</Badge>
                <Badge>Ilmiy</Badge>
                <Badge>Chizmachilik</Badge>
                <Badge>Tarixiy</Badge>
              </div>
              <p>
                Har bir kitob uchun muallif, tavsif va reyting ma’lumotlari
                mavjud. Bestseller va yangi qo‘shilgan asarlar alohida
                ko‘rsatiladi.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>⚙ Saytni qanday ishlatish mumkin?</CardTitle>
              <CardDescription>
                Qulay foydalanish qo‘llanmasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                🔎 Qidiruv paneli orqali istalgan kitobni tez topishingiz mumkin.
              </p>
             
              <p>
                ⭐ Kitob sahifasiga kirib batafsil ma’lumot olishingiz mumkin.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  )
}