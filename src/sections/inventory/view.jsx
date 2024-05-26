
import axios from 'axios';

import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useSettingsContext } from 'src/components/settings';
// ----------------------------------------------------------------------

export default function PosView() {
  const settings = useSettingsContext();

  const [open, setOpen] = useState(false);
  const [textInputName, setTextInputName] = useState('');
  const [textInputDesc, setTextInputDesc] = useState('');
  const [textInputStock, setTextInputStock] = useState('');
  const handleClickOpen = (row) => {
    setRowData(row)
    console.log(row)
    setTextInputName(row.name)
    setTextInputDesc(row.description)
    setTextInputStock(row.stock)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get('https://alj-django.onrender.com/api/materials-get-all/')
      .then(response => {
        // Set the fetched data to the state variable
        console.log(response.data)
        setRows(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'id', flex: 1 },
    { field: 'name', headerName: 'name', flex: 1 },
    { field: 'description', headerName: 'description', flex: 1 },
    {
      field: 'stock',
      headerName: 'stock',
      flex: 1,
    },
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
      <IconButton aria-label="delete" size="small" onClick={() =>handleClickOpen(row)}>
        <EditIcon fontSize="inherit" />
      </IconButton>,
      } 
  ];
  
  const initialData = [
    { id: 1, name: "Bond Paper",stock:18 },
    { id: 2, name: "Black Ink",stock:20 },
    { id: 3, name: "Yellow Ink",stock:202 },
    { id: 4, name: "Cyan Ink",stock:187 },
    { id: 5, name: "Magenta Ink",stock:150 },
    { id: 8, name: "Mug",stock:120 },
    { id: 10, name: "T shirt L",stock:170 },
    { id: 11, name: "T shirt S",stock:180 },
  ];


  const [rows,setRows] = useState(initialData)


  const handleTextInputChangeName= event => {
    setTextInputName(event.target.value);
  }

  const handleTextInputChangeDesc= event => {
    setTextInputDesc(event.target.value);
  }
  const handleTextInputChangeStock= event => {
    setTextInputStock(event.target.value);
  }
  const [rowData, setRowData] = useState('');

  const handleUpdate= async() => {
    try{
      const response = await axios.post('https://alj-django.onrender.com/api/materials-update/',{
        id:rowData.id,
        name:textInputName,
        description:textInputDesc,
        stock:textInputStock,

      })

      const rowIndex = rows.findIndex(row => row.id === rowData.id);
    
      // Make a shallow copy of the rows array
      const updatedRows = [...rows];

      // Update the data of the row at rowIndex
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], stock: textInputStock };


      setRows(updatedRows);
      console.log(response)
    }catch( error) {
      console.log(error);
    }
    console.log("wazzup")
    setOpen(false)
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">Materials Inventory  </Typography>
      <br/>
      
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
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          Update Stock
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1} direction='row' mt={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={textInputName}  onChange= {handleTextInputChangeName}/>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={textInputDesc}  onChange= {handleTextInputChangeDesc}/>
            <TextField id="outlined-basic" label="Stock" variant="outlined" value={textInputStock}  onChange= {handleTextInputChangeStock}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
    
    
  );
}
