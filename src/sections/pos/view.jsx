/* eslint-disable import/no-named-as-default */

import axios from 'axios';
import { PDFViewer } from "@react-pdf/renderer"
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandIcon from '@mui/icons-material/Expand';

// eslint-disable-next-line import/no-named-as-default-member
import PDFfile from 'src/components/PDFFile'
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';



// ----------------------------------------------------------------------

export default function PosView() {
  const url = "https://alj-django.onrender.com/api/product-get-all/"



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
  const [change, setChange] = useState(0);
  const [isPrint, setIsPrint] = useState(false)
  const [response, setResponse] = useState('')
  const [editQty, setEditQty] = useState(false)


  const [textInputNameQtyEdit , setTextInputNameQtyEdit] = useState(0)

  const handleTextInputqtyEdit  = event => {
    setTextInputNameQtyEdit(event.target.value);
  }


  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get(url)
      // eslint-disable-next-line no-shadow
      .then(response => {

        let arr = response.data
        arr = arr.map(item => (
          {
            id: item.id,
            price: item.price,
            label: item.name,
            description: item.description
          }
        ));

        arr = arr.sort((a, b) => {
          // Convert both names to lowercase
          const nameA = a.label.toLowerCase();
          const nameB = b.label.toLowerCase();

          // Compare the names
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0; // Names are equal
        })
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

  const handleCheckout = async () => {
    try {
      // eslint-disable-next-line no-shadow
      const response = await axios.post('https://alj-django.onrender.com/api/sales-add/', {
        sales: {
          grand_total: cartTotal,
          tendered_amount: selectCash,
          amount_change: selectCash - cartTotal
        },
        cart: rows
      })
      setResponse(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    console.log('asdf')
    console.log(rows)
    setIsPrint(true)
  };

  const handleIsPrintClose = () => {
    setCash('')
    setCartTotal(0)
    setRows([])
    setIsCheckOut(false);
    setIsPrint(false)

  }


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
      headerName: 'Price (Php)',
      flex: 1
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total (Php)',
      flex: 1
    },
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
        <>
        <IconButton aria-label="delete" size="small" onClick={() => deleteRow(row)}>
          <DeleteOutlineIcon fontSize="inherit" />
        </IconButton>,
        <IconButton aria-label="delete" size="small" onClick={() => saveRow(row)}>
          <ExpandIcon fontSize="inherit" />
        </IconButton>,
        </>



    }
  ];




  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };

  const handleCashChange = event => {
    setCash(event.target.value);
    setChange(event.target.value - cartTotal)
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

  const [thisRow , setThisRow] = useState('')
  const saveRow = (row) => {
    setEditQty(true)
    setThisRow(row)
    setTextInputNameQtyEdit(row.quantity)

  }

  const handleQtyEdit = () =>{
    console.log(thisRow)

    const rowIndex = rows.findIndex(row => row.id === thisRow.id);
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], quantity: textInputNameQtyEdit , total: textInputNameQtyEdit * thisRow.price };
    setRows(updatedRows);
    setCartTotal(  (cartTotal - thisRow.total) + textInputNameQtyEdit * thisRow.price)
    setThisRow({ ...updatedRows[rowIndex], quantity: textInputNameQtyEdit , total: textInputNameQtyEdit * thisRow.price })
    

    setEditQty(false)
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
            <Button
              variant="outlined"
              disabled={(selectProduct === '' || selectQuantity === '')}
              onClick={addToCart}
            >ADD ITEM</Button>

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

                <Typography variant="h6">
                  Change : {change}
                </Typography>


              </Box>
            )}
          </Box>
        }
        action={
          <Button
            disabled={selectCash - cartTotal <= 0}
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
      <Dialog
        open={isPrint}
        fullWidth
        onClose={handleIsPrintClose}
        title="Receipt"
      >
        <Box>

          <PDFViewer style={{ width: "100%", height: "800px" }}>
            <PDFfile data={{
              id: response.id,
              date: response.date,
              time: '12:30 PM',
              items: rows,
              total: cartTotal,
              cash: selectCash,
              change: selectCash - cartTotal
            }} />
          </PDFViewer>

          <DialogActions>
            <Button autoFocus onClick={handleIsPrintClose}>
              Cancel
            </Button>
          </DialogActions>

        </Box>

      </Dialog>


      <Dialog
        open={editQty}
        onClose={()=>setEditQty(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          Edit Quantity
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1} direction='row' mt={2}>
            <TextField id="outlined-basic" label="Quantity" variant="outlined" value={textInputNameQtyEdit}  onChange= {handleTextInputqtyEdit}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQtyEdit}>Update</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
