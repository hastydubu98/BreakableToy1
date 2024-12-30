import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ onCategoriesChange }) {

  const [category, setCategory] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      typeof value === 'string' ? value.split(',') : value,
    );
    onCategoriesChange(value);
  };

  React.useEffect(() => {
           const fetchProducts = async () => {
             try {
               const response = await
               fetch(`http://localhost:9090/categories`, {
                 method: "GET",
                 headers: { "Content-Type": "application/json" },
               });
               const data = await response.json();
               setCategories(data);
             } catch (error) {
               console.error("Error fetching products:", error);
             } finally {
             }
           };
           fetchProducts();
  }, []);

  return (
    <Stack direction='row'>
      <div style={{width: '100px'}}>
        <p className="filter">Category</p>
      </div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox-label">All</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((categoryName) => (
            <MenuItem key={categoryName} value={categoryName}>
              <Checkbox checked={category.includes(categoryName)} />
              <ListItemText primary={categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
