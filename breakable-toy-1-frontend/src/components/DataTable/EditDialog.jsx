import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { updateProduct } from '../../api/api'; // Import the updateProduct function

/**
 * EditDialog component for editing a product.
 * @param {boolean} open - Whether the dialog is open.
 * @param {function} onClose - Function to close the dialog.
 * @param {Array} editData - Data of the product being edited.
 * @param {string} editId - ID of the product being edited.
 * @param {function} setProducts - Function to update the products state.
 */
export default function EditDialog({ open, onClose, editData, editId, setProducts }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      // Use the updateProduct function from api.jsx
      const updatedData = await updateProduct(editId, formJson);

      // Update the products state with the updated product
      setProducts((pastData) =>
        pastData.map((product) => (product.id === editId ? updatedData : product))
      );

      console.log('Product updated successfully:', updatedData);
    } catch (error) {
      console.error('Error updating product:', error);
    }

    // Close the dialog
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