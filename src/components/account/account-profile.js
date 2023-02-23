import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';

const user = {
  avatar: '/static/avatars/m3.png',
  name: 'Katarina Smith',
};

export const AccountProfile = (props) => {
  const profileReducer = useSelector(state => state.profileReducer);
  const [profile, setProfiles] = useState(profileReducer);

  useEffect(() => {
    setProfiles(profileReducer);
  }, [profileReducer])

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {profile.name + " " + profile.surname}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          disabled={true}
          variant="text"
        >
          Change picture
        </Button>
      </CardActions>
    </Card>
  );
};
