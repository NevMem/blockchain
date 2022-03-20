import { AppBar, Button, Container, Toolbar, Typography, Paper, Stack, Icon, Divider } from "@mui/material";
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { Company } from "../data/Company";

const WithAppBar = (props: { children: any | undefined }) => {
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
                        <Button>Companies</Button>
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

const CompanyCard = (props: {company: Company}) => {

    const nav = useNavigate();

    const navigateToBuyTokens = () => {
        nav(`/buy/${props.company.id}`);
    };

    return (
        <Paper elevation={2} style={{padding: '16px'}}>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <div style={{width: '120px', height: '120px'}}>
                    <img src={props.company.imageUrl} alt={props.company.id} style={{objectFit: 'contain', width: '120px', height: '120px'}} />
                </div>
                <Stack justifyContent="space-between" style={{width: '100%'}}>
                    <Typography variant='h6'>{props.company.name}</Typography>
                    <Stack direction='row' justifyContent="flex-end" spacing={4}>
                        <Button>Info</Button>
                        <Button onClick={navigateToBuyTokens} variant="contained">Buy tokens</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

const CompaniesList = (props: {companies: Company[]}) => {
    return (
        <Stack spacing={4}>
            {props.companies.map((elem, index) => {
                return <CompanyCard company={elem} key={index} />;
            })}
        </Stack>
    );
};

const HomePage = () => {

    const companies: Company[] = [
        {
            id: 'google',
            name: 'Google',
            imageUrl: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
        },
        {
            id: 'twitter',
            name: 'Twitter',
            imageUrl: 'https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png',
        },
        {
            id: 'space-x',
            name: 'SpaceX',
            imageUrl: 'https://www.freepnglogos.com/uploads/astronaut-png/astronaut-space-clip-art-5.png',
        },
    ];

    return (
        <WithAppBar>
            <Stack spacing={2} style={{marginTop: '16px'}}>
                <Typography variant="h3" >Companies</Typography>
                <Paper variant="outlined" style={{padding: '16px'}}>
                    <CompaniesList companies={companies} />
                </Paper>
            </Stack>
        </WithAppBar>
    );
};

export default HomePage;
