import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { getUserProfileInfo, editUserInfo } from '../../services/users'
import { useDispatch, useSelector } from 'react-redux';
import {setProfile} from '../../redux/actions/auth/index'

export const AccountProfileDetails = (props) => {
  const profileModal = {
    name: '',
    surname: '',
    email: '' 
  };
  const profileReducer = useSelector(state => state.profileReducer);
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(true);
  const [profile, setProfiles] = useState(profileReducer);
  const [values, setValues] = useState(profileModal);

  useEffect(() => {
    async function FetchData() {
      const date = await getUserProfileInfo();
      setValues(date);
    }

    FetchData();
  }, [])

  useEffect(() => {
    setProfiles(profileReducer);
  }, [profileReducer])

  useEffect(() => {
    if(profile.name === values.name &&
      profile.email === values.email &&
      profile.surname === values.surname){
        setIsChange(true);
      }
      else{
        setIsChange(false)
      }
  }, [values, profile])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const EditProfile = async () => {
    await editUserInfo(values);
    dispatch(setProfile(values));
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="surname"
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            disabled={isChange}
            color="primary"
            variant="contained"
            onClick={async () => {await EditProfile()}}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
