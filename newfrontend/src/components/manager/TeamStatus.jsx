import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../dashboard/SideBar";

// import { visuallyHidden } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../dashboard/NavBar";

const rows = [];

const headCells = [
  {label: "ID" },
  {label: "Date " },
  {label: "Time In" },
  {label: "Time Out" },
  {label: "Total Hours" },
  {label: "Early In " },
  {label: "Early Out " },
];

function EnhancedTableHead(props) {
  const { order, orderBy } = props;

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
  order: PropTypes.oneOf([]).isRequired,
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
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Team Reporting Status
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
// ... (import statements)

export default function TeamStatus() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Rid");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const USER_ID = sessionStorage.getItem("userId");

  const [registration, setRegistration] = useState([]);

  // useEffect(() => {
  //   ReportingDetails(USER_ID);
  // }, []);

  // const ReportingDetails = (USER_ID) => {
  //   axios
  //     .get(`${config.serverURL}/reporting/reportingdetail/mid/${USER_ID}`, {
  //       headers: { token: sessionStorage["token"] },
  //     })
  //     .then((response) => {
  //       console.log("API Response:", response.data);

  //       if (response.data && response.data.status === "success") {
  //         const managerTeamUsers = response.data.data;
  //         console.log("Mapped Data:", managerTeamUsers);
  //         setRegistration(managerTeamUsers);
  //       } else {
  //         toast.error(response.data && response.data.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


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

  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - registration.length) : 0;

  const [history, setHistory] = useState([]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    Reportingdetails(USER_ID);
  }, []);

  const Reportingdetails = (USER_ID) => {
    console.log("Data Enter the Loop:" + USER_ID);
    axios
      .get(config.serverURL + `/reporting/reportingdetail/mid/${USER_ID}`, {
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

  return (
    <>
      {/* ... (NavBar, SideBar, etc.) */}
      <NavBar />
      <SideBar />

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
                      // sx={{
                      //   paddingLeft: "4px",
                      //   paddingRight: "0px",
                      // }}
                      onClick={(event) => handleClick(event, row.id)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Rid}
                      // selected={isItemSelected}
                      // sx={{ cursor: "pointer", textAlign: "center", }}
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
<TableCell>{row.TimeOut}</TableCell>
<TableCell>{row.Total_Hours}</TableCell>
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
    </>
  );
}

// ***********************************************************************
// ***********************************************************************
// *********************************************************************

// ***********************************************************************
// ***********************************************************************
// ***********************************************************************
