import React, { useState } from "react";

import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Card,
} from "@mui/material";

import NavBar from "../dashboard/NavBar";
import SideBar from "../dashboard/SideBar";

// import * as React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Box, Table, Tab, Tabs, Typography, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";

import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { alpha } from "@mui/material/styles";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useEffect } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { Grid } from "@mui/material";

import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { green, pink } from '@mui/material/colors';












function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { label: "ID" },
  { label: "StartDate" },
  { label: "EndDate" },
  { label: "Leave Type" },
  { label: "Reasons" },
  { label: "Status" },
  { label: "Leave Days" },
 
  { label: "Action" },
 

  // { id: 'email', label: 'Email' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? <Box>{order}</Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  // numSelected: PropTypes.number.isRequired,

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Leave Details
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Function start here Leave apply
// ************************************************************************

const LeaveApply = () => {




  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    LType: "",
    reason: "",
    startDate: null,
    endDate: null,
    department: "",
  });

  // const [LType, setLType] = useState("");
  // const [StartDate, setStartDate] = useState(null);
  // const [EndDate, setEndDate] = useState(null);
  const [session, setSession] = useState("");
  const [session1, setSession1] = useState("");
  // const [Manager, setManager] = useState("");
  // const [Bcc, setBCC] = useState("");
  const [selectedDays, setSelectedDays] = useState(0);

  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const [Reason, setReason] = useState("");
  const [LeaveDays, setLeaveday] = useState("");
  const [LType, setLType] = useState("");
  const [Applyfor, setApplyFor] = useState([]);
  const [Manager, setManager] = useState([]);
  // const session = ["Full Day", "Half Day"];
  //   const optionss = ["Earned Leave", "Casual Leave","Special Sick Leave","Maternity Leave","Comp Off","Loss Of Pay","Outdoor Duty"];

  const [selectedSessions, setSelectedSessions] = useState([]);

  // const [manager, setManager] = useState("");

  const [Bcc, setBCC] = useState("");

  // ************************************************************************
  // ************************************************************************

  const [managers, setManagers] = useState([]);
  const [otherPersons, setOtherPersons] = useState([]);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // ************************************************************************

  // *********************************************************************************
  //  button action here 



  const [open, setOpen] = useState(false);
    // const RequestAccepted = (req, res) => {
    
  //   alert("are you sure, you want accept")
  // };

  // const RequestRejected = (req, res) => {
  //   Window.warn("are you sure, you want reject")
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RequestAccepted = () => {
    handleOpen();
  };

  const RequestRejected = () => {
    handleOpen();
  }
  // *********************************************************************************
  // ************************************************************************

  const apply = () => {
    // check if user has really entered any value
    if (StartDate.length === 0) {
      toast.error("please select Date ");
    } else if (EndDate.length === 0) {
      toast.error("please select date");
    } else if (EndDate < StartDate) {
      toast.error("End Date cannot be before Start Date");
    } else if (Applyfor.length === 0) {
      toast.error("please select apply for");
    } else if (Reason.length === 0) {
      toast.error("please mention reason");
    } else if (LType.length === 0) {
      toast.error("please select leave type");
    } else {
      const start = new Date(StartDate);
      const end = new Date(EndDate);
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

      console.log(LeaveDays);

      const body = {
        StartDate,
        EndDate,
        Reason,
        // appid,
        Applyfor,
        LeaveDays: daysDifference,
        LType,
        Manager,
      };
      console.log("Apply for : ", Applyfor);
      console.log("leave days : ", LeaveDays);

      console.log("body : ", body);
      axios
        .post(config.serverURL + "/applyLeave/leave", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          console.log(response.data);

          if (result["status"] === "error") {
            toast.error("not insertd");
          } else {
            toast.success("successful");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

const[ldays, setLDays]=useState([]);

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);

    // Calculate and set leave days if both Start Date and End Date are selected

    if (newStartDate && EndDate) {
      calculateAndSetLeaveDays(newStartDate, EndDate);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;

    setEndDate(newEndDate);

    if (StartDate && newEndDate) {
      if (new Date(newEndDate) < new Date(StartDate)) {
        toast.error("End Date cannot be before Start Date");
      }
    }

    // Calculate and set leave days if both Start Date and End Date are selected

    if (StartDate && newEndDate) {
      calculateAndSetLeaveDays(StartDate, newEndDate);
    }
  };

  const calculateAndSetLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);

    const end = new Date(endDate);

    const timeDifference = end - start;

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

    setLDays(daysDifference);
  };





  // ************************************************************************
  
  // const RequestAccepted = (req, res) => {
  //   alert("are you sure, you want reject")
  // };

  // const RequestRejected = (req, res) => {
  //   alert("are you sure, you want reject")
  // };
  // ************************************************************************
  // ************************************************************************
  // ************************************************************************
  // ************************************************************************
  // ************************************************************************

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [dvalue, setDvalue] = React.useState(dayjs("2023-09-09"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ************************************************************************

  const handleSubmit = () => {
    
    console.log({
      ...formData,
      selectedSessions,
      Manager,
      Bcc,
    });
  };

  // **************************************************************************************************
  const options1 = [];
  const options = [
    "Casual Leave",
    "Camp Off Leave",
    "Special Sick Leave",
    "Earn Leave",
    "Eamergency Leave",
    "Maternative Leave",
    "Restricated Leave",
    "OutDoor Duty Leave",
  ];
  // **************************************************************************************************
  // Pending Tab
  // **************************************************************************************************
  // **************************************************************************************************

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");

  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const [manageroptions, setManageroptions] = useState([])
    
  // useEffect(() => {
  //   getHistoryuserdetails(USER_ID);
  //   getuserdetails();
  // }, []);

  // const getHistoryuserdetails = (USER_ID) => {
  //   console.log("data status  is here" + USER_ID);
  //   axios
  //     .get(config.serverURL + `/applyLeave/ApplyStatus/${USER_ID}`, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       console.log("data status  is here" + result);
  //       if (result["status"] === "success") {
  //         console.log(result);
  //         // set the homes to the state member
  //         console.log("data status  is here" + result);
  //         setHistory(result["data"]);
  //       } else {
  //         toast.error(result["error"]);
  //       }
  //     });
  // };

  const getuserdetails = (USER_ID) => {
    console.log("data status is here");
    axios
      .get(config.serverURL + `/applyLeave/Pending/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        console.log("data is here", result);
        // if (result["status"] === "success") {
          const managerTeamUsers = result["data"];

          console.log(managerTeamUsers);

          // Set the data to the state
          setPending(managerTeamUsers);
        // } else {
          // Handle error
          // toast.error(result["error"]);
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateSelectedDays = () => {
    // Add logic to calculate selected days between StartDate and EndDate
    // and update the selectedDays state
  };

  useEffect(() => {
    Reportingdetails();
  }, [USER_ID]);








  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching leave details for user: ", USER_ID);
  //       const response = await axios.get(
  //         config.serverURL + `/applyLeave/Pending/${USER_ID}`,
  //         {
  //           headers: { token: sessionStorage["token"] },
  //         }
  //       );

  //       const result = response.data;

  //       console.log("Server Response: ", result);

  //       if (result.status === "success") {
  //         const managerTeamUsers = result.data;

  //         if (managerTeamUsers.some((user) => user.ApplyStatus === "Pending")) {
  //           console.log("Leave request status is pending. Printing data...");
  //           console.log(managerTeamUsers);

  //           setRows(managerTeamUsers);
  //         } else {
  //           console.log("Leave request status is not pending.");
  //           // Handle the case when there are no pending leave requests
  //         }
  //       } else {
  //         toast.error(result.error || "Error fetching leave details");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching leave details:", error);
  //       toast.error("Error fetching leave details");
  //     }
  //   };

  //   fetchData();
  // }, [USER_ID]);

  useEffect(() => {
    Reportingdetails(USER_ID);
    RequestDetails(USER_ID);
    getmanagernames();
  }, []);


  const Reportingdetails = (USER_ID) => {
    console.log("Data Enter the Loop:" + USER_ID);
    axios
      .get(config.serverURL + `/applyLeave/Pending/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("API Response:", result);
        setHistory(result);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching reporting details");
      });
  };




  const RequestDetails = (USER_ID) => {
    console.log("Data Enter the Loop:" + USER_ID);
    axios
      .get(config.serverURL + `/applyLeave/ApplyStatus/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("API Response:", result);
        setPending(result);

   
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching reporting details");
      });
  };


// Get Manager Name Here 

const getmanagernames = () => {
  axios
    .get(config.serverURL + "/use/manager", {
      headers: { token: sessionStorage["token"] },
    })
    .then((response) => {
      const result = response.data;
      console.log("Data is here Using Api ", result);

      if (result["status"] === "success") {
        console.log("manager details ..", result);

        setManageroptions(result["data"]);
      } else {
        toast.error(result["error"]);
      }
    })
    .catch((error) => {
      console.error("Error fetching manager details:", error);
    });
};





  return (
    <>
      <NavBar />
      <SideBar />


<Card 
        sx={{
          width:{
            xs:100,
            sm:200,
            md:300,
            lg:400,
            xl:500,
            // xs:100,
          },
          textAlign: "start",
          marginTop: "5px",
          width: "16%",
          alignContent: "center",
          alignItems: "center",
          height: "170px",
          marginLeft: "0%",
          marginRight: "3%",
       
          paddingLeft: "13px",
          // paddingTop: "20px",
        }}
      >
        <h4>
          {" "}
          <Link
            to="/Reporting"
            style={{
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Reporting
          </Link>
          <br />
          <br />
          <Link
            to="/LeaveApply"
            style={{
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Apply Leave
          </Link>
          &nbsp; <br /> <br />
          <Link
            to="/Attendence"
            style={{
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Attendence
          </Link>
          &nbsp; <br /> <br />
          <Link
            to="/Regularised"
            style={{
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Regularised
          </Link>
          &nbsp; <br /> <br />
        </h4>
      </Card>

      

      {/* ************************************************************************************* */}
      <Box
      
        sx={{
          display: "flex",
          backgroundColor: "white",
          height: "50vw",
          paddingTop: "-92",
          marginTop: "-11%",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
          <Box sx={{ width: "95%" }}>
            <Box sx={{ border: "", textAlign: "center" }}>
              <Tabs
                sx={{
                  borderBottom: 0,
                  borderColor: "divider",
                  marginLeft: "600px",
                  marginTop: "20px",
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Apply" {...a11yProps(0)} />
                <Tab label="Pending" {...a11yProps(1)} />
                <Tab label="History" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {/* **************************************************************************** */}

              <Card
              className="div-col-2"
                sx={{
                    width:{
                      xs:100,
                      sm:200,
                      md:300,
                      lg:400,
                      xl:500,
                      // xs:100,
                    },
                  marginTop: "-10px",
                  width: "60%",
                  marginLeft: "18%",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  paddingRight: "10px",
                  paddingTop: "10px",
                  paddingLeft: "90px",
                  flexBasis: "43%",
                  // flex-basis: 42%;
                }}
              >
                <div>
                  <h1>Apply Leave</h1>
                </div>

                <Box
                  component="form"
                  onClick={apply}
                  // sx={{
                  //   "& .MuiTextField-root": { m: 1, width: "25ch" },
                  //   alignContent: "start",
                  // }}
                  noValidate
                  autoComplete="off"
                >
                  <form
                    style={{
                      justifyContent: "center",
                      padding: "2px",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2} className="container-sm">
                      <Grid
                        container
                        item
                        spacing={2}
                        style={{ marginTop: 2, padding: 2 }}
                      >
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <InputLabel id="Leave Type">Select Leave</InputLabel>
                            <Select
                              labelId="LType"
                              id="LType"
                              value={LType}
                              onChange={(event) =>
                                setLType(event.target.value)
                              }
                            >
                              {options.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <TextField
                              type="text"
                              label="Leave Balance"
                              disabled
                              // placeholder="Emp No"
                              // value={LeaveBalance}
                              // onChange={(event) => (event.target.value)}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        spacing={2}
                        style={{ marginTop: 5, padding: 5 }}
                      >
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                              >
                                <DatePicker
                                  label={"Start Date"}
                                  views={["year", "month", "day"]}
                                  value={StartDate}
                                  onChange={(newValue) => {
                                    setStartDate(newValue);
                                    calculateSelectedDays();
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <InputLabel id="demo-select-small-label">
                              Session{" "}
                            </InputLabel>
                            <Select
                              // sx={{ m: 1, width: "25ch" }}
                              size="medium"
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={session}
                              label="select session"
                              onChange={(event) =>
                                setSession(event.target.value)
                              }
                            >
                              <MenuItem value={10}>Session 1</MenuItem>
                              <MenuItem value={20}>Session 2</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        spacing={2}
                        style={{ marginTop: 3, padding: 2 }}
                      >
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                              >
                                <DatePicker
                                  type="date"
                                  label={"End Date"}
                                  views={["year", "month", "day"]}
                                  value={EndDate}
                                  onChange={(newValue) => {
                                    setEndDate(newValue);
                                    calculateSelectedDays();
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <InputLabel id="demo-select-small-label">
                              Session
                            </InputLabel>
                            <Select
                              // sx={{ m: 1, width: "25ch" }}
                              size="medium"
                              labelId="demo-select-small-label"
                              id="session"
                              value={session}
                              label="select session"
                              onChange={(event) =>
                                setSession1(event.target.value)
                              }
                            >
                              <MenuItem value={10}>Session 1</MenuItem>
                              <MenuItem value={20}>Session 2</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        spacing={2}
                        style={{ marginTop: 5, padding: 5 }}
                      >
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <InputLabel id="Manager">
                              Select Manager Request{" "}
                            </InputLabel>
                            <Select
                              labelId="Select Request"
                              id="Manager"
                              value={Manager}
                              onChange={(event) =>
                                setManager(event.target.value)
                              }
                            >
                             {manageroptions
                    .filter((emps) => emps.Role === "manager")
                    .map((emps) => (
                      <MenuItem key={emps.Rid} value={`${emps.Rid}`}>
                        {emps.Rid}   <span>{emps.Name}</span>
                      
                      </MenuItem>
                    ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <InputLabel id="LType">
                              Select BCC/ CC
                            </InputLabel>
                            <Select
                              labelId="BCC"
                              id="Bcc"
                              value={Bcc}
                              onChange={(event) => setBCC(event.target.value)}
                            >
                              {managers.map((manager) => (
                                <MenuItem key={manager.id} value={manager.id}>
                                  {manager.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        spacing={2}
                        style={{ marginTop: 3, padding: 2 }}
                      >
                        <Grid item xs={6}>
                          <FormControl sx={{ width: "70%" }}>
                            <TextField
                              label="Reason"
                              type="text"
                              id="outlined-size-medium"
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container item justifyContent="center">
                        {/* <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid> */}
                      </Grid>
                      <Grid item xs={12} fullwidth>
                        <input
                          style={{ padding: "10px", width: "10" }}
                          type="file"
                          onChange={handleFileChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          style={{
                            paddingLeft: "50px",
                            paddingRight: "50px",
                            margin: "30px",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={apply}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Card>
              {/* **************************************************************************** */}
              {/* **************************************************************************** */}

              <div></div>
            </CustomTabPanel>

            {/* ********************************************************************************** */}
            {/* Pending Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} 
           
            index={1}>
            <Box 
            
            sx={{
              display:"-ms-grid",
                   
                  }} >
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {history.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "10px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.Rid}
                              // selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.Rid}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.StartDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.EndDate}
                              </TableCell>
                              <TableCell align="center">{row.LType}</TableCell>
                              <TableCell align="center">{row.Reason}</TableCell>
                              <TableCell align="center">
                                {row.ApplyStatus}
                              </TableCell>
                              <TableCell align="center">{row.LDays}</TableCell>
                              <TableCell align="center">
        <Button
          style={{
            padding: '2px',
            margin: '2px',
            cursor: 'pointer',
            paddingLeft: '4px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
          onClick={RequestAccepted}
        >
          <Icon sx={{ color: green[600] }}>
            <DoneTwoToneIcon />
          </Icon>
        </Button>

        <Button
          style={{
            padding: '2px',
            margin: '2px',
            cursor: 'pointer',
            paddingLeft: '4px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
          onClick={RequestRejected}
        >
          <Icon sx={{ color: pink[500] }}>
            <ClearTwoToneIcon />
          </Icon>
        </Button>
      </TableCell>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* Add your logic for accept/reject here */}
          <Button onClick={handleClose} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
                     
                 

                            </TableRow>
                          );
                        })}


                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
                {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
              </Box>
            </CustomTabPanel>

            {/* History Tab Herre */}
            {/* ************************************************** */}
            {/* ************************************************** */}

            <CustomTabPanel value={value} index={2}>
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {pending.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "10px",
                              }}
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.Rid}
                              // selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.Rid}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell align="center">
                                {row.StartDate}
                              </TableCell>
                              <TableCell align="center">
                                {row.EndDate}
                              </TableCell>
                              <TableCell align="center">{row.LType}</TableCell>
                              <TableCell align="center">{row.Reason}</TableCell>
                              <TableCell align="center">
                                {row.ApplyStatus}
                              </TableCell>
                              <TableCell align="center">{row.LDays}</TableCell>
                              <TableCell align="center">
        <Button
          style={{
            padding: '2px',
            margin: '2px',
            cursor: 'pointer',
            paddingLeft: '4px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
          onClick={RequestAccepted}
        >
          <Icon sx={{ color: green[600] }}>
            <DoneTwoToneIcon />
          </Icon>
        </Button>

        <Button
          style={{
            padding: '2px',
            margin: '2px',
            cursor: 'pointer',
            paddingLeft: '4px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
          onClick={RequestRejected}
        >
          <Icon sx={{ color: pink[500] }}>
            <ClearTwoToneIcon />
          </Icon>
        </Button>
      </TableCell>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* Add your logic for accept/reject here */}
          <Button onClick={handleClose} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
                     
                 

                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
                {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
      {/* ************************************************************************************* */}
      {/* ************************************************************************************* */}
    </>
  );
};

// Function to calculate the number of days between two dates
const calculateNumberOfDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end - start);
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return days + 1; // Include the end date
};

const styles = {
  container: {
    width: 100,
    // height: 620,
    height: 100,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 50,
    bottom: 0,
    margin: "auto",

    marginTop: 500,
    borderColor: "#102c57",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    display: "flex",
    justifycontent: "center",
  },
  signinButton: {
    position: "relative",
    width: "60%",
    height: 40,
    backgroundColor: "#102c57",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default LeaveApply;
