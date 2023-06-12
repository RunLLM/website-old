import '../components/animations/infinitescroll.css';

import { faCircleCheck, faEye, faLockOpen, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Link, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import GitHubButton from '../components/buttons/GitHubButton';
import TryButton from '../components/buttons/TryButton';
import EmailSignup from '../components/EmailSignup';
import FeatureOverview from '../components/FeatureOverview';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import ProductPreview from '../components/ProductPreview';
import Quotes from '../components/Quotes';
import RotatingHeadline from '../components/RotatingHeadline';
import { theme } from '../styles/theme';
import { AllResources } from '../utils/resources';

type TrustedByLogoProps = {
    src: string; // The src path of the image.
    link: string;
};

const TrustedByLogo: React.FC<TrustedByLogoProps> = ({ src, link }) => {
    return (
        <Box mx={3}>
            <Link href={link} sx={{ textDecoration: 'none' }}>
                <img src={src} height="40px" style={{ opacity: '0.5' }} alt={src} />
            </Link>
        </Box>
    );
};

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = 'The Developer Platform for LLM Apps';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile} includeBanner={false}>
            <Box my={isMobile ? 1 : 8}>
                <GradientTypography variant={isMobile ? "h2" : "h1"} fontWeight="bold" textAlign="center">
                    The Developer Platform for LLM-powered apps
                </GradientTypography>

                <Box my={16}>
                    <EmailSignup isMobile={isMobile} />
                </Box>

                <Box my={8}>
                    <Typography
                        variant="body1"
                        textTransform="uppercase"
                        letterSpacing={2}
                        color={gray.gray10}
                        textAlign="center"
                    >
                        Backed by top venture firms
                    </Typography>

                    <Grid container direction={isMobile ? "column" : "row"} alignItems="center" justifyContent="center" spacing={5} my={2}>
                        <Grid item flex={1} xs={isMobile ? 12 : 4} sx={{ px: isMobile ? 0 : 4 }}>
                            <img
                                src="/investors/redpoint.png"
                                width="100%"
                                style={{ filter: 'invert(100%) grayscale(100%)' }}
                            />
                        </Grid>

                        <Grid item flex={1} xs={isMobile ? 12 : 4} sx={{ px: isMobile ? 0 : 4 }}>
                            <img
                                src="/investors/the-house-fund.png"
                                width="100%"
                                style={{ filter: 'invert(100%) grayscale(100%)' }}
                            />
                        </Grid>

                        <Grid item flex={1} xs={isMobile ? 12 : 4} sx={{ px: isMobile ? 0 : 4 }}>
                            <img
                                src="/investors/essence.png"
                                width="100%"
                                style={{ filter: 'invert(100%) grayscale(100%)' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    );
};

export default HomePage;
