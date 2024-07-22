"use client"

import Prop_card from "@components/PropertyCard/Prop_card";
import { useEffect, useState } from "react";
import { useAppContext } from "@mycontext/AppContext";
import SeachBar from "@components/searchBar";

const HomePage = () => {
    const context = useAppContext();

    const [filterData, setFilterData] = useState({
        name:"modern"
    });

    useEffect(()=>{
        context.UpdateAllProperty(filterData)
    },[filterData])

    return (

        <>
            <SeachBar/>  
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {context.AllProperties.map((property, index) => (
                <Prop_card key={property._id} property={property} isPropertyCreator={false} />
            ))}
            
            </div>
        </>
    );
}

export default HomePage;
