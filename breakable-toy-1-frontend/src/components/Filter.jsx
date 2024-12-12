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

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
            <TextField />
        </Grid>
        <Grid size={12}>
            <Multiselect />
        </Grid>
        <Grid size={12} className="filter-row">
            <Availability />
            <ColorButton disableElevation variant="contained" size="medium">Search</ColorButton>
        </Grid>
      </Grid>
    </Box>
  );
}
