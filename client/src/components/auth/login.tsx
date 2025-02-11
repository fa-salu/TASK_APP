"use client";

import { TextField, Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.user));
      router.push("/task");
    },
    onError: (
      error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>
    ) => {
      if (error.response?.data) {
        const { message, errors } = error.response.data;

        setLoginError(message || "Login failed");

        if (errors) {
          const formattedErrors: Record<string, string> = {};
          Object.keys(errors).forEach((key) => {
            formattedErrors[key] = errors[key].join(", ");
          });
          setFieldErrors(formattedErrors);
        }
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    mutation.mutate();
  };

  return (
    <div className="flex flex-col md:flex-row py-10 md:py-0 md:h-screen">
      <div className="md:flex md:w-1/2 items-center justify-center md:bg-gray-100">
        <Image
          src="/images/task-home.svg"
          alt="Login"
          width={400}
          height={400}
          className="max-w-full"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col  items-center justify-center px-6 sm:px-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {loginError && (
              <p className="text-red-500 text-sm mt-2">{loginError}</p>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
