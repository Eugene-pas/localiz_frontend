import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import image from "../../assets/imgs/undraw_page_not_found_su7k.svg"
import { ABOUT } from "../../navigation/CONSTANTS"
import { styled } from '@mui/material/styles';

const AdapTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      fontSize: "40px"
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "30px"
      }
  }))

function UserHome() {
    const navigate = useNavigate();

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: '1',
                    minHeight: '100%',
                    height: '100vh'
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <AdapTypography
                            align="center"
                            color="textPrimary"
                            variant="h2"
                            fontWeight={700}
                        >
                            404: The page you are looking for isn’t here
                        </AdapTypography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            You either tried some shady route or you came here by mistake.
                            Whichever it is, try using the navigation
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                alt="Under development"
                                src={image}
                                style={{
                                    marginTop: 50,
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 560
                                }}
                            />
                        </Box>
                        <Button
                            onClick={() => {navigate(ABOUT)}}
                            component="a"
                            startIcon={(<ArrowBackIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            Go back to home
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default UserHome;
