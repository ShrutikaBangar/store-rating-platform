import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Dialog } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [sortField, setSortField] = useState('user.name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsPerPage] = useState(5);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await API.get('/owner/ratings');
      setRatings(res.data.ratings);
      setAverageRating(res.data.averageRating);
    } catch (err) {
      console.error('Failed to fetch ratings', err);
    }
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      const valA = sortField.split('.').reduce((o, key) => o[key], a);
      const valB = sortField.split('.').reduce((o, key) => o[key], b);
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

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const sortedRatings = sortData(ratings);
  const indexOfLast = currentPage * ratingsPerPage;
  const indexOfFirst = indexOfLast - ratingsPerPage;
  const currentRatings = sortedRatings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(ratings.length / ratingsPerPage);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Store Owner Dashboard</h2>
      <div className="p-4 bg-green-100 rounded text-green-900">
        Average Store Rating: {averageRating ? averageRating.toFixed(1) : 'N/A'}
      </div>

      <h3 className="text-lg font-semibold mt-4">Ratings by Users</h3>
      <table className="w-full table-auto border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('user.name')}>
              User Name {sortField === 'user.name' && (sortOrder === 'asc' ? <ChevronUpIcon className="inline w-4" /> : <ChevronDownIcon className="inline w-4" />)}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('user.email')}>
              Email {sortField === 'user.email' && (sortOrder === 'asc' ? <ChevronUpIcon className="inline w-4" /> : <ChevronDownIcon className="inline w-4" />)}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('value')}>
              Rating {sortField === 'value' && (sortOrder === 'asc' ? <ChevronUpIcon className="inline w-4" /> : <ChevronDownIcon className="inline w-4" />)}
            </th>
            <th className="px-4 py-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {currentRatings.map((r) => (
            <tr key={r.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{r.user.name}</td>
              <td className="px-4 py-2">{r.user.email}</td>
              <td className="px-4 py-2">{r.value}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleCommentClick(r.comment)} className="text-blue-600 underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6">
            <Dialog.Title className="text-lg font-bold mb-2">User Comment</Dialog.Title>
            <p className="mb-4">{selectedComment || 'No comment provided.'}</p>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default OwnerDashboard;
