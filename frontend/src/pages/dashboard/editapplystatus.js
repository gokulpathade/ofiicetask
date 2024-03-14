import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// or
 
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';
// import MailIcon from '@mui/icons-material/Mail'
 
   
 
function EditStatus() {
//   const [getRows, setRows] = useState([]);
//   const [loadData, setData] = useState([]);
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
        
 
  const [open, setOpen] = React.useState(false);
 
  const handleClose = () => setOpen(false);
  const handleOpen = () => 
   {
      setOpen(true);
    //   loadList();
   }  
//   const updateNotification = () =>
//   {
//       //Update Notification table 
//     axios.post('http://localhost:8000/api/updateNotification')
//     .then((result)=>{
//       setOpen(false)
//       getLatestRowDetails();
//     })
//     .catch(()=>{
//       alert('Error in the Code');
//     });
//   }
  
  
//   const loadList = async () => {
//     const result = await axios.get("http://localhost:8000/api/list");
//     setData(result.data);
 
//   };
 // To get total count from backend
//   const getLatestRowDetails = async () => {
//     const results = await axios.get("http://localhost:8000/api/getLatestRow");
//     setRows(results.data);
//   };
 
 // Calling useEffect
//   useEffect(() => {
//     loadList();
//     getLatestRowDetails();
//   }, []);
  
       
 // Submit Form Data
//  const handleSubmission = async (e) => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("desc", desc);
//     await fetch("http://localhost:8000/api/upload", {
//         method: "POST",
//         body: formData,
//     })
//     .then((result)=>{
//         alert('Uploaded Successfully');
//         getLatestRowDetails();
//     })
//     .catch(()=>{
//         alert('Error in the Code');
//     });
//     };
 
         
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
                 
                {/* <Button onClick={handleOpen}><Badge badgeContent={getRows == '0' ? "0" : getRows }  color="warning"> <NotificationsIcon /> </Badge> </Button> */}
                <MenuItem onClick={handleOpen}>
                    <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    >
                    <Badge  color="error">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
             
                 </MenuItem>
                </Toolbar>
            </AppBar>
            </Box>
 
        {/* Model Box to Show data  */}
        
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
             <Box sx={style}>
              <Grid container spacing={2}>
                   
                    <Grid xs={12}>
                       <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" ><b>Student Name</b></TableCell>
                                    <TableCell component="th"><b>Description</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {/* {loadData.map((row) => (
                               <TableRow style={{ backgroundColor: row.status == "0" ? "#ccffcc" : "white"}}>
                                    <TableCell> {row.name} </TableCell>
                                    <TableCell>{row.description}</TableCell>
                               </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>
                        </TableContainer>
                   </Grid>
              </Grid>
               <br/><br/>
               <Box textAlign='center'> <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={updateNotification}
                  >
                    Ok
              </Button></Box>
 
             </Box>
            </Modal>
 
       {/* Submit form       */}
 
       <h3 class="">Notification ReactJS</h3>
       <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                 <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Name"
                   
                    name="name"
                    // onChange={(e) => setDesc(e.target.value)}
                />  <br/><br/>
                 <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Description"
                    name="desc"
                    
                    // onChange={(e) => setName(e.target.value)} 
                />  
                  
                </Grid>
              
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={handleSubmission}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
      </div>
    
     
  );
}
export default EditStatus
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };