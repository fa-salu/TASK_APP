"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Card, Alert } from "@mui/material";
import { adminLogin } from "@/validation/adminLoginValidation";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";

type LoginFormData = z.infer<typeof adminLogin>;

const AdminLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(adminLogin),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await axiosInstance.post("/admin/login", data);
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
        const { message, errors: fieldErrors } = error.response.data;

        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, value]) => {
            setError(key as keyof LoginFormData, { message: value.join(", ") });
          });
        }

        if (message) {
          setError("root", { message });
        }
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="p-8 w-full max-w-md bg-white rounded-xl shadow-xl">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Admin Login
        </h2>

        {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
