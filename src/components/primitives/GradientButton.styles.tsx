import { Button, buttonClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const GradientButton = styled(Button)({
    [`&.${buttonClasses.root}`]: {
        textTransform: 'none',
        '&:hover': {
            transform: 'translateY(-2px)',
        },

        [`&.${buttonClasses.containedPrimary}`]: {
            background: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.bright2})`,
            color: 'white',
        },

        [`&.${buttonClasses.outlinedPrimary}`]: {
            border: `2px solid ${theme.palette.logo.medium}`,
            background: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.light})`,
            backgroundClip: 'text',
            color: 'transparent',

            '&:hover': {
                border: `2px solid ${theme.palette.logo.bright2}`
            }
        },
    }
});

export default GradientButton;