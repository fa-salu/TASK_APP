"use client";

import { TextField, Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      router.push("/task");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <Image
          src="/images/task-home.svg"
          alt="Login"
          width={400}
          height={400}
          className="max-w-full"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            className="mb-4"
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
