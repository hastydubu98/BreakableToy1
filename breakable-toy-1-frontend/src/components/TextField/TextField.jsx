import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

/**
 * TextFieldSizes component for filtering products by name.
 * @param {function} onTextChange - Callback function to handle text input changes.
 */
export default function TextFieldSizes({ onTextChange }) {
  // Handle changes in the text field and pass the value to the parent component
  const handleChange = (event) => {
    const value = event.target.value;
    onTextChange(value);
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: 500 } }}
      noValidate
      autoComplete="off"
      display="flex"
    >
      <Stack direction="row">
        <div style={{ width: '100px' }}>
          <p className="filter">Name</p>
        </div>
        <TextField
          id="outlined-size-normal"
          defaultValue="None"
          label="Name"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
