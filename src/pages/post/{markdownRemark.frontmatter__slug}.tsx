import './blog.css';

import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import ImageWithBorder from '../../components/primitives/ImageWithBorder';
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
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                <Typography variant="h3" component="h1" color={gray.gray12}>
                    {data.post.frontmatter.title}
                </Typography>

                {authorsComponent}

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
