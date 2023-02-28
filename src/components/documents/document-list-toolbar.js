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
import { addDocumentToProject } from '../../services/document';
import { setDocumentData } from '../../redux/setStore';

export const DocumentListToolbar = ({projectId ,projectName, ...props}) => {

  const hendleUpload = async (e) => {
    const length = e.target.files.length;
    const formData = new FormData();

    for (let i = 0; i < length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    formData.append("projectId", projectId);

    if(length > 0)
     await addDocumentToProject(formData);
     await setDocumentData();
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
       <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          {projectName}
        </Typography>
        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          Documents
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            type="button"
            value="upload"
            color="secondary"
            variant="contained"
            component="label">
            Add Document
            <input
              hidden
              accept=".json"
              multiple
              type="file"
              onChange={hendleUpload} />
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
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
                placeholder="Search document"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
