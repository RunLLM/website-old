import Prism from 'prismjs'; // eslint-disable-line
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { theme } from '../styles/theme';
import 'prismjs/components/prism-python';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import './custom-prism.css'; // This import must always come after the Prism theme import.

const CodeSnippet = `@op(
  engine='eks-us-east-2', 
  resources={'gpu_resource_name': 'nvidia.com/gpu'}
)
def train(features):
  return model.train(features)

@metric(engine='lambda-us-east-2')
def validate(model):
    return validation_test(model)

validate(train(features))`;

type ProductPreviewProps = {
    isMobile: boolean;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({ isMobile }) => {
    const [highlightImage, setHighlightImage] = useState(false);
    
    useEffect(() => {
        Prism.highlightAll();
    }, []);


    const mobileProductPreview = (
      <>
        <Box
          p={1}
          sx={{
            backgroundColor: theme.palette.gray.darkGrayOffset,
            borderRadius: '8px',
          }}
        >
          <pre
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              boxShadow: 'none',
              width: '100%',
              padding: 0,
              margin: 0,
            }}
          >
            <code className="language-py" style={{ fontSize: '11px' }} >
              {CodeSnippet}
            </code>
          </pre>
        </Box>

        <Box mt={2} flex={1} width='100%'>
          <img src="/aqueduct/product.png" width="100%" style={{ borderRadius: '8px' }} />
        </Box>
      </>
    );

    const desktopProductPreview = (
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Box
          p={3}
          sx={{
            backgroundColor: theme.palette.gray.darkGrayOffset,
            borderRadius: '8px',
            transition: 'all 500ms ease-in-out',
            ':hover': highlightImage
              ? {
                opacity: '0.9',
                cursor: 'pointer',
                transform: 'translateY(-10px)',
              }
              : {},
            opacity: highlightImage ? '0.7' : '1.0',
          }}
          width={highlightImage ? '625px' : '100%'}
          zIndex={highlightImage ? 1 : 2}
          onClick={highlightImage ? () => setHighlightImage(!highlightImage) : undefined}
        >
          <pre
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              boxShadow: 'none',
              width: '100%',
              padding: 0,
              margin: 0,
            }}
          >
            <code
              className="language-py"
              style={{
                fontSize: highlightImage ? '12px' : '15px',
                transition: 'all 500ms ease-in-out',
                width: '100%',
              }}
            >
              {CodeSnippet}
            </code>
          </pre>
        </Box>

        <Box
          mt="-36px"
          flex={1}
          zIndex={highlightImage ? 2 : 1}
          width={highlightImage ? '100%' : '550px'}
          sx={{
            opacity: highlightImage ? '1.0' : '0.7',
            ':hover': highlightImage
              ? {}
              : {
                width: '580px',
                cursor: 'pointer',
                opacity: '0.9',
              },
            transition: 'all 500ms ease-in-out',
          }}
          onClick={highlightImage ? undefined : () => setHighlightImage(!highlightImage)}
        >
          <img src="/aqueduct/product.png" width="100%" style={{ borderRadius: '8px' }} />
        </Box>
      </Box>
    );

    return ( 
        isMobile ? mobileProductPreview : desktopProductPreview
    );
};

export default ProductPreview;