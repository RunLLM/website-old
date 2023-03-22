import Prism from 'prismjs'; // eslint-disable-line

import React, { useEffect } from "react";
import Layout from "../components/primitives/Layout";
import { useMediaQuery } from "react-responsive";
import GradientTypography from "../components/primitives/GradientTypography.styles";
import { Box, Paper, Typography } from "@mui/material";
import { gray } from "@radix-ui/colors";
import { theme } from "../styles/theme";
import GradientButton from "../components/primitives/GradientButton.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCloud, faLaptop } from "@fortawesome/free-solid-svg-icons";
import 'prismjs/components/prism-bash';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import EmailSignup from '../components/EmailSignup';
import SandboxButton from '../components/buttons/SandboxButton';
import InstallButton from '../components/buttons/InstallButton';

const TryPage: React.FC = () => {
    useEffect(() => {
        document.title = "Getting Started | Aqueduct";
    });
    
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    return (
        <Layout isMobile={isMobile}>
            <GradientTypography component="h1" variant="h2" fontWeight="bold" textAlign="center">
                Get started with Aqueduct
            </GradientTypography>

            <Typography color={gray.gray2} variant="h6" textAlign="center" maxWidth="800px" mx="auto" mt={4}> 
                Aqueduct is fully open-source and free to use. See how you can use Aqueduct to seamlessly
                run machine learning tasks on any cloud infrastructure.
            </Typography>

            <Box my={6} maxWidth="1000px" width="100%" mx="auto">
                <Paper
                    elevation={2}
                    sx={{
                        background: theme.palette.gray.darkGrayOffset,
                        borderRadius: '8px',
                        p: 3,
                    }}
                >
                    <GradientTypography variant="h5" fontWeight="bold">
                        <FontAwesomeIcon icon={faGithub} color={theme.palette.logo.medium} />&nbsp;
                        Try the Aqueduct Sandbox
                    </GradientTypography>

                    <Typography color={gray.gray6} my={2}>
                        Spin up an Aqueduct server on GitHub Codespaces with a single click. 
                        GitHub Codespaces automatically creates a VM in the cloud for you, and 
                        you can have an Aqueduct server and Jupyter notebook running in 15 seconds.
                    </Typography>

                    <Box mt={4}>
                        <SandboxButton variant="contained" fontSize="20px" />
                    </Box>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        background: theme.palette.gray.darkGrayOffset,
                        borderRadius: '8px',
                        p: 3,
                        my: 6,
                    }}
                >
                    <GradientTypography variant="h5" fontWeight="bold">
                        <FontAwesomeIcon icon={faLaptop} color={theme.palette.logo.medium} />&nbsp;
                        Install Aqueduct anywhere
                    </GradientTypography>

                    <Typography color={gray.gray6} my={2}>
                        Aqueduct is <code>pip</code> package that can be run on any Unix system &mdash; on your laptop 
                        or in the cloud: 
                    </Typography>

                    <Box my={2}>
                        <pre>
                            <code className="language-bash">
                                {`pip3 install aqueduct-ml
aqueduct start`}
                            </code>
                        </pre>
                    </Box>

                    <Box mt={4}>
                        <InstallButton variant="contained" fontSize="20px" />
                    </Box>
                </Paper>
                
                <Paper
                    elevation={2}
                    sx={{
                        background: theme.palette.gray.darkGrayOffset,
                        borderRadius: '8px',
                        p: 3,
                        my: 4,
                    }}
                >
                    <GradientTypography variant="h5" fontWeight="bold">
                        <FontAwesomeIcon icon={faCloud} color={theme.palette.logo.medium} />&nbsp;
                        Join the waitlist
                    </GradientTypography>

                    <Typography color={gray.gray6} mt={2}>
                        We&apos;re hard at work building Aqueduct Cloud. Join the waitlist here:
                    </Typography>

                    <Box mt={1}>
                        <EmailSignup isMobile={isMobile} formName="Hosted Signup" includeTitle={false} align="start" />
                    </Box>
                </Paper>
            </Box>
        </Layout> 
    );
};

export default TryPage;