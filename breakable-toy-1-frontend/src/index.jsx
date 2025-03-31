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
import { GlobalProvider } from './context/GlobalContext'; // Import the GlobalProvider

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const root = createRoot(document.getElementById("root"));

/**
 * Main Page component that renders the application.
 */
function Page() {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
}

/**
 * App component that contains the main application logic.
 */
function App() {
  const [createSuccess, setCreateSuccess] = React.useState(false); // Tracks product creation success
  const [createError, setCreateError] = React.useState(false); // Tracks product creation errors

  // Update the success state for product creation
  const handleSuccessChange = (status) => {
    setCreateSuccess(status);
  };

  // Update the error state for product creation
  const handleErrorChange = (status) => {
    setCreateError(status);
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

      {/* Render the filter container */}
      <FilterContainer />

      {/* Render the new product form */}
      <NewProduct
        addedSuccess={handleSuccessChange}
        addedError={handleErrorChange}
      />

      {/* Render the data table */}
      <DataTable />

      {/* Render the inventory metrics */}
      <InventoryMetrics />
    </>
  );
}

// Render the application
root.render(<Page />);
