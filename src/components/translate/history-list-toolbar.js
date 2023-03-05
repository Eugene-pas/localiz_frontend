import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../assets/icons/search';
import { Arrow as ArrowIcon } from '../../assets/icons/arrow';
import { useSelector } from 'react-redux';
import { download } from '../../services/document';

export const HistoryListToolbar = ({ documentName, search, ...props }) => {
  const historyReducer = useSelector(state => state.historyReducer);
  const projectId = useSelector(state => state.documentReducer.projectId);
  const project = useSelector(state => state.projectReducer.projects.find(p => p.id === projectId));

  const hadleDownload = async () => {
    await download({
      documentId: historyReducer.documentId,
      documentName: historyReducer.documentName
    });
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Box textAlign={"center"}>
          <Typography
            sx={{ m: 1 }}
            variant="h5"
          >
            {documentName}
          </Typography>
          <Box
            display={"flex"}
            gap={1}
            justifyContent={"center"}>
            <Typography
              align="center"
              color="textPrimary"
              variant="h6"
            >
              {project.fromTranslate}
            </Typography>
            <ArrowIcon color="action" />
            <Typography
              align="center"
              color="textPrimary"
              variant="h6"
            >
              {project.toTranslate}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          Translate
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            onClick={hadleDownload}
            type="button"
            value="upload"
            color="secondary"
            variant="contained"
            component="label">
            Get document
          </Button>
        </Box>
      </Box>
      {/* <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={hendleSearch}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search history"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </Box>
  );
}
