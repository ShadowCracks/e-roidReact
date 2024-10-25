import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Homepage'; // Import the Home component
import Login from './Sign in/Login'; // Import the Login component
import SignUp from './Sign in/SignUp';

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
