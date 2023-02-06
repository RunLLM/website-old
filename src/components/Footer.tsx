import React from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { gray, grayA } from '@radix-ui/colors';
import GradientButton from './primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterLink = styled(Link)({
    textDecoration: 'none',
    color: gray.gray8,
    cursor: 'pointer',
    variant: 'body1',
    '&:hover': {
        color: 'white',
    }
});

const Footer: React.FC = () => {
    return (
        <Box sx={{ width: '100%', backgroundColor: theme.palette.gray.darkGrayOffset }}>
            <Box maxWidth="1300px" mx="auto" p={5}>
                <Box display="flex">
                    <Box mr={8} py={1} display="flex" flexDirection="column">
                        <Typography variant="body2" color={gray.gray9} textTransform="uppercase" letterSpacing={2} fontWeight="bold">
                            Aqueduct
                        </Typography>

                        <FooterLink my={1} href="/product">Why Aqueduct</FooterLink>
                        <FooterLink my={1} href="https://github.com/aqueducthq/aqueduct">Open Source</FooterLink>
                        <FooterLink my={1} href="https://docs.aqueducthq.com">Documentation</FooterLink>
                        <FooterLink my={1} href="/integrations">Integrations</FooterLink>
                    </Box>

                    <Box mx={8} py={1} display="flex" flexDirection="column">
                        <Typography variant="body2" color={gray.gray9} textTransform="uppercase" letterSpacing={2} fontWeight="bold">
                            Use Cases
                        </Typography>

                        <FooterLink my={1} href="/use-cases/model-training">Model Training</FooterLink>
                        <FooterLink my={1} href="/use-cases/batch-inferencej">Model Training</FooterLink>
                        <FooterLink my={1} href="/use-cases/feature-pipelines">Feature Pipelines</FooterLink>
                        <FooterLink my={1} href="/use-cases/real-time">Real-Time Inference</FooterLink>
                    </Box>

                    <Box mx={8} py={1} display="flex" flexDirection="column">
                        <Typography variant="body2" color={gray.gray9} textTransform="uppercase" letterSpacing={2} fontWeight="bold">
                            Company
                        </Typography>

                        <FooterLink my={1} href="/team">About</FooterLink>
                        <FooterLink my={1} href="/blog">Blog</FooterLink>
                        <FooterLink my={1} href="https://jobs.aqueducthq.com" sx={{ display: 'flex' }}>
                            Careers
                            <Box sx={{
                                background: `linear-gradient(to right, ${theme.palette.logo.bright1}, ${theme.palette.logo.light})`,
                                borderRadius: '8px',
                                color: 'white',
                                px: 1,
                                ml: 1,
                            }}>
                                2
                            </Box>
                        </FooterLink>
                    </Box>

                    <Paper elevation={4} sx={{ borderRadius: '8px', backgroundColor: grayA.grayA12, p: 3, mx: 8, flex: 1 }}>
                        <Typography variant="body1" color={gray.gray9} textTransform="uppercase" letterSpacing={2} fontWeight="bold">
                            Try Aqueduct today
                        </Typography>

                        <Typography variant="body1" color="white" my={2}>
                            See how Aqueduct can help untangle the MLOps Knot.
                        </Typography>

                        <GradientButton variant="outlined" size="large" sx={{ fontSize: '20px' }}>
                            <Box mr={1}>
                                <FontAwesomeIcon icon={faGithub} color={theme.palette.logo.medium} />
                            </Box>

                            Try Aqueduct
                        </GradientButton>
                    </Paper>
                </Box>
                <Box mt={2} display="flex" alignItems="center">
                    <img src="/aqueduct/logo_light_full_horizontal.png" height="40px" alt="The Aqueduct logo." />

                    <Typography variant="body1" color={gray.gray10} ml={2}>
                        © {new Date().getFullYear()} Aqueduct, Inc. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;