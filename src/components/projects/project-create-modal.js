import {
  Grid,
  Divider,
  IconButton,
  Box,
  Button,
  Autocomplete,
  TextField,
  Modal,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Cross as CrossIcon } from "../../assets/icons/cross"
import { useState } from 'react';
import { createProject } from '../../services/projects'
import { setProjectData } from '../../redux/setStore'

const BoxModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  boxShadow: 24,
  borderRadius: 20,
  [theme.breakpoints.down('sm')]: {
    width: "90%",
  },
}));

const ProjectCreateModal = (props) => {
  const { onClose, open } = props;
  const model = {
    name: "",
    description: "",
    creationDate: new Date().toISOString(),
    finishDate: new Date().toISOString(),
    fromTranslate: "string",
    toTranslate: "string",
    documents: []
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [files, setFiles] = useState([]);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const handleFromChange = (event) => {
    if (event.target.textContent === '') {
      setFrom("");
    }
    else {
      setFrom(event.target.textContent);
    }

    setFromError(false);
  };

  const handleToChange = (event) => {
    if (event.target.textContent === '') {
      setTo("")
    }
    else {
      setTo(event.target.textContent);
    }
    setToError(false);
  };

  const cleanFilds = () => {
    setName("");
    setDescription("");
    setFrom("");
    setTo("");
  }

  const closeModal = () => {
    cleanFilds();
    onClose(false);
  }

  const handleUpload = () => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const formData = new FormData();
        console.log(formData);
        formData.append("file", file);
        model.documents.push(formData);
      }
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === '') {
      setNameError(true);
    } else if (description.trim() === '') {
      setDescriptionError(true);
    }
    else if (from.trim() === '') {
      setFromError(true);
    }
    else if (to.trim() === '') {
      setToError(true);
    } else {
      model.name = name;
      model.description = description;
      model.fromTranslate = from;
      model.toTranslate = to;
      await createProject(model);
      await setProjectData();
      closeModal();
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => { onClose(false) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxModal sx={{ bgcolor: "background.paper" }}>
        <Box sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create project
          </Typography>
          <IconButton onClick={() => { closeModal() }}>
            <CrossIcon />
          </IconButton>
        </Box>
        <Divider />
        <Grid
          container
          spacing={2}
          padding={4}
        >

          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              type={"text"}
              sx={{ width: "100%" }}
              label="Name"
              variant="standard"
              value={name}
              onChange={handleNameChange}
              required
              error={nameError}
              helperText={nameError ? 'This field is required' : ''}
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              rows={2}
              sx={{ width: "100%" }}
              multiline
              value={description}
              label="Description"
              variant="standard"
              onChange={handleDescriptionChange}
              required
              error={descriptionError}
              helperText={descriptionError ? 'This field is required' : ''}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Autocomplete
              disablePortal
              onChange={handleFromChange}
              options={["EN", "UKR"]}
              renderInput={(params) =>
                <TextField {...params}
                  variant="standard"
                  value={from}
                  label="From"
                  required
                  error={fromError}
                  helperText={descriptionError ? 'This field is required'
                    : 'Select the original language'}
                />}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Autocomplete
              disablePortal
              onChange={handleToChange}
              options={["EN", "UKR"]}
              renderInput={(params) =>
                <TextField {...params}
                  variant="standard"
                  label="To"
                  value={to}
                  required
                  error={toError}
                  helperText={descriptionError ? 'This field is required'
                    : 'Select the translation language'}
                />}
            />
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2
        }}>
          <Button color="secondary" variant="contained" component="label">
            Upload
            <input
              hidden
              accept=".json"
              multiple
              type="file"
              onChange={(event) => setFiles(event.target.files)} />
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Cerate
          </Button>
        </Box>
      </BoxModal>
    </Modal>
  );
};

export default ProjectCreateModal
