import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../components/primitives/Layout';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import { Link } from '../components/primitives/Link.styles';
import { gray } from '@radix-ui/colors';
import { theme } from '../styles/theme';
import GradientButton from '../components/primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import EmailSignup from '../components/EmailSignup';
import { useMediaQuery } from 'react-responsive'
import TryButton from '../components/buttons/TryButton';
import DocsButton from '../components/buttons/DocsButton';
import { SingleElimination } from './march-madness/SingleElimination';

const MarchMadnessPage: React.FC = () => {
    useEffect(() => {
        document.title = "March Madness 2023"
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Layout isMobile={isMobile}>
            <Typography variant="h2" fontWeight="bold" textAlign="center" component="h1">
                March Madness 2023
            </Typography>

            <Box mt={4} sx={{ maxWidth: '800px', textAlign: 'center', mx: 'auto' }}>
                <SingleElimination />
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default MarchMadnessPage;