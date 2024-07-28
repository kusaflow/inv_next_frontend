"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@mycontext/AppContext';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const ProfilePage = () => {
  const router = useRouter();
  const { Luser } = useAppContext();
  const isAdmin = Luser.user.role === 'Propertyadmin';
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const endpoint = isAdmin 
          ? `${process.env.NEXT_PUBLIC_BaseUrl}/bookings/mybookings_PM`
          : `${process.env.NEXT_PUBLIC_BaseUrl}/bookings/mybookings_Cust`;

        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('con_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAdmin]);

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this booking?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BaseUrl}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('con_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4 rounded-3xl">
      <div className="bg-white p-8 shadow-lg w-full max-w-5xl rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className={`p-4 border rounded-3xl ${getStatusColor(booking.status)}`}>
                <h3 className="text-xl font-semibold">{booking.property.name}</h3>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Time: {booking.timeSlot}</p>
                {isAdmin && (<p>Cutomer: {booking.user.username}</p>)}
                <div>Status: <Badge variant="outline" className={getStatusColor(booking.status)}>{booking.status}</Badge></div>
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(booking._id)}
                  >
                    <b>Delete</b>
                  </button>
                  {isAdmin && (
                    <Link href={`/booking/editBooking/${booking._id}`}>
                      <div className="text-blue-600 hover:text-blue-800"><b>Edit</b></div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
