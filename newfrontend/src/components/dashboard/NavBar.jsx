import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import config from "../../config";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useAppstore } from "../dashboard/appStore";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import { Grid } from "@mui/material";

import Button from "@mui/material/Button";
import { TextField } from "@material-ui/core";

import { signout } from "../slices/authSlice";

import { useNavigate } from "react-router";
import img from "../Ceinsys Tech Ltd New Logo 3.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import {
  Paper,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "../../App.css";

import * as io from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

  backgroundColor: "#e6ffff",
}));

function NavBar() {
  const signinStatus = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = useAppstore((state) => state.updateOpen);
  const dopen = useAppstore((state) => state.dopen);
  const [registration, setRegistration] = useState([]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [notificationopen, setNotificationopen] = React.useState(false);
  const [showTable, setShowTable] = useState(false);

  // const [open, setOpen] = React.useState(false);
  const handleCloseNotificationopen = () => setNotificationopen(false);

  const handleOpenNotification = () => {
    setNotificationopen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setShowTable(true);
    setOpen(true);

    // setNotificationopen(true);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // setOpenDialog(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // ************************************************************************
  // Sign out
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuCloseOut = () => {
    // Open the confirmation dialog
    setOpenDialog(true);
  };

  const handleSignout = () => {
    // Close the confirmation dialog
    setOpenDialog(false);

    // Perform signout actions
    navigate("/");
    dispatch(signout());
  };

  const handleCloseDialog = () => {
    // Close the confirmation dialog without signing out
    setOpenDialog(false);
  };

  const handleSignoutConfirmed = () => {
    // Close the confirmation dialog
    handleCloseDialog();

    // Perform signout actions
    navigate("/");
    dispatch(signout());
    setOpenDialog(false);
  };

  
  // ************************************************************************
  // ************************************************************************
  // UPDATE NOTIFICATION

  const [status, setStatus] = useState("");
  const [getrows, setrows] = useState([]);
  const [loadData, setData] = useState([]);

  const updateNotification = () => {
    const body = { status };
    setNotificationopen(false);
    axios
      .put(config.serverURL + "/applyLeave/applyleavestatus/", body, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        //  console.log("resp",response.data.status)
        const result = response.data.data[0].stauss;
        //   console.log("succesfully added data ",result)
        if (result["status"] === "success") {
          setStatus(response.data.data[0].stauss);
          // console.log("ooooooooooooooooooooo",response.data.data.stauss)

          getapplyleavedetailsstatus();
          toast.success("successfully Upated...........");
          //   console.log("get method call i side updatenotification")
        } else {
          toast.error(result["error"]);
          toast.error("not updated");
        }
      })
      .catch((error) => {
        //console.log('error')
        console.log(error);
      });
    getapplyleavedetailsstatus();
    getapplyleavestatus();

    toast.success("sccessfullty");

    // navigate("/ManagerDashboard");
    // navigate('/admindashboard')
  };

  //apply leave details all
  const getapplyleavedetailsstatus = () => {
    axios
      .get(config.serverURL + "/applyLeave/ss/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        //     console.log("get all details of applyleaves sidebar file : ",result)

        if (result["status"] === "success") {
          
          setData(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const getapplyleavestatus = () => {
    axios
      .get(config.serverURL + "/applyLeave/applyleavestatus/count/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response;
        //   console.log("totoal applyleave status count: ", result)
        // console.log("status",result.data.status);

        if (result.data.status === "success") {
          setrows(response.data.data[0].counter);
        } else {
          toast.error(result.data.status);
        }
      });
  };
  // ************************************************************************

  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleClickOpen = () => {
    setOpenProfile(true);
    // setNotificationopen(true);
  };

  const handleClose = () => {
    setOpenProfile(false);
    setNotificationopen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Profile
          </Button>
          <Dialog open={openProfile} onClose={handleClose}>
            <DialogContent>
              {registration.map((emps) => {
                // const imageUrl = config.serverURL + "/" + emps.image;
                return (
                  <div>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Emp ID"
                      fullWidth
                    />
                    {emps.Emp_No}
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Emp Name"
                      fullWidth
                    />{" "}
                    {emps.Name}
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Last Name "
                      fullWidth
                    />{" "}
                    {emps.Last_Name}
                  </div>
                );
              })}

           

              <br />
              {/* <Button variant="contained">Time IN</Button> */}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              {/* <Button onClick={handleClose}>Submit</Button> */}
            </DialogActions>
          </Dialog>
        </div>
      </MenuItem>

      <MenuItem onClick={handleMenuCloseOut}>
        {signinStatus && (
          <Button
            style={{
              textDecoration: "none",

              color: "red",
              fontSize: 18,
              marginLeft: 5,
              fontWeight: "bold",
            }}
            variant="outlined"
            onClick={handleMenuCloseOut} // Open the dialog
            className="btn btn-link"
            aria-current="page"
          >
            Log Out
          </Button>
        )}
      </MenuItem>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to sign you out...... continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleSignoutConfirmed}
            color="primary"
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
   





   <MenuItem onClick={handleMenuClose}>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
          <NotificationsIcon />
          </Button>
          <Dialog open={openProfile} onClose={handleClose}>
            <DialogContent>
              {registration.map((emps) => {
                // const imageUrl = config.serverURL + "/" + emps.image;
                return (
                  <div>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Emp ID"
                      fullWidth
                    />
                    {emps.Emp_No}
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Emp Name"
                      fullWidth
                    />{" "}
                    {emps.Name}
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Last Name "
                      fullWidth
                    />{" "}
                    {emps.Last_Name}
                  </div>
                );
              })}

           

              <br />
              {/* <Button variant="contained">Time IN</Button> */}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              {/* <Button onClick={handleClose}>Submit</Button> */}
            </DialogActions>
          </Dialog>
        </div>
      </MenuItem>


      <MenuItem onClick={handleOpenNotification}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>




        </IconButton>
        
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
           <NotificationsIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [show, setShow] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setid] = useState();
  const [firstName, setFirstName] = useState();
  const [regid, setRegid] = useState();

  //timeout
  const [timein, settimein] = useState();

  const USER_ID = sessionStorage.getItem("userId");

  // *******************************************************
  // *******************************************************
  useEffect(() => {
    UserDetails(USER_ID);
  }, [USER_ID]);

  const UserDetails = (USER_ID) => {
    axios
      .get(config.serverURL + "/use/" + USER_ID, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          // console.log("UserDetails Response from UserId: ")
          //   console.log("then response ",result)
          setid(response.data.data[0].rid); //backend  rid
          setFirstName(response.data.data[0].firstName); //backend firstName
          setRegid(response.data.data[0].rid);
          setRegistration(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

  return (
    <>
  

      <div>
        {/* NavBar */}

        {showTable && (
          <div>
            <Modal
              open={notificationopen}
              onClose={() => handleCloseNotificationopen()}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 250 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            {/* <TableCell component="th" ><b>Student Name</b></TableCell>
                                    <TableCell component="th"><b>Description</b></TableCell> */}
                            <TableCell component="th">Emp No</TableCell>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Department</TableCell>
                            <TableCell component="th">Start Date</TableCell>
                            <TableCell component="th">End Date</TableCell>
                            <TableCell component="th">reason</TableCell>
                            <TableCell component="th">Leave Type</TableCell>
                            <TableCell component="th">Apply for</TableCell>
                            {/* <TableCell component="th">Apply Status</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                         

                          {loadData.map((emps) => {
                            return (
                             
                              <tr
                                style={{
                                  backgroundColor:
                                    emps.stauss == "0" ? "#ccffcc" : "white",
                                }}
                              >
                                <TableCell>{emps.Emp_No}</TableCell>
                                <TableCell>{emps.Name}</TableCell>
                                <TableCell>{emps.Department}</TableCell>

                                <TableCell>{emps.StartDate}</TableCell>
                                <TableCell>{emps.EndDate}</TableCell>
                                <TableCell>{emps.Reason}</TableCell>
                                <TableCell>{emps.L_Type}</TableCell>
                                <TableCell>{emps.ApplyFor}</TableCell>
                                <TableCell
                                  style={{
                                    color: "f2f2f2",
                                    backgroundColor: "",
                                  }}
                                  className="dropdown"
                                >
                          
                                </TableCell>

                                <td>
                                  {/* <button
               
                    onClick={() => edituser(emps.leaveid)}
                   style={{width:'70' ,height:'50'}}
                   className='btn btn-sm btn-success'>
                   Update
                 </button>  */}
                                </td>
                              </tr>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <br />
                <br />
                <Box textAlign="center">
                  {" "}
                  <Button
                    name="btn_updatenotification"
                    id="id_btn_updatenotification"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => updateNotification()}
                  >
                    Ok
                  </Button>
                </Box>
              </Box>
            </Modal>
          </div>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => updateOpen(!dopen)}
              >
                {/* <MenuIcon sx={{color:'#264D60'}} /> */}
                <MenuIcon
                  sx={{
                    sx: "100",

                    color: "#000099",
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", color: "#264D60" } }}
              >
                <div class="text-center">
                  {/* <img src={img} style={styles.img} alt="logo" /> */}

                  <h4 class="mt-1 mb-5 pb-1">CIENSYS</h4>
                </div>
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {["admin", "manager"].includes(
                  window.sessionStorage.getItem("userRole").toLowerCase()
                ) && signinStatus ? (
                  <div style={{ marginLeft: "1480px" }}>
                    <IconButton
                      size="large"
                      aria-label="show 1 new notifications"
                      color="inherit"
                      sx={{ color: "#264D60" }}
                      onClick={handleOpenNotification}
                    >
                      <Badge
                        badgeContent={getrows === "0" ? "0" : getrows}
                        color="error"
                      >
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </div>
                ) : (
                  <></>
                )}

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ color: "#264D60" }}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
    </>
  );
}

const styles = {
  img: {
    // border:" 0px solid #ddd",
    borderRadius: 30,
    padding: 1,
    width: 75,
  },
};

export default NavBar;

// import * as io from "react-icons/io";
// const handleOpen = () => {
//     setOpen(true);
//   };

// {window.sessionStorage.getItem("userRole").toLowerCase() ===
//               "admin" &&
//             signinStatus &&
//             ManagerDashboard ? (
//               <div style={{ marginLeft: "1480px" }}>
//                 <button
//                   name="btn_notification"
//                   id="id_btn_notification"
//                   style={{ border: "none", backgroundColor: "#8275a5" }}
//                   onClick={handleOpen}
//                 >
//                   <Badge
//                     badgeContent={getrows == "0" ? "0" : getrows}
//                     color="error"
//                   >
//                     <io.IoMdNotifications size={"40px"} />
//                   </Badge>
//                 </button>
//               </div>
//             ) : (
//               <></>
//             )}
