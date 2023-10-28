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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          subheader={t("accountProfile.subheader")}
          title={t("accountProfile.title")}
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
                helperText={t("accountProfile.helperFirstName")}
                label={t("firstName")}
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
                label={t("lastName")}
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
                label={t("email")}
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
            {t("accountProfile.save")}
          </Button>
        </Box>
      </Card>
    </form>
  );
};
