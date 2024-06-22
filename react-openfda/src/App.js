import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import DrugDetails from './DrugDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/drug/:id" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
