import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Collapse, Menu, MenuItem as MuiMenuItem, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gray, grayA } from '@radix-ui/colors';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React, { useEffect, useState } from 'react';

import { theme } from '../styles/theme';
import CommunityButton from './buttons/CommunityButton';
import GradientButton from './primitives/GradientButton.styles';
import { Link } from './primitives/Link.styles';

const headerLinkStyles = {
    textDecoration: 'none',
    color: gray.gray8,
    cursor: 'pointer',
    variant: 'body1',
    '&:hover': {
        color: 'white',
    },
};

const HeaderLink = styled(Link)(headerLinkStyles);

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
                <Box
                    sx={{
                        ...headerLinkStyles,
                        display: 'flex',
                        alignItems: 'center',
                        color: !!anchorElement ? 'white' : gray.gray8,
                    }}
                    onClick={(e) => setAnchorElement(e.currentTarget)}
                >
                    <Typography variant="body1">{title}</Typography>
                    <Box ml={1} display="flex">
                        <FontAwesomeIcon icon={!!anchorElement ? faChevronUp : faChevronDown} />
                    </Box>
                </Box>
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
                        width: '500px',
                        p: 4,
                        color: 'white',
                    },
                }}
            >
                {children}
            </Popover>
        </>
    );
};

type HeaderProps = {
    variant: 'dark' | 'light';
    includeBanner?: boolean;
    isMobile: boolean;
};

const MenuItem = styled(MuiMenuItem)({
    '&:active': {
        backgroundColor: gray.gray12,
    },
});

MenuItem.defaultProps = {
    disableRipple: true,
};

const BannerMessage = (
    <>
        Run open LLMs on Aqueduct.&nbsp;
        <Link href="/post/the-easiest-way-to-run-open-llms">Learn more →</Link>
    </>
);

