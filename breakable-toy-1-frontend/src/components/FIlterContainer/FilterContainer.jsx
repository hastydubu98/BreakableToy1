import * as React from 'react';
import Filter from '../Filter/Filter';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { GlobalContext } from '../../context/GlobalContext'; // Import the GlobalContext

/**
 * FilterContainer component for managing and displaying the filter UI.
 * Updates the global `newFilter` state to refresh the DataTable.
 */
export default function FilterContainer() {
  const { setNewFilter } = React.useContext(GlobalContext); // Access the global context

  // Handle the completion of filtering and update the global `newFilter` state
  const handleFilterComplete = (name, categories, availability) => {
    setNewFilter([name, categories, availability]); // Update the global `newFilter` state
  };

  return (
    <Container maxWidth="xl" className="margin">
      <Box sx={{ border: '2px solid black' }}>
        {/* Render the Filter component */}
        <Filter onFilterComplete={handleFilterComplete} />
      </Box>
    </Container>
  );
}