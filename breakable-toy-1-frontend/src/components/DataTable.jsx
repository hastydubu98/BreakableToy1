import * as React from 'react';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'category', headerName: 'Category', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'price', headerName: 'Price', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'expirationDate', headerName: 'Expiration Date', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'stock', headerName: 'Stock', width: 200, type: 'number', align: 'center', headerAlign: 'center', },
  { field: 'actions', headerName: 'Actions', width: 200, sortable: false, align: 'center', headerAlign: 'center', disableColumnMenu: true},
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {

    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

     const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data); // Set the fetched data to the state
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Turn off loading state
            }
        };

        fetchProducts();


  return (
      <Container maxWidth="xl" >
        <Paper sx={{ height: 630, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10]}
            checkboxSelection
            sx={{ border: "2px black solid", }}
          />
        </Paper>
    </Container>
  );
}