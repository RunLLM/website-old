import { faCircleCheck, faCircleQuestion, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Table, TableBody, TableCell as MuiTableCell, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gray } from '@radix-ui/colors';
import React from 'react';

import { theme } from '../styles/theme';
import GradientTypography from './primitives/GradientTypography.styles';

const TableCell = styled(MuiTableCell)({
    borderBottom: 'none',
});

type FeatureIconProps = {
    status: 'yes' | 'no' | 'question' | 'ongoing';
};

const FeatureIcon: React.FC<FeatureIconProps> = ({ status }) => {
    let color, icon;
    if (status === 'yes') {
        color = theme.palette.logo.bright2;
        icon = faCircleCheck;
    } else if (status === 'no') {
        color = gray.gray8;
        icon = faCircleXmark;
    } else if (status === 'ongoing') {
        color = theme.palette.logo.light;
        icon = faSpinner;
    } else {
        color = 'white';
        icon = faCircleQuestion;
    }

    return (
        <TableCell sx={{ color: color, fontSize: '28px' }} align="center">
            <FontAwesomeIcon icon={icon} />
        </TableCell>
    );
};

type FeatureNameProps = {
    name: string;
    isMobile: boolean;
};

const FeatureName: React.FC<FeatureNameProps> = ({ isMobile, name }) => {
    return (
        <TableCell sx={{ color: 'white' }}>
            <Typography variant={isMobile ? 'body1' : 'h6'}>{name}</Typography>
        </TableCell>
    );
};

export type FeatureEntry = {
    name: string;
    aqueductHas: 'yes' | 'no' | 'question' | 'ongoing';
    competitorHas: 'yes' | 'no' | 'question' | 'ongoing';
};

type FeaturesTableProps = {
    isMobile: boolean;
    features: FeatureEntry[];
    competitorHeader: React.ReactElement;
};

const FeaturesTable: React.FC<FeaturesTableProps> = ({ isMobile, features, competitorHeader }) => {
    return (
        <Box
            maxWidth="800px"
            sx={{ backgroundColor: theme.palette.gray.darkGrayOffset, p: isMobile ? 1 : 3, borderRadius: '8px' }}
        >
            <Table
                sx={{
                    width: '100%',
                    backgroundColor: theme.palette.gray.darkGrayOffset,
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <GradientTypography variant={isMobile ? 'h6' : 'h5'}>Features</GradientTypography>
                        </TableCell>

                        <TableCell align="center">
                            <img
                                src="/aqueduct/logo_light_full_horizontal.png"
                                height={isMobile ? '20px' : '30px'}
                                alt="The Aqueduct logo."
                            />
                        </TableCell>

                        <TableCell align="center">{competitorHeader}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {features.map((feature) => {
                        return (
                            <TableRow>
                                <FeatureName isMobile={isMobile} name={feature.name} />

                                <FeatureIcon status={feature.aqueductHas} />
                                <FeatureIcon status={feature.competitorHas} />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
};

export default FeaturesTable;
