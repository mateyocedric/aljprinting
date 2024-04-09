import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ExpandIcon from '@mui/icons-material/Expand';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { useSettingsContext } from 'src/components/settings';



// ----------------------------------------------------------------------

export default function SalesView() {
  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'id',
      headerName: 'Order Id',
      flex : 1,
    },
    {
      field: 'grand_total',
      headerName: 'Grand Total',
      flex: 1,
    },
    {
      field: 'tendered_amount',
      headerName: 'Tendered Amount',
      flex: 1,
    },
    {
      field: 'amount_change',
      headerName: 'Amount Change',
      flex: 1,
    },
    
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
      <IconButton aria-label="delete" size="small" onClick={ () => handleCard(row)}>
        <ExpandIcon fontSize="inherit" />
      </IconButton>,
      } 
  ];

  const cartDataColumns = [
    {
      field: 'product_id',
      headerName: 'Grand Total',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'price',
      flex: 1,
    },
    {
      field: 'qty',
      headerName: 'quantity',
      flex: 1,
    },
    {
      field: 'total',
      headerName: 'total',
      flex: 1,
    }
  ];
  
  const [rows, setData] = useState([]);
  const [selectRowTotal, setSelectRowTotal] = useState('');
  const [selectRowChange, setSelectRowChange] = useState('');
  const [selectRowCash, setSelectRowCash] = useState('');
  
  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get('http://127.0.0.1:8000/api/sales-get-all/')
      .then(response => {
        // Set the fetched data to the state variable
        console.log(response.data)
        setData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  
  
  const [cartData, setCartData] = useState([]); 
  const handleCard = async(row) =>{

    console.log("row",row.grand_total)
    setSelectRowTotal(row.grand_total)
    setSelectRowCash(row.tendered_amount)
    setSelectRowChange(row.amount_change)
    setCheckOut(true)
    try{
      const aaa =  'http://127.0.0.1:8000/api/sales-item-get/?id='
      const response = await axios.get(aaa.concat(row.id))
      console.log("respone",response.data)
      setCartData(response.data)
    }catch( error) {
      console.log(error);
    }
  }

  const [isCheckOut, setCheckOut] = useState(false)

  const handleCheckoutOnClose = () =>{
    setCheckOut(false)
  }


  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Sales </Typography>
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
      <ConfirmDialog
        open={isCheckOut}
        fullWidth
        onClose={handleCheckoutOnClose}
        title="Receipt"
        content={
          <Box>
            {rows.length === 0 ? (
              <Typography variant="h6" sx={{ color: 'error.main' }}>
                Cart is empty
              </Typography>
            ) : (
              <Box>

                <DataGrid
                  rows={cartData}
                  columns={cartDataColumns}
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
                
                <Typography variant="h6">CASH : {selectRowCash}</Typography>
                <Typography variant="h6">TOTAL :{selectRowTotal}</Typography>
                <Typography variant="h6">CHANGE :{selectRowChange}</Typography>

              </Box>
            )}
          </Box>
        }
      />


    </Container>
  );
}
