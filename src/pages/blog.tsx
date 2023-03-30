import { Box, Divider, Grid, Link, Paper, Tooltip, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import GradientTypography from '../components/primitives/GradientTypography.styles';
import ImageWithBorder from '../components/primitives/ImageWithBorder';
import Layout from '../components/primitives/Layout';
import { theme } from '../styles/theme';

type PostCardProps = {
    title: string;
    authorNames: string[];
    authorImages: string[];
    slug: string;
    summary: string;
    date: Date;
    isMobile: boolean;
};

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getDateString = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// NOTE: The featured post only supports one author for now. Need to fix this.
const FeaturedPostCard: React.FC<PostCardProps> = ({
    title,
    authorNames,
    authorImages,
    slug,
    summary,
    date,
    isMobile,
}) => {
    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: '4px',
                p: 3,
                background: theme.palette.gray.darkGrayOffset,
                textAlign: 'left',
            }}
        >
            <Box
                sx={{
                    borderRadius: '8px',
                    background: `linear-gradient(to right, ${theme.palette.logo.medium}, ${theme.palette.logo.bright2})`,
                    color: 'white',
                    width: 'fit-content',
                    px: 2,
                    py: 1,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                }}
            >
                Featured Post
            </Box>
            <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                <Typography
                    color="white"
                    fontWeight="bold"
                    mt={2}
                    variant="h4"
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                            textDecorationColor: theme.palette.logo.bright2,
                            textDecorationThickness: '2px',
                        },
                    }}
                >
                    {title}
                </Typography>
            </Link>

            <Typography color={gray.gray8} mb={3} mt={1}>
                {summary}
            </Typography>

            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <ImageWithBorder imgPath={authorImages[0]} size="40px" alt="" />
                </Box>

                <Box flex={1}>
                    <Typography color="white" variant="body1">
                        {authorNames[0]}
                    </Typography>
                    <Typography variant="body2" color={gray.gray8}>
                        {getDateString(date)}
                    </Typography>
                </Box>

                <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                    <GradientTypography
                        variant={isMobile ? 'body1' : 'h6'}
                        mr={isMobile ? 0 : 3}
                        ml={isMobile ? 1 : 0}
                        sx={{
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                cursor: 'pointer',
                            },
                        }}
                    >
                        Read More →
                    </GradientTypography>
                </Link>
            </Box>
        </Paper>
    );
};

