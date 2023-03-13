import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const roleBasedLogin = (role) => {
    if (role === "admin") {
      router.push("/admin/dashboard/student");
    } else if (role === "student") {
      router.push("/student/dashboard/dashboard");
    } else {
      router.push("/faculty/dashboard/allocatedProject");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (
        data.message ===
        "Please change your password by calling /api/users/change-password"
      ) {
        router.push("/changePassword");
      } else if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        roleBasedLogin(data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", data.userId);
        localStorage.setItem("hhjklmno-hjsohjso-toKeN", "login success");
      } else {
        alert("incorrect id password ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center  items-center mt-20 p-8 border bg-indigo-500 rounded-md	 border-sky-500">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="font-bold  text-black  rounded-md p-2 mb-12 text-center">
          Login Cell
        </h1>
        <div className="md:w-1/3">
          <label
            className="block font-bold md:text-right mb-1 md:mb-0 pr-4 mr-4"
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <br></br>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <div className="md:w-1/3">
          <label
            className="block  font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="password"
          >
            Password
          </label>
        </div>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
