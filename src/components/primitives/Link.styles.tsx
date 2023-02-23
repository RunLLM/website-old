import { Link } from "@mui/material";
import { styled } from '@mui/material/styles';
import { theme } from "../../styles/theme";

const AqLink = styled(Link)({
    color: theme.palette.logo.bright2,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.logo.light,
    },
});

export { AqLink as Link };