import { Alert, Snackbar, TextField as MuiTextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import { theme } from '../styles/theme';
import GradientButton from './primitives/GradientButton.styles';
import GradientTypography from './primitives/GradientTypography.styles';

const TextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-root': {
        overflow: 'hidden',
        backgroundColor: theme.palette.gray.darkGrayOffset,
        color: 'white',
    },
});

type EmailSignupProps = {
    isMobile: boolean;
    formName?: string;
    includeTitle?: boolean;
    align?: string;
};

const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// TODO(vikram): This should probably be broken into two separate components where the 
// form part is abstracted away in the future.
const EmailSignup: React.FC<EmailSignupProps> = ({ isMobile, formName = "Newsletter Signup", includeTitle = true, align = "center" }) => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const encode = (data: { [key: string]: string }) => {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setValidEmail(EmailRegex.test(email));
        setShowSnackbar(true);

        if (EmailRegex.test(email)) {
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                    'form-name': formName,
                    email: email,
                }),
            });
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems={align}>
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
                    {validEmail ? 'Thanks for signing up!' : 'Please enter a valid email address.'}
                </Alert>
            </Snackbar>

            {
                includeTitle &&
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    <GradientTypography variant="h4" component="span" fontWeight="bold">
                        Stay up to date&nbsp;
                    </GradientTypography>
                    with Aqueduct
                </Typography>
            }

            <form name={formName} method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value={formName} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: align,
                        mt: 3,
                        mx: 'auto',
                    }}
                >
                    <TextField
                        placeholder="name@company.com"
                        type="email"
                        id="email"
                        name="email"
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
                        sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0, fontSize: '20px', py: 1 }}
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
