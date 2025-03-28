import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { fetchCategories } from '../../api/api'; // Import the API function

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

/**
 * MultipleSelectCheckmarks component for selecting categories.
 * @param {function} onCategoriesChange - Callback to pass selected categories to the parent component.
 */
export default function MultipleSelectCheckmarks({ onCategoriesChange }) {
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Fetch categories from the backend
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories(); // Use the centralized API function
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Handle category selection changes
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedCategories(selected);
    onCategoriesChange(selected); // Pass selected categories to parent
  };

  return (
    <Stack direction="row">
      <div style={{ width: '100px' }}>
        <p className="filter">Category</p>
      </div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox-label">All</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories?.map((categoryName) => (
            <MenuItem key={categoryName} value={categoryName}>
              <Checkbox checked={selectedCategories.includes(categoryName)} />
              <ListItemText primary={categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
