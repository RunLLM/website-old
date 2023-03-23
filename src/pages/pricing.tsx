import { faCircleUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Link, Paper, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import InstallButton from '../components/buttons/InstallButton';
import EmailSignup from '../components/EmailSignup';
import GradientButton from '../components/primitives/GradientButton.styles';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { theme } from '../styles/theme';

const PricingPage: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    useEffect(() => {
        document.title = 'Pricing | Aqueduct';
    });

    return (
        <Layout isMobile={isMobile}>
            <Typography variant="h2" component="h1" fontWeight="bold" textAlign="center">
                Forever&nbsp;
                <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                    open-source
                </GradientTypography>
            </Typography>

            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                mx="auto"
                my={6}
                width="100%"
                maxWidth="1000px"
            >
                <Paper
                    elevation={2}
                    sx={{
                        p: isMobile ? 1 : 3,
                        borderRadius: '8px',
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        flex: 1,
                        maxWidth: '500px',
                    }}
                >
                    <GradientTypography variant="h4" fontWeight="bold" mb={3}>
                        Open Source
                    </GradientTypography>

                    <Box my={3}>
                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Simple, Python-native workflow definition
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Comprehensive suite of cloud integrations
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Deep visibility into metrics and code
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Customizable metrics and checks
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Community supported
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright1} />
                            <Typography ml={2} fontSize="20px">
                                Forever free to use
                            </Typography>
                        </Box>
                    </Box>

                    <Box mt={4}>
                        <InstallButton variant="contained" fontSize="20px" />
                    </Box>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        p: isMobile ? 1 : 3,
                        borderRadius: '8px',
                        backgroundColor: theme.palette.gray.darkGrayOffset,
                        flex: 1,
                        maxWidth: '500px',
                        ml: 5,
                    }}
                >
                    <GradientTypography variant="h4" fontWeight="bold" mb={3}>
                        Enterprise Edition
                    </GradientTypography>

                    <Box my={3}>
                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Full suite of open-source features
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Fully supported implementation process
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Access to advanced resource integrations
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Custom environment-specific connectors
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Enterprise-level support
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" color={gray.gray6} fontSize="20px" my={3}>
                            <FontAwesomeIcon icon={faPlus} color={theme.palette.logo.bright2} />
                            <Typography ml={2} fontSize="20px">
                                Custom pricing
                            </Typography>
                        </Box>
                    </Box>

                    <Box mt={4}>
                        <Link href="mailto:hello@aqueducthq.com" sx={{ textDecoration: 'none' }}>
                            <GradientButton sx={{ px: 3, py: 1, fontSize: '20px' }} variant="contained">
                                <FontAwesomeIcon icon={faCircleUser} />
                                <Box ml={1}>Contact Sales →</Box>
                            </GradientButton>
                        </Link>
                    </Box>
                </Paper>
            </Box>

            <EmailSignup isMobile={isMobile} />
        </Layout>
    );
};

export default PricingPage;
