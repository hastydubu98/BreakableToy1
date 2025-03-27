import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DeleteDialog({ open, onClose, deleteId, setProducts, deleteSuccess }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:9090/delete?id=${deleteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setProducts((pastData) => pastData.filter((product) => product.id !== deleteId));
        deleteSuccess(true);
        setTimeout(() => deleteSuccess(false), 3000);
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle id="alert-dialog-title">{'Delete Item?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}