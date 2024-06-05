import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Users from './pages/Users';
import Products from './pages/Products';
import './App.css';
import './fonts.css'; // Import the fonts.css file

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
