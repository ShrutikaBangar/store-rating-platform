import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStores = async () => {
    const res = await axios.get(`/api/stores?search=${search}`);
    setStores(res.data);
  };

  const rateStore = async (storeId, rating) => {
    await axios.post('/api/ratings', { store_id: storeId, rating });
    fetchStores();
  };

  useEffect(() => {
    fetchStores();
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Store Ratings</h1>
      <input
        className="border p-2 w-full"
        placeholder="Search by store name or address..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {stores.map(store => (
          <div key={store.id} className="p-4 border rounded">
            <div className="text-lg font-semibold">{store.name}</div>
            <div className="text-sm">{store.address}</div>
            <div>Average Rating: {store.avgRating || 'N/A'}</div>
            <div>
              <label>Rate this store: </label>
              <select defaultValue={store.userRating || 0} onChange={(e) => rateStore(store.id, e.target.value)}>
                <option value={0}>Select</option>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
