import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type UseCaseExampleButtonProps = {
    exampleLink: string;
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const UseCaseExampleButton: React.FC<UseCaseExampleButtonProps> = ({ exampleLink, variant, fontSize = '24px' }) => {
    // TODO: Fix me.
    const handleGoal = useGoal('SA7MJ6TA');

    return (
        <Link href={exampleLink} sx={{ textDecoration: 'none' }} onClick={handleGoal}>
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    <FontAwesomeIcon
                        icon={faImage}
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium}
                    />
                </Box>
                See an example
            </GradientButton>
        </Link>
    );
};

export default UseCaseExampleButton;
