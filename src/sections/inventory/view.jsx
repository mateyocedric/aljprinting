import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ExpandIcon from '@mui/icons-material/Expand';
import IconButton from '@mui/material/IconButton';

import { useSettingsContext } from 'src/components/settings';


const columns = [
  { field: 'id', headerName: 'Id', width: 90 },
  { field: 'date', headerName: 'Date', width: 150 },
  {
    field: 'order_id',
    headerName: 'Order Id',
    width: 150,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    width: 150,
  },
  {
    field: 'items',
    headerName: 'Items',
    width: 150,
  },
  {
    field: 'renderCell',
    headerName: 'Actions',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    renderCell: ({ row }) =>
    <IconButton aria-label="delete" size="small" onClick={handleCard(row)}>
      <ExpandIcon fontSize="inherit" />
    </IconButton>,
    } 
];

const rows = [
  {
    id: 25,
    date: "2022-03-05 08:34",
    order_id: 404400002,
    amount: 725.0,
    discount: "(12.0%)",
    items: 2
  },
  {
    id: 27,
    date: "2022-03-05 09:54",
    order_id: 404400003,
    amount: 6000.0,
    discount: "(12.0%)",
    items: 1
  },
  {
    id: 28,
    date: "2022-03-06 10:21",
    order_id: 404400004,
    amount: 1500.0,
    discount: "(10.0%)",
    items: 1
  },
  {
    id: 30,
    date: "2022-03-06 12:45",
    order_id: 404400005,
    amount: 300.0,
    discount: "(5.0%)",
    items: 3
  },
  {
    id: 32,
    date: "2022-03-07 14:12",
    order_id: 404400006,
    amount: 900.0,
    discount: "(8.0%)",
    items: 2
  },
  {
    id: 35,
    date: "2022-03-08 16:30",
    order_id: 404400007,
    amount: 1800.0,
    discount: "(15.0%)",
    items: 1
  },
  {
    id: 37,
    date: "2022-03-09 18:42",
    order_id: 404400008,
    amount: 450.0,
    discount: "(10.0%)",
    items: 3
  },
  {
    id: 40,
    date: "2022-03-10 20:55",
    order_id: 404400009,
    amount: 1200.0,
    discount: "(7.0%)",
    items: 2
  },
  {
    id: 42,
    date: "2022-03-11 22:10",
    order_id: 404400010,
    amount: 2000.0,
    discount: "(10.0%)",
    items: 1
  },
  {
    id: 45,
    date: "2022-03-12 23:59",
    order_id: 404400011,
    amount: 300.0,
    discount: "(5.0%)",
    items: 3
  }
]


const handleCard = (row) =>{
  console.log(row)
  
}
// ----------------------------------------------------------------------

export default function InventoryView() {
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
    </Container>
  );
}
