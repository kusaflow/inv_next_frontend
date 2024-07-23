"use client"

import Prop_card from "@components/PropertyCard/Prop_card";
import { useEffect, useState } from "react";
import { useAppContext } from "@mycontext/AppContext";
import SeachBar from "@components/searchBar";


const AdminPannel = () => {
    const context = useAppContext();

    const [filterData, setFilterData] = useState({});

    useEffect(()=>{
        context.Update_Admin_AllProperty(filterData)
    },[filterData])

    return (

        <>
            <SeachBar UpdateAllProperty={context.Update_Admin_AllProperty}/>  
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {context.AllProperties.map((property, index) => (
                <Prop_card key={property._id} property={property} isPropertyCreator={true} />
            ))}
            
            </div>
        </>
    );
}

export default AdminPannel
