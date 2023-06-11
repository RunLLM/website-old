import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import FeedbackButton from '../../components/buttons/FeedbackButton';
import TryButton from '../../components/buttons/TryButton';
import UseCaseExampleButton from '../../components/buttons/UseCaseExampleButton';
import EmailSignup from '../../components/EmailSignup';
import FeatureOverview from '../../components/FeatureOverview';
import GradientTypography from '../../components/primitives/GradientTypography.styles';
import Layout from '../../components/primitives/Layout';
import { Link } from '../../components/primitives/Link.styles';
import Quotes from '../../components/Quotes';
import { navigate } from 'gatsby';

const FeaturePipelinesPage: React.FC = () => {
    navigate("/404");
    return null;

    useEffect(() => {
        document.title = 'Feature Pipelines | Aqueduct';
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        Feature Pipelines
                    </GradientTypography>
                    &nbsp;on Aqueduct
                </Typography>

                <Typography variant="h5" mt={3}>
                    Build features that your whole team can use, and share them on your existing infrastructure.
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

                <Box mt={isMobile ? 6 : 10}>
                    <Typography variant="h3" component="h2" fontWeight="bold">
                        <GradientTypography display="inline" variant="h3" component="span" fontWeight="bold">
                            Flexible, repeatable{isMobile ? <br /> : <span>&nbsp;</span>}
                        </GradientTypography>
                        feature pipelines.
                    </Typography>

                    <Typography
                        variant="body1"
                        color={gray.gray6}
                        mt={3}
                        textAlign="center"
                        fontSize="18px"
                        maxWidth="800px"
                        mx="auto"
                    >
                        Highly-collaaborative teams require shared abstractions to share features, but modern feature
                        stores are often overkill. With Aqueduct, you can define shared, repeatable feature pipelines in
                        vanilla Python code and publish your features in&nbsp;
                        <Link href="/resources">any database</Link>.
                        <br />
                        <br />
                        Your <Link href="/use-cases/training">model training</Link> or&nbsp;
                        <Link href="/use-cases/batch-inference">inference</Link> pipelines can seamlessly reuse these
                        features from any databasea and on any cloud infrastructure.
                    </Typography>

                    <Box my={4}>
                        <UseCaseExampleButton
                            exampleLink="https://docs.aqueducthq.com/example-workflows/customer-churn-predictor"
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <FeatureOverview isMobile={isMobile} />
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <Quotes isMobile={isMobile} />
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default FeaturePipelinesPage;
