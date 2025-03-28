import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

/**
 * SelectLabels component for filtering products by availability.
 * @param {function} onAvailabilityChange - Callback to handle changes in availability selection.
 */
export default function SelectLabels({ onAvailabilityChange }) {
  const [availability, setAvailability] = React.useState('');

  // Handle changes in the availability dropdown
  const handleChange = (event) => {
    setAvailability(event.target.value);
    onAvailabilityChange(event.target.value); // Pass the selected value to the parent component
  };

  return (
    <Stack direction="row">
      <div style={{ width: '100px' }}>
        <p className="filter">Availability</p>
      </div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-helper-label">All</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={availability}
          label="Availability"
          onChange={handleChange}
        >
          {/* Dropdown options */}
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="In stock">In stock</MenuItem>
          <MenuItem value="Out of stock">Out of stock</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
