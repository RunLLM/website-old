import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/primitives/Layout';
import './blog.css';
import { Box, Typography } from '@mui/material';
import { gray } from '@radix-ui/colors';

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
    
    const [pageWidth, setPageWidth] = useState<number>(1440);
    useEffect(() => {
        window.addEventListener('resize', () => setPageWidth(window.innerWidth));

        setPageWidth(window.innerWidth);
    }, []);
    const isMobile = pageWidth < 768;


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