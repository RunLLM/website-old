import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import Layout from '../components/primitives/Layout';
import { theme } from '../styles/theme';
import ImageWithBorder from '../components/primitives/ImageWithBorder';
import { gray } from '@radix-ui/colors';
import GradientTypography from '../components/primitives/GradientTypography.styles';
import { graphql } from 'gatsby';

type PostCardProps = {
    title: string;
    authorName: string;
    authorImage: string;
    slug: string;
    summary: string;
    date: Date;
    isMobile: boolean;
};

const monthNames = [
    "January", 
    "February",
    "March",
    "April",
    "May",
    "June",
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December",
];

const getDateString = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
};

const FeaturedPostCard: React.FC<PostCardProps> = ({ title, authorName, authorImage, slug, summary, date, isMobile}) => {
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
            <Box sx={{
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
                        } 
                    }}
                >
                    {title}
                </Typography>
            </Link>


            <Typography color={gray.gray8} mb={3} mt={1}>
                {summary}
            </Typography>

            <Box display="flex" alignItems="center">
                <ImageWithBorder imgPath={authorImage} size="40px" />

                <Box flex={1}>
                    <Typography color="white" variant="body1">{authorName}</Typography>
                    <Typography variant="body2" color={gray.gray8}>{getDateString(date)}</Typography>
                </Box>

                <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                    <GradientTypography
                        variant={isMobile ? "body1" : "h6"}
                        mr={3}
                        sx={{
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                cursor: 'pointer',
                            }
                        }}
                    >
                        Read More →
                    </GradientTypography>
                </Link>
            </Box>

        </Paper>
    );
};

const PostCard: React.FC<PostCardProps> = ({ title, authorName, authorImage, slug, summary, date, isMobile }) => {
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
                            }
                        }}
                    >
                        {title}
                    </Typography>
                </Link>


                <Typography color={gray.gray8} mb={3} mt={1} flex={1}>
                    {summary}
                </Typography>

                <Box display="flex" alignItems="center">
                    <ImageWithBorder imgPath={authorImage} size="40px" />

                    <Box flex={1}>
                        <Typography color="white" variant="body1">{authorName}</Typography>
                        <Typography variant="body2" color={gray.gray8}>{getDateString(date)}</Typography>
                    </Box>

                    <Link href={`/post/${slug}`} sx={{ textDecoration: 'none' }}>
                        <GradientTypography
                            variant="body1"
                            mr={3}
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    cursor: 'pointer',
                                }
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
        document.title = "Aqueduct Blog";
    });
 
    const [pageWidth, setPageWidth] = useState<number>(1440);
    useEffect(() => {
        window.addEventListener('resize', () => setPageWidth(window.innerWidth));

        setPageWidth(window.innerWidth);
    }, []);
    const isMobile = pageWidth < 768;

    const processedAuthors: { [key: string] : { name: string; image: string } } = {};
    data.team.nodes.map((teamMember) => {
        processedAuthors[teamMember.frontmatter.slug] = { name: teamMember.frontmatter.name, image: teamMember.frontmatter.image };
    });

    const featuredPost = data.posts.nodes.filter((post) => post.frontmatter.featured)[0]; // There should only be one.
    const blogPostCards = data.posts.nodes.filter((post) => !post.frontmatter.featured).
        sort((p1, p2) => {
            const date1 = new Date(p1.frontmatter.date);
            const date2 = new Date(p2.frontmatter.date);

            if (date1 > date2) {
                return -1;
            } else if (date1 < date2) {
                return 1;
            } else {
                return 0;
            }
        }).
        map((post) => {
            return (
                <PostCard
                    isMobile={isMobile}
                    key={post.frontmatter.slug}
                    title={post.frontmatter.title}
                    authorName={processedAuthors[post.frontmatter.author].name}
                    authorImage={processedAuthors[post.frontmatter.author].image}
                    slug={post.frontmatter.slug}
                    summary={post.frontmatter.summary}
                    date={new Date(post.frontmatter.date)}
                />
            );
        });

    return (
        <Layout isMobile={isMobile}>
            <Box textAlign="center" mx="auto" maxWidth="1000px">
                <FeaturedPostCard
                    isMobile={isMobile}
                    title={featuredPost.frontmatter.title}
                    authorName={processedAuthors[featuredPost.frontmatter.author].name}
                    authorImage={processedAuthors[featuredPost.frontmatter.author].image}
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
        posts: allMarkdownRemark(filter: {fileAbsolutePath: { regex: "//blog//" }}) {
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
        
        team: allMarkdownRemark(filter: {fileAbsolutePath: { regex: "//team//" }}) {
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