import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function DataTable({ refreshSignal, deleteSuccess, newFilter }) {

    const [products, setProducts] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [rowCount, setRowCount] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
      });
    const [queryOptions, setQueryOptions] = React.useState([{}]);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editId, setEditId] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [editData, setEditData] = React.useState([]);

    if (queryOptions.length == 0) {
            setQueryOptions([{
                field: null,
                direction: null,
            }]);
    }

    const columns = [
      { field: 'category', headerName: 'Category', width: 200, align: 'center', headerAlign: 'center', },
      { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center', },
      { field: 'price', headerName: 'Price', width: 200, align: 'center', headerAlign: 'center', },
      { field: 'expirationDate', headerName: 'Expiration Date', width: 200, align: 'center', headerAlign: 'center', },
      { field: 'stock', headerName: 'Stock', width: 200, type: 'number', align: 'center', headerAlign: 'center',
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
      { field: 'actions', headerName: 'Actions', width: 200, sortable: false,
          align: 'center', headerAlign: 'center', disableColumnMenu: true, disableColumnSelector: true,
          renderCell: (params) => (
              <>
                <ButtonGroup variant="text" aria-label="Basic button group">
                  <Button onClick={() => handleEditClickOpen(params.row)}>Edit</Button>
                  <Button onClick={() => handleDeleteClickOpen(params.row.id)}>Delete</Button>
                </ButtonGroup>
              </>
          )},
    ];

    const handleDeleteClickOpen = (id) => {
        setDeleteId(id);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleEditClickOpen = (row) => {
        setEditData([row.category, row.name, row.stock, row.price, row.expirationDate]);
        setEditId(row.id);
        setEditOpen(true);
    };

    const handleEditClose = (id) => {
        setEditOpen(false);
    };

    const handleRowSelectionChange = (newSelectionModel) => {

        const addedIds = newSelectionModel.filter((id) => !selectedRows.includes(id));
        const removedIds = selectedRows.filter((id) => !newSelectionModel.includes(id));

        if (addedIds.length > 1 ) {
          addedIds.forEach((id) => {
              fetch(`http://localhost:9090/products/${id}/outofstock`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
              })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error("Network response was not ok");
                  }
                  return response.json();
              })
              .then((data) => {
                  console.log("Product marked as out of stock: ", id);
              })
              .catch((error) => {
                  console.error("Error:", error);
              });
          })
        } else if (removedIds.length > 1) {
            removedIds.forEach((id) => {
                fetch(`http://localhost:9090/products/${id}/instock`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Product marked as in stock: ", id);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            })
        } else if (addedIds.length === 1) {
            fetch(`http://localhost:9090/products/${addedIds[0]}/outofstock`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Product marked as out of stock: ", addedIds[0]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } else if (removedIds.length === 1) {
            fetch(`http://localhost:9090/products/${removedIds[0]}/instock`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Product marked as in stock: ", removedIds[0]);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          }

        setSelectedRows(newSelectionModel);
    };

     React.useEffect(() => {
         const fetchProducts = async () => {
           setLoading(true);
           try {
             const response = await
             fetch(`http://localhost:9090/pagination?page=${paginationModel.page}&sortBy=${queryOptions[0]["field"]}&direction=${queryOptions[0]["sort"]}&name=${newFilter[0] || ''}&categories=${newFilter[1] || ''}&availability=${newFilter[2] || ''}`, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
             });
             const data = await response.json();
             setRowCount(data["page"]["totalElements"]);
             setProducts(data["_embedded"]["products"]);

           } catch (error) {
             console.error("Error fetching products:", error);
           } finally {
            setLoading(false);
           }
         };
         fetchProducts();
       }, [paginationModel, queryOptions, selectedRows, refreshSignal, newFilter]);


     const getRowClassName = (params) => {

         const classes = [];

             const stockAmount = params.row.stock;
             const expirationDate = new Date(params.row.expirationDate);
             const today = new Date();

             // Apply the strike-through class if stock is 0
             if (stockAmount === 0) {
                 classes.push('strike-through-row');
             }

             // Expiration-based logic
             if (expirationDate.getTime() !== 0) {
                 const oneWeekLater = new Date(today);
                 oneWeekLater.setDate(today.getDate() + 7);

                 const twoWeeksLater = new Date(today);
                 twoWeeksLater.setDate(today.getDate() + 14);

                 if (expirationDate <= oneWeekLater) {
                     classes.push('expired-row');
                 } else if (expirationDate > oneWeekLater && expirationDate <= twoWeeksLater) {
                     classes.push('near-expiration-row');
                 } else if (expirationDate > twoWeeksLater) {
                     classes.push('more-than-two-expiration-row');
                 }
             }

             // Return a space-separated string of all applicable classes
             return classes.join(' ');
     };

  return (
      <>
        <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                    fetch(`http://localhost:9090/delete?id=${deleteId}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formJson)
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((updatedData) => {
                            setProducts((pastData) =>
                                pastData.filter((product) =>
                                    product.id !== deleteId));
                            deleteSuccess(true);
                            setTimeout(() => deleteSuccess(false), 3000);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                handleDeleteClose();
              },
            }}
        >
        <DialogTitle id="alert-dialog-title">
          {"Delete Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Close</Button>
          <Button type="submit" autoFocus>
            Delete
          </Button>
        </DialogActions>
        </Dialog>

          <Dialog
            open={editOpen}
            onClose={handleEditClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                    fetch(`http://localhost:9090/products/${editId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formJson)
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((updatedData) => {
                            setProducts((pastData) =>
                                pastData.map((product) =>
                                    product.id === editId ? updatedData : product));
                            console.log("Product saved:", data);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                handleEditClose();
              },
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
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>


          <Container maxWidth="xl" >
            <Paper sx={{ height: 635, width: '100%' }}>
              <DataGrid
                rows={products}
                columns={columns}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel = {paginationModel}
                pageSizeOptions = {[10]}
                onPaginationModelChange={(newModel) => {setPaginationModel(newModel);}}
                sortingMode="server"
                onSortModelChange={(newModel) => {setQueryOptions(newModel)}}
                checkboxSelection
                loading={loading}
                onRowSelectionModelChange={handleRowSelectionChange}
                getRowClassName={getRowClassName}
                disableRowSelectionOnClick
                sx={{ border: "2px black solid", }}
              />
            </Paper>
        </Container>
      </>
  );
}