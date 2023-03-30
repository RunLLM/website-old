import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

import { theme } from '../styles/theme';
import ImageWithBorder from './primitives/ImageWithBorder';

type QuoteCardProps = {
    imgPath: string;
    name: string;
    title: string;
    quote: string;
    isMobile: boolean;
};

const QuoteCard: React.FC<QuoteCardProps> = ({ imgPath, name, title, quote, isMobile }) => {
    return (
        <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
            <Paper
                elevation={4}
                sx={{
                    p: isMobile ? 2 : 3,
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                    flex: 1,
                    color: 'white',
                }}
            >
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box mr={2}>
                            <ImageWithBorder imgPath={imgPath} alt="" />
                        </Box>

                        <Box>
                            <Typography variant="body1">{name}</Typography>
                            <Typography variant="body2">{title}</Typography>
                        </Box>
                    </Box>

                    <Typography mt={2}>{quote}</Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

type QuotesProps = {
    isMobile: boolean;
};

const Quotes: React.FC<QuotesProps> = ({ isMobile }) => {
    return (
        <Box>
            <Typography variant="h3" fontWeight="bold" textAlign="center">
                What our users are saying
            </Typography>

            <Grid
                container
                my={3}
                spacing={2}
                direction="row"
                alignItems={isMobile ? 'center' : 'stretch'}
                justifyContent="center"
            >
                {/* TODO(vikram): hook these up to the cms. */}
                <QuoteCard
                    isMobile={isMobile}
                    imgPath="/testimonials/Jack Reynolds.jpeg"
                    name="Jack Reynolds"
                    title="Machine Learning Engineer"
                    quote="Aqueduct gives me a comprehensive view of the data flow in my ML pipelines. Today, this context is scattered across a notebook and a couple Miro boards, but these pipelines change so fast that it's hard to keep track of them. To see all of my pipelines end-to-end and to see everything light up green is going to give me the confidence that I need to know everything's working and how well it's working."
                />

                <QuoteCard
                    isMobile={isMobile}
                    imgPath="/testimonials/Pablo Vega-Behar.jpeg"
                    name="Pablo Vega-Behar"
                    title="Director of Data Science, Sparks & Honey"
                    quote="Aqueduct makes it easy to add a couple decorators to your codebase and automatically capture metrics, track them over time, and enforce constraints on those measurements over time. I don't have to think about where or how I track these things because Aqueduct does it for me."
                />

                <QuoteCard
                    isMobile={isMobile}
                    imgPath="/testimonials/Anchit Desai.jpeg"
                    name="Anchit Desai"
                    title="Lead Engineer, Replate"
                    quote="Our previous infrastructure was built by data scientists and engineers with little knowledge of each others' best practices. It worked but wasn't ideal for us. Aqueduct streamlines production data science by providing a simple Pythonic API that makes it easy to get models into production. We can focus on delivering better models rather than maintaining cloud infrastructure."
                />
            </Grid>
        </Box>
    );
};

export default Quotes;
