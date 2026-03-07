import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./MainPage/Navbar";
import Footer from "./MainPage/Footer";
import Banner from "./Marquee/Banner";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function Layout() {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.pathname === "/") {
      const shown = localStorage.getItem("welcome_toast_shown");
      if (!shown) {
        toast({
          title: "Saytga xush kelibsiz",
          description:
            "Bu saytda siz yangi kitoblar bilan tanishishingiz, qo'shishingiz va tahrirlashingiz mumkin.",
          duration: 2500,
          className: "self-center",
        });
        localStorage.setItem("welcome_toast_shown", "true");
      }
    }

    const authToast = sessionStorage.getItem("auth-toast");
    if (authToast === "login-success") {
      toast({
        title: "Tizimga muvaffaqiyatli o'tdingiz",
        duration: 1500,
      });
      sessionStorage.removeItem("auth-toast");
    }

    if (authToast === "logout") {
      toast({
        title: "Tizimdan chiqdingiz",
        duration: 1500,
      });
      sessionStorage.removeItem("auth-toast");
    }
  }, [location.pathname, toast]);

  return (
    <>
      <div className="flex min-h-screen flex-col">
  
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
