"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "@mycontext/AppContext";
import { Badge } from "@/components/ui/badge";

const BookingForm = ({ bookingId, propertyID }) => {
  const router = useRouter();
  const context = useAppContext();
  const AllProperties = context.AllProperties; 
  
  const isAdmin = (context.Luser.user.role === "Propertyadmin");

  const [booking, setBooking] = useState({
    property: propertyID || "",
    date: new Date(),
    timeSlot: "",
    status: "pending",
  });

  const [propertyDetails, setPropertyDetails] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails(bookingId)
    } else if (propertyID) {
      fetchPropertyDetails(propertyID);
    }
  }, [bookingId, propertyID]);

  const fetchPropertyDetails = async (propertyId) => {
    //const jwtToken = localStorage.getItem('con_token');

    const propresponse = await fetch(
      `${process.env.NEXT_PUBLIC_BaseUrl}/admin/${propertyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("con_token")}`,
        },
      }
    );
    const propdata = await propresponse.json();
    setPropertyDetails(propdata);
    //console.log(propdata);
  };

  const fetchBookingDetails = async (bookingId) => {
    //const jwtToken = localStorage.getItem('con_token');
    //console.log(bookingId)
    const url =`${process.env.NEXT_PUBLIC_BaseUrl}/bookings/${bookingId}` 
    //console.log(url)
    const book_response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("con_token")}`,
        },
      }
    );
    const propdata = await book_response.json();
    //.log(propdata)
    setBooking({ ...propdata, date: new Date(propdata.date) });
    console.log(propdata.property);
    await fetchPropertyDetails(propdata.property);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setBooking((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!booking.timeSlot) {
        setErrorMessage("Please enter a valid time slot.");
        return;
      }

      setIsLoading(true);
    setErrorMessage("");

    const method = bookingId ? "PUT" : "POST";
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}/bookings/${
      bookingId || ""
    }`;
    const formattedDate = booking.date.toISOString().slice(0, 10);
    //console.log(JSON.stringify({ ...booking, date: formattedDate, propertyId : booking.property }));

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("con_token")}`,
      },
      body: JSON.stringify({ ...booking, date: formattedDate, propertyId : booking.property }),
    });

    if (response.ok) {
        router.push("/Profile");
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "An error occurred. Please try again.");
      }
      setIsLoading(false);
  };

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg w-full max-w-lg rounded-lg">
        <h2 className="text-4xl text-orange-500 font-bold mb-6 text-center">
          {bookingId ? "Update Booking" : "Add Booking"}
        </h2>
        {propertyDetails && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-center">
              {propertyDetails.name}
            </h3>
            <p className="text-sm text-center">{propertyDetails.description}</p>
            <div className="text-sm text-center">
            <Badge variant="outline" className="text-cyan-800">Location: {propertyDetails.location}</Badge>
            <Badge variant="outline" className="text-green-800">Price: ₹{propertyDetails.price}</Badge>
            </div>
            <div className="text-xl text-center">
            <Badge variant="outline" className="text-teal-500 text-lg">Property Manger: {propertyDetails.assignedTo.username}</Badge>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <DatePicker
                selected={booking.date}
                onChange={handleDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Slot
              </label>
              <input
                type="text"
                name="timeSlot"
                value={booking.timeSlot}
                onChange={handleChange}
                placeholder="HH:MM AM/PM"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {bookingId && isAdmin &&(
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={booking.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {bookingId ? "Update Booking" : "Add Booking"}
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default BookingForm;
