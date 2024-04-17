"use client";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
// import { Spinner } from "@nextui-org/react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");



  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues.email);
    console.log(formValues.password);
    const signInResponse = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      console.log(signInResponse.isAdmin);
      console.log(signInResponse);
      router.push("/dashboard");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 rounded-md bg-orange-100 ">
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-bold md:text-2xl text-gray-900">
            Log In to your account
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          {error && (
            <p className="text-center bg-red-300 py-2 mb-6 rounded">{error}</p>
          )}
          <div className="mb-6">
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email Id"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "blue" }}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={loading}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
