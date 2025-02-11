import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  const router = useRouter();
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">Task Manager</Typography>
        <Button color="inherit" onClick={() => router.push("/register")}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
