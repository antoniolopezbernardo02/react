import React, { useState } from 'react';
import { Container, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MedicationDetail from './components/MedicationDetail'; // Ruta relativa al componente MedicationDetail

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchTerm}"&limit=10`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="search-input"
            label="Search medication"
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={!searchTerm || loading}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress />}
          {error && <div>{error}</div>}
          {!loading && searchResults.length === 0 && searchTerm && <div>No results found.</div>}
          {!loading && searchResults.length > 0 && (
            <div>
              <h2>Search Results</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link to={`/medication/${result.id}`}>
                      {result.openfda && result.openfda.brand_name && result.openfda.brand_name[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Grid>
      </Grid>

      <Switch>
        <Route path="/medication/:id" component={MedicationDetail} />
      </Switch>
    </Container>
  );
}

export default App;
