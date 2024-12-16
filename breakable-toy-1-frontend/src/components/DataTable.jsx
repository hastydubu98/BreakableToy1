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
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedIds, setSelectedIds] = React.useState([]);

     React.useEffect(() => {
         const fetchProducts = async () => {
           try {
             const response = await fetch("http://localhost:8080/", {
               method: "GET",
               headers: { "Content-Type": "application/json" },
             });
             const data = await response.json();
             setProducts(data);
           } catch (error) {
             console.error("Error fetching products:", error);
           }
         };
         fetchProducts();
       }, []);

       const handleRowSelectionChange = React.useCallback((selectionModel) => {
         // Find IDs that were added (checked)
         const addedIds = selectionModel.filter((id) => !selectedIds.includes(id));

         // Find IDs that were removed (unchecked)
         const removedIds = selectedIds.filter((id) => !selectionModel.includes(id));

         if (addedIds.length > 0) {
           fetch(`http://localhost:8080/products/${addedIds[0]}/outofstock`, {
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
                 console.log("Product saved:", data);
               })
               .catch((error) => {
                 console.error("Error:", error);
               });
         }

         if (removedIds.length > 0) {
           console.log("Unchecked:", removedIds);
         }

         // Update the selected IDs state only if it has changed
         if (JSON.stringify(selectionModel) !== JSON.stringify(selectedIds)) {
           setSelectedIds(selectionModel);
         }
       }, [selectedIds]);

  return (
      <Container maxWidth="xl" >
        <Paper sx={{ height: 630, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelectionChange}
            sx={{ border: "2px black solid", }}
          />
        </Paper>
    </Container>
  );
}