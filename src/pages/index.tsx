import '../components/animations/slidein.css';
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
import { theme } from '../styles/theme';
import { AllIntegrations } from '../utils/integrations';

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

const RotatingHeadlineElements = ['Kubernetes', 'Airflow', 'Spark', 'Databricks', 'Lambda'];
const RotationSpeedInSeconds = 2.5;

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = 'Aqueduct | Run ML Anywhere';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <Layout isMobile={isMobile}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Typography component="h1" variant="h2" fontWeight="bold" textAlign="center">
                    Seamlessly run <br />
                    <Box>
                        <GradientTypography component="span" variant="h2" fontWeight="bold" textAlign="center">
                            machine learning on&nbsp;
                        </GradientTypography>

                        <Box
                            height="72px"
                            sx={{
                                backgroundColor: theme.palette.gray.darkGrayOffset,
                                borderRadius: '8px',
                                px: 1,
                            }}
                            display="inline-flex"
                            overflow="hidden"
                        >
                            <Box
                                display="inline-flex"
                                flexDirection="column"
                                sx={{
                                    animation: `moveBox ${
                                        RotationSpeedInSeconds * RotatingHeadlineElements.length
                                    }s steps(${RotatingHeadlineElements.length}) infinite ${RotationSpeedInSeconds}s`,
                                }}
                                height="72px"
                            >
                                {RotatingHeadlineElements.map((element) => (
                                    <Box
                                        key={element}
                                        sx={{
                                            animation: `moveText ${RotationSpeedInSeconds}s infinite ${RotationSpeedInSeconds}s`,
                                        }}
                                    >
                                        <GradientTypography variant="h2" fontWeight="bold">
                                            {element}
                                        </GradientTypography>
                                    </Box>
                                ))}

                                {/* We need to add the element again at the beginning to keep the rotation seeming infinite. */}
                                <Box
                                    sx={{
                                        animation: `moveText ${RotationSpeedInSeconds}s infinite ${RotationSpeedInSeconds}s`,
                                    }}
                                >
                                    <GradientTypography variant="h2" fontWeight="bold">
                                        {RotatingHeadlineElements[0]}
                                    </GradientTypography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Typography>

                <Typography variant="h6" color={gray.gray2} textAlign="center" mt={2} maxWidth="800px">
                    Aqueduct removes MLOps complexity by enabling you to define, deploy, and manage machine learning
                    workloads&nbsp;
                    <b>on any cloud infrastructure</b>.
                </Typography>

                <Box
                    mt={6}
                    sx={{
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: isMobile ? 'column-reverse' : 'row',
                        alignItems: 'center',
                    }}
                >
                    <Box mt={isMobile ? 2 : 0}>
                        <TryButton variant={isMobile ? "outlined" : "contained"} fontSize="24px" />
                    </Box>
                    <Box ml={isMobile ? 0 : 2}>
                        <GitHubButton variant={isMobile ? "contained" : "outlined"} fontSize="24px" />
                    </Box>
                </Box>
            </Box>

            <Box
                my={6}
                alignSelf="center"
                flex={1}
                display="flex"
                flexDirection="column"
                width={isMobile ? '100%' : '850px'}
                mx={isMobile ? 1 : 'auto'}
                alignItems="center"
            >
                <ProductPreview isMobile={isMobile} />
            </Box>

            <Box my={6} mx="auto" alignSelf="center" flex={1} display="flex" flexDirection="column" width="100%">
                <Typography
                    textAlign="center"
                    textTransform="uppercase"
                    color={gray.gray9}
                    letterSpacing={2}
                    variant="body2"
                >
                    Integrated with your cloud
                </Typography>

                <Box width="100%" overflow="hidden" mt={4}>
                    <Box
                        sx={{
                            animation: `${isMobile ? 'scrollMobile' : 'scroll'} 30s linear infinite`,
                            ':hover': {
                                animationPlayState: 'paused',
                            },
                        }}
                        display="flex"
                        width="100%"
                        // This maxWidth is set so that we can have a consistent width on mobile screens
                        // for us to finetune the scrolling. See components/animations/infinitescroll.css
                        // for more.
                        maxWidth={isMobile ? '350px' : undefined}
                    >
                        {AllIntegrations.map((integration) => {
                            let filter = '';

                            if (integration.invertLogo) {
                                filter = 'invert(1)';
                            }

                            if (integration.brightenLogo) {
                                filter = 'brightness(1.5)';
                            }

                            return (
                                <Box height="50px" mx={4} key={integration.name}>
                                    <img src={integration.image} height="50px" style={{ filter: filter }} />
                                </Box>
                            );
                        })}
                        {AllIntegrations.slice(0, 12).map((integration) => {
                            let filter = '';

                            if (integration.invertLogo) {
                                filter = 'invert(1)';
                            }

                            if (integration.brightenLogo) {
                                filter = 'brightness(1.5)';
                            }

                            return (
                                <Box height="50px" mx={4} key={`${integration.name} 2`}>
                                    <img src={integration.image} height="50px" style={{ filter: filter }} />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <FeatureOverview isMobile={isMobile} />
            </Box>

            <Box my={4} mx="auto" alignSelf="center" flex={1} display="flex" flexDirection="column">
                <Typography
                    textAlign="center"
                    textTransform="uppercase"
                    color={gray.gray9}
                    letterSpacing={2}
                    variant="body2"
                >
                    Trusted by top machine learning teams
                </Typography>

                {/*TODO(vikram): connect this to CMS.*/}
                <Box display="flex" my={4} alignSelf="center">
                    <TrustedByLogo src="/users/replate.png" link="https://replate.org/" />
                    <TrustedByLogo src="/users/berkeley.png" link="https://berkeley.edu" />
                    <TrustedByLogo src="/users/sarc.png" link="https://www.safeandreliablecare.com/" />
                </Box>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <Quotes isMobile={isMobile} />
            </Box>

            <Box my={isMobile ? 6 : 10} mx={isMobile ? 1 : 'auto'} alignSelf="center" textAlign="center">
                <Typography fontWeight="bold" variant="h3">
                    Why&nbsp;
                    <GradientTypography fontWeight="bold" component="span" display="inline" variant="h3">
                        Aqueduct?
                    </GradientTypography>
                </Typography>

                <Grid container display="flex" my={3} spacing={4} direction="row" alignItems="stretch">
                    <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
                        <Box flex={1} textAlign="left" display="flex" alignItems="start">
                            <Box sx={{ fontSize: '72px ' }}>
                                <FontAwesomeIcon icon={faRocket} color={theme.palette.logo.light} />
                            </Box>

                            <Typography variant="h6" ml={3}>
                                Get more value out of machine learning, faster. With Aqueduct, you can run experiments
                                more quickly, deploy models faster, and debug failures effectively.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
                        <Box flex={1} textAlign="left" display="flex" alignItems="start">
                            <Box sx={{ fontSize: '72px ' }}>
                                <FontAwesomeIcon icon={faEye} color={theme.palette.logo.light} />
                            </Box>

                            <Typography variant="h6" ml={3}>
                                Centralize your machine learning code, data, and metadata in a single place. Always know
                                what&apos;s running, whether it worked, and who&apos;s responsible.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
                        <Box flex={1} textAlign="left" display="flex" alignItems="start">
                            <Box sx={{ fontSize: '72px ' }}>
                                <FontAwesomeIcon icon={faCircleCheck} color={theme.palette.logo.light} />
                            </Box>

                            <Typography variant="h6" ml={3}>
                                Have confidence that your models and predictions are behaving like they&apos;re supposed
                                to, and proactively detect failures before stakeholders and customers complain.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
                        <Box flex={1} textAlign="left" display="flex" alignItems="start">
                            <Box sx={{ fontSize: '72px ' }}>
                                <FontAwesomeIcon icon={faLockOpen} color={theme.palette.logo.light} />
                            </Box>

                            <Typography variant="h6" ml={3}>
                                Avoid vendor and cloud lock-in by using general-purpose, system-agnostic APIs.
                                Experiment more nimbly with new tools and infrastructure.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <Grid
                    container
                    my={3}
                    spacing={isMobile ? 2 : 5}
                    direction="row"
                    alignItems={isMobile ? 'center' : 'stretch'}
                    justifyContent="center"
                >
                    <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        xs={isMobile ? 12 : 4}
                        alignItems={isMobile ? 'center' : 'start'}
                        mb={isMobile ? 4 : 0}
                    >
                        <img
                            src="/aqueduct/logo_light_full_horizontal.png"
                            height="40px"
                            alt="The Aqueduct logo."
                            style={{ filter: 'grayscale(100%)', opacity: '30%' }}
                        />
                        <GradientTypography my={2} color={gray.gray8} variant="h5">
                            Get started with Aqueduct
                        </GradientTypography>
                        <Typography color={gray.gray8} variant="body1" textAlign={isMobile ? 'center' : 'left'}>
                            Fully open-source and easy to setup on your laptop or in your cloud
                        </Typography>

                        <Box mt={3}>
                            <Link
                                color="#fff"
                                variant="h6"
                                href="/try"
                                sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}
                            >
                                Try Aqueduct →
                            </Link>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        xs={isMobile ? 12 : 4}
                        alignItems={isMobile ? 'center' : 'start'}
                        mb={isMobile ? 4 : 0}
                    >
                        <img
                            src="/miscellanea/github.png"
                            height="40px"
                            alt="The Aqueduct logo."
                            style={{ filter: 'grayscale(100%)', opacity: '30%' }}
                        />
                        <GradientTypography my={2} color={gray.gray8} variant="h5">
                            Check out the code
                        </GradientTypography>
                        <Typography color={gray.gray8} variant="body1" textAlign={isMobile ? 'center' : 'left'}>
                            See how Aqueduct works, make a suggestion, and share your feedback &mdash; we&apos;d love to
                            hear from you!
                        </Typography>

                        <Box mt={3}>
                            <Link
                                color="#fff"
                                variant="h6"
                                href="https://github.com/aqueducthq/aqueduct"
                                sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}
                            >
                                See our GitHub repo →
                            </Link>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        xs={isMobile ? 12 : 4}
                        alignItems={isMobile ? 'center' : 'start'}
                    >
                        <img
                            src="/miscellanea/slack.png"
                            height="40px"
                            alt="The Slack logo."
                            style={{ filter: 'grayscale(100%)', opacity: '20%' }}
                        />
                        <GradientTypography my={2} color={gray.gray8} variant="h5">
                            Join the community
                        </GradientTypography>
                        <Typography color={gray.gray8} variant="body1" textAlign={isMobile ? 'center' : 'left'}>
                            Discuss MLOps, share feedback, and learn from top ML teams.
                        </Typography>

                        <Box mt={3}>
                            <Link
                                color="#fff"
                                variant="h6"
                                href="https://slack.aqueducthq.com"
                                sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}
                            >
                                Join Slack →
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box my={isMobile ? 6 : 10} mx="auto" alignSelf="center">
                <EmailSignup isMobile={isMobile} />
            </Box>
        </Layout>
    );
};

export default HomePage;
