import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DrugDetails() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.fda.gov/drug/label.json?search=id:${id}`);
        if (response.data.results && response.data.results.length > 0) {
          setDrug(response.data.results[0]);
        } else {
          setError('No data available for this drug.');
        }
      } catch (error) {
        setError('Error fetching data. Please try again.');
      }

      setLoading(false);
    };

    fetchDrugDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!drug) return <Typography>No data available</Typography>;

  return (
    <Container>
      <Typography variant="h4">{drug.openfda.brand_name?.[0] || 'No brand name available'}</Typography>
      <Typography variant="h6">Generic Names: {drug.openfda.generic_name?.join(', ') || 'No generic names available'}</Typography>
      <Typography variant="body1">Manufacturer: {drug.openfda.manufacturer_name?.join(', ') || 'No manufacturer available'}</Typography>
      <Typography variant="body2" marginTop={2}>
        {drug.description || 'No description available'}
      </Typography>
    </Container>
  );
}

export default DrugDetails;
