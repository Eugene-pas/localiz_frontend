import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import {Typography_h2} from '../components/Typography';
import { useTranslation } from 'react-i18next';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

export default function ProductHero() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <Typography_h2 color="inherit" align="center" variant="h2" marked="center">
        {t('homePage.productHero.mainText')}
      </Typography_h2>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
       {t('homePage.productHero.infoText')}
      </Typography>
      <Button
        color="secondary"
        variant="outlined"
        size="large"
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 200}}
      >
        {t('homePage.productHero.button')}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
      {t('homePage.productHero.subText')}
      </Typography>
    </ProductHeroLayout>
  );
}
