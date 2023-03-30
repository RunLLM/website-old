import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React from 'react';

import { theme } from '../styles/theme';
import GradientTypography from './primitives/GradientTypography.styles';

type FeatureCardProps = {
    heading: string;
    content: string;
    link?: string;
    isMobile: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ heading, content, isMobile, link = null }) => {
    return (
        // This is a little bit of a hack because we're hardcoding a margin of 2 = 16px.
        <Grid item xs={isMobile ? 12 : 4} display="flex" flexDirection="column">
            <Paper
                elevation={4}
                sx={{
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                    p: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <GradientTypography variant="h5" fontWeight="bold" mb={1}>
                    {heading}
                </GradientTypography>

                <Box flex={1}>
                    <Typography variant="body1" color="white">
                        {content}
                    </Typography>
                </Box>

                <Link
                    mt={2}
                    href={link ?? '#'}
                    color={gray.gray9}
                    sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}
                >
                    Learn More →
                </Link>
            </Paper>
        </Grid>
    );
};

type FeatureOverviewProps = {
    isMobile: boolean;
};

const FeatureOverview: React.FC<FeatureOverviewProps> = ({ isMobile }) => {
    return (
        <Box>
            <Box textAlign="center">
                <Typography component="span" variant="h3" fontWeight="bold" display="inline">
                    Infrastructure built for&nbsp;
                </Typography>
                <GradientTypography variant="h3" fontWeight="bold" display="inline">
                    modern ML teams
                </GradientTypography>
            </Box>

            <Grid container my={5} spacing={4} alignItems="stretch" direction="row">
                <FeatureCard
                    isMobile={isMobile}
                    heading="Python-native workflows"
                    content="Define your workflows in vanilla Python &mdash; no more YAML configs, Dockerfiles, or DSLs to worry about."
                    link="https://docs.aqueducthq.com/operators/creating-a-python-operator"
                />

                <FeatureCard
                    isMobile={isMobile}
                    heading="Integrated with your cloud"
                    content="Aqueduct workflows can run on any cloud infrastructure you already use &mdash; choose from Kubernetes, Spark, Airflow, Lambda, or Databricks."
                    link="https://docs.aqueducthq.com/integrations/using-integrations/compute-integrations"
                />

                <FeatureCard
                    isMobile={isMobile}
                    heading="Deep visibility into data & code"
                    content="Regardless of where your code is running, Aqueduct captures the code and data at every stage, so you know what ran and when it ran."
                    link="/product#deep-visbility"
                />

                <FeatureCard
                    isMobile={isMobile}
                    heading="Customizable metrics & checks"
                    content="Metrics and checks mean you can measure your ML pipelines, know when things are headed in the wrong direction, and act quickly."
                    link="https://docs.aqueducthq.com/metrics-and-checks"
                />

                <FeatureCard
                    isMobile={isMobile}
                    heading="Easy to debug"
                    content="Every function run has error logs and stack traces, so you can pinpoint errors quickly."
                    link="https://docs.aqueducthq.com/guides/debugging-a-failed-workflow"
                />

                <FeatureCard
                    isMobile={isMobile}
                    heading="Runs securely in your cloud"
                    content="Aqueduct is fully open-source, so you can be sure your code and data is always where it's supposed to be."
                    link="/product#your-data-your-cloud"
                />
            </Grid>
        </Box>
    );
};

export default FeatureOverview;
