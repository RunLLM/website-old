import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../styles/theme';
import GradientButton from '../primitives/GradientButton.styles';
import GradientTypography from '../primitives/GradientTypography.styles';
import Layout from '../primitives/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { gray } from '@radix-ui/colors';

type TrustedByLogoProps = {
  src: string; // The src path of the image.
  link: string;
}

const TrustedByLogo: React.FC<TrustedByLogoProps> = ({src, link}) => {
  return (
    <Box mx={3}>
      <Link href={link} sx={{ textDecoration: 'none' }}>
        <img src={src} height="40px" style={{ opacity: '0.5' }} alt={src} />
      </Link>
    </Box>
  )
}
const HomePage: React.FC = () => {
  return (
    <Layout>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Deploy and manage
        </Typography>
        <GradientTypography
          variant="h2"
          fontWeight="bold"
          textAlign="center"
        >
          machine learning in the cloud
        </GradientTypography>

        <Typography variant="h6" color={gray.gray2} textAlign="center" mt={2} maxWidth="800px" alignSelf="center">
          Aqueduct is an open-source ML platform that enables you to run machine learning workloads
          on your existing cloud infrastructure.
        </Typography>

        <Box mt={6} sx={{ alignSelf: 'center' }}>
          <Link href="https://github.com/aqueducthq/aqueduct" sx={{ textDecoration: 'none' }}>
            <GradientButton sx={{ fontSize: '24px', px: 3, py: 1 }} variant="contained">
              <Box mr={1}>
                <FontAwesomeIcon icon={faGithub} />
              </Box>

              Try Aqueudct
            </GradientButton>
          </Link>

          <Link href="https://slack.aqueducthq.com" sx={{ textDecoration: 'none' }} ml={3}>
            <GradientButton sx={{ fontSize: '24px', px: 3, py: 1 }} variant="outlined">
              <Box mr={1}>
                {/* This needs to have a color fixed because the SVG doesn't support gradient colors. */}
                <FontAwesomeIcon icon={faSlack} color={theme.palette.logo.medium} />
              </Box>

              Join the Community
            </GradientButton>
          </Link>
        </Box>
      </Box>

      <Box my={10} mx="auto" alignSelf="center" flex={1} display="flex" flexDirection="column">
        <Typography textAlign="center" textTransform="uppercase" color={gray.gray9} letterSpacing={2} variant="body2">
          Trusted by top machine learning teams
        </Typography>

        {/*TODO(vikram): connect this to CMS.*/}
        <Box display="flex" my={4} alignSelf="center">
          <TrustedByLogo src="/replate.png" link="https://replate.org/" />
          <TrustedByLogo src="/berkeley.png" link="https://berkeley.edu" />
          <TrustedByLogo src="/sarc.png" link="https://www.safeandreliablecare.com/" />
        </Box>
      </Box>

      {/* <Box my={10} mx="auto">
            <Typography variant="h3" mb={3} fontWeight="bold">
              See Aqueduct in action
            </Typography>
            
            <div style={{ position: 'relative', paddingBottom: 'calc(59.05469994689325% + 41px)', height: 0}}>
              <iframe 
                src="https://demo.arcade.software/iPJU0Bk5cDC7xs073qC0?embed" 
                loading="lazy" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
              </iframe>
            </div>
        </Box> */}
    </Layout>
  );
};

export default HomePage;