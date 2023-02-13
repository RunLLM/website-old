import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/primitives/Layout';
import './blog.css';
import { Box, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';
import { useMediaQuery } from 'react-responsive'

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
    
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Layout variant="light" isMobile={isMobile}>
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                <Typography variant="h3" component="h1" color={gray.gray12}>{data.post.frontmatter.title}</Typography>

                <div className='blog' dangerouslySetInnerHTML={{ __html: data.post.html }} />
            </Box>
        </Layout>
    );  

};

export const pageQuery = graphql`
  query($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        slug
        title
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

export default BlogPostPage;