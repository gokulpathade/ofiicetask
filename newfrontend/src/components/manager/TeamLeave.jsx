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
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { green, pink } from '@mui/material/colors';
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
  { id: "L_Id", label: "ID" },
  { id: "StartDate", label: "Start Date " },
  { id: "EndDate", label: "Last Date " },
  { id: "Reason", label: "Reason" },
  { id: "L_Days", label: "NO Of Days" },
  { id: "L_Type", label: "Leave Type" },
  { id: "Apply_Status", label: "Status" },
  { id: "CreationDate", label: "Date" },
  { id: " ", label: "Action" },
  // { id: 'email', label: 'Email' },
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
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ padding: "5px", alignContent: "center", textAlign: "center" }}
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
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
          Team Leave Request
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

export default function TeamLeave() {



  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");
  const [role, setRole] = useState("");
  const optionss = ["Admin", "User", "Manager"];

  const [registration, setRegistration] = useState([]);

  const [rows, setRows] = useState([]);

  const [value, setValue] = React.useState(0);   


  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const USER_ID = sessionStorage.getItem("userId");

  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getuserdetails(USER_ID);
  }, [USER_ID]);

  const getuserdetails = (USER_ID) => {
    axios
      .get(config.serverURL + `/use/manager/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];
          setRegistration(managerTeamUsers); // Set the registration state with the fetched data
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
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




  // *********************************************************************************
  // *********************************************************************************
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
          <Box sx={{ p: 3, borderRadius:"10px" }}>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  // *********************************************************************************
  // *********************************************************************************

  useEffect(() => {
    TeamLeave(USER_ID);
  }, [USER_ID]);

  const TeamLeave = (USER_ID) => {
    axios
      .get(config.serverURL + `/applyLeave/LeaveRequest/${USER_ID}`, {
        headers: { token: sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;

        if (result["status"] === "success") {
          const managerTeamUsers = result["data"];
          setRegistration(managerTeamUsers); // Set the registration state with the fetched data
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // *********************************************************************************
  // *********************************************************************************
 
  return (
    <>
      <NavBar />
      <SideBar />

     


        <Box component="main" sx={{ flexGrow: 1, p: 7,}}>
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
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="History" {...a11yProps(1)} />
                {/* <Tab label="History" {...a11yProps(1)} /> */}
              </Tabs>
            </Box>

           

            {/* ********************************************************************************** */}
            {/* Pending Tab Here */}
            {/* ********************************************************************************** */}
            <CustomTabPanel value={value} index={0}>
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
                {registration.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // sx={{

                      // paddingLeft:'4px',
                      // paddingRight:'10px',
                      // }}
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        paddingLeft: "4px",
                        paddingRight: "10px",
                        textAlign: "center",
                      }}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="auto"
                      >
                        {row.Lid}
                      </TableCell>
                      {/* <TableCell align="right">{row.Id}</TableCell> */}
                      <TableCell align="center">{row.StartDate}</TableCell>
                      <TableCell align="center">{row.EndDate}</TableCell>
                      <TableCell align="center">{row.Reason}</TableCell>
                      <TableCell align="center">{row.LDays}</TableCell>
                      <TableCell align="center">{row.LType}</TableCell>
                      {/* <TableCell align="center">{row.Apply_For}</TableCell> */}
                      
                      <TableCell align="center">{row.ApplyStatus}</TableCell>
                      <TableCell align="center">{row.CreationDate}</TableCell>
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
              
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
       
      </Box>

            </CustomTabPanel>
          

            {/* History Tab Herre */}
            {/* ************************************************** */}
            {/* ************************************************** */}

            <CustomTabPanel value={value} index={1}>
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
                {registration.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // sx={{

                      // paddingLeft:'4px',
                      // paddingRight:'10px',
                      // }}
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        paddingLeft: "4px",
                        paddingRight: "10px",
                        textAlign: "center",
                      }}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="auto"
                      >
                        {row.Lid}
                      </TableCell>
                      {/* <TableCell align="right">{row.Id}</TableCell> */}
                      <TableCell align="center">{row.StartDate}</TableCell>
                      <TableCell align="center">{row.EndDate}</TableCell>
                      <TableCell align="center">{row.Reason}</TableCell>
                      <TableCell align="center">{row.LDays}</TableCell>
                      <TableCell align="center">{row.LType}</TableCell>
                      {/* <TableCell align="center">{row.Apply_For}</TableCell> */}
                      
                      <TableCell align="center">{row.ApplyStatus}</TableCell>
                      <TableCell align="center">{row.CreationDate}</TableCell>
                      <TableCell align="center">
        {/* <Button
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
        </Button> */}

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
              
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
       
      </Box>

            </CustomTabPanel>
          </Box>
        </Box>






    </>
  );
}
