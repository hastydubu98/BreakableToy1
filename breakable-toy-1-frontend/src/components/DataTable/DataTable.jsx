import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import { columns } from './Columns'; // Import the columns function
import EditDialog from './EditDialog'; // Import the EditDialog component
import DeleteDialog from './DeleteDialog'; // Import the DeleteDialog component
import { handleRowSelection } from '../../utils/rowSelectionHandler'; // Import the row selection handler
import { fetchProducts } from '../../api/api'; // Import the fetchProducts function
import { GlobalContext } from '../../context/GlobalContext'; // Import the GlobalContext

export default function DataTable() {
  // Access global state using the GlobalContext
  const {
    refreshSignal,
    deleteSuccess,
    newFilter,
    setDeleteSuccess,
  } = React.useContext(GlobalContext);

  // State variables
  const [products, setProducts] = React.useState([]); // Stores the product data
  const [error, setError] = React.useState(null); // Stores any errors
  const [loading, setLoading] = React.useState(true); // Tracks loading state
  const [rowCount, setRowCount] = React.useState(0); // Total number of rows
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  }); // Pagination model
  const [queryOptions, setQueryOptions] = React.useState([{}]); // Sorting options
  const [editOpen, setEditOpen] = React.useState(false); // Tracks if the Edit dialog is open
  const [editId, setEditId] = React.useState(null); // Stores the ID of the product being edited
  const [deleteId, setDeleteId] = React.useState(null); // Stores the ID of the product being deleted
  const [deleteOpen, setDeleteOpen] = React.useState(false); // Tracks if the Delete dialog is open
  const [selectedRows, setSelectedRows] = React.useState([]); // Tracks selected rows
  const [editData, setEditData] = React.useState([]); // Stores the data of the product being edited

  // Handle opening the Delete dialog
  const handleDeleteClickOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  // Handle closing the Delete dialog
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  // Handle opening the Edit dialog
  const handleEditClickOpen = (row) => {
    setEditData([row.category, row.name, row.stock, row.price, row.expirationDate]);
    setEditId(row.id);
    setEditOpen(true);
  };

  // Handle closing the Edit dialog
  const handleEditClose = () => {
    setEditOpen(false);
  };

  // Handle row selection changes
  const handleRowSelectionChange = (newSelectionModel) => {
    const addedIds = newSelectionModel.filter((id) => !selectedRows.includes(id));
    const removedIds = selectedRows.filter((id) => !newSelectionModel.includes(id));

    // Use the utility function to handle row selection logic
    handleRowSelection(addedIds, removedIds);

    setSelectedRows(newSelectionModel);
  };

  // Fetch products from the backend
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Construct query parameters
        const queryParams = `page=${paginationModel.page}&sortBy=${queryOptions[0]?.field || ''}&direction=${queryOptions[0]?.sort || ''}&name=${newFilter[0] || ''}&categories=${newFilter[1] || ''}&availability=${newFilter[2] || ''}`;

        // Use the fetchProducts function from api.jsx
        const data = await fetchProducts(queryParams);

        // Update state with the fetched data
        setRowCount(data.page?.totalElements || 0);
        setProducts(data._embedded?.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel, queryOptions, selectedRows, refreshSignal, newFilter]);

  // Determine row class names based on stock and expiration date
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

    return classes.join(' ');
  };

  return (
    <>
      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        deleteId={deleteId}
        setProducts={setProducts}
        deleteSuccess={setDeleteSuccess} // Update delete success in global context
      />

      {/* Edit Dialog */}
      <EditDialog
        open={editOpen}
        onClose={handleEditClose}
        editData={editData}
        editId={editId}
        setProducts={setProducts}
      />

      {/* DataGrid */}
      <Container maxWidth="xl">
        <Paper sx={{ height: 635, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns(handleEditClickOpen, handleDeleteClickOpen)}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            pageSizeOptions={[10]}
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
            sortingMode="server"
            onSortModelChange={(newModel) => setQueryOptions(newModel)}
            checkboxSelection
            loading={loading}
            onRowSelectionModelChange={handleRowSelectionChange}
            getRowClassName={getRowClassName}
            disableRowSelectionOnClick
            sx={{ border: '2px black solid' }}
          />
        </Paper>
      </Container>
    </>
  );
}