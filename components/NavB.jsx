"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@mycontext/AppContext";
import { setCurrentUser } from "@utils/setCurrentUser";

const NavB = () => {
  const context = useAppContext();
  const BaseUrl = process.env.NEXT_PUBLIC_BaseUrl;

  const [ToggleDropDown, setToggleDropDown] = useState(false);
  const pathName = usePathname();

  //validate user if token is present
  const providerForLogin = async () => {
    //check if user is logged in or not and the Role Based on that
    const token = localStorage.getItem("con_token");

    if (!token) {
      console.log("no token");
      //context.setb_isLoggedIn(false);
      context.setLuser({
        _id: "",
        username: "",
        email: "",
        role: "",
      });
      return;
    }

    try {
      const dataFromAPI = await fetch(BaseUrl + "/users/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await dataFromAPI.json();
      context.setLuser((prev) => (prev = data));
      //console.log(data);
      //console.log("=--------------");
      //console.log(context.Luser);

      context.setb_reValidateLogin(false);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      localStorage.removeItem("con_token");
    }
  };

  useEffect(() => {
    console.log("validating");
    console.log(context.Luser);
    providerForLogin();
  }, [context.b_reValidateLogin]); 
  

  return pathName !== "/login" && pathName !== "/signup" ? (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PropertyDekho Logo"
          width={30}
          height={30}
          className="cursor-pointer object-contain"
        />
        <p className="logo_text ">PropertyDekho</p>
      </Link>

      {/*desktop navigation
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/Create-Prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/Profile">
              <Image
                src={session?.user.image}
                alt="User Profile"
                width={37}
                height={37}
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      */}

      {/*mobile navigation
      <div className="sm:hidden flex relative"> 
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="User Profile"
              width={37}
              height={37}
              className="cursor-pointer rounded-full"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />

            {ToggleDropDown && (
              <div className="dropdown absolute top-14 right-0 bg-white p-2 rounded-md shadow-md">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  Profile
                </Link>
                <Link
                  href="/Create-Prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  Create Post
                </Link>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    signOut();
                    setToggleDropDown(false);
                  }}

                >
                  Sign Out


                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      */}
    </nav>
  ) : (
    <></>
  );
};

export default NavB;
