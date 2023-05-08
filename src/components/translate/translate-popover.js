import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TranslatePopover = (props) => {
  const {suggest ,contentText, anchorEl, onClose, open, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);

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
         suggest
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
          Use
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
