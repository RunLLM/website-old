import React, { useEffect, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { gray } from '@radix-ui/colors';
import GradientButton from '../components/primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { useMediaQuery } from 'react-responsive'
import CommunityButton from '../components/buttons/CommunityButton';

const CaseStudiesPage: React.FC = () => {
    useEffect(() => {
        document.title = "Case Studies | Aqueduct"
    });
    
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Layout isMobile={isMobile}>
            <Box sx={{ mx: 'auto', textAlign: 'center', flex: 1,  }}>
                <GradientTypography variant="h2" fontWeight="bold">
                    Coming soon!
                </GradientTypography>

                <Typography variant="h6" color={gray.gray8} my={2}>
                    We're working hard on putting together some user case studies.
                    Please hold tight, and we'll have something for you soon!
                </Typography>
                
                <Typography variant="h6" color={gray.gray8} my={2}>
                    In the meantime, please join our Slack community to join the discussion!
                </Typography>

                <Box my={3}>
                    <CommunityButton variant="contained" />
                </Box> 
            </Box>
        </Layout>
    )
};

export default CaseStudiesPage;