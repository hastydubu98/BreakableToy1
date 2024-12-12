import * as React from 'react';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'category', headerName: 'Category', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'price', headerName: 'Price', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'date', headerName: 'Expiration Date', width: 200, align: 'center', headerAlign: 'center', },
  { field: 'stock', headerName: 'Stock', width: 200, type: 'number', align: 'center', headerAlign: 'center', },
  { field: 'actions', headerName: 'Actions', width: 200, sortable: false, align: 'center', headerAlign: 'center', disableColumnMenu: true},
];

const rows = [
  { id: 1, category: 'Food', name: 'Watermelon', price: '$ 1.50', date: '12/25/2024', stock: 50, actions: 'Edit/Delete'},
  { id: 2, category: 'Electronics', name: 'Samsung TV', price: '$ 900.00', date: null, stock: 0, actions: 'Edit/Delete'},
  { id: 3, category: 'Clothing', name: 'Jeans', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
  { id: 4, category: 'Clothing', name: 'T-Shirt', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
  { id: 5, category: 'Food', name: 'Watermelon', price: '$ 1.50', date: '12/25/2024', stock: 50, actions: 'Edit/Delete'},
  { id: 6, category: 'Electronics', name: 'Samsung TV', price: '$ 900.00', date: null, stock: 0, actions: 'Edit/Delete'},
  { id: 7, category: 'Clothing', name: 'Jeans', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
  { id: 8, category: 'Clothing', name: 'T-Shirt', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
  { id: 9, category: 'Clothing', name: 'Jeans', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
  { id: 10, category: 'Clothing', name: 'T-Shirt', price: '$ 60.00', date: null, stock: 50, actions: 'Edit/Delete'},
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  return (
      <Container maxWidth="xl" >
        <Paper sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
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