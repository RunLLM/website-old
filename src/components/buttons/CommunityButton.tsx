import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type CommunityButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
    includeText?: boolean;
};

const CommunityButton: React.FC<CommunityButtonProps> = ({ variant, fontSize = '24px', includeText = true }) => {
    const handleGoal = useGoal('DNMJWVMK');

    return (
        <Link href="https://slack.aqueducthq.com" sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={includeText ? 1 : 0}>
                    {/* This needs to have a color fixed because the SVG doesn't support gradient colors. */}
                    <FontAwesomeIcon
                        icon={faSlack}
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium}
                    />
                </Box>
                {includeText && <>Join the Community</>}
            </GradientButton>
        </Link>
    );
};

export default CommunityButton;
