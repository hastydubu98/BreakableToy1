import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function BasicButtons({ onProductAdded }) {

    const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

  return (
      <>
      <Container maxWidth="xl" className='margin'>
        <Button variant="contained" onClick={handleClickOpen}>New Product</Button>
      </Container>
      <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
                  fetch("http://localhost:9090/products", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formJson)
                  })
                      .then((response) => {
                          if (!response.ok) {
                              throw new Error("Network response was not ok");
                          }
                          return response.json();
                      })
                      .then((data) => {
                          console.log("Product saved:", data);
                          onProductAdded();
                      })
                      .catch((error) => {
                          console.error("Error:", error);
                      });
              handleClose();
            },
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
              helperText="Expiration Date"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
      </Dialog>
      </>
  );
}

