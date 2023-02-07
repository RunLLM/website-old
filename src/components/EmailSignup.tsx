import { Button, FormControl, TextField as MuiTextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { gray } from '@radix-ui/colors';
import React from 'react';
import { theme } from '../styles/theme';
import GradientButton from './primitives/GradientButton.styles';
import GradientTypography from './primitives/GradientTypography.styles';
import { styled } from '@mui/material/styles';

const TextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-root': {
        border: `1px solid ${gray.gray11}`,
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: theme.palette.gray.darkGrayOffset,
        color: 'white',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
        },
    },
    
});
const EmailSignup: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" fontWeight="bold" textAlign="center">
                <GradientTypography variant="h4" component="span" fontWeight="bold">
                    Stay up to date&nbsp;
                </GradientTypography>
                with Aqueduct
            </Typography>

            <FormControl>
                <Box sx={{ display: 'flex', alignItems: "center", mt: 3 }}>
                    <TextField
                        InputProps={{ disableUnderline: true }}
                        placeholder="name@company.com"
                        sx={{
                            width: '250px',
                        }}
                    />

                    <GradientButton variant="outlined" sx={{ ml: 2, fontSize: '22px', py: 1 }}>
                        Sign Up
                    </GradientButton>
                </Box>
            </FormControl>
        </Box>
    );
};

export default EmailSignup;