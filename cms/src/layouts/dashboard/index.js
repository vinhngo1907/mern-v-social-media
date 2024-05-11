// ----------------------------------------------------------------------
import { Outlet } from "react-router-dom";
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    paddingTop: APP_BAR_MOBILE + 24,
    minHeight: '100%',
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

export default function DashboardLayout() {
    return (
        <RootStyle>
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    )
}