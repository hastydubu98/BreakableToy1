import * as React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, products, value, price) {
  return { name, products, value, price};
}

const rows = [
  createData('Food', 50, "$ 75", "$ 1.50"),
  createData('Clothing', 100, "$ 4,500", "$ 45.00"),
  createData('Electronics', 0, "$ 0", "$ 0"),
  createData('Overall', 150, "$ 4,575.00", "$ 30.50"),
];

export default function BasicTable() {
  return (
      <Container maxWidth="xl" className="margin">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, border: "2px solid black" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Total Products In Stock</TableCell>
                <TableCell align="right">Total Value In Stock</TableCell>
                <TableCell align="right">Average Price In Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.products}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  );
}
