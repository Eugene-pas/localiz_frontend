import { Box, Container } from '@mui/material';
import { HistoryListResults } from '../../components/translate/history-list-results';
import { HistoryListToolbar } from '../../components/translate/history-list-toolbar';
import { DashboardLayout } from '../../components/dashboard/index';
import { useSelector } from 'react-redux';

const TranslateHystoryPage = () => {
    const documentName = useSelector(state => state.historyReducer.documentName);

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
                    <HistoryListToolbar documentName={documentName} />
                    <Box sx={{ mt: 3 }}>
                        <HistoryListResults />
                    </Box>
                </Container>
            </Box>
        </DashboardLayout>
    );
}

export default TranslateHystoryPage;
