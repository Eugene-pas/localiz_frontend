import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../assets/icons/search';
import { useState } from 'react';
import ProjectCreateModal from './project-create-modal';

export const ProjectListToolbar = ({projects, search, ...props}) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [dataSearch, setDataSearch] = useState(projects);

  const hendleSearch = (event) => {
    const data = [];
    for (let i = 0; i < projects.length; i++) {
      if(projects[i].name.includes(event.target.value))
        data.push(projects[i])
    }
    search(data)
    if(event.target.value == "")
      search(dataSearch)
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
          Projects
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenCreateModal(true)}
          >
            Cerate project
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
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search projects"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <ProjectCreateModal
        onClose={setOpenCreateModal}
        open={openCreateModal} />
    </Box>
  );
}
