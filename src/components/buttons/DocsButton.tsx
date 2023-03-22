import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type DocsButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const DocsButton: React.FC<DocsButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('TXQLK2EU');

    return (
        <Link href="https://docs.aqueducthq.com" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton variant={variant} sx={{ fontSize: fontSize, px: 3, py: 1 }}>
                <Box mr={1}>
                    <FontAwesomeIcon icon={faBook} color={theme.palette.logo.medium} />
                </Box>
                Read the Docs
            </GradientButton>
        </Link>
    );
};

export default DocsButton;
