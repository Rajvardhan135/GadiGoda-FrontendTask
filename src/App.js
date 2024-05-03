import './App.css';
import { useEffect, useState } from 'react';
import { getProducts } from './utils/products.utils';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorModal from './components/ErrorModal/ErrorModal.component';
import ProductTable from './components/ProductTable/ProductTable.component';

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      console.log(response);

      setProducts(response)
    }
    fetchData()
  }, [])

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
        {products.length === 0 ? <ErrorModal /> : <ProductTable products={products} />}
      </Box>
    </div>
  );
}

export default App;
