import React from 'react'
import PropTypes from 'prop-types'
//import { LanguageSelection } from './components/LanguageSelection'
//import { Typography, Button } from '@material-ui/core'
import { ROOT } from '../../navigation/CONSTANTS'
import { useNavigate  } from 'react-router-dom'
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

const HomeView = props => {
    const history = useNavigate ();
    const goTo = (path) => {
        history.push(path || ROOT);
    }
    return (
        // <div>
        //     <Typography variant="h2">HomeView {props.title}</Typography>
        //     <LanguageSelection />
        //     <Button variant="contained" color="primary" onClick={()=>goTo(ROOT)}>Dashboard</Button>
        // </div>
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />
            <ProductCTA />
            <ProductSmokingHero />
            <AppFooter />
        </React.Fragment>
    )
}

HomeView.propTypes = {
    title: PropTypes.string.isRequired
}

export default withRoot(HomeView);
