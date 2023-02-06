import React, { useEffect } from 'react';
import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import Layout from '../components/primitives/Layout';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import GradientButton from '../components/primitives/GradientButton.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { theme } from '../styles/theme';
import { gray } from '@radix-ui/colors';

type IntegrationCardProps = {
    logoPath: string;
    name: string;
    description: string;
    comingSoon?: boolean;
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({ logoPath, name, description, comingSoon = false }) => {
    return (
        <Grid item display="flex" flexDirection="column">
            <Paper 
                elevation={3}
                sx={{ 
                    width: '375px',
                    backgroundColor: theme.palette.gray.darkGrayOffset, 
                    borderRadius: '4px', 
                    p: 2, 
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                }}
            >   
                <Box display="flex" flexDirection="column" alignItems="center" minWidth="100px" mx={2}>
                    <img src={logoPath} height="80px" style={{ opacity: comingSoon ? '0.5' : '1' }} />
                    {
                        comingSoon &&
                        <Typography mt={1} fontStyle="italic" variant="body2" color={gray.gray10}>Coming soon!</Typography>
                    }
                </Box>

                <Box p={1} ml={1}>
                    <Typography variant="h6" fontWeight="bold" color={gray.gray7}>{name}</Typography>
                    <Typography variant="body1" color="white" mt={1}>
                        {description}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

const IntegrationsPage: React.FC = () => {
    useEffect(() => {
        document.title = "Integrations | Aqueduct";
    });

    return (
        <Layout>
            <Typography variant="h2" component="h1" display="inline" fontWeight="bold" textAlign="center">
                Aqueduct works with&nbsp;
                <GradientTypography variant="h2" component="span" fontWeight="bold">
                    your infrastructure
                </GradientTypography>
            </Typography>

            <Typography variant="h6" maxWidth="800px" color="white" textAlign="center" mx="auto" my={2}>
                Aqueduct comes with built-in integrations to common cloud infrastructure, so you can 
                manage machine learning in the cloud without having to rip-and-replace every tool you 
                use. Let us know if you'd like to see something else here!
            </Typography>

            <Link 
                href="https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D"
                sx={{ textDecoration: 'none' }}
                mx="auto"
                my={3}
            >
                <GradientButton variant="outlined" sx={{ fontSize: "24px" }}>
                    <FontAwesomeIcon icon={faGithub} color={theme.palette.logo.medium} />
                    &nbsp;Share your feedback
                </GradientButton>
            </Link>

            <Box my={8}>
                <Typography variant="h3" component="h2" fontWeight="bold">
                    <GradientTypography variant="h3" fontWeight="bold" display="inline">
                        Compute&nbsp;
                    </GradientTypography>
                    Integrations
                </Typography>

                <Grid container alignItems="stretch" direction="row" spacing={3} my={2}>
                    <IntegrationCard
                        logoPath='/integrations/airflow.png'
                        name='Airflow'
                        description='Use Aqueduct&apos;s API to deploy workflows onto your Apache Airflow cluster but with deep visibility.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/conda.png'
                        name='Conda'
                        description='Conda gives you strong Python environment isolation, so you can use your favorite libraries.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/databricks.png'
                        name='Databricks'
                        description='Launch Aqueduct workflows on top of the Databricks&apos; Jobs API for on-demand Spark clusters.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/kubernetes.png'
                        name='Kubernetes'
                        description='Launch Aqueduct operators as Kubernetes pods with full control over what resources you use.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/lambda.png'
                        name='AWS Lambda'
                        description='Use Lambda&apos; serverless functions to run your Aqueduct workflows with minimal configuration.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/spark.png'
                        name='Apache Spark'
                        description='Run Aqueduct workflows on your existing Spark clusters to scale your machine learning.'
                        comingSoon
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/Ray.png'
                        name='Ray'
                        description='Use Ray to distribute your Python execution from your Aqueduct workflows.'
                        comingSoon
                    />
                </Grid>
            </Box>
            
            <Box my={8}>
                <Typography variant="h3" component="h2" fontWeight="bold">
                    <GradientTypography variant="h3" fontWeight="bold" display="inline">
                        Data&nbsp;
                    </GradientTypography>
                    Integrations
                </Typography>
                
                <Grid container alignItems="stretch" direction="row" spacing={3} my={2}>
                    <IntegrationCard
                        logoPath='/integrations/athena.png'
                        name='AWS Athena'
                        description='AWS Athena allows you to run scalable SQL queries over data stored in your S3 buckets.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/bigquery.svg'
                        name='BigQuery'
                        description='BigQuery is Google Cloud&apos;s scalable cloud data warehouse.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/gcs.png'
                        name='Google Cloud Storage'
                        description='Use Google Cloud Storage for object storage within the GCP ecosystem.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/mariadb.png'
                        name='MariaDB'
                        description='MariaDB is an open-source fork of MySQL with a fully-compatible MySQL API.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/mongodb.png'
                        name='MongoDB'
                        description='MongoDB gives you scalable, flexible document storage in the cloud.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/mysql.png'
                        name='MySQL'
                        description='MySQL is one of the world&apos; most popular relational databases.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/postgres.png'
                        name='Postgres'
                        description='Postgres is the world&apos;s most popular open-source RDBMS.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/redshift.png'
                        name='Redshift'
                        description='AWS Redshift is a highly-scalable data warehouse.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/s3.png'
                        name='AWS S3'
                        description='AWS S3 is a highly-scalable, extremely flexible object storage system.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/snowflake.png'
                        name='Snowflake'
                        description='Snowflake is a highly-scalable cloud data warehouse that runs across clouds.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/sqlite.png'
                        name='SQLite'
                        description='SQLite is a powerful, in-process relational database.'
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/dynamodb.png'
                        name='DynamoDB'
                        description='AWS DynamoDB is a low-latency key-value and document database.'
                        comingSoon
                    />
                    
                    <IntegrationCard
                        logoPath='/integrations/redis.png'
                        name='Redis'
                        description='Redis is an open-source in-memory database and caching layer.'
                        comingSoon
                    />
               </Grid>     
            </Box>
        </Layout>
    );
};

export default IntegrationsPage;