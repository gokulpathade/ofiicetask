import React, { useState } from "react";

import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Card,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import NavBar from "../dashboard/NavBar";
import SideBar from "../dashboard/SideBar";

// import * as React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import {
  Box,
  Table,
  Tab,
  Tabs,
  Typography,
  Paper,

} from "@mui/material";
import PropTypes from "prop-types";

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import moment from "moment";

// import * as React from 'react';
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

// import * as React from "react";
// import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useEffect } from "react";

function createData(Id, FirstName, Email, Contact, LastName) {
  return {
    Id,
    FirstName,
    LastName,
    Contact,
    Email,
  };
}

const rows = [];

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
  { id: "R_Id", label: "ID" },
  { id: "Date", label: "Date" },

  { id: "TimeIn", label: "Time_In" },
  { id: "TimeOut", label: "Time_Out" },

  { id: "Total_Hours", label: "Total Hours" },
  { id: "Late_In", label: "Late In" },
  { id: "EarlyOut", label: "Early Out" },
  // { id: "Shortfall_Hrs", label: "" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
  <TableHead>
      <TableRow sx={{textAlign:"center"}}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
         >
            <TableSortLabel>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                >
                  {order}
                </Box>
              ) : null}
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
          Team Details
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

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const Regularised = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    leaveType: "",
    reason: "",
    startDate: null,
    endDate: null,
    department: "",
  });

  // const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  // const handleSubmit = () => {
  //   // Add your logic to handle form submission
  //   console.log(formData);
  // };

  const [firstName, setfirstname] = useState("");
  const [lastName, setlasttname] = useState("");

  const [deptname, setdept] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const [reason, setreason] = useState("");
  const [leaveDays, setleaveday] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [applyfor, setapplyfor] = useState([]);

  const appoptions = ["Full Day", "Half Day"];
  //   const optionss = ["Earned Leave", "Casual Leave","Special Sick Leave","Maternity Leave","Comp Off","Loss Of Pay","Outdoor Duty"];

  const [appleave, setApplyleave] = useState([]);
  const [appleave1, setApplyleave1] = useState([]);

  const [reportstatus, setreportstatus] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const [manager, setManager] = useState("");

  const [ccEmails, setCCEmails] = useState("");

  // ************************************************************************
  // ************************************************************************

  // ************************************************************************

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
  };

  const calculateAndSetLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    setleaveday(daysDifference);
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ************************************************************************
  // ************************************************************************
  // ************************************************************************

  const apply = () => {
    // check if user has really entered any value
    if (StartDate.length === 0) {
      toast.error("please select Date ");
    } else if (EndDate.length === 0) {
      toast.error("please select date");
    } else if (EndDate < StartDate) {
      toast.error("End Date cannot be before Start Date");
    } else if (applyfor.length === 0) {
      toast.error("please select apply for");
    } else if (reason.length === 0) {
      toast.error("please mention reason");
    } else if (leaveType.length === 0) {
      toast.error("please select leave type");
    } else {
      const start = new Date(StartDate);
      const end = new Date(EndDate);
      const timeDifference = end - start;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
      setleaveday(daysDifference);
      console.log(leaveDays);

      const body = {
        StartDate,
        EndDate,
        reason,
        // appid,
        applyfor,
        leaveDays: daysDifference,
        leaveType,
      };
      console.log("Apply for : ", applyfor);
      console.log("leave days : ", leaveDays);

      console.log("body : ", body);
      axios
        .post(config.serverURL + "/applyLeave/leave", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          console.log(response.data);

          // sessionStorage.setItem("time",TimeIn);
          // const v=sessionStorage.getItem("time")

          // console.log(v)

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("not insertd");
          } else {
            toast.success("successful");

            // navigate to the singin page
            // navigate('/home')
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };
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

  const [apply1, setApply1] = React.useState("");
  const [type, setType] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleclick = (event) => {
    setApply1(event.target.value);
    setType(event.target.value);
  };
  // ************************************************************************

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSessionSelect = (session) => {
    setSelectedSessions((prevSessions) => {
      if (prevSessions.includes(session)) {
        return prevSessions.filter((s) => s !== session);
      } else {
        return [...prevSessions, session];
      }
    });
  };

  const handleManagerSelect = (value) => {
    setManager(value);
  };

  const handleCCEmailsChange = (value) => {
    setCCEmails(value);
  };

  const handleSubmit = () => {
    // Add your logic to handle form submission
    console.log({
      ...formData,
      selectedSessions,
      manager,
      ccEmails,
    });
  };

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  // **************************************************************************************************
  // **************************************************************************************************
  // Pending Tab
  // **************************************************************************************************
  // **************************************************************************************************
  const [attendanceData, setAttendanceData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [initialValue, setInitialValue] = useState(new Date()); // Adjust as needed
  const [registration, setRegistration] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");
  
  useEffect(() => {
    getuserdetails();
  }, []);

  const getuserdetails = () => {
    axios
      .get(config.serverURL + "/use/", {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          console.log(result);
          // set the homes to the state member
          setRegistration(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      });
  };

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );






  const ServerDay = ({ day }) => {
    const formattedDay = day.toISOString().split('T')[0];
    const isPresent = attendanceData.some((data) => data.date === formattedDay);

    return (
      <div>
        <span>{isPresent ? 'P' : 'A'}</span>
        {day.getDate()}
      </div>
    );
  };






  const getHistoryuserdetails = (Rid) => {
    setIsLoading(true);
    axios
      .get(config.serverURL + `/user/attendance/${Rid}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        setIsLoading(false);
        const result = response.data;

        if (result["status"] === "success") {
          const userAttendanceData = result["data"];
          setAttendanceData(userAttendanceData);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <>
      <NavBar />
      <SideBar />
   
      {/* ************************************************************************************* */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f2f2f2",
          height: "50vw",
          paddingTop: "-10",
          marginTop: "20px",
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
              <Card
                sx={{
                  // maxWidth: 1000,

                  alignContent: "start",
                  marginTop: "0px",
                  width: "35%",
                  marginLeft: "%",
                  marginBottom: "99%",
                  alignContent: "center",
                  alignItems: "center",
                  height: "70%",

                  // margin: "auto",
                  // padding: '90px',
                  padding: "20px",
                  // paddingTop: "20px",
                }}
              >
                 <div>
          <h1>Regularization</h1>
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={initialValue}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              // renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
              </Card>
            </CustomTabPanel>

            {/* ********************************************************************************** */}
            {/* Pensding Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} index={1}>
              {/* Item Two */}

              <Box
              sx={{marginLeft:"24%", marginTop:"-464px"}}
              >
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table sx={{ Width: "100%" }} aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}

                        // rowCount={rows.length}
                      />
                      <TableBody>
                        {registration.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              // sx={{
                              //   paddingLeft: "4px",
                              //   paddingRight: "0px",
                              // }}
                              onClick={(event) => handleClick(event, row.id)}
                              // role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.R_Id}
                              // selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.R_Id}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell>{row.Date}</TableCell>
                              <TableCell>{row.TimeIn}</TableCell>
                              <TableCell>{row.Date}</TableCell>
                              <TableCell>{row.TimeOut}</TableCell>
                              <TableCell>{row.Late_In}</TableCell>
                              <TableCell>{row.EarlyOut}</TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && <TableRow></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </CustomTabPanel>

            {/* ************************************************** */}
            {/* ************************************************** */}
            {/* History Tab Herre */}
            {/* ************************************************** */}
            {/* ************************************************** */}

            <CustomTabPanel value={value} index={2}>
            <Box
              sx={{marginLeft:"24%", marginTop:"-464px"}}
              >
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table sx={{ Width: "100%" }} aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}

                        // rowCount={rows.length}
                      />
                      <TableBody>
                        {registration.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              // sx={{
                              //   paddingLeft: "4px",
                              //   paddingRight: "0px",
                              // }}
                              onClick={(event) => handleClick(event, row.id)}
                              // role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.R_Id}
                              // selected={isItemSelected}
                              // sx={{ cursor: "pointer", textAlign: "center", }}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.R_Id}
                              </TableCell>
                              {/* <TableCell align="right">{row.Id}</TableCell> */}
                              <TableCell>{row.Date}</TableCell>
                              <TableCell>{row.TimeIn}</TableCell>
                              <TableCell>{row.Date}</TableCell>
                              <TableCell>{row.TimeOut}</TableCell>
                              <TableCell>{row.Late_In}</TableCell>
                              <TableCell>{row.EarlyOut}</TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && <TableRow></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
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

export default Regularised;
