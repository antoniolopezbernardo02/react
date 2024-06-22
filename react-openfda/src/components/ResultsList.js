import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ResultsList = ({ results, onSelect }) => {
  return (
    <List>
      {results.map((result, index) => (
        <ListItem button key={index} onClick={() => onSelect(result)}>
          <ListItemText primary={result.brand_name} secondary={result.generic_name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ResultsList;
