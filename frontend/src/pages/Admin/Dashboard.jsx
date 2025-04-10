// File: frontend/src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [usersRes, storesRes, ratingsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/stores'),
        API.get('/admin/ratings/count')
      ]);
      setUsers(usersRes.data);
      setStores(storesRes.data);
      setRatingsCount(ratingsRes.data.count);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.address, u.role].some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-900 p-4 rounded">Total Users: {users.length}</div>
        <div className="bg-green-100 text-green-900 p-4 rounded">Total Stores: {stores.length}</div>
        <div className="bg-yellow-100 text-yellow-900 p-4 rounded">Total Ratings: {ratingsCount}</div>
      </div>

      <input
        type="text"
        placeholder="Search by Name, Email, Address, Role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <h2 className="text-xl font-semibold mt-6">User List</h2>
      <table className="w-full table-auto border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUpIcon className="inline w-4" /> : <ChevronDownIcon className="inline w-4" />)}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>
              Email {sortField === 'email' && (sortOrder === 'asc' ? <ChevronUpIcon className="inline w-4" /> : <ChevronDownIcon className="inline w-4" />)}
            </th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {sortData(filteredUsers).map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.address}</td>
              <td className="px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
