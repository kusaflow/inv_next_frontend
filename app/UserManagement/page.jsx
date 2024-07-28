"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@mycontext/AppContext';
import Link from 'next/link';

const UserManagementPage = () => {
  const { Luser } = useAppContext();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    console.log(Luser)
    if (Luser.user.role !== 'Superme_admin') {
        setTimeout(()=>{
            if (Luser.user.role !== 'Superme_admin')
                router.push('/');
        }, 2000)
      
    } else {
      fetchUsers();
    }
  }, [Luser.user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BaseUrl}/users/all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('con_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BaseUrl}/users/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('con_token')}`
        },
        body: JSON.stringify({ userId: selectedUser._id, role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      fetchUsers();
      setSelectedUser(null);
      setNewRole('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BaseUrl}/users/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('con_token')}`
        },
        body: JSON.stringify({ userId: selectedUser._id, newPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      fetchUsers();
      setSelectedUser(null);
      setNewPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 rounded-xl">
      <div className="bg-white p-8 shadow-lg w-full max-w-5xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">User Management</h2>

        {selectedUser && (
          <div className="my-6 ">
            <h3 className="text-xl font-semibold mb-4">Edit User: {selectedUser.username}</h3>
            <div className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                >
                  <option value="customer">Customer</option>
                  <option value="Propertyadmin">Property Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <button
                onClick={handleUpdateRole}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Role
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                onClick={handleUpdatePassword}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {users.map((user) => (
              <div key={user._id} className="p-4 border rounded-xl">
                <h3 className="text-xl font-semibold">{user.username}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setSelectedUser(user);
                      setNewRole(user.role);
                      setNewPassword('');
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default UserManagementPage;
