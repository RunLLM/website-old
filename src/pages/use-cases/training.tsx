import React from 'react';
import Layout from '../../components/primitives/Layout';
import { useMediaQuery } from 'react-responsive';
import { Typography } from '@mui/material';
import GradientTypography from '../../components/primitives/GradientTypography.styles';
import { Box} from '@mui/material';
import FeedbackButton from '../../components/buttons/FeedbackButton';

const ModelTrainingPage: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return ( 
        <Layout isMobile={isMobile}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" fontWeight="bold">
                    <GradientTypography variant="h2" component="span" display="inline" fontWeight="bold">
                        Model Training
                    </GradientTypography>
                    &nbsp;with Aqueduct
                </Typography>

                <Typography variant="h5" mt={3}>
                    Keep your existing infrastructure. Use Aqueduct to build better models seamlessly.
                </Typography>

                <Box flex={1} mt={isMobile ? 6 : 12}>
                    <Typography variant="h6">
                        Details coming soon! 
                    </Typography>
                </Box> 

                <Box mt={2}>
                    <FeedbackButton variant="outlined" />
                </Box>
            </Box>
        </Layout>
     );
};

export default ModelTrainingPage;