const PostCard: React.FC<PostCardProps> = ({ title, authorNames, authorImages, slug, summary, date, isMobile }) => {
    let authorSection;
    if (authorNames.length === 1) {
        authorSection = (
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <ImageWithBorder imgPath={authorImages[0]} size="40px" alt={`${authorNames[0]}'s photo`} />
                </Box>

                <Box>
                    <Typography color="white" variant="body1">
                        {authorNames}
                    </Typography>
                    <Typography variant="body2" color={gray.gray8}>
                        {getDateString(date)}
                    </Typography>
                </Box>
            </Box>
        );
    } else {
        authorSection = (
            <Box display="flex" alignItems="center">
                {authorImages.map((img, idx) => (
                    <Tooltip key={idx} title={authorNames[idx]} arrow>
                        <Box display="flex" justifyItems="center" mr={2}>
                            <ImageWithBorder imgPath={img} size="40px" alt={`${authorNames[idx]}'s photo`} />
                        </Box>
                    </Tooltip>
                ))}

                <Typography variant="body2" color={gray.gray8}>
                    {getDateString(date)}
                </Typography>
            </Box>
        );
    }

    return (
        <Grid item display="flex" flexDirection="column" xs={isMobile ? 12 : 6}>
            <Paper
                elevation={4}
                sx={{
                    borderRadius: '4px',
                    p: 3,
                    background: theme.palette.gray.darkGrayOffset,
                    textAlign: 'left',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                    <Typography
                        color="white"
                        fontWeight="bold"
                        mt={2}
                        variant="h5"
                        sx={{
                            '&:hover': {
                                textDecoration: 'underline',
                                textDecorationColor: theme.palette.logo.bright2,
                                textDecorationThickness: '2px',
                            },
                        }}
                    >
                        {title}
                    </Typography>
                </Link>

                <Typography color={gray.gray8} mb={3} mt={1} flex={1}>
                    {summary}
                </Typography>

                <Box display="flex" alignItems="center">
                    <Box flex={1}>{authorSection}</Box>

                    <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                        <GradientTypography
                            variant="body1"
                            mr={3}
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            Read More →
                        </GradientTypography>
                    </Link>
                </Box>
            </Paper>
        </Grid>
    );
};

type BlogPageProps = {
    data: {
        team: {
            nodes: {
                frontmatter: {
                    image: string;
                    name: string;
                    title: string;
                    slug: string;
                };
                rawMarkdownBody: string;
            }[];
        };

        posts: {
            nodes: {
                frontmatter: {
                    title: string;
                    slug: string;
                    author: string;
                    date: Date;
                    summary: string;
                    featured: boolean;
                };

                html: string;
            }[];
        };
    };
};

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
    useEffect(() => {
        document.title = 'Aqueduct Blog';
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

    const processedAuthors: { [key: string]: { name: string; image: string } } = {};
    data.team.nodes.map((teamMember) => {
        processedAuthors[teamMember.frontmatter.slug] = {
            name: teamMember.frontmatter.name,
            image: teamMember.frontmatter.image,
        };
    });

    const featuredPost = data.posts.nodes.filter((post) => post.frontmatter.featured)[0]; // There should only be one.
    const blogPostCards = data.posts.nodes
        .filter((post) => !post.frontmatter.featured)
        .sort((p1, p2) => {
            const date1 = new Date(p1.frontmatter.date);
            const date2 = new Date(p2.frontmatter.date);

            if (date1 > date2) {
                return -1;
            } else if (date1 < date2) {
                return 1;
            } else {
                return 0;
            }
        })
        .map((post) => {
            const authorNames: string[] = [],
                authorImages: string[] = [];
            // The expectiation is that the authors field is comma-separate list of people's
            // tags.
            const authors = post.frontmatter.author.split(',').map((name) => name.trim());

            authors.forEach((author) => {
                authorNames.push(processedAuthors[author].name);
                authorImages.push(processedAuthors[author].image);
            });

            return (
                <PostCard
                    isMobile={isMobile}
                    key={post.frontmatter.slug}
                    title={post.frontmatter.title}
                    authorNames={authorNames}
                    authorImages={authorImages}
                    slug={post.frontmatter.slug}
                    summary={post.frontmatter.summary}
                    date={new Date(post.frontmatter.date)}
                />
            );
        });

    // NOTE: Featured posts currently only have a single author. Need to fix this.
    return (
        <Layout isMobile={isMobile} includeBanner={false}>
            <Box textAlign="center" mx="auto" maxWidth="1000px">
                <FeaturedPostCard
                    isMobile={isMobile}
                    title={featuredPost.frontmatter.title}
                    authorNames={[processedAuthors[featuredPost.frontmatter.author].name]}
                    authorImages={[processedAuthors[featuredPost.frontmatter.author].image]}
                    slug={featuredPost.frontmatter.slug}
                    summary={featuredPost.frontmatter.summary}
                    date={new Date(featuredPost.frontmatter.date)}
                />
                <Divider sx={{ my: 5, backgroundColor: gray.gray8 }} />

                <Grid container spacing={3} alignItems="stretch" direction="row">
                    {blogPostCards}
                </Grid>
            </Box>
        </Layout>
    );
};

export const teamQuery = graphql`
    {
        posts: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//blog//" } }) {
            nodes {
                frontmatter {
                    title
                    slug
                    author
                    date
                    summary
                    featured
                }
                rawMarkdownBody
            }
        }

        team: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//team//" } }) {
            nodes {
                frontmatter {
                    image
                    name
                    title
                    slug
                }
                rawMarkdownBody
            }
        }
    }
`;

export default BlogPage;
