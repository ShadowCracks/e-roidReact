import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Homepage'; // Import the Home component
import Login from './Signin/Login';
import SignUp from './Signin/SignUp';
import './index.css'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />      {/* Homepage route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
