import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { createProduct } from '../../api/api'; // Import the API function

/**
 * BasicButtons component for adding a new product.
 * @param {function} onProductAdded - Callback to refresh the product list after adding a product.
 * @param {function} addedSuccess - Callback to show success notification.
 * @param {function} addedError - Callback to show error notification.
 */
export default function BasicButtons({ onProductAdded, addedSuccess, addedError }) {
  const [open, setOpen] = React.useState(false);

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission to add a new product
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      // Call the API to create a new product
      await createProduct(formJson);
      addedSuccess(true); // Show success notification
      setTimeout(() => addedSuccess(false), 3000);
      onProductAdded(); // Refresh the product list
    } catch (error) {
      addedError(true); // Show error notification
      setTimeout(() => addedError(false), 3000);
      console.error('Error creating product:', error);
    } finally {
      handleClose(); // Close the dialog
    }
  };

  return (
    <>
      <Container maxWidth="xl" className="margin">
        <Button variant="contained" onClick={handleClickOpen}>
          New Product
        </Button>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add New Item</DialogTitle>
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
          />
          <TextField
            margin="dense"
            id="expirationDate"
            name="expirationDate"
            type="date"
            fullWidth
            variant="standard"
            label="Expiration Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button label="Add" type="submit">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

