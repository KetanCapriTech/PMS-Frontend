import React, { useState } from "react";
import { useRouter } from "next/router";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const changePassword = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: oldPassword,
            newPassword: newPassword,
          }),
        }
      );
      if (!response.ok) {
        console.log(email, oldPassword, newPassword);
        throw new Error("Error changing password");
      }
      const responseData = await response.json();
      router.push("/login");
      alert("password changed");
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-8">
      <br></br>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <div className="flex flex-col">
        <label htmlFor="department" className="mb-1 font-medium text-gray-700">
          Old Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="old password"
          onChange={(event) => setOldPassword(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <div className="flex flex-col">
        <label
          htmlFor="enrollmentNumber"
          className="mb-1 font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="New Password"
          onChange={(event) => setNewPassword(event.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <br></br>
      <button
        onClick={changePassword}
        className="bg-indigo-500 w-full lg:w-8 mt-4 mb-4  pt-4 pb-4 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  );
}

export default ChangePassword;
