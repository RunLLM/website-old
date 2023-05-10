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

const BatchInferencePage: React.FC = () => {
    useEffect(() => {
        document.title = 'Batch Inference | Aqueduct';
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        Batch Inference
                    </GradientTypography>
                    {isMobile ? <br /> : <span>&nbsp;</span>}
                    with Aqueduct
                </Typography>

                <Typography variant="h5" mt={3}>
                    Generate predictions, publish them anywhere, and have confidence that your models work as expected.
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
                        Scalable prediction pipelines&nbsp;
                        <GradientTypography display="inline" variant="h3" component="span" fontWeight="bold">
                            you can trust
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
                        With Aqueduct, you can construct prediction pipelines as compositions of simple Python
                        functions. Pull data in from <Link href="/resources">one or more data sources</Link>, generate
                        predictions, and validate them &mdash; all in vanilla Python.
                        <br />
                        <br />
                        Once your pipelines are defined, you can run them anywhere &mdash; on your laptop or in the
                        cloud &mdash; without changing any code. No need to learn any new DSLs or write any YAML
                        configs.
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

export default BatchInferencePage;
