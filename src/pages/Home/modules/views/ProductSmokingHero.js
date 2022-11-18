import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Typography_h2 } from '../components/Typography';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import avatar from '../../../../assets/imgs/avatar.png';

const MyTypography = styled(Typography_h2)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 24
  }
}))

function ProductSmokingHero() {
  const { t } = useTranslation();

  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <MyTypography variant="h4" component="span">
          {t('homePage.productSmokingHero.title')}
        </MyTypography>
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", mt: 7 }}>
        <Box
          component="img"
          src={avatar}
          alt="avatar"
          sx={{ width: 120, borderRadius: 90 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ mx: 3, fontWeight: 600 }}>
            {t('homePage.productSmokingHero.text')}
          </Typography>
          <Typography variant="subtitle1" sx={{ mx: 3, fontSize: 20}}>
            {t('homePage.productSmokingHero.fullName')}         
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductSmokingHero;
