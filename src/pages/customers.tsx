import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { gray } from '@radix-ui/colors';
import GradientButton from '../components/primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

const CaseStudiesPage: React.FC = () => {
    useEffect(() => {
        document.title = "Case Studies | Aqueduct"
    });
    
    const [pageWidth, setPageWidth] = useState<number>(1440);
    useEffect(() => {
        window.addEventListener('resize', () => setPageWidth(window.innerWidth));

        setPageWidth(window.innerWidth);
    }, []);
    const isMobile = pageWidth < 768;

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

                <GradientButton variant="contained" sx={{ color: 'white', fontSize: '24px', my: 3 }}>
                    <Box mr={1}>
                        <FontAwesomeIcon icon={faSlack} />
                    </Box>

                    Join the Community
                </GradientButton>
            </Box>
        </Layout>
    )
};

export default CaseStudiesPage;