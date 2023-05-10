import { Box, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gray } from '@radix-ui/colors';
import React from 'react';

import { theme } from '../styles/theme';
import TryButton from './buttons/TryButton';

const FooterLink = styled(Link)({
    textDecoration: 'none',
    color: gray.gray8,
    cursor: 'pointer',
    variant: 'body1',
    '&:hover': {
        color: 'white',
    },
});

type FooterProps = {
    isMobile: boolean;
};

const Footer: React.FC<FooterProps> = ({ isMobile }) => {
    return (
        <Box sx={{ width: '100%', backgroundColor: theme.palette.gray.darkGrayOffset }}>
            <Box maxWidth="1300px" mx="auto" p={5}>
                <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
                    <Box mr={isMobile ? 0 : 8} py={isMobile ? 3 : 1} display="flex" flexDirection="column">
                        <Typography
                            variant="body2"
                            color={gray.gray9}
                            textTransform="uppercase"
                            letterSpacing={2}
                            fontWeight="bold"
                            mb={1}
                        >
                            Aqueduct
                        </Typography>

                        <FooterLink my={1} href="/product">
                            Why Aqueduct
                        </FooterLink>
                        <FooterLink my={1} href="https://github.com/aqueducthq/aqueduct">
                            Open Source
                        </FooterLink>
                        <FooterLink my={1} href="https://docs.aqueducthq.com">
                            Documentation
                        </FooterLink>
                        <FooterLink my={1} href="/resources">
                            Resources
                        </FooterLink>
                    </Box>

                    <Box mx={isMobile ? 0 : 8} py={isMobile ? 3 : 1} display="flex" flexDirection="column">
                        <Typography
                            variant="body2"
                            color={gray.gray9}
                            textTransform="uppercase"
                            letterSpacing={2}
                            fontWeight="bold"
                            mb={1}
                        >
                            Use Cases
                        </Typography>

                        <FooterLink my={1} href="/use-cases/training">
                            Model Training
                        </FooterLink>
                        <FooterLink my={1} href="/use-cases/batch-inference">
                            Batch Inference
                        </FooterLink>
                        <FooterLink my={1} href="/use-cases/feature-pipelines">
                            Feature Pipelines
                        </FooterLink>
                        <FooterLink my={1} href="/use-cases/real-time">
                            Real-Time Inference
                        </FooterLink>
                    </Box>

                    <Box mx={isMobile ? 0 : 8} py={isMobile ? 3 : 1} display="flex" flexDirection="column">
                        <Typography
                            variant="body2"
                            color={gray.gray9}
                            textTransform="uppercase"
                            letterSpacing={2}
                            fontWeight="bold"
                            mb={1}
                        >
                            Company
                        </Typography>

                        <FooterLink my={1} href="/team">
                            About
                        </FooterLink>
                        <FooterLink my={1} href="/blog">
                            Blog
                        </FooterLink>
                        <FooterLink
                            my={1}
                            href="https://jobs.aqueducthq.com"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            Careers
                            <Box
                                sx={{
                                    background: `linear-gradient(to right, ${theme.palette.logo.bright1}, ${theme.palette.logo.light})`,
                                    borderRadius: '8px',
                                    color: 'white',
                                    px: 1,
                                    py: '2px',
                                    ml: 1,
                                }}
                            >
                                2
                            </Box>
                        </FooterLink>
                    </Box>

                    <Paper
                        elevation={4}
                        sx={{
                            borderRadius: '8px',
                            backgroundColor: gray.gray12,
                            p: 3,
                            mx: isMobile ? 0 : 8,
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMobile ? 'center' : 'start',
                            textAlign: isMobile ? 'center' : 'left',
                        }}
                    >
                        <Typography
                            variant="body1"
                            color={gray.gray9}
                            textTransform="uppercase"
                            letterSpacing={2}
                            fontWeight="bold"
                        >
                            Try Aqueduct today
                        </Typography>

                        <Typography variant="body1" color="white" my={2}>
                            See how Aqueduct can help untangle the MLOps Knot.
                        </Typography>

                        <TryButton fontSize="20px" variant="outlined" />
                    </Paper>
                </Box>

                <Box
                    mt={isMobile ? 4 : 2}
                    display="flex"
                    alignItems="center"
                    flexDirection={isMobile ? 'column' : 'row'}
                >
                    <img src="/aqueduct/logo_light_full_horizontal.png" height="40px" alt="The Aqueduct logo." />

                    <Typography variant="body1" color={gray.gray10} ml={isMobile ? 0 : 2} mt={isMobile ? 2 : 0}>
                        © {new Date().getFullYear()} Aqueduct, Inc. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
