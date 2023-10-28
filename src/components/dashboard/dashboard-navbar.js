import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserCircle as UserCircleIcon } from "../../assets/icons/user-circle";
import AccountPopover from "./account-popover";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import English from "../../assets/imgs/lenguage/english_icon.svg";
import Ukraine from "../../assets/imgs/lenguage/ukraine_icon.svg";
import { useTranslation } from "react-i18next";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const { t, i18n } = useTranslation();
  const [lenguage, setLenguage] = useState(i18n.language);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleChange = (event) => {
    setLenguage(event.target.value);
    changeLanguage(event.target.value);
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 110 }}>
            <Select
              value={lenguage}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ height: 50 }}
            >
              <MenuItem value={"en"}>
                <Box display={"flex"} gap={1} alignItems="center">
                  <img src={English} height={30} /> <p>EN</p>
                </Box>
              </MenuItem>
              <MenuItem value={"ua"}>
                <Box display={"flex"} gap={1} alignItems="center">
                  <img src={Ukraine} height={30} /> <p>UA</p>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/avatars/m3.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbarRoot.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default DashboardNavbar;
