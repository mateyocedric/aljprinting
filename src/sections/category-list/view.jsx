import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useState } from "react";
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useSettingsContext } from 'src/components/settings';




// ----------------------------------------------------------------------






export default function ProductListView() {

  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'name', headerName: 'name', width: 90 },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
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
    { id: 1, name: "Photocopy", description: "Laser Copy" },
    { id: 2, name: "Book Binding", description: "Soft, Ring, Hard Binding" },
    { id: 3, name: "Tarpaulin", description: "Tarpaulin printing" },
    { id: 4, name: "Customization", description: "Mugs, Placard, T-Shirt" },
    { id: 5, name: "Laminate", description: "Lamination" },
    { id: 8, name: "Print", description: "B&W and Colored print" },
    { id: 10, name: "Risograph", description: "Riso" },
    { id: 11, name: "ETC", description: "merchandise" },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Description" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>

    
    

    </Container>
  );
}
