
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {DataGrid} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSettingsContext } from 'src/components/settings';



// ----------------------------------------------------------------------


export default function ProductListView() {

  const url = "https://alj-django.onrender.com/api/product-get-all/"
  
  const columns = [
    { field: 'id', headerName: 'id', flex : 1 },
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
      field: 'category_id',
      headerName: 'category',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price (Php)',
      type: 'number',
      flex: 1,
    },
    {
      field: 'renderCell',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: ({ row }) =>
      <>
      <IconButton aria-label="delete" size="small" onClick={ () => handleClickOpen(row)}>
        <EditIcon fontSize="inherit" />
      </IconButton>
      
      <IconButton aria-label="delete" size="small" onClick={ () => handleDelete(row)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      </>,
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


  const [categories, setCategories] = useState([]);
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


    // categories request
    axios.get("https://alj-django.onrender.com/api/category/")
    .then(response => {
      // Set the fetched data to the state variable

      let arr = response.data
        arr = arr.map(item => (
          {
            id: item.id,
            label: item.name,

          }
        ));
        

      setCategories(arr);
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });


  }, []);

  const [open, setOpen] = useState(false);
  const [isDeleted , setIsDeleted] = useState(false)

  const handleClickOpen = (row) => {
    console.log(row)
    setRowData(row)
    setTextInputName(row.name)
    setTextInputDesc(row.description)
    setTextInputPrice(row.price)
    const index = categories.findIndex(item => item.label.toLowerCase() === row.category_id.toLowerCase());

    console.log("category",categories[index])
    setSelectCategory(categories[index])
    setOpen(true);
  };

  const handleClose = async () => {

    try{
      console.log(selectCategory)
      const response = await axios.post('https://alj-django.onrender.com/api/product-update/',{
        id:rowData.id,
        category_id:selectCategory.id,
        code:111,
        name:textInputName,
        description:textInputDesc,
        price:textInputPrice,
      })


      const rowIndex = rows.findIndex(row => row.id === rowData.id);
      const updatedRows = [...rows];
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], name: textInputName , description:textInputDesc , price: textInputPrice , category_id: selectCategory.label };
      console.log("category" , selectCategory)
      setData(updatedRows);

      
      console.log(response)
    }catch( error) {
      console.log(error);
    }

    setOpen(false);
  };

  const handleDelete = async(row) => {

    console.log(row)

    try{
      console.log(selectCategory)
      const response = await axios.post('https://alj-django.onrender.com/api/product-delete/',{
        id:row.id,
      })
      
      console.log(response)
      console.log('deleted')
      setIsDeleted(true)

      setTimeout(() => {
        // Your code to execute after delay
        console.log("Delayed code executed after 5 seconds");
        setIsDeleted(false)
      }, 5000);
    }catch( error) {
      console.log(error);
    }


  }
  

  const [rowData, setRowData] = useState('');
  const [textInputName, setTextInputName] = useState('');
  const [textInputDesc, setTextInputDesc] = useState('');
  const [textInputPrice, setTextInputPrice] = useState('');
  const [selectCategory, setSelectCategory] = useState('');

  const handleTextInputChangeName = event => {
    setTextInputName(event.target.value);
  };
  const handleTextInputChangeDesc = event => {
    setTextInputDesc(event.target.value);
  };
  const handleTextInputChangePrice = event => {
    setTextInputPrice(event.target.value);
  };

  const [openAdd, setOpenAdd] = useState(false);
  const handleAddProduct = () =>{
    setTextInputName('')
    setTextInputDesc('')
    setTextInputPrice('')
    setSelectCategory('')
    setOpenAdd(true)
    console.log(selectCategory)
  }

  const handleAddClose = async() =>{

    try{
      const response = await axios.post('https://alj-django.onrender.com/api/product-add/',{
        category_id:selectCategory.id,
        code:111,
        name:textInputName,
        description:textInputDesc,
        price:textInputPrice,
      })
      
      console.log(response)
    }catch( error) {
      console.log(error);
    }

    setOpenAdd(false)

  }


  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

      {
      isDeleted? 
        <Alert icon={false} severity="success">
          Item Deleted
        </Alert>: console.log('no delete')
        }


      <Stack
        direction="row"
        spacing={1}
      >


        <Typography variant="h4"> Product List </Typography>
        <Button variant="outlined" onClick={handleAddProduct}>ADD Product</Button>
      </Stack>
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
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" value={textInputName}  onChange= {handleTextInputChangeName}/>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={textInputDesc}  onChange= {handleTextInputChangeDesc}/>
            <TextField id="outlined-basic" label="Price" variant="outlined" value={textInputPrice} onChange= {handleTextInputChangePrice}/>
            <Autocomplete
              disablePortal
              value={selectCategory}
              onChange={(event, value) => setSelectCategory(value)}
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Categories" />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openAdd}
        onClose={() =>setOpenAdd(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Product
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" value={textInputName}  onChange= {handleTextInputChangeName}/>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={textInputDesc}  onChange= {handleTextInputChangeDesc}/>
            <TextField id="outlined-basic" label="Price" variant="outlined" value={textInputPrice} onChange= {handleTextInputChangePrice}/>
            <Autocomplete
              disablePortal
              value={selectCategory}
              onChange={(event, value) => setSelectCategory(value)}
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Categories" />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Add</Button>
        </DialogActions>
      </Dialog>

    
    

    </Container>
  );
}
