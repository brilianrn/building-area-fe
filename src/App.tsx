import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {/* login route */}
          <Route path="/login" element={<Login />} />

          {/* home route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
