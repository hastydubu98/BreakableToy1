import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditDialog({ open, onClose, editData, editId, setProducts }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    fetch(`http://localhost:9090/products/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJson),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedData) => {
        setProducts((pastData) =>
          pastData.map((product) => (product.id === editId ? updatedData : product))
        );
        console.log('Product saved:', updatedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="category"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={editData[0]}
        />
        <TextField
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={editData[1]}
          inputProps={{ maxLength: 120 }}
        />
        <TextField
          required
          margin="dense"
          id="stock"
          name="stock"
          label="Stock"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={editData[2]}
        />
        <TextField
          required
          margin="dense"
          id="price"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={editData[3]}
        />
        <TextField
          margin="dense"
          id="expirationDate"
          name="expirationDate"
          type="date"
          fullWidth
          variant="standard"
          helperText="Expiration Date"
          defaultValue={editData[4]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}