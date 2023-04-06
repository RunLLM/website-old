import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type GitHubButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const GitHubButton: React.FC<GitHubButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('CM3Q98TB');

    return (
        <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    <FontAwesomeIcon
                        icon={faGithub}
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium}
                    />
                </Box>
                Run Open Source
            </GradientButton>
        </Link>
    );
};

export default GitHubButton;
