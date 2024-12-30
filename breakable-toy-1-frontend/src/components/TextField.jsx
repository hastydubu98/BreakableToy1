import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes({ onTextChange }) {

    const handleChange = (event) => {
        const value = event.target.value;
        onTextChange(value);
    }

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: 500 } }}
      noValidate
      autoComplete="off"
      display="flex"
    >
      <Stack direction='row'>
          <div style={{width: '100px'}}>
            <p className="filter">Name</p>
          </div>
          <TextField id="outlined-size-normal" defaultValue="None" onChange={handleChange}/>
      </Stack>
    </Box>
  );
}
