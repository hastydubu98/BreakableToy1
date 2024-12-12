import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
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
          <TextField id="outlined-size-normal" defaultValue="None"/>
      </Stack>
    </Box>
  );
}
