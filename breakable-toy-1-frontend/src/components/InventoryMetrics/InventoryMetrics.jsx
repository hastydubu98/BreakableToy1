import * as React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Helper function to create a data object for the table rows.
 * @param {string} name - Name of the category.
 * @param {number} products - Total products in stock.
 * @param {number} value - Total value of products in stock.
 * @param {number} price - Average price of products in stock.
 * @returns {Object} - Data object for the table row.
 */
function createData(name, products, value, price) {
  return { name, products, value, price };
}

/**
 * BasicTable component for displaying inventory metrics in a table.
 */
export default function BasicTable() {
  const [total, setTotal] = React.useState([]); // State to store inventory metrics
  const [error, setError] = React.useState(null); // State to store any errors
  const [loading, setLoading] = React.useState(true); // State to track loading status

  // Fetch inventory metrics from the backend
  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:9090/total`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setTotal(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

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
            {/* Render rows for each category */}
            {Object.keys(total)
              .filter((category) => category !== "Total")
              .map((category) => (
                <TableRow key={category} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{category}</TableCell>
                  <TableCell align="right">{total[category]["totalStocks"]}</TableCell>
                  <TableCell align="right">{total[category]["totalValue"]}</TableCell>
                  <TableCell align="right">{total[category]["average"]}</TableCell>
                </TableRow>
              ))}
            {/* Render the total row */}
            {total && total["Total"] && (
              <TableRow key={"Total"} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{"Total"}</TableCell>
                <TableCell align="right">{total["Total"]["totalStocks"]}</TableCell>
                <TableCell align="right">{total["Total"]["totalValue"]}</TableCell>
                <TableCell align="right">{total["Total"]["average"]}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
