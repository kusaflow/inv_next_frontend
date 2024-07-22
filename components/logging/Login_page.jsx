"use client"

import {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@mycontext/AppContext';

function  Login_page() {

    const BaseUrl = process.env.NEXT_PUBLIC_BaseUrl;
    const initialValues = {'email': '', 'password': ''};
    const [fomValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [AAP_error, setAAP_error] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const context =useAppContext();  

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormValues({...fomValues, [name]: value});
        //console.log(fomValues);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(fomValues));
        setIsSubmitting(true);
        console.log(BaseUrl)
        if (Object.keys(formErrors).length === 0){  
            //(isSubmitting)
            const token_response = await fetch(BaseUrl + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fomValues),
            })
            
            const token_data = await token_response.json();
            //save this in local storage
            //console.log(token_response.status);
            if(token_response.status === 200){
                localStorage.setItem('con_token', token_data.token);
                setAAP_error("");
                context.setb_reValidateLogin(true);
                router.push('/');

            }else if (token_response.status === 400 || token_response.status === 401){
                //setAAP_error(token_data.msg);
                setAAP_error(token_data.msg);
            }
            

        }
    }

    
    

    const validate = (values) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            error.email = "Email is required";
        } else if (!regex.test(values.email)) {
            error.email = "Invalid email format";
        }

        if (!values.password) {
            error.password = "Password is required";
        } else if (values.password.length < 3) {
            error.password = "Password must be more than 3 characters";
        }

        return error;
    }


    return (
        <div className="bg-green-50 px-16 py-14 rounded-none sm:rounded-3xl shadow-2xl border-4 border-green-200">
            <h1 className="text-lime-500 text-5xl font-bold">Welcome Back!</h1>
            <p className="font-medium text-lg text-green-700 mt-3">Login to your account</p>
            
            <form onSubmit={handlesubmit}>
                <div className="mb-4 mt-8">
                    <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-600"
                        id="username"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={fomValues.email}
                        onChange={handleInputChange}
                    />
                    <p className="text-red-700 ml-2  text-xs" >{formErrors.email}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className=" text-blue-600 shadow appearance-none border border-red rounded w-full py-2 px-3 "
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={fomValues.password}
                        onChange={handleInputChange}
                    />
                    <p className="text-red-700 ml-2  text-xs">{formErrors.password}</p>
                </div>
                
                <div className="mb-6">
                    
                    <div className="flex justify-normal items-center">
                        <input
                            className="mr-2 mt-1 leading-tight"
                            id="rememberMe"
                            type="checkbox"
                        />
                        <label htmlFor="rememberMe" className="text-sm">Remember me on this device</label>
                    </div>
                </div>


                <div className="flex items-center justify-between">
                    <button
                        className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 
                            rounded active:scale-[.95] active:duration-75 transition-all hover:shadow-lg hover:scale-105"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <span 
                        className="inline-block align-baseline font-bold text-sm text-lime-500 hover:text-lime-700
                            active:scale-[.95] active:duration-75 transition-all "
                        
                    >
                        Forgot Password?
                    </span>
                </div>
                
                <p className="text-red-700 ml-1 mt-1">{AAP_error}</p>
                <div className=" mt-3 flex items-center justify-between">
                    <Link href="/signup"
                        className="ml-2 inline-block align-baseline font-bold text-sm text-lime-500 hover:text-lime-700
                            active:scale-[.95] active:duration-75 transition-all"
                    >
                        New user?
                    </Link>
                </div>
            </form>
        </div>
    )
}   

export default Login_page;