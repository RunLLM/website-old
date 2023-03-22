import './blog.css';

import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Layout from '../../components/primitives/Layout';
import { Link } from '../../components/primitives/Link.styles';
import { theme } from '../../styles/theme';

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

    return (
        <Layout variant="light" isMobile={isMobile}>
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                <Typography variant="h3" component="h1" color={gray.gray12}>
                    {data.post.frontmatter.title}
                </Typography>

                <div className="blog" dangerouslySetInnerHTML={{ __html: data.post.html }} />

                <hr />

                <Typography variant="body1" fontStyle="italic" textAlign="center">
                    We&apos;d love to hear from you!&nbsp;
                    <Link href="https://github.com/aqueducthq/aqueduct">Star us on GitHub</Link>,&nbsp;
                    <Link href="https://slack.aqueducthq.com">join our community</Link>, or{' '}
                    <Link href="https://github.com/aqueducthq/aqueduct/issues/new">start a discussion</Link>.&nbsp;
                </Typography>

                <Box mx="auto" display="flex" alignItems="center" justifyContent="center" width="100%" mt={3}>
                    <Link href="/" mx={2}>
                        <img src="/aqueduct/logo_two_tone.png" height="45px" />
                    </Link>

                    <Link
                        href="https://github.com/aqueducthq/aqueduct"
                        sx={{ color: theme.palette.logo.dark, fontSize: '45px' }}
                        mx={2}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>

                    <Link
                        href="https://twitter.com/aqueducthq"
                        sx={{ color: theme.palette.logo.dark, fontSize: '45px' }}
                        mx={2}
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>

                    <Link
                        href="https://linkedin.com/company/aqueducthq"
                        sx={{ color: theme.palette.logo.dark, fontSize: '45px' }}
                        mx={2}
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>

                    <Link
                        href="https://youtube.com/@AqueductHQ"
                        sx={{ color: theme.palette.logo.dark, fontSize: '45px' }}
                        mx={2}
                    >
                        <FontAwesomeIcon icon={faYoutube} />
                    </Link>
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
