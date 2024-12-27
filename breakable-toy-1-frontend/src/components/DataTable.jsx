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

export default function DataTable() {

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

     React.useEffect(() => {
         const fetchProducts = async () => {
             console.log(paginationModel)
           setLoading(true);
           try {
             const response = await fetch(`http://localhost:9090/pagination?page=${paginationModel.page}`, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
             });
             const data = await response.json();
             console.log(data)
             setRowCount(data["page"]["totalElements"]);
             setProducts(data["_embedded"]["products"]);
           } catch (error) {
             console.error("Error fetching products:", error);
           } finally {
            setLoading(false);
           }
         };
         fetchProducts();
       }, [paginationModel]);

  return (
      <Container maxWidth="xl" >
        <Paper sx={{ height: 630, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            rowCount={rowCount}
            paginationMode="server"
            pagination
            paginationModel = {paginationModel}
            pageSizeOptions = {[10]}
            checkboxSelection
            loading={loading}
            //onRowSelectionModelChange={handleRowSelectionChange}
            onPaginationModelChange={(newModel) => {setPaginationModel(newModel);}}
            sx={{ border: "2px black solid", }}
          />
        </Paper>
    </Container>
  );
}