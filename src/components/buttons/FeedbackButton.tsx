import React from 'react';
import { Link } from '@mui/material';
import { theme } from '../../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientButton from '../primitives/GradientButton.styles';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
// VSCode doesn't seem happy about this import, but it works fine.
import { useGoal } from 'gatsby-plugin-fathom';

type FeedbackButtonProps = {
    variant: 'outlined' | 'contained';
    fontSize?: string;
};

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ variant, fontSize = '24px' }) => {
    const handleGoal = useGoal('LBOAZQBU')

    return (
        <Link
            href="https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D"
            sx={{ textDecoration: 'none' }}
            mx="auto"
            my={3}
            onClick={handleGoal}
        >
            <GradientButton variant={variant} sx={{ fontSize: fontSize }}>
                <FontAwesomeIcon icon={faGithub} color={theme.palette.logo.medium} />
                &nbsp;Share your feedback
            </GradientButton>
        </Link>
    );
};

export default FeedbackButton;