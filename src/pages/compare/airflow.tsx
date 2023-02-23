import React, { useEffect } from 'react';
import Layout from '../../components/primitives/Layout';
import { useMediaQuery } from 'react-responsive';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import GradientTypography from '../../components/primitives/GradientTypography.styles'; 
import { Link } from '../../components/primitives/Link.styles';
import TryButton from '../../components/buttons/TryButton';
import CommunityButton from '../../components/buttons/CommunityButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin, faCircleCheck, faCircleXmark, faDatabase, faServer, faTable } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../styles/theme';
import { gray } from '@radix-ui/colors';
import FeaturesTable, { FeatureEntry } from '../../components/FeaturesTable';
import Quotes from '../../components/Quotes';
import GradientButton from '../../components/primitives/GradientButton.styles';

const features: FeatureEntry[] = [
    {
        name: "Simple, Python-Native API",
        aqueductHas: 'yes',
        competitorHas: 'no',
    },
    {
        name: "Automated data movement",
        aqueductHas: 'yes',
        competitorHas: 'no',
    },
    {
        name: "Open-source community",
        aqueductHas: "ongoing",
        competitorHas: "yes",
    },
    {
        name: "Data snapshots & versioning",
        aqueductHas: "yes",
        competitorHas: "no",
    },
    {
        name: "Custom metrics and checks",
        aqueductHas: "yes",
        competitorHas: "no",
    },
    {
        name: "Custom notifications",
        aqueductHas: "yes",
        competitorHas: "no",
    },
    {
        name: "Task orchestration",
        aqueductHas: "yes",
        competitorHas: "yes",
    },
];

const AirflowComparison: React.FC = () => {
    useEffect(() => {
        document.title = "Airflow Comparison | Aqueduct";
    });
  
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Layout isMobile={isMobile}>
            <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center">
                <Box 
                    flex={1} 
                    mr={isMobile ? 1 : 3} 
                    ml={isMobile ? 1 : 0}
                    textAlign={isMobile ? "center" : "left"}
                >
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        Airflow is not built for&nbsp;
                        <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                            machine learning
                        </GradientTypography>
                    </Typography>

                    <Typography variant="h6" mt={2}>
                        Airflow is not <Link href="/post/stop-using-airflow-for-data-science">
                        built for machine learning</Link>: It ignores data, exposes complex 
                        cloud infrastructure, and reduces the speed of iteration cycles. With Aqueduct, 
                        you can deploy ML workloads seamlessly and securely, without any data movement 
                        or infrastructure management.
                    </Typography>

                    <Box display="flex" flexDirection={isMobile ? 'column': 'row' } alignItems="center" mt={3}>
                        <TryButton variant="contained" fontSize='20px' />
                        <Box ml={isMobile ? 0 : 2} mt={isMobile ? 2 : 0}>
                            <CommunityButton variant="outlined" fontSize='20px' />
                        </Box>
                    </Box>
                </Box>

                <Box 
                    mx="auto" 
                    flex={1} 
                    mt={isMobile ? 2 : 0}
                    sx={{ 
                        borderRadius: '8px',
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        px: isMobile ? 1 : 2,
                        py: 1,
                    }}>
                    <img src="/compare/airflow/main.png" style={{ borderRadius: '8px' }} width="100%" />
                </Box>
            </Box>

            <Box my={isMobile ? 6 : 12} mx="auto">
                <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center">
                    Why&nbsp;
                    <GradientTypography variant="h3" component="span" display="inline" fontWeight="bold">
                        modern ML teams
                    </GradientTypography>
                    &nbsp;prefer Aqueduct
                </Typography>

                <Grid container direction="row" spacing={4} mt={4}>
                    <Grid item xs={isMobile ? 12 : 4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{ fontSize: '64px', color: theme.palette.logo.bright2 }}>
                            <FontAwesomeIcon icon={faDatabase} />
                        </Box>

                        <Typography variant="h4" my={1} textAlign="center">
                            Data-aware
                        </Typography>
                        <Typography textAlign="center" color={gray.gray8}>
                            Aqueduct automatically captures &amp; versions data at every stage of your
                            workflow. Aqueduct also abstracts away tedious data movement tasks between
                            different pieces of code.
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{ fontSize: '64px', color: theme.palette.logo.bright2 }}>
                            <FontAwesomeIcon icon={faServer} />
                        </Box>

                        <Typography variant="h4" my={1} textAlign="center">
                            Integrated with your cloud
                        </Typography>
                        <Typography textAlign="center" color={gray.gray8}>
                            Aqueduct natively integrates with cloud. You can load and save data from 
                            your storage systems and run code on team's compute engines &mdash; all from
                            a simple Python API.
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{ fontSize: '64px', color: theme.palette.logo.bright2 }}>
                            <FontAwesomeIcon icon={faArrowsSpin} />
                        </Box>

                        <Typography variant="h4" my={1} textAlign="center">
                            Built for fast iteration
                        </Typography>
                        <Typography textAlign="center" color={gray.gray8}>
                            Aqueduct's Python-native API allows you to build, test, and deploy ML pipelines
                            in your existing workflows. No more YAML configs, Dockerfiles, or 
                            infrastructure management.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" width="100%">
                <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center">
                    <GradientTypography variant="h3" component="span" display="inline" fontWeight="bold">
                        Aqueduct
                    </GradientTypography>
                    &nbsp;vs. Airflow
                </Typography>

                <Box mx="auto" my={3} maxWidth="800px">
                    <FeaturesTable
                        isMobile={isMobile}
                        features={features}
                        competitorHeader={
                            <img
                                src="/compare/airflow/airflow_full.png"
                                height={isMobile ? "25px" : "35px"}
                                alt="The Airflow logo."
                                style={{ filter: 'invert(100%) grayscale(100%)' }}
                            />
                        }
                    />
                </Box>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto">
                <Quotes isMobile={isMobile} />
            </Box>                

            <Box my={isMobile ? 6 : 10} mx="auto" display="flex" flexDirection="column" alignItems="center">
                <GradientTypography variant="h3" mb={3} fontWeight="bold" textAlign="center">
                    Try Aqueduct today
                </GradientTypography>

                <TryButton variant="outlined" fontSize="24px" />
            </Box>
        </Layout>
    );
};

export default AirflowComparison;