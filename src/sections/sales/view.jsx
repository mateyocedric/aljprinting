
import axios from 'axios';

import React, { useState, useEffect } from 'react';

import { useSettingsContext } from 'src/components/settings';
import PDFfile from 'src/components/PDFFile';

import {PDFViewer} from "@react-pdf/renderer"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandIcon from '@mui/icons-material/Expand';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';




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
      headerName: 'item',
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
  const [selectRow, setSelectRow] = useState('');
  const [isPrint , setIsPrint] = useState(true)
  
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

    console.log(row)
    setSelectRow(row)
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
    setIsPrint(true)
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
      <Dialog
        open={isCheckOut}
        fullWidth
        onClose={handleCheckoutOnClose}
        title="Receipt"
      >  
          <Box>
            {isPrint? (
            <Box> <DialogTitle>Receipt</DialogTitle>
            <DialogContent> 
 
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
                 
                 <Typography variant="h6">CASH : {selectRow.tendered_amount}</Typography>
                 <Typography variant="h6">TOTAL :{selectRow.grand_total}</Typography>
                 <Divider/>
                 <Typography variant="h6">CHANGE :{selectRow.amount_change}</Typography>
             </DialogContent> </Box>) :  (<PDFViewer style={{ width: "100%", height: "800px" }}>
                  {console.log("receiptData", selectRow)}
                  <PDFfile data={{
                    id: selectRow.id,
                    date: selectRow.date,
                    time: '12:30 PM',
                    items: cartData,
                    total: selectRow.grand_total,
                    cash: selectRow.tendered_amount,
                    change: selectRow.amount_change 
                  }} />
                </PDFViewer>)  }
          
              <DialogActions>
                <Button autoFocus onClick={handleCheckoutOnClose}>
                  Cancel
                </Button>
                <Button onClick={ ()=>{ isPrint ? setIsPrint(false):setIsPrint(true) }}>Print</Button>
              </DialogActions>
            
          </Box>
        
      </Dialog> 


    </Container>
  );
}
