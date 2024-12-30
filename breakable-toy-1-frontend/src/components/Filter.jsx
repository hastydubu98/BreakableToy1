import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

import TextField from './TextField'
import Multiselect from './Multiselect'
import Availability from './Availability'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[500],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

export default function RowAndColumnSpacing({ onFilterComplete }) {

    const [name, setName] = React.useState("");
    const handleTextChange = (value) => {
      setName(value);
    };

    const [categories, setCategories] = React.useState("");

    const handleCategoriesChange = (value) => {
      setCategories(value);
    };

    const [availability, setAvailability] = React.useState("");

    const handleAvailabilityChange = (value) => {
      setAvailability(value);
    };


    const handleFilter = () => {
        onFilterComplete(name, categories, availability)
    }


  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
            <TextField onTextChange={ handleTextChange } />
        </Grid>
        <Grid size={12}>
            <Multiselect onCategoriesChange={ handleCategoriesChange }/>
        </Grid>
        <Grid size={12} className="filter-row">
                <Availability onAvailabilityChange={ handleAvailabilityChange }/>
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
