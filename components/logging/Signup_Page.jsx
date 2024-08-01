"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@mycontext/AppContext";

function Signup_Page() {
  const BaseUrl = process.env.NEXT_PUBLIC_BaseUrl;
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    isAdminb: false,
    adminCode: "",
  };
  const [fomValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [AAP_error, setAAP_error] = useState({ msg: "", error: false });
  const [isAnAdmin, setisAnAdmin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const context = useAppContext();
  const router = useRouter();

  const goToOtherPage = () => {
    router.push("/");
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...fomValues, [name]: value });
    //console.log(fomValues);
  }

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setisAnAdmin(isChecked);
    setFormValues({ ...fomValues, isAdminb: isChecked });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(fomValues));
    setIsSubmitting(true);
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      //alert("Signup successful");
      const token_response = await fetch(BaseUrl + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fomValues.username,
          email: fomValues.email,
          password: fomValues.password,
          isAdmin: fomValues.isAdminb,
          Code: fomValues.adminCode,
        }),
      });

      const token_data = await token_response.json();
      if (token_response.status === 201) {
        localStorage.setItem("con_token", token_data.token);
        setAAP_error({ msg: "Redirecting", error: false });
        context.setb_reValidateLogin(true);
        //3 seconds delay
        setTimeout(() => {
          goToOtherPage();
        }, 3000);
      } else if (
        token_response.status === 400 ||
        token_response.status === 401
      ) {
        setAAP_error({ ...AAP_error, msg: token_data.msg, error: true });
      }
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      error.username = "Username is required";
    } else if (values.username.length < 4) {
      error.username = "Username must be more than 4 characters";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Invalid email format";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (!validatePassword(values.password)) {
      error.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.";
    }

    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Password does not match";
    }
    return error;
  };

  return (
    <div className="bg-green-50 px-16 py-6 rounded-none sm:rounded-3xl shadow-2xl border-4 border-green-200">
      <h1 className="text-lime-600 text-5xl font-bold">Hey, Welcome! </h1>
      <p className="font-medium text-lg text-green-700 mt-2">
        Create your account
      </p>
      <form onSubmit={handlesubmit}>
        <div className="mb-2 mt-2">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green-600"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={fomValues.username}
            onChange={handleInputChange}
          />
          <p className="text-red-700 ml-2 text-xs">{formErrors.username}</p>
        </div>
        <div className="mb-2">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green-600"
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            value={fomValues.email}
            onChange={handleInputChange}
          />
          <p className="text-red-700 ml-2  text-xs">{formErrors.email}</p>
        </div>
        <div className="mb-2 relative">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-green-600"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={fomValues.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-700 mt-2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <p className="text-red-700 ml-2  text-xs">{formErrors.password}</p>
        </div>
        <div className="mb-2 relative">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="cpassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-green-600"
            id="cpassword"
            name="cpassword"
            type={showCPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={fomValues.cpassword}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={() => setShowCPassword(!showCPassword)}
            className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-700 mt-2"
          >
            {showCPassword ? "Hide" : "Show"}
          </button>
          <p className="text-red-700 ml-2  text-xs">{formErrors.cpassword}</p>
        </div>
        <div className="mt-3">
          <div className="flex justify-normal items-center">
            <input
              className="mr-2 mt-1 leading-tight"
              id="isAdmin"
              type="checkbox"
              checked={isAnAdmin}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isAdmin" className="text-sm">
              <b>Admin?</b>
            </label>
          </div>
        </div>
        {isAnAdmin && (
          <div className="mb-2 mt-2">
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-green-600"
              id="adminCode"
              name="adminCode"
              type="text"
              placeholder="Admin Code"
              value={fomValues.adminCode}
              onChange={handleInputChange}
            />
            <p className="text-red-700 ml-2 text-xs">{formErrors.adminCode}</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 
                            rounded active:scale-[.95] active:duration-75 transition-all hover:shadow-lg hover:scale-105"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p
          className={
            AAP_error.error
              ? "text-red-700 ml-1 mt-1"
              : "text-green-700 ml-1 mt-1"
          }
        >
          {AAP_error.msg}
        </p>
        <div className=" mt-3 flex items-center justify-between">
          <Link
            className="ml-0 inline-block align-baseline font-bold text-sm text-lime-500 hover:text-lime-700
                            active:scale-[.95] active:duration-75 transition-all"
            href="/login"
          >
            Already a user? Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup_Page;
