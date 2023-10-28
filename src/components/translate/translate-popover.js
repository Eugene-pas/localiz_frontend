import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const TranslatePopover = (props) => {
  const {suggest ,contentText, anchorEl, onClose, open, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsOpen(open);
  }, [open])

  const handelSuggest = () => {
    suggest();
    setIsOpen(false);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={isOpen}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
         {t("TPopover.suggest")}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {contentText}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem
        onClick={handelSuggest}>
          {t("TPopover.use")}
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

TranslatePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default TranslatePopover
