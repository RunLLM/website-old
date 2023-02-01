import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header';
import { grayA } from '@radix-ui/colors';

type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Box width="100%" height="100%" position="fixed" overflow="auto" sx={{ backgroundColor: grayA.grayA12 }} color="white">
            <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: 4, py: 5 }}>
                <Header />
                
                <Box mt="128px">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;