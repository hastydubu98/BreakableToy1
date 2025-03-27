import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const columns = (handleEditClickOpen, handleDeleteClickOpen) => [
  { field: 'category', headerName: 'Category', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'price', headerName: 'Price', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'expirationDate', headerName: 'Expiration Date', width: 200, align: 'center', headerAlign: 'center' },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 200,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const stockAmount = params.row.stock;

      let cellClass = '';
      if (stockAmount > 10) {
        cellClass = 'stock-high';
      } else if (stockAmount >= 5 && stockAmount <= 10) {
        cellClass = 'stock-mid';
      } else {
        cellClass = 'stock-low';
      }

      return <div className={cellClass}>{stockAmount}</div>;
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    disableColumnSelector: true,
    renderCell: (params) => (
      <ButtonGroup variant="text" aria-label="Basic button group">
        <Button onClick={() => handleEditClickOpen(params.row)}>Edit</Button>
        <Button onClick={() => handleDeleteClickOpen(params.row.id)}>Delete</Button>
      </ButtonGroup>
    ),
  },
];