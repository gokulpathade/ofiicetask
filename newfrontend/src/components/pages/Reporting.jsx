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

// **************************************************************
// leave apply copy

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

// const rows = [];

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

];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  
  return (
    <TableHead>
      <TableRow sx={{ textAlign: "center" }}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel>
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
          Reporting Details
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

const rows = [];
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// **************************************************************
// **************************************************************

const Reporting = () => {
 
  const [isReported, setIsReported] = useState(false);

  // const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toISOString().split("T")[0];
    const currentTime = currentDateTime.toTimeString().split(" ")[0];
    setFormData({ ...formData, currentDate, currentTime });
  };

  // const handleReport = () => {
  //   // Add your logic to handle reporting
  //   console.log("Reported!");
  //   setIsReported(true);
  // };

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

  // const handleSubmit = () => {
  //   // Add your logic to handle form submission
  //   console.log({
  //     ...formData,
  //     selectedSessions,
  //     manager,
  //     ccEmails,
  //   });
  // };

  // **************************************************************************************************
  // **************************************************************************************************
  // Attendence Tab
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

  const [formData, setFormData] = useState({
    Rid: "",
    TimeIn: "",
    TimeOut: "",
    Date: "",
    // Manager_Id: "",
    Reason: "",
    Reporting: "",
  });





// +___________________________________________________________________________
// +___________________________________________________________________________
// +____Reporting _______________________________________________________________________

// const [isReported, setIsReported] = useState(false);

useEffect(() => {
  // Fetch current date and time when the component mounts
  const currentDate = new Date().toLocaleDateString();
  setFormData({
    ...formData,
    Date: currentDate,
  });


  


  // Update the time every second
  const intervalId = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    // const currentTime = new Date().toLocaleTimeString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      TimeIn: currentTime,
      TimeOut: currentTime,
    }));
  }, 1000);

 
  return () => clearInterval(intervalId);
}, []); 










  
  useEffect(() => {
    Reportingdetails(USER_ID);
  }, [USER_ID]);

  const Reportingdetails = (USER_ID) => {
    axios
      .get(config.serverURL + `/reporting/reportingdetail/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];
          setHistory(managerTeamUsers); // Set the registration state with the fetched data
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



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

  const getHistoryuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + `/use/manager/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];

          console.log(managerTeamUsers);

          setHistory(managerTeamUsers);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    // Ask for confirmation before signing out
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");

    if (confirmSignOut) {
      // Implement your logic for signing out
      const currentTime = dayjs().format("HH:mm:ss");
    setFormData((prevData) => ({ ...prevData, TimeOut: currentTime }));
    setIsReported(false);
      // setIsReported(false);
    }
  };


  const getCurrentTime = () => {
    const currentTime = dayjs().format("HH:mm:ss");
    setFormData((prevData) => ({ ...prevData, TimeIn: currentTime }));
  };

  const getCurrentDate = () => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    setFormData((prevData) => ({ ...prevData, Date: currentDate }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  

  const handleReport = () => {
    const currentTime = dayjs().format("HH:mm:ss");
    setFormData((prevData) => ({ ...prevData, TimeOut: currentTime }));
  
    const payload = {
      Rid: USER_ID, // Assuming USER_ID is defined in your component
      ...formData,
    };
  console.log("data is uhettegetejhjhgs", payload)
    axios
      .post(config.serverURL + '/reporting/add', payload)
      .then((response) => {
        console.log(response);
        setIsReported(true);
        getCurrentTime();
        getCurrentDate(); // Update current time after reporting
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Handle error if needed
      });
  };
  

  // const handleSignOut = () => {
  //   // Additional logic for sign-out
  //   const currentTime = dayjs().format("HH:mm:ss");
  //   setFormData((prevData) => ({ ...prevData, TimeOut: currentTime }));
  //   setIsReported(false);
  // };

  return (
    <>
      <NavBar />
      <SideBar />

      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          height: "47vw",
          paddingTop: "-92",
          marginTop: "-15px",
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
                <Tab label="Reporting" {...a11yProps(0)} />
                <Tab label="Attendence" {...a11yProps(1)} />
                {/* <Tab label="History" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {/* **************************************************************************** */}
              <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div>
            <h1>Reporting</h1>
          </div>

          <TextField
            label="Date"
            type="text"
            value={formData.Date}
            onChange={(e) => handleInputChange("Date", e.target.value)}
            readOnly
            style={{
              width: "80",
              padding: "5px",
              alignItems: "center",
            }}
            margin="normal"
          />

          <TextField
            label="Time In"
            type="text"
            style={{
              width: "990",
              padding: "5px",
              alignItems: "center",
            }}
            value={formData.TimeIn}
            onChange={(e) => handleInputChange("TimeIn", e.target.value)}
            readOnly
            margin="normal"
          />

          <FormControl sx={{ width: "222px" }} margin="normal">
            <InputLabel>Reporting</InputLabel>
            <Select
              value={formData.Reporting}
              onChange={(e) => handleInputChange("Reporting", e.target.value)}
            >
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="OutDoor">OutDoor</MenuItem>
              <MenuItem value="WFM">Work From Home</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Remark"
            value={formData.Reason}
            onChange={(e) => handleInputChange("Reason", e.target.value)}
            sx={{ width: "222px" }}
            multiline
            rows={1}
            margin="normal"
          />

          <div>
            {!isReported && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleReport();
                }}
                disabled={isReported}
              >
                Sign In
              </Button>
            )}
          </div>

          {isReported && (
            <>
              <TextField
                label="Out Time"
                type="text"
                style={{
                  width: "990",
                  padding: "5px",
                  alignItems: "center",
                }}
                value={formData.TimeOut}
                readOnly
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
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
                        {history.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                           
                              tabIndex={-1}
                              key={row.Rid}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="auto"
                              >
                                {row.Rid}
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
              {/* **************************************************************************** */}
              {/* **************************************************************************** */}

           
            {/* ********************************************************************************** */}
            {/* Pending Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} index={1}>
              <Box
                sx={{
                  width: "80%",
                  marginRight: "30%",
                  alignContent: "center",
                  alignItems: "center",
                }}
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
                        {history.map((row, index) => {
                          // const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              
                              tabIndex={-1}
                              key={row.R_Id}
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
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      {/* </div> */}

      {/* </div> */}
    </>
  );
};

export default Reporting;
