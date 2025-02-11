"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Card } from "@mui/material";
import { adminLogin } from "@/validation/adminLoginValidation";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";

type LoginFormData = z.infer<typeof adminLogin>;

const AdminLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
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
      router.push("/task");
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
