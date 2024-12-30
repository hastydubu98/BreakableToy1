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

      const [deleteSuccess, setDeleteSuccess] = React.useState(false);
      const [refreshTable, setRefreshTable] = React.useState(false);
      const [filter, setFilter] = React.useState(false);
      const [createSuccess, setCreateSuccess] = React.useState(false);

      const handleSave = () => {
        setRefreshTable((prev) => {
            const newState = !prev;
            return newState;
        });
      };

      const handleFilterChange = (...props) => {
         setFilter(...props);
      };

      const handleSuccessChange = (status) => {
         setCreateSuccess(status);
      };

      const handleDeleteSuccessChange = (status) =>  {
         setDeleteSuccess(status);
      };

    return (
        <>
            {createSuccess && (
                    <Alert severity="success" style={{ margin: "1rem" }}>
                      <AlertTitle>Success</AlertTitle>
                      The product has been successfully created!
                    </Alert>
            )}

            {deleteSuccess && (
                    <Alert severity="success" style={{ margin: "1rem" }}>
                      <AlertTitle>Success</AlertTitle>
                      The product has been successfully deleted!
                    </Alert>
            )}


            <FilterContainer onFilterChange={handleFilterChange}/>
            <NewProduct onProductAdded={handleSave} addedSucces={handleSuccessChange}/>
            <DataTable
                refreshSignal={refreshTable}
                deleteSuccess={handleDeleteSuccessChange}
                newFilter={filter}
            />
            <InventoryMetrics />
        </>
    )
}

root.render(
    <Page />
)
