import React from 'react';
import { Typography } from '@mui/material';

const DrugDetail = ({ drug }) => {
  return (
    <div>
      <Typography variant="h4">{drug.brand_name}</Typography>
      <Typography variant="subtitle1">{drug.generic_name}</Typography>
      <Typography variant="body1">{drug.description}</Typography>
      {/* Muestra más detalles según la información disponible */}
    </div>
  );
};

export default DrugDetail;
