import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import FilterContainer from './components/FIlterContainer/FilterContainer';
import NewProduct from './components/NewProduct/NewProduct';
import DataTable from './components/DataTable/DataTable';
import InventoryMetrics from './components/InventoryMetrics/InventoryMetrics';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const root = createRoot(document.getElementById("root"));

/**
 * Main Page component that renders the application.
 */
function Page() {
  const [deleteSuccess, setDeleteSuccess] = React.useState(false); // Tracks delete success
  const [refreshTable, setRefreshTable] = React.useState(false); // Tracks table refresh
  const [filter, setFilter] = React.useState(false); // Tracks applied filters
  const [createSuccess, setCreateSuccess] = React.useState(false); // Tracks product creation success
  const [createError, setCreateError] = React.useState(false); // Tracks product creation errors

  // Toggle the refresh state to reload the table
  const handleSave = () => {
    setRefreshTable((prev) => !prev);
  };

  // Update the filter state
  const handleFilterChange = (...props) => {
    setFilter(...props);
  };

  // Update the success state for product creation
  const handleSuccessChange = (status) => {
    setCreateSuccess(status);
  };

  // Update the error state for product creation
  const handleErrorChange = (status) => {
    setCreateError(status);
  };

  // Update the success state for product deletion
  const handleDeleteSuccessChange = (status) => {
    setDeleteSuccess(status);
  };

  return (
    <>
      {/* Display success alert for product creation */}
      {createSuccess && (
        <Alert severity="success" style={{ margin: "1rem" }}>
          <AlertTitle>Success</AlertTitle>
          The product has been successfully created!
        </Alert>
      )}

      {/* Display error alert for product creation */}
      {createError && (
        <Alert severity="error" style={{ margin: "1rem" }}>
          <AlertTitle>Error</AlertTitle>
          Invalid information.
        </Alert>
      )}

      {/* Display success alert for product deletion */}
      {deleteSuccess && (
        <Alert severity="success" style={{ margin: "1rem" }}>
          <AlertTitle>Success</AlertTitle>
          The product has been successfully deleted!
        </Alert>
      )}

      {/* Render the filter container */}
      <FilterContainer onFilterChange={handleFilterChange} />

      {/* Render the new product form */}
      <NewProduct
        onProductAdded={handleSave}
        addedSuccess={handleSuccessChange}
        addedError={handleErrorChange}
      />

      {/* Render the data table */}
      <DataTable
        refreshSignal={refreshTable}
        deleteSuccess={handleDeleteSuccessChange}
        newFilter={filter}
      />

      {/* Render the inventory metrics */}
      <InventoryMetrics />
    </>
  );
}

// Render the application
root.render(<Page />);
