import { useState } from "react";
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useSettingsContext } from 'src/components/settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// ----------------------------------------------------------------------

export default function PosView() {
  const settings = useSettingsContext();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columns = [
    { field: 'name', headerName: 'name', flex: 1 },
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
      <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="inherit" />
      </IconButton>,
      } 
  ];
  
  const rows = [
    { id: 1, name: "Bond Paper",stock:18 },
    { id: 2, name: "Black Ink",stock:20 },
    { id: 3, name: "Yellow Ink",stock:202 },
    { id: 4, name: "Cyan Ink",stock:187 },
    { id: 5, name: "Magenta Ink",stock:150 },
    { id: 8, name: "Mug",stock:120 },
    { id: 10, name: "T shirt L",stock:170 },
    { id: 11, name: "T shirt S",stock:180 },
  ];




  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Inventory  </Typography>
      <br/>
      <TextField id="outlined-basic" label="Search Product" variant="outlined" />
      <TextField id="outlined-basic" label="Quantity" variant="outlined" />
      <Button variant="outlined">ADD ITEM</Button>
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
          Update Stock
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1} direction='row' mt={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Stock" variant="outlined" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
    
    
  );
}
