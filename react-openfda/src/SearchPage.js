import React, { useState } from 'react';
import { Container, TextField, Button, Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.fda.gov/drug/label.json?search=${query}&limit=10`);
      if (response.data.results && response.data.results.length > 0) {
        setResults(response.data.results);
      } else {
        setError('No results found.');
        setResults([]);
      }
    } catch (error) {
      setError('Error fetching data. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Container>
      <TextField
        label="Search for a drug"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
        Search
      </Button>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      <List>
        {results.map((result, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText
                primary={result.openfda.brand_name?.[0] || 'No brand name available'}
                secondary={result.openfda.generic_name?.join(', ') || 'No generic names available'}
              />
            </ListItemButton>
            <Button variant="contained" color="primary" onClick={() => navigate(`/drug/${result.id}`)}>
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SearchPage;
