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

import Divider from '@mui/material/Divider';

const root = createRoot(document.getElementById("root"))

function Page() {

      const [refreshTable, setRefreshTable] = React.useState(false);

      const handleSave = () => {
        setRefreshTable((prev) => {
            const newState = !prev;
            console.log("refreshTable toggled:", newState);
            return newState;
        });
      };

      console.log(refreshTable)

    return (
        <>
            <FilterContainer />
            <NewProduct onProductAdded={handleSave}/>
            <DataTable  refreshSignal={refreshTable}/>
            <InventoryMetrics />
        </>
    )
}

root.render(
    <Page />
)
