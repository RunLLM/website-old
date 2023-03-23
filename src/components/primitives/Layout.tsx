import { Box } from '@mui/material';
import { gray } from '@radix-ui/colors';
import React from 'react';

import Footer from '../Footer';
import Header from '../Header';

type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
    variant?: 'light' | 'dark';
    isMobile: boolean;
    includeBanner?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, isMobile, variant = 'dark', includeBanner = true }) => {
    const variantConfig = {
        backgroundColor: variant === 'dark' ? gray.gray12 : gray.gray2,
        color: variant === 'dark' ? 'white' : gray.gray12,
    };

    return (
        <Box
            width="100%"
            height="100%"
            position="fixed"
            overflow="auto"
            sx={variantConfig}
            display="flex"
            flexDirection="column"
        >
            <Header variant={variant} isMobile={isMobile} includeBanner={includeBanner} />

            <Box
                sx={{
                    // This is a bit of a hack because we're relying on the fact that the theme constants from
                    // MUI are in increments of 8px.
                    width: isMobile ? 'calc(100% - 16px)' : '100%',
                    maxWidth: '1300px',
                    mx: 'auto',
                    mt: isMobile ? '96px' : null,
                    px: isMobile ? 1 : 4,
                    py: isMobile ? 1 : 5,
                }}
                flex={1}
            >
                <Box mt="32px" display="flex" flexDirection="column">
                    {children}
                </Box>
            </Box>

            <Footer isMobile={isMobile} />
        </Box>
    );
};

export default Layout;
