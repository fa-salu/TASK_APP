"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconButton, Popover, Typography, Button } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/task" className="flex text-2xl font-medium">
        T<Image src="/images/logo.svg" alt="Logo" width={30} height={30} />
        <span className="text-sm">s</span>
      </Link>

      <div className="flex items-center gap-4">
        <IconButton onClick={handleClick}>
          <AccountCircleOutlinedIcon fontSize="large" />
        </IconButton>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="p-4 min-w-[200px] flex flex-col items-center">
          <Typography variant="subtitle1">{user.name || "User"}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email || "email@example.com"}
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            color="error"
            variant="outlined"
            size="small"
            className="mt-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Popover>
    </nav>
  );
};

export default Navbar;
