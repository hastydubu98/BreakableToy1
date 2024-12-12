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
    return (
        <>
            <FilterContainer />
            <NewProduct />
            <DataTable  />
            <InventoryMetrics />
        </>
    )
}

root.render(
    <Page />
)
