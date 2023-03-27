import { faBuilding, faCircleUser, faCodeMerge, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Divider, Link, Paper, Typography } from '@mui/material';
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
                {isMobile && <br />}
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
                    <GradientTypography variant="h5" fontWeight="bold" mb={isMobile ? 1 : 2}>
                        <Box mr={2} display="inline">
                            <FontAwesomeIcon icon={faCodeMerge} color={theme.palette.logo.medium} />
                        </Box>
                        Open Source
                    </GradientTypography>

                    <Divider
                        sx={{
                            borderColor: gray.gray12,
                            mx: isMobile ? '-8px' : '-24px',
                            my: 0,
                            py: 0,
                            borderWidth: '2px',
                        }}
                    />

                    <Box my={1}>
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

                        <Box color={gray.gray6} fontSize="24px" my={3} fontWeight="bold">
                            Forever free to use
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
                        ml: isMobile ? 0 : 5,
                        mt: isMobile ? 3 : 0,
                    }}
                >
                    <GradientTypography variant="h5" fontWeight="bold" mb={isMobile ? 1 : 2}>
                        <Box mr={2} display="inline">
                            <FontAwesomeIcon icon={faBuilding} color={theme.palette.logo.medium} />
                        </Box>
                        Enterprise Edition
                    </GradientTypography>

                    <Divider
                        sx={{
                            borderColor: gray.gray12,
                            mx: isMobile ? '-8px' : '-24px',
                            my: 0,
                            py: 0,
                            borderWidth: '2px',
                        }}
                    />

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

                        <Box color={gray.gray6} fontSize="24px" my={3} fontWeight="bold">
                            Customized pricing
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

            <Box mt={4}>
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default PricingPage;
