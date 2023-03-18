import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Layout from '../components/primitives/Layout';
import EmailSignup from '../components/EmailSignup';
import { useMediaQuery } from 'react-responsive'
import SingleElimination from '../components/march-madness/SingleElimination';

const MarchMadnessPage: React.FC = () => {
    useEffect(() => {
        document.title = "March Madness 2023"
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Layout isMobile={isMobile}>
            <Typography variant="h2" fontWeight="bold" textAlign="center" component="h1">
                March Madness 2023
            </Typography>

            <Box mt={4} sx={{ width: '100%', textAlign: 'center', mx: 'auto' }}>
                <SingleElimination />
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default MarchMadnessPage;