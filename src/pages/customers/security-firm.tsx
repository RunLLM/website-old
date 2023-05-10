import { Box, Grid, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import GradientTypography from '../../components/primitives/GradientTypography.styles';
import Layout from '../../components/primitives/Layout';
import { theme } from '../../styles/theme';

const SecurityFirmCaseStudyPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Leading security firm deploys pipelines 6x faster | Aqueduct';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box
                width="100%"
                sx={{
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                    py: 3,
                    borderRadius: '8px',
                    textAlign: 'start',
                }}
            >
                <Box mx={3}>
                    <Typography variant="h3" component="h2" fontWeight="bold" color="white">
                        ML engineer at leading security firm deploys pipelines&nbsp;
                        <GradientTypography variant="h3" component="span" display="inline" fontWeight="bold">
                            6x faster with Aqueduct
                        </GradientTypography>
                    </Typography>

                    <Typography variant="body1" color={gray.gray6} my={2} fontSize="18px">
                        A leading global security firm uses machine learning to pinpoint friction points in their
                        customer experience and improve customer interactions. With their previous cloud infrastructure,
                        building was slow, cumbersome, and opaque. With Aqueduct, they are able to efficiently deploy
                        multiple machine learning pipelines with confidence and ensure quality on an ongoing basis.
                    </Typography>
                </Box>
            </Box>

            <Box my={4}>
                <Box width="fit-content" mb={4}>
                    <GradientTypography variant="h4" fontWeight="bold">
                        Background
                    </GradientTypography>
                </Box>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    Jack Reynolds is a machine learning engineer at a leading global security firm. The company helps
                    their customers safeguard buildings and other physical spaces to help keep people, products, and
                    facilities secure. Their clients range from global corporations and large-scale data centers to
                    local businesses.
                </Typography>

                <Typography variant="body1" color={gray.gray6}>
                    Across the wide variety of customers they serve, Jack&apos;s company aims to optimize customer
                    experience by understanding where its products and services need the most attention. To do this at
                    scale, they use many natural language processing techniques (speech-to-text, sentiment analysis,
                    keyword detection, summarization) across their customer interactions.
                </Typography>
            </Box>

            <Box my={4}>
                <Box width="fit-content" mb={4}>
                    <GradientTypography variant="h4" fontWeight="bold">
                        Motivation
                    </GradientTypography>
                </Box>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    Jack&apos;s team runs exclusively on Google Cloud Platform. As is common, every ML workload they run
                    links together multiple stages — loading data, cleaning and featurizing it, generating predictions,
                    post-processing and sanity-checking them, publishing, and so on.
                </Typography>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    Prior to adopting Aqueduct, Jack was forced to string together many different cloud services to run
                    each ML pipeline &mdash; each pipeline required customer configuration to handle storage,
                    scheduling, asynchronous execution, and distribution. Each stage was deployed as a separate function
                    on Google Cloud Functions.
                </Typography>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    Within this web of services, execution needed to be pipelined through asynchronous queues. With many
                    opaque services strung together this was the best way to make sure the majority of the data was
                    processed.
                </Typography>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    If and when anything broke in this pipeline — e.g., an expired API token or an unexpected data point
                    &mdash; the whole pipeline would fail, and Jack would have little to no context around what failed
                    or why. Even finding out where the pipeline broke was painful because it required digging through
                    multiple services&apos; logs to find the failure point.
                </Typography>
            </Box>

            <Box my={4}>
                <Box width="fit-content" mb={4}>
                    <GradientTypography variant="h4" fontWeight="bold">
                        Why Aqueduct?
                    </GradientTypography>
                </Box>

                <Typography variant="body1" color={gray.gray6} mb={2}>
                    Jack needed a tool that would enable him to move faster and more effectively while enabling him to
                    maintain his organization&apos;s extremely strict security requirements. Aqueduct&apos;s simple API
                    and deep visibility caught Jack&apos;s eye, and the open-source model enabled him to get started
                    quickly. Aqueduct&apos;s simple setup process enabled Jack to have things running on a Google
                    Compute Engine VM and connected to BigQuery; this gave him confidence that Aqueduct was a good
                    choice.
                </Typography>

                <Grid container>
                    <Grid item xs={isMobile ? 12 : 6} mb={3}>
                        <GradientTypography variant="h6" fontWeight="bold" mb="4px" width="fit-content">
                            Secure
                        </GradientTypography>

                        <Typography variant="body1" color={gray.gray6}>
                            Open-source and runs in your cloud
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 6} mb={3}>
                        <GradientTypography variant="h6" fontWeight="bold" mb="4px" width="fit-content">
                            Fully visible
                        </GradientTypography>

                        <Typography variant="body1" color={gray.gray6}>
                            Understand whether workflows are working or how they’ve failed
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 6} mb={3}>
                        <GradientTypography variant="h6" fontWeight="bold" mb="4px" width="fit-content">
                            Collaborative
                        </GradientTypography>

                        <Typography variant="body1" color={gray.gray6}>
                            Being able to show his work off to his team
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 6} mb={3}>
                        <GradientTypography variant="h6" fontWeight="bold" mb="4px" width="fit-content">
                            Intuitive
                        </GradientTypography>

                        <Typography variant="body1" color={gray.gray6}>
                            The API was easy to pick up and implement
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 6} mb={3}>
                        <GradientTypography variant="h6" fontWeight="bold" mb="4px" width="fit-content">
                            Measurable
                        </GradientTypography>

                        <Typography variant="body1" color={gray.gray6}>
                            Have confidence at a glance with metrics &amp; checks
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box my={4}>
                <Box width="fit-content" mb={4}>
                    <GradientTypography variant="h4" fontWeight="bold">
                        Results
                    </GradientTypography>

                    <Typography variant="body1" color={gray.gray6} mb={2}>
                        The ability to quickly develop and test pipelines &mdash; combined with the visibility into
                        pipeline execution and errors Aqueduct provides — convinced Jack to move into production.Within
                        a couple of weeks, Jack was comfortable with Aqueduct, and{' '}
                        <b>
                            he was able to reduce the time needed to build, test, and deploy new ML pipelines from 4-6
                            weeks to 1 week
                        </b>
                        .
                    </Typography>

                    <Typography variant="body1" color={gray.gray6} mb={2}>
                        With Aqueduct, the biggest performance gain was from processing one data point at a time through
                        a microservice queue to batch processing the full dataset; this also simplified Jack&apos;s
                        code.
                    </Typography>

                    <Typography variant="body1" color={gray.gray6} mb={2}>
                        Today, with workflows running on Aqueduct, Jack saves about an hour of his time every day.
                        Previously, he would be spending his time picking through each workflow to ensure it worked as
                        expected; now, at a glance, Aqueduct gives him confidence that all his pipelines are working.
                    </Typography>

                    <Typography variant="body1" color={gray.gray6} mb={2}>
                        As his company expands globally, Jack plans to support geographic constraints by building many
                        lightweight, easily configurable, and region-specific workflows on Aqueduct. Across all these
                        workflows, he gets the same visibility and confidence that everything works as expected.
                    </Typography>
                </Box>
            </Box>
        </Layout>
    );
};

export default SecurityFirmCaseStudyPage;
