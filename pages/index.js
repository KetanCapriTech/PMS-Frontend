/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
export default function Index() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <div>
        Welcome
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
}
