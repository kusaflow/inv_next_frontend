"use client"

import Prop_card from "../components/PropertyCard/Prop_card";
import { useEffect, useState } from "react";
import { useAppContext } from "@mycontext/AppContext";
import SeachBar from "@components/searchBar";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const context = useAppContext();
    const router = useRouter();
    const [filterData, setFilterData] = useState({});

    useEffect(()=>{
        console.log("empty");
    },[])

    useEffect(() => {
        //console.log(Luser)
        if (context.Luser.user.role === 'Superme_admin') {
            router.push('/UserManagement');
          
        }
      }, [context.Luser.user]);

    useEffect(()=>{
        console.log("fi;ter DAta");
        context.UpdateAllProperty(filterData)
    },[filterData])

    return (

        <>
            <SeachBar UpdateAllProperty={context.UpdateAllProperty}/>  
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {context.AllProperties.map((property, index) => (
                <Prop_card key={property._id} property={property} isPropertyCreator={false} />
            ))}
            
            </div>
        </>
    );
}

export default HomePage;
