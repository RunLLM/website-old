import { Alert, FormControl, Snackbar, TextField as MuiTextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { gray } from '@radix-ui/colors';
import React, { useState } from 'react';
import { theme } from '../styles/theme';
import GradientButton from './primitives/GradientButton.styles';
import GradientTypography from './primitives/GradientTypography.styles';
import { styled } from '@mui/material/styles';
import { faShopSlash } from '@fortawesome/free-solid-svg-icons';

const TextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-root': {
        // border: `1px solid ${gray.gray11}`,
        overflow: 'hidden',
        // borderRadius: '8px',
        backgroundColor: theme.palette.gray.darkGrayOffset,
        color: 'white',
        '&:hover': {
            // backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            // backgroundColor: 'transparent',
        },
    },
});

type EmailSignupProps = {
    isMobile: boolean;
};

const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


const EmailSignup: React.FC<EmailSignupProps> = ({ isMobile }) => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const encode = (data: { [key: string]: string }) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }


    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setValidEmail(EmailRegex.test(email));
        setShowSnackbar(true);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {/* This is for Netlify. */}
            <form name="Newsletter Signup" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
                <input type="hidden" name="form-name" value="Newsletter Signup" />
                <input type="email" name="email" />
            </form> 

            <Snackbar 
                open={showSnackbar} 
                autoHideDuration={5000} 
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                }}
            >
                <Alert severity={validEmail ? 'success' : 'error'}>
                    {
                        validEmail ?
                            'Thanks for signing up!' :
                            'Please enter a valid email address.'
                    }
                </Alert>
            </Snackbar>

            <Typography variant="h4" fontWeight="bold" textAlign="center">
                <GradientTypography variant="h4" component="span" fontWeight="bold">
                    Stay up to date&nbsp;
                </GradientTypography>
                with Aqueduct
            </Typography>

            <form name="Newsletter Signup" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="Newsletter Signup" />
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: "center", mt: 3, mx: 'auto' }}>
                    <TextField
                        placeholder="name@company.com"
                        type="email"
                        sx={{
                            width: '250px',
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={showSnackbar && !validEmail}
                    />

                    <GradientButton 
                        type="submit" 
                        variant="outlined" 
                        sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, fontSize: '22px', py: 1 }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </GradientButton>
                </Box>
            </form>
        </Box>
    );
};

export default EmailSignup;