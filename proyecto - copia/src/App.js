import React from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (searchTerm) => {
    console.log('Término de búsqueda:', searchTerm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mi Aplicación</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
