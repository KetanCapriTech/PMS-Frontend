/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <div>
        Welcome
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}
