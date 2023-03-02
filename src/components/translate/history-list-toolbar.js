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
import { useSelector } from 'react-redux';

export const HistoryListToolbar = ({documentName ,search, ...props}) => {
  const documents = useSelector(state => state.documentReducer.documents)

  const hendleSearch = (event) => {
    // const data = [];
    // for (let i = 0; i < documents.length; i++) {
    //   if(documents[i].name.includes(event.target.value))
    //     data.push(documents[i])
    // }
    // search(data)
    // if(event.target.value == "")
    //   search(documents)
  }

  const hendleTranslate = async (e) => {
    
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
          variant="h5"
        >
          {documentName}
        </Typography>
        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          Translate
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            type="button"
            value="upload"
            color="secondary"
            variant="contained"
            component="label">
            Get document
            <input
              hidden
              accept=".json"
              multiple
              type="file"
              onChange={hendleTranslate} />
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
                placeholder="Search history"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
