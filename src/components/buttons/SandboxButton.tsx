import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { Box } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type SandboxButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const SandboxButton: React.FC<SandboxButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('52SYUKI8');

    return (
        <Link
            href="https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=496844646"
            sx={{ textDecoration: 'none' }}
            onClick={handleGoal}
        >
            <GradientButton sx={{ fontSize: fontSize, px: 3, py: 1 }} variant={variant}>
                <Box mr={1}>
                    <FontAwesomeIcon
                        icon={faGithub}
                        color={variant === 'contained' ? 'white' : theme.palette.logo.medium}
                    />
                </Box>
                Start now →
            </GradientButton>
        </Link>
    );
};

export default SandboxButton;
