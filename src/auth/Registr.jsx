"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function Registr() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginAfterRegister = () => {
    return fetch("https://json-api.uz/api/project/chizmachilik/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.access_token || data?.token || null)
      .catch(() => null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("https://json-api.uz/api/project/chizmachilik/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Registratsiya xato");
          });
        }
        return res.json();
      })
      .then(async (data) => {
        let token = data.access_token || data.token;
        if (!token) {
          token = await loginAfterRegister();
        }

        if (!token) {
          throw new Error("Token olinmadi");
        }

        localStorage.setItem("token", token);
        sessionStorage.setItem("auth-toast", "login-success");
        navigate("/");
      })
      .catch(() => {
        setError("Registratsiya amalga oshmadi. Qayta urinib ko'ring.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-neutral-900 dark:to-black">
      <Card className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Registratsiya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="Foydalanuvchi nomini kiriting"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Parolni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="flex w-full items-center justify-center">
              {loading ? <Spinner className="h-5 w-5 text-white dark:text-gray-900" /> : "Ro'yxatdan o'tish"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Akkount bormi?{" "}
              <Link className="font-semibold text-primary hover:underline" to="/login">
                Tizimga kirish
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
