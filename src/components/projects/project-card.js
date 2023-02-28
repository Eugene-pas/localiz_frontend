import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import { Clock as ClockIcon } from '../../assets/icons/clock';
import { Arrow as ArrowIcon } from '../../assets/icons/arrow';
import { UserAdd as UserAddIcon } from '../../assets/icons/user-add';
import AddUserModal from './add-user-modal';
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setDocument } from '../../redux/actions/documets/index'
import { useNavigate } from 'react-router-dom';
import { DOCUMENTS } from '../../navigation/CONSTANTS'


export const ProjectCard = ({ project, ...rest }) => {
  const documentReducer = useSelector(state => state.documentReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const openDocument = (project) => {    
      documentReducer.projectId = project.id;
      documentReducer.projectName = project.name;
      documentReducer.documents = null;

      dispatch(setDocument(documentReducer));
      navigate(DOCUMENTS);
  }

  return (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <Button onClick={() => {openDocument(project)}}>
      <CardContent sx={{ p: 1 }}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {project.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: "1vw",
          }}
        >
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
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {project.description}
        </Typography>

      </CardContent>
    </Button>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {moment.utc(project.creationDate).format("DD.MM.yy")}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <IconButton sx={{ pl: 0 }} onClick={() => setOpenModal(true)}>
            <UserAddIcon color="action" />
          </IconButton>
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Add co-interpreter
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <AddUserModal
      projectId={project.id}
      onClose={setOpenModal}
      open={openModal} />
  </Card>
);}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};
