import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { Link } from '../components/primitives/Link.styles';

const NotFoundPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Page Not Found | Aqueduct';
    });
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        404:
                    </GradientTypography>
                    &nbsp;Page Not Found
                </Typography>

                <Typography variant="h5" my={5}>
                    It looks like we got a little lost.&nbsp;
                    <Link href="/">Head back home!</Link>
                </Typography>
            </Box>
        </Layout>
    );
};

export default NotFoundPage;
