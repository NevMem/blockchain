import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const WithAppBar = (props: { children: any | undefined }) => {

    const nav = useNavigate();

    const navigateToCompanies = () => {
        nav('/');
    };

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Blockchain
                        </Typography>
                        <Button onClick={navigateToCompanies}>Companies</Button>
                        <Button>Profile</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                {props.children}
            </Container>
        </Fragment>
    );
};

export default WithAppBar;
