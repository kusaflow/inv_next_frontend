"use client"

import React from 'react';
import BookingForm from '@components/BookingForm';
import { usePathname } from 'next/navigation';

const EditBookingPage = () => {

  const path = usePathname()
  const ids = path.split("/")
  const proId = ids[ids.length-1];
  

  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg w-full max-w-lg rounded-xl">
        <BookingForm bookingId={proId}/>
      </div>
    </div>
  );
};

export default EditBookingPage;
