import * as React from 'react';
import Box from '@mui/material/Box';
import USAFlag from '../../../../assets/AppBar/flag_nation_states.svg'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { ROOT } from "../../../../navigation/CONSTANTS"


const MyLink = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginLeft: 190
  },
}))

const MyIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
}))

const BoxLinks = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
}))

const MyButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
}))

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const [state, setState] = React.useState({
    top: false
  });

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <MyButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => { changeLanguage("ua") }}>UA</Button>
            <Button onClick={() => { changeLanguage("en") }}>EN</Button>
          </MyButtonGroup>
          <MyLink
            variant="h6"
            underline="none"
            color="inherit"
            href={ROOT}
            sx={{ fontSize: 24 }}
          >
            {t('homePage.header.title')}
          </MyLink>
          <BoxLinks sx={{ display: 'flex', justifyContent: 'flex-end', width: '290px' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in/"
              sx={rightLink}
            >
              {t('homePage.header.signIn')}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {t('homePage.header.signUp')}
            </Link>
          </BoxLinks>
          <MyIconButton
            onClick={toggleDrawer('top', true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </MyIconButton>
          <SwipeableDrawer
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton href="/sign-in/">
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={capitalizeFirstLetter(t('homePage.header.signIn'))} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton href="/sign-up/">
                    <ListItemIcon>
                      <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText primary={capitalizeFirstLetter(t('homePage.header.signUp'))} />
                  </ListItemButton>
                </ListItem>


              </List>

              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { changeLanguage("ua") }}>
                    <ListItemIcon>
                      <svg style={{ height: '30px' }} id="Flat" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g><rect fill="#2a75e6" height="352" rx="10" width="496" x="8" y="80" /><path d="M8,256H504a0,0,0,0,1,0,0V422a10,10,0,0,1-10,10H18A10,10,0,0,1,8,422V256a0,0,0,0,1,0,0Z" fill="#f9d549" /></g></svg>
                    </ListItemIcon>
                    <ListItemText primary={'UA'} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { changeLanguage("en") }}>
                    <ListItemIcon>
                      <img height={'30px'} src={USAFlag} alt="Flag"/>
                    </ListItemIcon>
                    <ListItemText primary={'EN'} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