const Header: React.FC<HeaderProps> = ({ variant, isMobile, includeBanner = true }) => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [expandMobileProductMenu, setExpandMobileProductMenu] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const handleGoal = useGoal('SNUWR2NG');

    return (
        <Box width="100%" sx={{ backgroundColor: grayA.grayA12, py: 2 }}>
            <Box mx="auto" maxWidth="200px">
                <img src="/aqueduct/logo_light_full_horizontal.png" width="100%" alt="The Aqueduct logo." />
            </Box>
        </Box>
    )

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/');
    }, []);

    const careersCounter = (
        <Box
            sx={{
                background: `linear-gradient(to right, ${theme.palette.logo.bright1}, ${theme.palette.logo.light})`,
                borderRadius: '8px',
                color: 'white',
                px: 1,
                ml: 1,
            }}
        >
            2
        </Box>
    );

    const productMenuDetails = (
        <>
            <Box flex={1} display="flex" flexDirection="column">
                <Typography variant="body2" textTransform="uppercase" letterSpacing={1} color={gray.gray9} mb={1}>
                    Aqueduct
                </Typography>

                <HeaderLink my="4px" href="/product">
                    Why Aqueduct?
                </HeaderLink>
                <HeaderLink my="4px" href="/customers">
                    Case Studies
                </HeaderLink>
                <HeaderLink my="4px" href="/resources">
                    Resources
                </HeaderLink>
            </Box>

            <Box flex={1} display="flex" flexDirection="column">
                <Typography variant="body2" textTransform="uppercase" letterSpacing={1} color={gray.gray9} mb={1}>
                    Use Cases
                </Typography>

                <HeaderLink my="4px" href="/use-cases/training">
                    Model Training
                </HeaderLink>
                <HeaderLink my="4px" href="/use-cases/batch-inference">
                    Batch Inference
                </HeaderLink>
                <HeaderLink my="4px" href="/use-cases/feature-pipelines">
                    Feature Pipelines
                </HeaderLink>
                {/* <HeaderLink my="4px" href="/use-cases/hyperparameter-search">Hyperparameter Search</HeaderLink> */}
                <HeaderLink my="4px" href="/use-cases/real-time">
                    Real-Time Inference
                </HeaderLink>
            </Box>
        </>
    );

    const gitHubButton = (
        <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton
                sx={{ px: isMobile ? 1 : 3, py: isMobile ? '4px' : 1, fontSize: isMobile ? '16px' : '18px' }}
                variant="contained"
            >
                <Box mr={1}>
                    <FontAwesomeIcon icon={faGithub} />
                </Box>
                Star us
            </GradientButton>
        </Link>
    );

    // We have a different header on mobile.
    if (isMobile) {
        return (
            <>
                <Box
                    width="calc(100% - 32px)"
                    sx={{
                        backgroundColor: gray.gray12,
                        py: 2,
                        px: 2,
                        alignItems: 'center',
                        display: 'flex',
                        borderBottom: `1px solid ${gray.gray11}`,
                    }}
                    height="50px"
                    position="fixed"
                    zIndex={10}
                >
                    <Box flex={1}>
                        <Link href={isHomePage ? '#' : '/'} sx={{ textDecoration: 'none', m: 0, p: 0 }}>
                            <img src="/aqueduct/logo_light.png" height="30px" alt="The Aqueduct logo." />
                        </Link>
                    </Box>

                    <Box>{gitHubButton}</Box>

                    <Box>
                        <Box
                            sx={{
                                ml: 1,
                                px: 1,
                                py: '4px',
                                borderRadius: '8px',
                                border: `1px solid ${gray.gray11}`,
                            }}
                            onClick={() => setOpenMobileMenu(true)}
                            width="fit-content"
                        >
                            <FontAwesomeIcon icon={faBars} color="white" />
                        </Box>
                    </Box>
                </Box>

                {includeBanner && (
                    <Box
                        width="100%"
                        sx={{ backgroundColor: theme.palette.gray.darkGrayOffset }}
                        py={1}
                        top="83px"
                        position="absolute"
                        textAlign="center"
                    >
                        <Typography variant="body1" color={gray.gray6}>
                            {BannerMessage}
                        </Typography>
                    </Box>
                )}

                <Menu
                    open={openMobileMenu}
                    onClose={() => setOpenMobileMenu(false)}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 83, left: 0 }}
                    PaperProps={{
                        style: {
                            width: '100%',
                            borderRadius: '0px',
                            backgroundColor: theme.palette.gray.darkGrayOffset,
                            color: gray.gray8,
                        },
                    }}
                    sx={{
                        mx: '-16px', // MUI seems to hardcode a left position of 16px.
                    }}
                >
                    <MenuItem>
                        <Box width="100%">
                            <Box
                                sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                                onClick={() => setExpandMobileProductMenu(!expandMobileProductMenu)}
                            >
                                Product
                                <Box sx={{ ml: 1 }}>
                                    <FontAwesomeIcon icon={expandMobileProductMenu ? faChevronUp : faChevronDown} />
                                </Box>
                            </Box>

                            <Collapse in={expandMobileProductMenu} unmountOnExit>
                                <Box display="flex" alignItems="start" width="100%" mt={1}>
                                    {productMenuDetails}
                                </Box>
                            </Collapse>
                        </Box>
                    </MenuItem>

                    <MenuItem>
                        <HeaderLink sx={{ width: '100%' }} href="/team">
                            Team
                        </HeaderLink>
                    </MenuItem>

                    <MenuItem>
                        <HeaderLink sx={{ width: '100%' }} href="/pricing">
                            Pricing
                        </HeaderLink>
                    </MenuItem>

                    <MenuItem>
                        <HeaderLink
                            href="https://jobs.aqueducthq.com"
                            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                        >
                            Careers
                            {careersCounter}
                        </HeaderLink>
                    </MenuItem>

                    <MenuItem>
                        <HeaderLink sx={{ width: '100%' }} href="/blog">
                            Blog
                        </HeaderLink>
                    </MenuItem>

                    <MenuItem>
                        <HeaderLink sx={{ width: '100%' }} href="https://docs.aqueducthq.com">
                            Docs
                        </HeaderLink>
                    </MenuItem>

                    <MenuItem>
                        <CommunityButton fontSize="18px" variant="outlined" />
                    </MenuItem>
                </Menu>
            </>
        );
    }

    return (
        <Box width="100%" sx={{ backgroundColor: variant === 'dark' ? '' : gray.gray12 }}>
            {includeBanner && (
                <Box width="100%" sx={{ backgroundColor: theme.palette.gray.darkGrayOffset }} py={1}>
                    <Box mx="auto" width="fit-content">
                        <Typography variant="body1" color={gray.gray6}>
                            {BannerMessage}
                        </Typography>
                    </Box>
                </Box>
            )}
            <Box display="flex" alignItems="center" maxWidth="1300px" mx="auto" py={4} px={4} flexDirection="row">
                <Box width="200px">
                    <Link href={isHomePage ? '#' : '/'} sx={{ textDecoration: 'none' }}>
                        <img src="/aqueduct/logo_light_full_horizontal.png" height="40px" alt="The Aqueduct logo." />
                    </Link>
                </Box>

                <Box flex={1} display="flex" justifyContent="center" color={gray.gray8} flexDirection="row">
                    <HeaderDropdown mx={2} title="Product">
                        <Box display="flex">
                            <Box flex={1} display="flex" flexDirection="column">
                                <Typography
                                    variant="body2"
                                    textTransform="uppercase"
                                    letterSpacing={1}
                                    color={gray.gray9}
                                    mb={1}
                                >
                                    Aqueduct
                                </Typography>

                                <HeaderLink my="4px" href="/product">
                                    Why Aqueduct?
                                </HeaderLink>
                                <HeaderLink my="4px" href="/customers">
                                    Case Studies
                                </HeaderLink>
                                <HeaderLink my="4px" href="/resources">
                                    Resources
                                </HeaderLink>
                            </Box>

                            <Box flex={1} display="flex" flexDirection="column">
                                <Typography
                                    variant="body2"
                                    textTransform="uppercase"
                                    letterSpacing={1}
                                    color={gray.gray9}
                                    mb={1}
                                >
                                    Use Cases
                                </Typography>

                                <HeaderLink my="4px" href="/use-cases/training">
                                    Model Training
                                </HeaderLink>
                                <HeaderLink my="4px" href="/use-cases/batch-inference">
                                    Batch Inference
                                </HeaderLink>
                                <HeaderLink my="4px" href="/use-cases/feature-pipelines">
                                    Feature Pipelines
                                </HeaderLink>
                                {/* <HeaderLink my="4px" href="/use-cases/hyperparameter-search">Hyperparameter Search</HeaderLink> */}
                                <HeaderLink my="4px" href="/use-cases/real-time">
                                    Real-Time Inference
                                </HeaderLink>
                            </Box>
                        </Box>
                    </HeaderDropdown>

                    <HeaderLink href="/pricing" mx={2} variant="body1">
                        Pricing
                    </HeaderLink>

                    <HeaderLink href="/team" mx={2} variant="body1">
                        Team
                    </HeaderLink>

                    <HeaderLink
                        href="https://jobs.aqueducthq.com"
                        mx={2}
                        variant="body1"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        Careers
                        {careersCounter}
                    </HeaderLink>
                    <HeaderLink href="/blog" mx={2} variant="body1">
                        Blog
                    </HeaderLink>
                    <HeaderLink href="https://docs.aqueducthq.com" mx={2} variant="body1">
                        Docs
                    </HeaderLink>
                </Box>

                <Box display="flex" justifyContent="end" alignItems="center">
                    <Box mr={2}>
                        <CommunityButton variant="outlined" fontSize="18px" includeText={false} />
                    </Box>

                    {gitHubButton}
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
