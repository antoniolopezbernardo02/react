import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <TextField 
        label="Buscar medicamento" 
        variant="outlined" 
        fullWidth 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
