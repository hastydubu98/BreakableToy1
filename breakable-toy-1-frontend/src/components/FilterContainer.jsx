import * as React from 'react';
import Filter from './Filter'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function FilterContainer () {
    return(
        <Container maxWidth="xl" className='margin'>
            <Box sx={{ border: '2px solid  black'}}>
                <Filter />
            </Box>
        </Container>
    )
}