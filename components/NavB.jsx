"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@mycontext/AppContext";
import { setCurrentUser } from "@utils/setCurrentUser";
import { useRouter } from 'next/navigation';

const NavB = () => {
  const context = useAppContext();
  const BaseUrl = process.env.NEXT_PUBLIC_BaseUrl;
  const router = useRouter();

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
        user: {
            _id: "",
            username: "",
            email: "",
            role: ""
        }
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
    //console.log("validating");
    //console.log(context.Luser);
    providerForLogin();
  }, [context.b_reValidateLogin]);


  const onClickTest = (e) => {
    e.preventDefault();
  };

  const onClick_Signout = (e) => {
    try{
      // Clear the token stored in local storage 
      localStorage.removeItem('con_token'); 
      router.push('/login');
    }catch(err){
      console.log(err)
    }
  };

  const onClick_signin = (e) => {
      router.push('/login');
    
  };

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

      {
        /*desktop navigation*/
        <div className="sm:flex hidden">
          {context.Luser.user._id !== "" ? (
            <div className="flex gap-3 md:gap-5">
              {(context.Luser.user.role !== "customer" &&
              <Link href="/admin/addProperty" className="black_btn">
                Add Property
              </Link>
              )}
              {(context.Luser.user.role !== "customer" &&
              <Link href="/admin" className="black_btn">
                Admin Panel
              </Link>
              )}
              <button
                type="button"
                className="outline_btn"
                onClick={onClick_Signout}
              >
                Sign Out
              </button>

              <Link href="/Profile">
                <Image
                  src="/assets/images/profile-user.png"
                  alt="User Profile"
                  width={37}
                  height={37}
                  className="cursor-pointer rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick= {onClick_signin}
                className="black_btn"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      }

      {/*mobile navigation*/
      <div className="sm:hidden flex relative"> 
        {context.Luser.user._id !== "" ? (
          <div className="flex">
            <Image
              src="/assets/images/profile-user.png"
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
                {(context.Luser.user.role !== "customer" &&
                <Link href="/admin" className="black_btn">
                Admin Panel
                </Link>
                )}

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    onClick_Signout()
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
            <button
                type="button"
                onClick= {onClick_signin}
                className="black_btn"
              >
                Sign In
              </button>
          </>
        )}
      </div>
      }
    </nav>
  ) : (
    <></>
  );
};

export default NavB;
