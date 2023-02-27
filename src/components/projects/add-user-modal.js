import {
    Grid,
    Divider,
    IconButton,
    Box,
    Button,
    TextField,
    Modal,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Cross as CrossIcon } from "../../assets/icons/cross"
import { useState } from 'react';
import { addUserToProject } from '../../services/projects'

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

const AddUserModal = ({projectId, ...props}) => {
    const { onClose, open } = props;
    const model = {
        email: "",
        projectId: projectId,
    }

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleNameChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    };

    const cleanFilds = () => {
        setEmail("");
    }

    const closeModal = () => {
        cleanFilds();
        onClose(false);
    }

    const handleSubmit = async () => {
        if (email.trim() === '') {
            setEmailError(true);
        } else {
            model.email = email;
            await addUserToProject(model);
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
                        Add co-interpreter
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
                            name="email"
                            type={"email"}
                            sx={{ width: "100%" }}
                            label="email"
                            variant="standard"
                            value={email}
                            onChange={handleNameChange}
                            required
                            error={emailError}
                            helperText={emailError ? 'This field is required' : ''}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2
                }}>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Add user
                    </Button>
                </Box>
            </BoxModal>
        </Modal>
    );
};

export default AddUserModal
