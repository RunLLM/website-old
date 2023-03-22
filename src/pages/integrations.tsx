import { Box, Grid, Paper, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import FeedbackButton from '../components/buttons/FeedbackButton';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { theme } from '../styles/theme';
import { ComputeIntegrations, DataIntegrations } from '../utils/integrations';

type IntegrationCardProps = {
    logoPath: string;
    name: string;
    description: string;
    comingSoon?: boolean;
    isMobile: boolean;
    invertLogo?: boolean;
    brightenLogo?: boolean;
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({
    logoPath,
    name,
    description,
    isMobile,
    comingSoon = false,
    invertLogo = false,
    brightenLogo = false,
}) => {
    return (
        <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 4}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                    borderRadius: '4px',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" minWidth="100px" mx={2}>
                    <img
                        src={logoPath}
                        height="80px"
                        style={{
                            opacity: comingSoon ? '0.5' : '1',
                            filter: invertLogo ? 'invert(100%) grayscale(100%)' : brightenLogo ? 'brightness(1.5)' : '',
                        }}
                    />
                    {comingSoon && (
                        <Typography mt={1} fontStyle="italic" variant="body2" color={gray.gray10}>
                            Coming soon!
                        </Typography>
                    )}
                </Box>

                <Box p={1} ml={1}>
                    <Typography variant="h6" fontWeight="bold" color={gray.gray7}>
                        {name}
                    </Typography>
                    <Typography variant="body1" color="white" mt={1}>
                        {description}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

const IntegrationsPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Integrations | Aqueduct';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Typography variant="h2" component="h1" display="inline" fontWeight="bold" textAlign="center">
                Aqueduct works with&nbsp;
                <GradientTypography variant="h2" component="span" fontWeight="bold">
                    your cloud
                </GradientTypography>
            </Typography>

            <Typography variant="h6" maxWidth="800px" color="white" textAlign="center" mx="auto" my={2}>
                Aqueduct comes with built-in integrations to common cloud infrastructure, so you can manage machine
                learning in the cloud without having to rip-and-replace every tool you use. Let us know if you'd like to
                see something else here!
            </Typography>

            <Box my={3} alignSelf="center">
                <FeedbackButton variant="outlined" />
            </Box>

            <Box my={8}>
                <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center">
                    <GradientTypography variant="h3" fontWeight="bold" display="inline" component="span">
                        Compute&nbsp;
                    </GradientTypography>
                    {isMobile && <br />}
                    Integrations
                </Typography>

                <Grid container alignItems="stretch" direction="row" spacing={3} my={2}>
                    {ComputeIntegrations.map((integration) => (
                        <IntegrationCard
                            isMobile={isMobile}
                            logoPath={integration.image}
                            name={integration.name}
                            description={integration.description}
                            invertLogo={integration.invertLogo}
                            brightenLogo={integration.brightenLogo}
                            comingSoon={integration.comingSoon}
                        />
                    ))}
                </Grid>
            </Box>

            <Box my={8}>
                <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center">
                    <GradientTypography variant="h3" fontWeight="bold" display="inline">
                        Data&nbsp;
                    </GradientTypography>
                    {isMobile && <br />}
                    Integrations
                </Typography>

                <Grid container alignItems="stretch" direction="row" spacing={3} my={2}>
                    {DataIntegrations.map((integration) => (
                        <IntegrationCard
                            isMobile={isMobile}
                            logoPath={integration.image}
                            name={integration.name}
                            description={integration.description}
                            invertLogo={integration.invertLogo}
                            brightenLogo={integration.brightenLogo}
                            comingSoon={integration.comingSoon}
                        />
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default IntegrationsPage;
