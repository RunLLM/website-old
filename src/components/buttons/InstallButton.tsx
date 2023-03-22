import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type InstallButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const InstallButton: React.FC<InstallButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('X0XCID4M');

    return (
        <Link href="https://docs.aqueducthq.com/quickstart-guide" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    <FontAwesomeIcon
                        icon={faDownload}
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium}
                    />
                </Box>
                Install Aqueduct →
            </GradientButton>
        </Link>
    );
};

export default InstallButton;