import { Box,  Paper,  Typography } from '@mui/material';
import React from 'react';
import Layout from '../primitives/Layout';
import GradientTypography from '../primitives/GradientTypography.styles';
import { Link } from '../primitives/Link.styles';
import { gray } from '@radix-ui/colors';
import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook, faLock } from '@fortawesome/free-solid-svg-icons';

const ProductPage: React.FC = () => {
    return (
        <Layout>
            <Typography variant="h2" fontWeight="bold" textAlign="center">Untangle the</Typography>
            <GradientTypography variant="h2" fontWeight="bold" textAlign="center">MLOps Knot</GradientTypography>

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

            <Box mt={6}>
                {/*TODO(vikram): make this reactive.*/}
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto', justifyContent: 'center'}}>
                    <Typography variant="h3" fontWeight="bold" textAlign="center" mr={2}>Aqueduct:</Typography>
                    <GradientTypography variant="h3" fontWeight="bold" textAlign="center">Virtualized ML Infrasrtucture</GradientTypography>
                </Box>

                <Box mx="auto" display="flex" justifyContent="center" alignItems="center" my={4}>
                    <GradientButton variant="contained" sx={{ fontSize: '20px'}}>
                        <Box mr={1}>
                            <FontAwesomeIcon icon={faGithub} />
                        </Box>
                        Try Aqueduct
                    </GradientButton>
                    
                    <GradientButton variant="outlined" sx={{ fontSize: '20px', ml: 2 }}>
                        <Box mr={1}>
                            <FontAwesomeIcon icon={faBook} color={theme.palette.logo.medium} />
                        </Box>
                        Read the Docs
                    </GradientButton>
                </Box>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 4,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Box width="65%" mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">From Dev to Production with Python</Typography>

                        <Typography variant="body1">
                            Aqueduct enables you to move pipelines from development to production quickly and easily.
                            You can define pipelines in concise Python code instead of having to write lengthy YAML
                            configs or repetitive Dockerfiles. Aqueduct also automatically captures and recreates your environment
                            (Python version, library dependencies, etc.) in the cloud, so you don&apos;t have to spend
                            time debugging configuration issues or library version mismatches.
                        </Typography>
                    </Box> 

                    <Box flex={1} display="flex" justifyContent="center">
                        <img src="/dev-to-production.png" height="125px" />
                    </Box>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 4,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Box flex={1} display="flex" justifyContent="center">
                        <img src="/run-on-your-infrastructure.png" height="150px" />
                    </Box>
                    <Box width="65%" mr={3}>
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
                        my: 4,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Box width="65%" mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">Deep Visibility into Pipeline Metadata</Typography>

                        <Typography variant="body1">
                            Once pipelines are in production, you need visibility into what pipelines are running and 
                            whether they are performing as anticipated. Aqueduct automatically captures and versions 
                            code and data at each step of the pipeline which helps ensure accuracy and speed up debugging. 
                            Aqueduct also enables you to define metrics and checks that measure and validate your pipelines, 
                            so you can have peace of mind knowing that you have complete control.
                        </Typography>
                    </Box>
                    <Box flex={1} display="flex" justifyContent="center">
                        <img src="/deep-visibility.png" height="150px" />
                    </Box>
                </Paper>

                <Paper 
                    elevation={3} 
                    sx={{ 
                        borderRadius: 1, 
                        p: 3, 
                        my: 4,
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Box flex={1} display="flex" justifyContent="center">
                        <img src="/your-data-your-cloud.png" height="150px" />
                    </Box>
                    <Box width="65%" mr={3}>
                        <Typography color={gray.gray8} mb={1} variant="h6">Your data, secure in your cloud</Typography>

                        <Typography variant="body1">
                            With Aqueduct&apos;s open-source orchestration layer, you can be confident that all your 
                            code and data remain within your cloud. Furthermore, Aqueduct automates credential management 
                            by providing a unified way to access sensitive keys instead of having them scattered around in your code.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Layout>
    );
};

export default ProductPage;