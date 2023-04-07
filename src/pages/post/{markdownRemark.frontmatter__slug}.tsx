import './blog.css';

import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import ImageWithBorder from '../../components/primitives/ImageWithBorder';
import Layout from '../../components/primitives/Layout';
import { Link } from '../../components/primitives/Link.styles';
import { theme } from '../../styles/theme';
import TryButton from '../../components/buttons/TryButton';
import GitHubButton from '../../components/buttons/GitHubButton';

type BlogPostPageProps = {
    data: {
        post: {
            frontmatter: {
                title: string;
                date: Date;
                author: string;
            };
            html: string;
        };

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
    };
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ data }) => {
    useEffect(() => {
        document.title = `${data.post.frontmatter.title} | Aqueduct`;
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const authors = [];
    if (!data.post.frontmatter.author) {
        return null;
    }

    const authorsList = data.post.frontmatter.author.split(',');

    for (const entry of authorsList) {
        for (const member of data.team.nodes) {
            if (member.frontmatter.slug === entry) {
                authors.push(member);
                break;
            }
        }
    }

    const authorsComponent = (
        <Box
            display="flex"
            my={1}
            alignItems={isMobile ? 'start' : 'center'}
            flexDirection={isMobile ? 'column' : 'row'}
        >
            {authors.map((author) => {
                return (
                    <Box key={author} display="flex" alignItems="center" mr={isMobile ? 0 : 1} mb={isMobile ? 1 : 0}>
                        <ImageWithBorder imgPath={author.frontmatter.image} alt={author.frontmatter.name} size="40px" />

                        <Typography fontSize="18px" color={gray.gray11} ml={1}>
                            {author.frontmatter.name}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );

    return (
        <Layout variant="light" isMobile={isMobile} includeBanner={false}>
            <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto' }}>
                <Typography variant="h3" component="h1" color={gray.gray12}>
                    {data.post.frontmatter.title}
                </Typography>

                {authorsComponent}

                <div className="blog" dangerouslySetInnerHTML={{ __html: data.post.html }} />

                <hr />

                <Box mx="auto" width="fit-content" mt={3} flexDirection={isMobile ? 'column' : 'row' } display="flex" alignItems="center">
                    <TryButton variant="contained" fontSize="20px" />

                    <Box mt={isMobile ? 1 : 0} ml={isMobile ? 0 : 2}>
                        <GitHubButton variant="outlined" fontSize="20px" />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export const pageQuery = graphql`
    query ($id: String!) {
        post: markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                date
                slug
                title
                author
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

export default BlogPostPage;
