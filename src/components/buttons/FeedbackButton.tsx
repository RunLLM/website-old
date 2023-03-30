import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';
import React from 'react';

import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';

type FeedbackButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('LBOAZQBU');

    return (
        <Link
            href="https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D"
            sx={{ textDecoration: 'none' }}
            onClick={handleGoal}
        >
            <GradientButton variant={variant} sx={{ fontSize: fontSize, px: 3, py: 1 }}>
                <FontAwesomeIcon icon={faGithub} color={theme.palette.logo.medium} />
                &nbsp;Share your feedback
            </GradientButton>
        </Link>
    );
};

export default FeedbackButton;
