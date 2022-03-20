import { AppBar, Button, Container, Toolbar, Typography, Paper, Stack, Icon, Divider } from "@mui/material";
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import WithAppBar from "../components/WithAppBar";
import { Company } from "../data/Company";
import companiesService from "../service/CompaniesService";

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

    return (
        <WithAppBar>
            <Stack spacing={2} style={{marginTop: '16px'}}>
                <Typography variant="h3" >Companies</Typography>
                <Paper variant="outlined" style={{padding: '16px'}}>
                    <CompaniesList companies={companiesService.companies()} />
                </Paper>
            </Stack>
        </WithAppBar>
    );
};

export default HomePage;
