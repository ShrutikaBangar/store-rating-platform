import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../frontend/src/components/PrivateRoute';
import LoginSignup from '../../frontend/src/pages/Auth/LoginSignup';
import UpdatePassword from '../../frontend/src/pages/Auth/UpdatePassword';
import AdminDashboard from '../../frontend/src/pages/Admin/Dashboard';
import UserDashboard from '../../frontend/src/pages/User/Dashboard';
import OwnerDashboard from '../../frontend/src/pages/StoreOwner/OwnerDashboard';
import Unauthorized from '../../frontend/src/pages/Unauthorized';

const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return await response.json();
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/update-password" element={<PrivateRoute><UpdatePassword /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute roles={['user']}><UserDashboard /></PrivateRoute>} />
        <Route path="/owner" element={<PrivateRoute roles={['owner']}><OwnerDashboard /></PrivateRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
