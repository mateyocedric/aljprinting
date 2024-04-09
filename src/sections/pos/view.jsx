import { alpha } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify/iconify';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
// ----------------------------------------------------------------------

export default function PosView() {
  const url = "http://127.0.0.1:8000/api/product-get-all/"



  const [product, setProducts] = useState([{
    category_id: 8,
    code: "005",
    label: "Small colored size document print",
    id: 1
  },
  ]);

  const [rows, setRows] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [selectProduct, setSelectProduct] = useState('');
  const [selectQuantity, setQuantity] = useState('');
  const [selectIdCount, setSelectIdCount] = useState(1);
  const [selectCash, setCash] = useState('');
  
  



  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get(url)
      .then(response => {
        // Set the fetched data to the state variable
        // setProducts(response.data);

        let arr = response.data
        arr = arr.map(item => (
          {
            id: item.id,
            price: item.price,
            label: item.name,
            description: item.description
          }
        ));
        setProducts(arr)
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleCheckoutOnClose = () => {
    setIsCheckOut(false);
  };

  const handleCheckout = async() => {
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/sales-add/',{
        sales:{
          grand_total:cartTotal,
          tendered_amount:selectCash,
          amount_change: selectCash - cartTotal
        },
        cart:rows
      })
      
      console.log(response)
    }catch( error) {
      console.log(error);
    }
    console.log('asdf')
    console.log(rows)
    setCash(0)
    setCartTotal(0)
    setRows([])
    setIsCheckOut(false);
  };


  const settings = useSettingsContext();
  const columns = [
    { field: 'name', headerName: 'name', flex: 1 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1
    },
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
        <IconButton aria-label="delete" size="small" onClick={() => deleteRow(row)}>
          <DeleteOutlineIcon fontSize="inherit" />
        </IconButton>,
    }
  ];




  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };
  
  const handleCashChange = event => {
    setCash(event.target.value);
  };

  const deleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete.id);
    setCartTotal(cartTotal - idToDelete.total)
    console.log(rows)
    setRows(updatedRows);
    console.log(rows)
    setQuantity('')
    setSelectProduct('')
  }

  const addToCart = () => {
    setSelectIdCount(selectIdCount + 1)
    const newRow = {
      id: selectIdCount,
      productId: selectProduct.id,
      name: selectProduct.label,
      description: selectProduct.description,
      price: selectProduct.price,
      quantity: selectQuantity,
      total: selectProduct.price * selectQuantity
    }

    setCartTotal(cartTotal + selectProduct.price * selectQuantity)
    setQuantity('')
    setRows(row => [
      ...row,
      newRow
    ])
    console.log(rows)
    setSelectProduct('')
  }




  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> POS </Typography>
      <br />

      <Stack
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
        >

          <Stack
            direction="row"
            spacing={1}
          >
            <Autocomplete
              value={selectProduct}
              onChange={(event, value) => setSelectProduct(value)}
              disablePortal
              id="combo-box-demo"
              options={product}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Product" />}
            />
            <TextField id="outlined-basic" label="Quantity" variant="outlined" type="number" value={selectQuantity} onChange={handleQuantityChange} />
            <Button variant="outlined" onClick={addToCart}>ADD ITEM</Button>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<Iconify icon="material-symbols-light:shopping-cart-checkout-rounded" />}
            onClick={() => {
              setIsCheckOut(true);
            }}
          >
            Check out
          </Button>

        </Stack>
        <Typography variant="subtitle1" component="h2">
          TOTAL : {cartTotal}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}

          disableRowSelectionOnClick
        />
      </Stack>

      <ConfirmDialog
        open={isCheckOut}
        onClose={handleCheckoutOnClose}
        title="Checkout"
        content={
          <Box>
            {rows.length === 0 ? (
              <Typography variant="h6" sx={{ color: 'error.main' }}>
                Cart is empty
              </Typography>
            ) : (
              <Box>
                

                <Typography variant="h6">
                  Are you sure want to checkout?
                </Typography>

                

                <Typography variant="h6">
                  Total: {cartTotal}
                </Typography>
                <TextField id="outlined-basic" label="Enter Cash" variant="outlined" type="number" value={selectCash} onChange={handleCashChange} /> 


              </Box>
            )}
          </Box>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCheckout();
            }}
          >
            Checkout
          </Button>
        }
      />
    </Container>
  );
}
