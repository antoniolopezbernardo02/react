import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress } from '@material-ui/core';

function MedicationDetail() {
  const { id } = useParams();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicationDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://api.fda.gov/drug/label.json?search=id:"${id}"`);
        setMedication(response.data.results[0]);
      } catch (error) {
        setError('Error fetching medication details. Please try again later.');
        console.error('Error fetching medication details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicationDetail();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {medication && (
        <div>
          <Typography variant="h5">{medication.openfda.brand_name && medication.openfda.brand_name[0]}</Typography>
          <Typography variant="body1">Generic Name: {medication.openfda.generic_name && medication.openfda.generic_name[0]}</Typography>
          <Typography variant="body1">Manufacturer: {medication.openfda.manufacturer_name && medication.openfda.manufacturer_name[0]}</Typography>
          <Typography variant="body1">Description: {medication.description && medication.description[0]}</Typography>
          <Typography variant="body1">Dosage: {medication.dosage && medication.dosage[0]}</Typography>
          <Typography variant="body1">Warnings: {medication.warnings && medication.warnings[0]}</Typography>
        </div>
      )}
    </div>
  );
}

export default MedicationDetail;
