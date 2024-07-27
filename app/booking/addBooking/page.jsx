"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ defaultBooking }) => {
  const path = usePathname()
  const ids = path.split("/")
  const bookingId = ids[ids.length-1];
  
  //const { bookingId } = router.query; // Get the booking ID from the URL if it's an edit
  const [booking, setBooking] = useState({
    property: '',
    date: new Date(),
    timeSlot: '',
    status: 'pending'
  });

  useEffect(() => {
    if (bookingId && !defaultBooking) {
      // Fetch booking details if it's an edit and defaultBooking isn't passed
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/${bookingId}`)
        .then(response => response.json())
        .then(data => setBooking({ ...data, date: new Date(data.date) }));
    } else if (defaultBooking) {
      setBooking({ ...defaultBooking, date: new Date(defaultBooking.date) });
    }
  }, [bookingId, defaultBooking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setBooking(prev => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = bookingId ? 'PUT' : 'POST';
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/${bookingId || ''}`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ ...booking, date: booking.date.toISOString() })
    })
    .then(response => response.json())
    .then(() => {
      router.push('/admin'); // Redirect after form submission
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DatePicker selected={booking.date} onChange={handleDateChange} />
      <input type="text" name="timeSlot" value={booking.timeSlot} onChange={handleChange} placeholder="HH:MM AM/PM" />
      {bookingId && (
        <select name="status" value={booking.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
