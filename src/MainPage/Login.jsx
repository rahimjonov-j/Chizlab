

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("https://json-api.uz/api/project/chizmachilik/auth/login", {
      method: "POST",
      headers: {  "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
      
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Login xato");
          });
        }
        return res.json();
      })
      .then((data) => {
     
        localStorage.setItem("token", data.access_token);
        navigate("/");
      })
      .catch((err) => {
        setError( "Login yoki parol xatto tekshiring!");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-neutral-900 dark:to-black">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Accauntga kirish
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
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full flex justify-center items-center">
              {loading ? <Spinner className="w-5 h-5 text-white dark:text-gray-900" /> : "Kirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
