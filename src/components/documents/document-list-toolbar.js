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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const DocumentListToolbar = ({search ,projectId ,projectName, ...props}) => {
  const { t } = useTranslation();
  const documents = useSelector(state => state.documentReducer.documents)

  const hendleSearch = (event) => {
    const data = [];
    for (let i = 0; i < documents.length; i++) {
      if(documents[i].name.includes(event.target.value))
        data.push(documents[i])
    }
    search(data)
    if(event.target.value === "")
      search(documents)
  }

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
          {t("documents")}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            type="button"
            value="upload"
            color="secondary"
            variant="contained"
            component="label">
            {t("addDocument")}
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
                placeholder={t("searchDocument")}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
