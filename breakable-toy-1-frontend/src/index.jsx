import * as React from 'react';

import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import FilterContainer from './components/FilterContainer'
import NewProduct from './components/NewProduct'
import DataTable from './components/DataTable'
import InventoryMetrics from './components/InventoryMetrics'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';

const root = createRoot(document.getElementById("root"))

function Page() {

      const [refreshTable, setRefreshTable] = React.useState(false);
      const [filter, setFilter] = React.useState(false);
      const [success, setSuccess] = React.useState(false);

      const handleSave = () => {
        setRefreshTable((prev) => {
            const newState = !prev;
            return newState;
        });
      };

      const handleFilterChange = (data) => {
         setFilter(data);
      };

      const handleSuccessChange = (status) => {
         setSuccess(status);
      };

    return (
        <>
            {success && (
                    <Alert severity="success" style={{ margin: "1rem" }}>
                      <AlertTitle>Success</AlertTitle>
                      Your product has been successfully created!
                    </Alert>
            )}
            <FilterContainer onFilterChange={handleFilterChange}/>
            <NewProduct onProductAdded={handleSave} addedSucces={handleSuccessChange}/>
            <DataTable  refreshSignal={refreshTable}/>
            <InventoryMetrics />
        </>
    )
}

root.render(
    <Page />
)
