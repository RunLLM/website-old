import React from 'react';
import { Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientButton from '../primitives/GradientButton.styles';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Box } from '@mui/material';
import { theme } from '../../styles/theme';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';

type TryButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const TryButton: React.FC<TryButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('SA7MJ6TA')

    return (
        <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    <FontAwesomeIcon 
                        icon={faGithub} 
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium} 
                    />
                </Box>

                Try Aqueduct
            </GradientButton>
        </Link>
    );
};

export default TryButton;