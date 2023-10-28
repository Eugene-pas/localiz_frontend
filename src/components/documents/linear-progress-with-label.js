import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 8,
  "& .MuiLinearProgress-dashed": {
    backgroundImage: "none",
    backgroundColor: "#f2f2f2",
    animation: "none",
  },
  "& 	.MuiLinearProgress-bar2Buffer": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 8
  },
  "& 	.MuiLinearProgress-bar1Buffer": {
    backgroundColor: "#72ff6b",
    borderRadius: 8,
  },
}));

const LinearProgressWithLabel = props => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <CustomLinearProgress {...props} />
        </Box>
        <Box sx={{ minWidth: 10 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.valueBuffer,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

export default LinearProgressWithLabel;
