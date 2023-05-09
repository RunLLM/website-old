import { Box, Link, Paper, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../styles/theme';

import CommunityButton from '../components/buttons/CommunityButton';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';

const CaseStudiesPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Case Studies | Aqueduct';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box sx={{ mx: 'auto', textAlign: 'center', flex: 1, maxWidth: '1000px' }}>
                <GradientTypography variant="h2" fontWeight="bold">
                    Case Studies
                </GradientTypography>

                <Typography variant="h6" color={gray.gray8} my={2}>
                    See how Aqueduct helps modern ML teams deploy and manage machine learning workloads on their existing
                    infrastructure.
                </Typography>


                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: '4px',
                        p: 3,
                        background: theme.palette.gray.darkGrayOffset,
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5" component="h2" fontWeight="bold" color="white">
                        ML engineer at leading security firm deploys pipelines&nbsp;
                        <GradientTypography variant="h5" component="span" display="inline" fontWeight="bold">
                            6x faster with Aqueduct
                        </GradientTypography>
                    </Typography>

                    <Typography variant="body1" color={gray.gray6} my={2}>
                        A leading global security firm uses machine learning to pinpoint friction points in their 
                        customer experience and improve customer interactions. With their previous cloud infrastructure,
                        building was slow, cumbersome, and opaque. With Aqueduct, they are able to efficiently deploy 
                        multiple machine learning pipelines with confidence and ensure quality on an ongoing basis.
                    </Typography>

                    <Box width="fit-content">
                        <Link href={'/customers/security-firm'} sx={{ textDecoration: 'none' }}>
                            <GradientTypography
                                variant="h6"
                                mr={3}
                                sx={{
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                Read More →
                            </GradientTypography>
                        </Link>
                    </Box>
                </Paper>
                
                <Box my={6}>
                    <Typography variant="h5" color={gray.gray6} mb={2} fontWeight="bold">
                        More coming soon! Join the conversation to learn more about Aqueduct.
                    </Typography>
                    <CommunityButton variant="contained" />
                </Box>
            </Box>
        </Layout>
    );
};

export default CaseStudiesPage;
