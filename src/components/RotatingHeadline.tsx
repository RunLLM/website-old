import '../components/animations/slidein.css';

import { Box, Typography } from '@mui/material';
import React from 'react';

import { theme } from '../styles/theme';
import GradientTypography from './primitives/GradientTypography.styles';

// NOTE(vikram): If you're changing this, you'll have to adjust both the animation in the element
// below as well as the CSS in slidein.css -- the CSS is hardcoded based on the number of elements
// here.
const RotatingHeadlineElements = [
    'Deploy LLMs',
    'Train models',
    'Make predictions',
    'Run experiments',
    'Featurize data',
];

type RotatingHeadlineProps = {
    isMobile: boolean;
};

const RotatingHeadline: React.FC<RotatingHeadlineProps> = ({ isMobile }) => {
    return (
        <Typography component="h1" variant="h2" fontWeight="bold" textAlign="center">
            <Box
                height={isMobile ? '144px' : '72px'}
                sx={{
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                    borderRadius: '8px',
                    px: 1,
                    ml: 1,
                }}
                display="inline-flex"
                overflow="hidden"
            >
                <Box
                    display="inline-flex"
                    flexDirection="column"
                    sx={{
                        // This animation needs to be adjusted if we change the
                        // list of rotating elements above. Add 2.5s to the animation
                        // duration per element. Note that is len(elements) + 1 because
                        // we add the last element back to make it seem infinite.
                        animation: `${isMobile ? 'moveOuterElementMobile' : 'moveOuterElement'} 15s infinite 2.5s`,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        perspective: 1000,
                        WebkitPerspective: 1000,
                    }}
                    height={isMobile ? '144px' : '72px'}
                >
                    {RotatingHeadlineElements.map((element) => (
                        <Box key={element} className="flicker-child">
                            <GradientTypography variant="h2" fontWeight="bold">
                                {element}
                            </GradientTypography>
                        </Box>
                    ))}

                    {/* We need to add the element again at the beginning to keep the rotation seeming infinite. */}
                    <Box className="flicker-child">
                        <GradientTypography variant="h2" fontWeight="bold">
                            {RotatingHeadlineElements[0]}
                        </GradientTypography>
                    </Box>
                </Box>
            </Box>

            <br />

            <GradientTypography component="span" variant="h2" fontWeight="bold" textAlign="center">
                on any cloud infrastructure
            </GradientTypography>
        </Typography>
    );
};

export default RotatingHeadline;
