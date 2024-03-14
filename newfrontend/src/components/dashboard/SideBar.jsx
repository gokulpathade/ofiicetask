





import React, { useState, useEffect } from "react";
// import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useNavigate } from "react-router";
import { useAppstore } from "./appStore";
 import {AdminSideBar} from  './AdminSideBar'
 import {ManagerSideBar} from  './ManagerSideBar'
 import {UserSideBar} from  './UserSideBar'


import * as BsIcons from "react-icons/bs";
import SubMenu from "./submenu";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";

import * as RiIcons from "react-icons/ri";




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
















const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "close",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideBar() {



  const theme = useTheme();
  const open = useAppstore((state) => state.dopen);

  const signinStatus = true;
  const [getrows, setrows] = useState([]);
  const [loadData, setData] = useState([]);
  const [stauss, setStatuss] = useState("");
  

  const [basicModal, setBasicModal] = useState(false);
  const handleClose2 = () => {
    setBasicModal(false);
  };
  const handleShow2 = () => {
    setBasicModal(true); // Show the modal Time in
  };

  const [basicModal3, setBasicModal3] = useState(false);
  const handleClose3 = () => setBasicModal3(false);
  const handleShow3 = () => {
    setBasicModal3(true); // Show the modal Time Out
  };

  const navigate = useNavigate();

  const USER_ID = sessionStorage.getItem("userId");

  const currentPath = window.location.pathname;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}

        <Drawer variant="permanent" open={open}>
          <DrawerHeader></DrawerHeader>
       
          <List sx={{ paddingTop:"20px", alignContent:"center",}}>


    <div>
                {window.sessionStorage.getItem("userRole").toLowerCase() ===
                "user" ? (
                  <>
                    {UserSideBar.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                ) : window.sessionStorage.getItem("userRole").toLowerCase() ===
                  "manager" ? (
                  <>
                    {ManagerSideBar.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                ) : (
                  <>
                    {AdminSideBar.map((item, index) => {
                      return <SubMenu item={item} key={index} />;
                    })}
                  </>
                )}

                {/* {window.sessionStorage.getItem("time") === "true" &&
                signinStatus ? (
                  <div style={{ marginLeft: "20px" }}>
                    <BsIcons.BsFillCalendar2CheckFill />
                    <button
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: 18,
                        marginLeft: 5,
                        backgroundColor: currentPath === "/inout" ? "green" : "transparent",
                    
                      }}
                      onClick={() => {
                        navigate("/inout");
                      }}
                      className="btn btn-link"
                      aria-current="page"
                    >
                      Attendance details
                    </button>{" "}
                  </div>
                ) : (
                  <></>
                )} */}

                
              </div>
        
          </List>

        </Drawer>
      </Box>
    </div>
  );
}

export default SideBar;


