import { Box,  Grid, Paper,  Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../components/primitives/Layout';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import { Link } from '../components/primitives/Link.styles';
import { gray } from '@radix-ui/colors';
import { theme } from '../styles/theme';
import GradientButton from '../components/primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import EmailSignup from '../components/EmailSignup';
import { useMediaQuery } from 'react-responsive'

const ProductPage: React.FC = () => {
    useEffect(() => {
        document.title = "Why Aqueduct?"
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    
    return (
        <Layout isMobile={isMobile}>
            <Typography variant="h2" fontWeight="bold" textAlign="center" component="h1">
                Untangle the&nbsp;
                <GradientTypography variant="h2" fontWeight="bold" display="inline">MLOps Knot</GradientTypography>
            </Typography>

            <Box mt={4} sx={{ maxWidth: '800px', textAlign: 'center', mx: 'auto' }}>
                <Typography variant="body1" color="white" my={2}>
                    MLOps is a tangled mess of infrastructure, where every system has bespoke APIs and assumptions. 
                    The <Link href="https://www.aqueducthq.com/post/the-mlops-knot">MLOps Knot</Link>{' '}
                    is a nightmare to maintain and to add new tools into. Worst yet, the lack of proper 
                    sharing of code, data and metadata among these systems means teams are unable to keep 
                    track of what code is running, where it's running, or if it&apos;s functioning as expected.
                </Typography>

                <Typography variant="body1" color="white">
                    This leads to delays in development cycles and wasted resources, ultimately making it 
                    hard for businesses to deliver on the value of machine learning.
                </Typography>
            </Box>

            <Box mt={10}>
                <Box sx={{ mx: 'auto', justifyContent: 'center'}}>

                    <Typography component="h2" variant="h3" fontWeight="bold" textAlign="center">
                        Aqueduct:&nbsp;
                        {isMobile && <br />}
                        <GradientTypography
                            component="span"
                            variant="h3"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            Virtualized ML Infrastructure
                        </GradientTypography>
                    </Typography>
                </Box>

                <Box mx="auto" display="flex" justifyContent="center" alignItems="center" my={8} flexDirection={isMobile ? "column" : "row"}>
                    <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }}>
                        <GradientButton variant="contained" sx={{ fontSize: '20px' }}>
                            <Box mr={1}>
                                <FontAwesomeIcon icon={faGithub} />
                            </Box>
                            Try Aqueduct
                        </GradientButton>
                    </Link>
                    
                    <Link href="https://docs.aqueducthq.com" sx={{ textDecoration: 'none' }}>
                        <GradientButton variant="outlined" sx={{ fontSize: '20px', ml: isMobile ? 0 : 2, mt: isMobile ? 2 : 0 }}>
                            <Box mr={1}>
                                <FontAwesomeIcon icon={faBook} color={theme.palette.logo.medium} />
                            </Box>
                            Read the Docs
                        </GradientButton>
                    </Link>
                </Box>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 5,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row-reverse',
                        alignItems: 'center'
                    }}
                    id="dev-to-production"
                >
                    <Box flex={1} display="flex" justifyContent="center" mb={isMobile ? 2 : 0}>
                        <img src="/product/dev-to-production.png" height={isMobile ? '' : "125px"} width={isMobile ? '100%' : ''} alt="" />
                    </Box>

                    <Box width={isMobile? "100%" : "65%"} mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">From Dev to Production with Python</Typography>

                        <Typography variant="body1">
                            Aqueduct enables you to move pipelines from development to production quickly and easily.
                            You can define pipelines in concise Python code instead of having to write lengthy YAML
                            configs or repetitive Dockerfiles. Aqueduct also automatically captures and recreates your environment
                            (Python version, library dependencies, etc.) in the cloud, so you don&apos;t have to spend
                            time debugging configuration issues or library version mismatches.
                        </Typography>
                    </Box> 
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 5,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center'
                    }}
                    id="on-your-existing-infrastructure"
                >
                    <Box flex={1} display="flex" justifyContent="center" mb={isMobile ? 2 : 0}>
                        <img src="/product/run-on-your-infrastructure.png" height="150px" alt="" />
                    </Box>
                    
                    <Box width={isMobile? "100%" : "65%"} mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">Run Seamlessly on your Existing Infrastructure</Typography>

                        <Typography variant="body1">
                            Forget having to fiddle with tedious cloud configuration settings and spending days trying 
                            to figure out how to deploy on Kubernetes clusters, AWS Lambda functions, or Apache Spark 
                            clusters — Aqueduct does the hard work for you. By automatically translating your pipeline 
                            code into the appropriate format and taking care of the deployment and orchestration, 
                            Aqueduct streamlines infrastructure management so you can focus on doing what matters most: 
                            building state-of-the-art machine learning models.
                        </Typography>
                    </Box>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 5,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row-reverse',
                        alignItems: 'center'
                    }}
                    id="deep-visbility"
                >
                    <Box flex={1} display="flex" justifyContent="center" mb={isMobile ? 2 : 0}>
                        <img src="/product/deep-visibility.png" height="150px" alt="" />
                    </Box>

                    <Box width={isMobile? "100%" : "65%"} mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">Deep Visibility into Pipeline Metadata</Typography>

                        <Typography variant="body1">
                            Once pipelines are in production, you need visibility into what pipelines are running and 
                            whether they are performing as anticipated. Aqueduct automatically captures and versions 
                            code and data at each step of the pipeline which helps ensure accuracy and speed up debugging. 
                            Aqueduct also enables you to define metrics and checks that continuously measure and validate 
                            your pipelines, so you can have peace of mind knowing that you have complete control.
                        </Typography>
                    </Box>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 5,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center'
                    }}
                    id="your-data-your-cloud"
                >
                    <Box flex={1} display="flex" justifyContent="center" mb={isMobile ? 2 : 0}>
                        <img src="/product/your-data-your-cloud.png" height="150px" alt="" />
                    </Box>

                    <Box width={isMobile? "100%" : "65%"} mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">Your data, secure in your cloud</Typography>

                        <Typography variant="body1">
                            With Aqueduct&apos;s open-source orchestration layer, you can be confident that all your 
                            code and data remain within your cloud. Furthermore, Aqueduct automates credential management 
                            by providing a unified way to access sensitive keys instead of having them scattered around in your code.
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            <Box my={isMobile ? 6 : 10}>
                <Typography variant="h4" component="h4" textAlign="center">
                    <GradientTypography variant="h4" fontWeight="bold" textAlign="center" component="span">
                        Coming Soon
                    </GradientTypography>
                </Typography>

                <Grid container spacing={5} mt={3}> 
                    <Grid item xs={isMobile ? 12 : 4}>
                        <Typography variant="h5">On-demand compute integrations</Typography>

                        <Typography variant="body1" color={gray.gray8} mt={1}>
                            Use Aqueduct to create cloud resources on the fly. 
                            Get access to Kubernetes and Spark clusters when you need them &mdash; in your cloud!
                        </Typography>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 4}>
                        <Typography variant="h5">Dynamic DAGs</Typography>

                        <Typography variant="body1" color={gray.gray8} mt={1}>
                            Construct workflows that define their task graph at execution time for highly 
                            scalable tasks like hyperparameter search. 
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={isMobile ? 12 : 4}>
                        <Typography variant="h5">Real-time prediction serving</Typography>

                        <Typography variant="body1" color={gray.gray8} mt={1}>
                            Deploy your models to easily-managed, highly-scalable REST endpoints 
                            in your cloud.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
      
            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default ProductPage;