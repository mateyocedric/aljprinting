import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSettingsContext } from 'src/components/settings';
import {DataGrid} from '@mui/x-data-grid';


import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// ----------------------------------------------------------------------

export default function ProductListView() {

  const url  = "http://127.0.0.1:8000/api/category/"
  const columns = [
    { field: 'name', headerName: 'name', flex: 1 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1
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
  const initial = [
    { id: 1, name: "Photocopy", description: "Laser Copy" },
    { id: 2, name: "Book Binding", description: "Soft, Ring, Hard Binding" },
    { id: 3, name: "Tarpaulin", description: "Tarpaulin printing" },
    { id: 4, name: "Customization", description: "Mugs, Placard, T-Shirt" },
    { id: 5, name: "Laminate", description: "Lamination" },
    { id: 8, name: "Print", description: "B&W and Colored print" },
    { id: 10, name: "Risograph", description: "Riso" },
    { id: 11, name: "ETC", description: "merchandise" },
  ];

  const [rows, setData] = useState(initial);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get(url)
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = (row) => {
    console.log(row)
    setRowData(row)
    setTextInputName(row.name)
    setTextInputDesc(row.description)
    setOpen(true);
  };

  const [rowData, setRowData] = useState('');
  const [textInputName, setTextInputName] = useState('');
  const [textInputDesc, setTextInputDesc] = useState('');

  const handleTextInputChangeName = event => {
    setTextInputName(event.target.value);
  };
  const handleTextInputChangeDesc = event => {
    setTextInputDesc(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Category List </Typography>
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          Update Category list
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1} direction='row' mt={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={textInputName}  onChange= {handleTextInputChangeName} />
            <TextField id="outlined-basic" label="Description" variant="outlined" value={textInputDesc}  onChange= {handleTextInputChangeDesc} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
