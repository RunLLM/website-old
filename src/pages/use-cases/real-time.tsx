import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

import TryButton from '../../components/buttons/TryButton';
import FeedbackButton from '../../components/buttons/FeedbackButton';
import GradientTypography from '../../components/primitives/GradientTypography.styles';
import Layout from '../../components/primitives/Layout';
import { gray } from '@radix-ui/colors';
import CommunityButton from '../../components/buttons/CommunityButton';
import EmailSignup from '../../components/EmailSignup';

const RealTimePage: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        Real-Time Inference
                    </GradientTypography>
                    &nbsp;with Aqueduct
                </Typography>

                <Typography variant="h5" mt={3}>
                    Create REST endpoints to serve your models scalably and in your cloud.
                </Typography>

                <Box flex={1} mt={isMobile ? 6 : 10}>
                    <Box
                        display="flex"
                        flexDirection={isMobile ? 'column' : 'row'}
                        alignItems="center"
                        alignSelf="center"
                        mx="auto"
                        width="fit-content"
                    >
                        <TryButton variant="contained" />

                        <Box ml={isMobile ? 0 : 2} mt={isMobile ? 2 : 0}>
                            <FeedbackButton variant="outlined" />
                        </Box>
                    </Box>
                </Box>

                <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center" maxWidth="800px">
                    <Typography variant="body1" color={gray.gray6} fontSize="20px">
                        We&apos;re working on building support for real-time prediction serving
                        in Aqueduct. If you're interested in discussing the details further, please join
                        our community Slack to participate in the discussion.
                    </Typography>

                    <Box my={4}>
                        <CommunityButton variant="outlined" />
                    </Box>
                </Box>

                <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center" maxWidth="800px">
                    <EmailSignup isMobile={isMobile} />
                </Box>
            </Box>
        </Layout>
    );
};

export default RealTimePage;
