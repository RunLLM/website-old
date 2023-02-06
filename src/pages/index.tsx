import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { theme } from '../styles/theme';
import GradientButton from '../components/primitives/GradientButton.styles';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import Layout from '../components/primitives/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { gray } from '@radix-ui/colors';
import { faCircleCheck, faEye, faLockOpen, faRocket } from '@fortawesome/free-solid-svg-icons';
import ImageWithBorder from '../components/primitives/ImageWithBorder';

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

type FeatureCardProps = {
  heading: string;
  content: string;
  link?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({heading, content, link = null}) => {
  return (
    // This is a little bit of a hack because we're hardcoding a margin of 2 = 16px.
    <Grid item maxWidth="33%" display="flex" flexDirection="column" >
      <Paper elevation={4} sx={{ backgroundColor: theme.palette.gray.darkGrayOffset, p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GradientTypography variant="h5" fontWeight="bold" mb={1}>
          {heading}
        </GradientTypography>

        <Box flex={1}>
          <Typography variant="body1" color="white">
            {content}
          </Typography>
        </Box>

        <Link mt={2} href={link ?? '#'} color={gray.gray9} sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2} }}>
          Learn More →
        </Link>
      </Paper>
    </Grid >
  );
}

type QuoteCardProps = {
  imgPath: string;
  name: string;
  title: string;
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({imgPath, name, title, quote}) => {
  return (
    <Grid item display="flex" flexDirection="column" maxWidth="50%">
      <Paper elevation={4} sx={{ p: 3, backgroundColor: theme.palette.gray.darkGrayOffset, flex: 1, color: 'white' }}>
        <Box>
          <Box display="flex" alignItems="center">
            <ImageWithBorder imgPath={imgPath} />

            <Box>
              <Typography variant="body1">
                {name}
              </Typography>
              <Typography variant="body2">
                {title}
              </Typography>
            </Box>
          </Box>

          <Typography mt={2}>
            {quote}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Aqueduct | ML Infrastructure, Simplified"
  });

  return (
    <Layout>
      <Box display="flex" flexDirection="column">
        <Typography component="h1" variant="h2" fontWeight="bold" textAlign="center">
          Deploy and manage <br/>
          <GradientTypography
            component="span"
            variant="h2"
            fontWeight="bold"
            textAlign="center"
          >
            machine learning in the cloud
          </GradientTypography>
        </Typography>

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

              Try Aqueduct
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
          <TrustedByLogo src="/users/replate.png" link="https://replate.org/" />
          <TrustedByLogo src="/users/berkeley.png" link="https://berkeley.edu" />
          <TrustedByLogo src="/users/sarc.png" link="https://www.safeandreliablecare.com/" />
        </Box>
      </Box>

      <Box my={20} mx="auto" alignSelf="center">
        <Box textAlign="center">
          <Typography component="span" variant="h3" fontWeight="bold" display="inline">
            Infrastructure built for&nbsp;
          </Typography>
          <GradientTypography variant="h3" fontWeight="bold" display="inline">modern ML teams</GradientTypography>
        </Box>

        <Grid container my={5} spacing={4} alignItems="stretch" direction="row">
          <FeatureCard 
            heading="Python-native workflows" 
            content="Define your workflows in vanilla Python &mdash; no more YAML configs, Dockerfiles, or DSLs to worry about."
          />
          
          <FeatureCard 
            heading="Integrated with your cloud" 
            content="Aqueduct workflows can run on any cloud infrastructure you use, like Kubernetes, Spark, or Airflow."
          />
          
          <FeatureCard 
            heading="Deep visibility into your code" 
            content="Regardless of where your code is running, Aqueduct captures the code and data at every stage, so you know what run and when it ran."
          />

          <FeatureCard 
            heading="Customizable metrics & checks" 
            content="Metrics and checks mean you can measure your ML pipelines, know when things are headed in the wrong direction, and act quickly."
          />

          <FeatureCard 
            heading="Easy to debug" 
            content="Every function runs has error logs and stack traces, so you can pinpoint errors quickly."
          />

          <FeatureCard 
            heading="Runs securely in your cloud" 
            content="Aqueduct is fully open-source, so you can be sure your code and data is always where it's supposed to be."
          />
        </Grid>
      </Box>
      
      <Box my={20} mx="auto" alignSelf="center">
        <Typography variant="h3" fontWeight="bold" textAlign="center">What our users are saying</Typography>

        {/* TODO(vikram): Make this a resuable component. */}
        <Grid container my={3} spacing={2} direction="row" alignItems="stretch" justifyContent="center">
          {/* TODO(vikram): hook these up to the cms. */}
          <QuoteCard
            imgPath='/testimonials/Jack Reynolds.jpeg'
            name='Jack Reynolds'
            title='Machine Learning Engineer, Securitas'
            quote='Aqueduct gives me a comprehensive view of the data flow in my ML pipelines. Right now, this context is scattered across a notebook and a couple Miro boards, but these pipelines change so fast that it&apos;s hard to keep track of them. To see all of my pipelines end-to- end and to see everything light up green is going to give me the confidence that I need to know everything&apos;s working and how well it&apos;s working.'
          />
          
          <QuoteCard
            imgPath='/testimonials/Pablo Vega-Behar.jpeg'
            name='Pablo Vega-Behar'
            title='Director of Data Science, Sparks & Honey'
            quote='Aqueduct makes it easy to add a couple decorators to your codebase and automatically capture metrics, track them over time, and enforce constraints on those measurements over time. I don&apos;t have to think about where or how I track these things because Aqueduct does it for me."'
          />
          
          <QuoteCard
            imgPath='/testimonials/Anchit Desai.jpeg'
            name='Anchit Desai'
            title='Lead Engineer, Replate'
            quote='Our previous infrastructure was built by data scientists and engineers with little knowledge of each others&apos; best practices. It worked but wasn&apos;t ideal for us. Aqueduct streamlines production data science by providing a simple Pythonic API that makes it easy to get models in production. We can focus on delivering better models rather than maintaining cloud infrastructure.'
          />
        </Grid>
      </Box>
      
      <Box my={20} mx="auto" alignSelf="center" textAlign="center">
        <Typography fontWeight="bold" component="span" display="inline" variant="h3">Why&nbsp;</Typography>
        <GradientTypography fontWeight="bold" component="span" display="inline" variant="h3">Aqueduct?</GradientTypography>

        <Grid container display="flex" my={3} spacing={4} direction="row" alignItems="stretch">
          <Grid item display="flex" flexDirection="column" maxWidth="50%">
            <Box flex={1} textAlign="left" display="flex" alignItems="start">
              <FontAwesomeIcon icon={faRocket} color={theme.palette.logo.light} fontSize="72px" />

              <Typography variant="h6" ml={3}>
                Get more value out of machine learning, faster. With Aqueduct, you can run experiments more quickly, 
                deploy models faster, and debug failures effectively.
              </Typography>
            </Box> 
          </Grid>

          <Grid item display="flex" flexDirection="column" maxWidth="50%">
            <Box flex={1} textAlign="left" display="flex" alignItems="start">
              <FontAwesomeIcon icon={faEye} color={theme.palette.logo.light} fontSize="72px" />

              <Typography variant="h6" ml={3}>
                Centralize your machine learning code, data, and metadata in a single place.
                Always know what's running, whether it worked, and who's responsible.
              </Typography>
            </Box> 
          </Grid>
          
          <Grid item display="flex" flexDirection="column" maxWidth="50%">
            <Box flex={1} textAlign="left" display="flex" alignItems="start">
              <FontAwesomeIcon icon={faCircleCheck} color={theme.palette.logo.light} fontSize="72px" />

              <Typography variant="h6" ml={3}>
                Have confidence that your models and predictions are behaving like they're supposed to, and
                detect failures before stakeholders and customers complain.
              </Typography>
            </Box> 
          </Grid>
          
          <Grid item display="flex" flexDirection="column" maxWidth="50%">
            <Box flex={1} textAlign="left" display="flex" alignItems="start">
              <FontAwesomeIcon icon={faLockOpen} color={theme.palette.logo.light} fontSize="72px" />

              <Typography variant="h6" ml={3}>
                Avoid vendor and cloud lock-in by using general-purpose, system-agnostic APIs. Experiment more
                nimbly with new tools and infrastructure.
              </Typography>
            </Box> 
          </Grid>
          
        </Grid>
      </Box>

      <Box my={20} mx="auto" alignSelf="center">
        <Grid spacing={5} container>
          <Grid item flex={1}>
            <Box>
              <img src="/aqueduct/logo_light_full_horizontal.png" height="40px" alt="The Aqueduct logo." style={{ filter: 'grayscale(100%)', opacity: '30%' }} />
              <GradientTypography my={2} color={gray.gray8} variant="h5">Get started with Aqueduct</GradientTypography>
              <Typography color={gray.gray8} variant="body1">Fully open-source and easy to setup on your laptop or in your cloud</Typography>

              <Box mt={3}>
                <Link color="#fff" variant="h6" href="https://docs.aqueducthq.com/quickstart-guide" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}>
                  Try Aqueduct →
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item flex={1}>
            <Box>
              <img src="/miscellanea/github.png" height="40px" alt="The Aqueduct logo." style={{ filter: 'grayscale(100%)', opacity: '30%'}} />
              <GradientTypography my={2} color={gray.gray8} variant="h5">Check out the code</GradientTypography>
              <Typography color={gray.gray8} variant="body1">See how Aqueduct works, make a suggestion, and share your feedback &mdash; we'd love to hear from you!</Typography>

              <Box mt={3}>
                <Link color="#fff" variant="h6" href="https://docs.aqueducthq.com/quickstart-guide" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.logo.bright2 } }}>
                  See our GitHub repo →
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item flex={1}>
            <Box>
              <img src="/miscellanea/slack.png" height="40px" alt="The Slack logo." style={{ filter: 'grayscale(100%)', opacity: '20%' }} />
              <GradientTypography my={2} color={gray.gray8} variant="h5">Join the community</GradientTypography>
              <Typography color={gray.gray8} variant="body1">Discuss MLOps, share feedback, and learn from top ML teams.</Typography>

              <Typography color="white" variant="h6" mt={3}>
                Join Slack →
              </Typography>
            </Box>
          </Grid>
        </Grid> 
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
