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

const ModelTrainingPage: React.FC = () => {
    navigate("/404");
    return null;

    useEffect(() => {
        document.title = 'Model Training | Aqueduct';
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        Model Training
                    </GradientTypography>
                    &nbsp;with Aqueduct
                </Typography>

                <Typography variant="h5" mt={3}>
                    Keep your existing infrastructure. Use Aqueduct to build better models seamlessly.
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
                        Your models, your data,&nbsp;
                        <GradientTypography display="inline" variant="h3" component="span" fontWeight="bold">
                            your cloud
                        </GradientTypography>
                        .
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
                        With Aqueduct, you build model training pipelines in minutes rather than weeks or months.
                        Aqueduct comes prepackaged with{' '}
                        <Link href="/resources">connectors to most common data systems</Link>, so you can pull data into
                        your pipelines, clean and featurize it, and train models easily.
                        <br />
                        <br />
                        Your pipelines can be run on any cloud infrastructure you use &mdash; Kubernetes, Spark,
                        Airflow, etc. &mdash; and you can validate the quality of your models on every run with&nbsp;
                        <Link href="https://docs.aqueducthq.com/metrics-and-checks">metrics &amp; checks</Link>.
                    </Typography>

                    <Box my={4}>
                        <UseCaseExampleButton
                            exampleLink="https://docs.aqueducthq.com/example-workflows/wine-ratings-predictor"
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

export default ModelTrainingPage;
