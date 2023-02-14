import React from 'react';
import { Link } from '@mui/material';
import { theme } from '../../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientButton from '../primitives/GradientButton.styles';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';

type CommunityButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const CommunityButton: React.FC<CommunityButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('DNMJWVMK')

    return (
        <Link href="https://slack.aqueducthq.com" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    {/* This needs to have a color fixed because the SVG doesn't support gradient colors. */}
                    <FontAwesomeIcon 
                        icon={faSlack} 
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium} 
                    />
                </Box>

                Join the Community
            </GradientButton>
        </Link>
    );
};

export default CommunityButton;