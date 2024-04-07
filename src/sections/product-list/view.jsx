import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import {DataGrid} from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { useSettingsContext } from 'src/components/settings';


import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------


export default function ProductListView() {

  const url = "http://127.0.0.1:8000/api/product-get-all/"
  
  const columns = [
    { field: 'code', headerName: 'Code', flex : 1 },
    {
      field: 'name',
      headerName: 'name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
    },
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
      <IconButton aria-label="delete" size="small" onClick={ () => handleClickOpen(row)}>
        <EditIcon fontSize="inherit" />
      </IconButton>,
      } 
  ];
  
  const initial = [
    { id: 1, code: "005", name: "Print Small Colored", description: "Small colored size document print", price: 3 },
    { id: 2, code: "004", name: "Print B&W-A3", description: "A3 Print B&W", price: 15 },
    { id: 3, code: "003", name: "Print B&W - Long", description: "Long Print B&W", price: 2 },
    { id: 4, code: "002", name: "Print B&W-A4", description: "A4 print B&W", price: 2 },
    { id: 5, code: "001", name: "Print B&W - Short", description: "Short Print B&W", price: 2 },
    { id: 6, code: "011", name: "Photocopy A3", description: "A3 Photocopy", price: 15 },
    { id: 7, code: "006", name: "Print Medium Colored", description: "Medium size colored", price: 5 },
    { id: 8, code: "007", name: "Print Large Colored", description: "Large Colored Size", price: 10 },
    { id: 9, code: "008", name: "Print Special Paper", description: "Special paper printing like parchment, vel", price: 25 },
    { id: 10, code: "009", name: "Print Laser Colored", description: "Fujixerox Laser print colored small, medium", price: 35 },
    { id: 11, code: "010", name: "Photocopy B&W Long, Short, A4", description: "B&W Long, Short, A4 photocopy", price: 2 },
    { id: 12, code: "012", name: "Photocopy Colored Long, Short, A4-Nor Colored Long, Short, A4 photocopy not L", description: "Colored Long, Short, A4 photocopy not Laminated", price: 15 }
  ];

  const [rows, setData] = useState(initial);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get(url)
      .then(response => {
        // Set the fetched data to the state variable
        setData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (row) => {
    console.log(row)
    setRowData(row)
    setTextInputName(row.name)
    setTextInputDesc(row.description)
    setTextInputPrice(row.price)
    setOpen(true);
  };

  const handleClose = async () => {

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/product-update/',{
        id:rowData.id,
        category_id:rowData.category_id,
        code:111,
        name:textInputName,
        description:textInputDesc,
        price:textInputPrice,

      })
      
      console.log(response)
    }catch( error) {
      console.log(error);
    }


    setOpen(false);
  };

  const [rowData, setRowData] = useState('');
  const [textInputName, setTextInputName] = useState('');
  const [textInputDesc, setTextInputDesc] = useState('');
  const [textInputPrice, setTextInputPrice] = useState('');

  const handleTextInputChangeName = event => {
    setTextInputName(event.target.value);
  };
  const handleTextInputChangeDesc = event => {
    setTextInputDesc(event.target.value);
  };
  const handleTextInputChangePrice = event => {
    setTextInputPrice(event.target.value);
  };


  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Product List </Typography>
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
        open={open}
        onClose={() =>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Product
        </DialogTitle>
        <DialogContent>
          <TextField id="outlined-basic" label="Name" variant="outlined" value={textInputName}  onChange= {handleTextInputChangeName}/>
          <TextField id="outlined-basic" label="Description" variant="outlined" value={textInputDesc}  onChange= {handleTextInputChangeDesc}/>
          <TextField id="outlined-basic" label="Price" variant="outlined" value={textInputPrice} onChange= {handleTextInputChangePrice}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>

    
    

    </Container>
  );
}
