import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';
import { Selector as SelectorIcon } from '../../assets/icons/selector';
import { User as UserIcon } from '../../assets/icons/user';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { ACCOUNT, PROJECTS, ABOUT } from '../../navigation/CONSTANTS';
import { logoutUser } from '../../services/authentication';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const { t } = useTranslation();
  const items = [
    // {
    //   href: HOME,
    //   icon: (<ChartBarIcon fontSize="small" />),
    //   title: 'Dashboard'
    // },
    {
      href: PROJECTS,
      icon: (<ListAltIcon fontSize="small" />),
      title: t("dbSlidebar.projects")
    },
    {
      href: ACCOUNT,
      icon: (<UserIcon fontSize="small" />),
      title: t("dbSlidebar.account")
    },
    {
      href: ABOUT,
      icon: (<InfoIcon fontSize="small" />),
      title: t("dbSlidebar.about")
    }
  ];
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Logo
              sx={{
                height: 42,
                width: 42
              }}
            />
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {t("dbSlidebar.inc")}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {t("dbSlidebar.yourtier")}
                  {' '}
                  : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
          </Box>
          <Button
            color="secondary"
            component="a"
            endIcon={(<OpenInNewIcon />)}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => {logoutUser(navigate)}}
          >
            {t("logout")}
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
