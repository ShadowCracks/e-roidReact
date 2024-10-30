import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Homepage';
import Login from './Signin/Login';
import SignUp from './Signin/SignUp';// Import ProfileDashboard component
import './index.css';
import './components/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Username from './components/User/Username';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthProvider';
import Source from './components/Source/Source';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />               {/* Homepage route */}
        <Route path="/login" element={<Login />} />         {/* Login page route */}
        <Route path="/signup" element={<SignUp />} />       {/* Signup page route */}
        <Route path="/profile/:username" element={<Username />} /> {/* Dynamic user profile route */}
        <Route path="/Source" element={<Source />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;

