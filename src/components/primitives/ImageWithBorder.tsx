import { Box } from '@mui/material';
import React from 'react';

import { theme } from '../../styles/theme';

type ImageWithBorderProps = {
    imgPath: string;
    size?: string;
    alt: string;
};

const ImageWithBorder: React.FC<ImageWithBorderProps> = ({ imgPath, size = '50px', alt }) => {
    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.light})`,
                borderRadius: '50%',
                padding: '2px',
                width: 'fit-content',
                height: size,
            }}
        >
            <img src={imgPath} height={size} style={{ borderRadius: '50%' }} alt={alt} />
        </Box>
    );
};

export default ImageWithBorder;
