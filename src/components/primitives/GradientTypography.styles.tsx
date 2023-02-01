import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const GradientTypography = styled(Typography)({
    background: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.light})`,
    backgroundClip: 'text',
    color: 'transparent',
});

export default GradientTypography;