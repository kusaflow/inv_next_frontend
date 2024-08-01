"use client"

import AddProperty from '@components/add_edit_property' 
import { usePathname } from 'next/navigation';

import { useAppContext } from "@mycontext/AppContext";
import { useEffect, useState } from 'react';

const updateData = () => {
  const { AllProperties } = useAppContext();
  const path = usePathname()
  var ids = path.split("/")
  var proId = ids[ids.length-1];

  const [propertyToEdit,setpropertyToEdit] = useState({}) ;
  //console.log(propertyToEdit)
  

  const fetchPropertyDetails = async () => {
   ids = path.split("/")
   proId = ids[ids.length-1];
    //const jwtToken = localStorage.getItem('con_token');

    const propresponse = await fetch(
      `${process.env.NEXT_PUBLIC_BaseUrl}/admin/${proId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("con_token")}`,
        },
      }
    );
    var _propertyToEdit = await propresponse.json();
    _propertyToEdit.assignedTo = _propertyToEdit.assignedTo.username; 
    setpropertyToEdit(_propertyToEdit)
    console.log(propertyToEdit)
  };

  useEffect(()=>{
    //setTimeout(()=>fetchPropertyDetails(), 5000);
    fetchPropertyDetails();
  },[]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {propertyToEdit._id ? 
      (
        <AddProperty defValues={propertyToEdit} isupdate={true} propId={proId} />
      ):(<div>Loading</div>)

      }
      {
 //     
}
    </main>
  );
}

export default updateData
