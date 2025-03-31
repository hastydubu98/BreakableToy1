import * as React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

/**
 * SelectLabels component for filtering products by availability.
 * @param {function} onAvailabilityChange - Callback to handle changes in availability selection.
 */
export default function SelectLabels({ onAvailabilityChange }) {
  const [availability, setAvailability] = React.useState(''); // Default value is an empty string

  // Handle changes in the availability dropdown
  const handleChange = (event) => {
    const value = event.target.value;
    setAvailability(value);
    onAvailabilityChange(value); // Pass the selected value to the parent component
  };

  return (
    <Stack direction="row">
      <div style={{ width: '100px' }}>
        <p className="filter">Availability</p>
      </div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="availability-select-label">All</InputLabel>
        <Select
          labelId="availability-select-label"
          id="availability-select"
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

// PropTypes for validation
SelectLabels.propTypes = {
  onAvailabilityChange: PropTypes.func.isRequired,
};
