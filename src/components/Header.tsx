import React, { useState } from 'react';
import { Box, Link, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gray, grayA } from '@radix-ui/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import GradientButton from './primitives/GradientButton.styles';
import { theme } from '../styles/theme';

const HeaderLink = styled(Link)({
    textDecoration: 'none',
    color: gray.gray8,
    cursor: 'pointer',
    variant: 'body1',
    '&:hover': {
        color: 'white',
    }
});

type HeaderDropdownProps = {
    title: string;
    mx: number; // the x-margin to set on the item.
    children: React.ReactElement;
};

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ title, mx, children }) => {
    const [anchorElement, setAnchorElement] = useState<HTMLSpanElement | null>(null);

    return (
        <>
            <Box mx={mx}>
                {/* Even though this is not a link, we use it to keep the styling uniform. */}
                <HeaderLink 
                    sx={{ display: 'flex', alignItems: 'center', color: !!anchorElement ? 'white' : gray.gray8 }} 
                    variant="body1" 
                    onClick={(e) => setAnchorElement(e.currentTarget)}
                >
                    {title}
                    <Box ml={1} display="flex">
                        <FontAwesomeIcon icon={!!anchorElement ? faChevronUp : faChevronDown} />
                    </Box>
                </HeaderLink>
            </Box>

            <Popover 
                open={!!anchorElement} 
                anchorEl={anchorElement} 
                onClose={() => setAnchorElement(null)} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: {
                        marginTop: 2,
                        backgroundColor: theme.palette.gray.darkGrayOffset, 
                        borderRadius: 2,
                        width: "500px",
                        p: 4,
                        color: 'white'
                    }
                }}
            > 
                {children}
            </Popover>
        </>
    );
};

type HeaderProps = {
    variant: 'dark' | 'light';
};

const Header: React.FC<HeaderProps> = ({ variant }) => {
    return (
        <Box width="100%" sx={{ backgroundColor: variant === 'dark' ? '' : grayA.grayA12 }}>
            <Box display="flex" alignItems="center" maxWidth="1300px" mx="auto" py={4} px={4} >
                <Box width="200px">
                    <Link href="/" sx={{ textDecoration: 'none' }}>
                        <img src="/aqueduct/logo_light_full_horizontal.png" height="40px" alt="The Aqueduct logo." />
                    </Link>
                </Box>

                <Box flex={1} display="flex" justifyContent="center" color={gray.gray8}>
                    <HeaderLink href="https://docs.aqueducthq.com" mx={2} variant="body1">Docs</HeaderLink>

                    {/* TODO(vikram): Add logos to these menu items and make them resuable components. */}
                    <HeaderDropdown mx={2} title="Product">
                        <Box display="flex">
                            <Box flex={1} display="flex" flexDirection="column">
                                <Typography variant="body2" textTransform="uppercase" letterSpacing={1} color={gray.gray9} mb={1}>
                                    Aqueduct
                                </Typography>

                                <HeaderLink my="4px" href="/product">Why Aqueduct?</HeaderLink>
                                <HeaderLink my="4px" href="/customers">Case Studies</HeaderLink>
                                <HeaderLink my="4px" href="/integrations">Integrations</HeaderLink>
                            </Box>

                            <Box flex={1} display="flex" flexDirection="column">
                                <Typography variant="body2" textTransform="uppercase" letterSpacing={1} color={gray.gray9} mb={1}>
                                    Use Cases
                                </Typography>

                                <HeaderLink my="4px" href="/use-cases/training">Model Training</HeaderLink>
                                <HeaderLink my="4px" href="/use-cases/batch-inference">Batch Inference</HeaderLink>
                                <HeaderLink my="4px" href="/use-cases/feature-pipelines">Feature Pipelines</HeaderLink>
                                {/* <HeaderLink my="4px" href="/use-cases/hyperparameter-search">Hyperparameter Search</HeaderLink> */}
                                <HeaderLink my="4px" href="/use-cases/real-time">Real-Time Inference</HeaderLink>
                            </Box>
                        </Box>
                    </HeaderDropdown>

                    <HeaderLink href="/team" mx={2} variant="body1">Team</HeaderLink>
                    <HeaderLink href="https://jobs.aqueducthq.com" mx={2} variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
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
                    </HeaderLink>
                    <HeaderLink href="/blog" mx={2} variant="body1">Blog</HeaderLink>
                </Box>

                <Box width="200px" display="flex" justifyContent="end">
                    <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }}>
                        <GradientButton size="large" sx={{ fontSize: 'large' }} variant="contained">
                            <Box mr={1}>
                                <FontAwesomeIcon icon={faGithub} />
                            </Box>
                            GitHub
                        </GradientButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Header;