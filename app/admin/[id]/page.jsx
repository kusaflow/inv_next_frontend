"use client"

import AddProperty from '@components/add_edit_property' 
import { usePathname } from 'next/navigation';

import { useAppContext } from "@mycontext/AppContext";

const updateData = () => {
  const { AllProperties } = useAppContext();
  const path = usePathname()
  const ids = path.split("/")
  const proId = ids[ids.length-1];
  

  const propertyToEdit = AllProperties.find(property => property._id === proId);
  console.log(propertyToEdit)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <AddProperty defValues={propertyToEdit} isupdate={true} propId={proId} />
    </main>
  );
}

export default updateData
