import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import {Typography_h2} from '../components/Typography';
import { useTranslation } from 'react-i18next';

import regImg from '../../../../assets/imgs/howItWork/registration_icon.svg'
import crImg from '../../../../assets/imgs/howItWork/file-earmark-plus.svg'
import tranImg from '../../../../assets/imgs/howItWork/translate.svg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography_h2 variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
        {t('homePage.productHowItWorks.title')}
        </Typography_h2>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={regImg}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                {t('homePage.productHowItWorks.text.0')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={crImg}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                {t('homePage.productHowItWorks.text.1')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={tranImg}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                {t('homePage.productHowItWorks.text.2')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/sign-up/"
          sx={{ mt: 8 }}
        >
          {t('homePage.productHowItWorks.button')}
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
