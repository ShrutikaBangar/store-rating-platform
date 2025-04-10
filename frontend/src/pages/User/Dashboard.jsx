import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import Input from '../../components/ui/input';
import { StarIcon } from 'lucide-react';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [userRatings, setUserRatings] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchStores();
  }, [refresh]);

  const fetchStores = async () => {
    try {
      const res = await API.get('/stores');
      setStores(res.data);
      const myRatings = await API.get('/ratings/user');
      const map = {};
      myRatings.data.forEach(r => map[r.storeId] = r);
      setUserRatings(map);
    } catch (err) {
      console.error('Error fetching stores or ratings', err);
    }
  };

  const handleRatingSubmit = async (storeId, value) => {
    try {
      await API.post('/ratings', { storeId, value });
      setRefresh(!refresh);
    } catch (err) {
      console.error('Error submitting rating', err);
    }
  };

  const handleRatingUpdate = async (ratingId, value) => {
    try {
      await API.put(`/ratings/${ratingId}`, { value });
      setRefresh(!refresh);
    } catch (err) {
      console.error('Error updating rating', err);
    }
  };

  const filteredStores = stores.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) ||
         s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">User Dashboard</h2>

      <Input
        placeholder="Search by name or address"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStores.map(store => (
          <div key={store.id} className="border p-4 rounded shadow space-y-2">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p className="text-sm text-gray-600">{store.address}</p>
            <p className="text-sm">Average Rating: <strong>{store.avgRating ? store.avgRating.toFixed(1) : 'N/A'}</strong></p>

            {userRatings[store.id] ? (
              <div>
                <p className="text-sm">Your Rating: {userRatings[store.id].value}</p>
                <RatingInput
                  initial={userRatings[store.id].value}
                  onSubmit={val => handleRatingUpdate(userRatings[store.id].id, val)}
                />
              </div>
            ) : (
              <RatingInput
                onSubmit={val => handleRatingSubmit(store.id, val)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingInput = ({ initial = 0, onSubmit }) => {
  const [value, setValue] = useState(initial);

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map(n => (
        <StarIcon
          key={n}
          onClick={() => setValue(n)}
          className={`w-5 h-5 cursor-pointer ${n <= value ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <button
        onClick={() => onSubmit(value)}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
      >
        {initial ? 'Update' : 'Submit'}
      </button>
    </div>
  );
};

export default UserDashboard;