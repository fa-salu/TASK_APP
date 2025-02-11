import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}
