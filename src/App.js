import './App.css';
import { useEffect, useState } from 'react';
import { getProducts } from './utils/products.utils';
import * as React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function App() {
  const [products, setProducts] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
    setSelectedRows(newSelection);
  };
  const downloadSelectedItems = () => {
    const selectedItems = selectedRows.map((row) => products[row - 1]);
    const csvData = selectedItems.map((item) => Object.values(item).join(','));
    console.log(selectedRows);
    console.log(selectedItems);
    const csvBlob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    saveAs(csvBlob, 'selected_items.csv');
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setProducts(response)
    }
    fetchData()
  }, [])

  const columns = [
    { field: 'images', headerName: 'Image', width: 60, renderCell: params => <Avatar src={params.row.images[0]} />, sortable: false, filterable: false, headerClassName: 'data-grid-colum-header', },
    { field: 'id', headerName: 'ID', width: 30, headerClassName: 'data-grid-colum-header', },
    { field: 'title', headerName: 'Title', width: 200, headerClassName: 'data-grid-colum-header', },
    { field: 'category', headerName: 'Category', width: 150, headerClassName: 'data-grid-colum-header', },
    { field: 'discount', headerName: 'Discount %', width: 100, headerClassName: 'data-grid-colum-header', },
    { field: 'price', headerName: 'Price', width: 100, headerClassName: 'data-grid-colum-header', },
    { field: 'rating', headerName: 'Rating', width: 100, headerClassName: 'data-grid-colum-header', },
    { field: 'description', headerName: 'Description', flex: 1, headerClassName: 'data-grid-colum-header', minWidth: 200 },
  ]

  return (
    <div className="App">
      <Box
        sx={{
          height: '600',
          width: '100%'
        }}
      >
        <Typography variant='h2'
          component='h2'
          sx={{
            textAlign: 'center',
            mt: 3,
            mb: 3,
            color: 'black'
          }}
        >Products List</Typography>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{ color: 'black', width: '100%' }}
          columns={columns}
          rows={products}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          pageSizeOptions={[10, 20, 50]}
        />
        <Button onClick={downloadSelectedItems}>Download Selected Items</Button>
      </Box>
    </div>
  );
}

export default App;
