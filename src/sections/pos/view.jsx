import { alpha } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function PosView() {
  const settings = useSettingsContext();
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
      <IconButton aria-label="delete" size="small" onClick={console.log("aa")}>
        <DeleteOutlineIcon fontSize="inherit" />
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




  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> POS </Typography>
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
    </Container>
  );
}
