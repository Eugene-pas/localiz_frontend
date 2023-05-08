import { Box, Container } from '@mui/material';
import { ContentListResults } from '../../components/translate/content-list-results';
import { ContentListToolbar } from '../../components/translate/content-list-toolbar';
import { DashboardLayout } from '../../components/dashboard/index';
import { useSelector } from 'react-redux';

const TranslateHystoryPage = () => {
    const documentName = useSelector(state => state.contentReducer.documentName);

    return (
        <DashboardLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <ContentListToolbar documentName={documentName} />
                    <Box sx={{ mt: 3 }}>
                        <ContentListResults />
                    </Box>
                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default TranslateHystoryPage;
