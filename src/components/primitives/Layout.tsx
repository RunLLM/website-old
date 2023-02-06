import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header';
import { grayA } from '@radix-ui/colors';
import Footer from '../Footer';

type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
    variant?: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ children, variant = 'dark' }) => {
    const variantConfig = {
        backgroundColor: variant === 'dark' ? grayA.grayA12 : grayA.grayA2,
        color: variant === 'dark' ? 'white' : grayA.grayA12,
    };

    return (
        <Box width="100%" height="100%" position="fixed" overflow="auto" sx={variantConfig} display="flex" flexDirection="column">
            <Header variant={variant} />

            <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: 4, py: 5 }} flex={1}>
                
                <Box mt="32px" display="flex" flexDirection="column">
                    {children}
                </Box>

            </Box>
            
            <Footer />
        </Box>
    );
};

export default Layout;