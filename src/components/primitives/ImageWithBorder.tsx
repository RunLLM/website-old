import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../styles/theme';

type ImageWithBorderProps = {
    imgPath: string;
    size?: string;
};

const ImageWithBorder: React.FC<ImageWithBorderProps> = ({ imgPath, size = '50px' }) => {
    return (
        <Box sx={{
            backgroundImage: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.light})`,
            borderRadius: '50%',
            padding: '2px',
            width: 'fit-content',
            height: size,
            mr: 2
        }}>
            <img src={imgPath} height={size} style={{ borderRadius: '50%' }} />
        </Box>
    );
};

export default ImageWithBorder;