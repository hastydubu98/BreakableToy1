import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

import TextField from '../TextField/TextField';
import Multiselect from '../Multiselect/Multiselect';
import Availability from '../Availability/Availability';

// Styled button with custom colors
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[500],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

/**
 * RowAndColumnSpacing component for filtering products.
 * @param {function} onFilterComplete - Callback to handle the completion of filtering.
 */
export default function RowAndColumnSpacing({ onFilterComplete }) {
  const [name, setName] = React.useState(""); // State for the product name filter
  const [categories, setCategories] = React.useState(""); // State for the category filter
  const [availability, setAvailability] = React.useState(""); // State for the availability filter

  // Handle changes in the product name filter
  const handleTextChange = (value) => {
    setName(value);
  };

  // Handle changes in the category filter
  const handleCategoriesChange = (value) => {
    setCategories(value);
  };

  // Handle changes in the availability filter
  const handleAvailabilityChange = (value) => {
    setAvailability(value);
  };

  // Trigger the filter action and pass the selected filters to the parent component
  const handleFilter = () => {
    onFilterComplete(name, categories, availability);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
          <TextField onTextChange={handleTextChange} />
        </Grid>
        <Grid size={12}>
          <Multiselect onCategoriesChange={handleCategoriesChange} />
        </Grid>
        <Grid size={12} className="filter-row">
          <Availability onAvailabilityChange={handleAvailabilityChange} />
          <ColorButton
            disableElevation
            variant="contained"
            size="medium"
            onClick={handleFilter}
          >
            Search
          </ColorButton>
        </Grid>
      </Grid>
    </Box>
  );
}
