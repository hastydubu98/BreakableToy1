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


export default function BasicTable() {

    const [total, setTotal] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
             const fetchProducts = async () => {
               setLoading(true);
               try {
                 const response = await
                 fetch(`http://localhost:9090/total`, {
                   method: "GET",
                   headers: { "Content-Type": "application/json" },
                 });
                 const data = await response.json();
                 setTotal(data)
               } catch (error) {
                 console.error("Error fetching products:", error);
               } finally {
                setLoading(false);
               }
             };
             fetchProducts();
           }, []);

  console.log(total)

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
              {Object.keys(total).map((category) => (
                <TableRow
                  key={category}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category}
                  </TableCell>
                  <TableCell align="right">{total[category]["totalStocks"]}</TableCell>
                  <TableCell align="right">{total[category]["totalValue"]}</TableCell>
                  <TableCell align="right">{total[category]["average"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  );
}
