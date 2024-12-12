import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function BasicButtons() {

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
              const email = formJson.email;
              console.log(email);
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
              id="date"
              name="date"
              type="date"
              fullWidth
              variant="standard"
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

