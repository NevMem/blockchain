import { AppBar, Button, Container, Toolbar, Typography, Paper, Stack, Icon, Divider, CircularProgress, Alert, AlertTitle } from "@mui/material";
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import WithAppBar from "../components/WithAppBar";
import { Company } from "../data/Company";
import companiesService from "../service/CompaniesService";
import useAsyncRequest, { RequestError, RequestSuccess } from "../utils/async";

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
                    <Typography variant='h5'>{props.company.name}</Typography>
                    <Typography variant='h6'>1 токен = {props.company.rate} ETH</Typography>
                    <Stack direction='row' justifyContent="flex-end" spacing={4}>
                        <Button color='secondary'>Info</Button>
                        <Button onClick={navigateToBuyTokens} variant="contained">Buy tokens</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

const CompaniesListImpl = (props: {companies: Company[]}) => {
    return (
        <Stack spacing={4}>
            {props.companies.map((elem, index) => {
                return <CompanyCard company={elem} key={index} />;
            })}
        </Stack>
    );
};

const CompaniesList = () => {
    const request = useAsyncRequest(() => companiesService.companies());
    if (request instanceof RequestError) {
        return (
            <Alert severity="error">
                <AlertTitle>Не удалось загрузить уомпании</AlertTitle>
                {JSON.stringify(request.message)}
            </Alert>
        );
    }

    if (request instanceof RequestSuccess) {
        return <CompaniesListImpl companies={request.result} />
    }

    return (
        <Stack direction='row' justifyContent='space-around'>
            <CircularProgress />
        </Stack>
    );
};

const HomePage = () => {

    return (
        <WithAppBar>
            <Stack spacing={2} style={{marginTop: '16px', marginBottom: '16px'}}>
                <Paper style={{padding: '24px', paddingTop: '36px', paddingBottom: '36px'}} variant='outlined'>
                    <Stack spacing={4} justifyItems='center'>
                        <Typography variant='h4' align='center'>На данном сайте вы можете приобрести токены различных компаний в обмен на ETH</Typography>
                        <Stack direction='row' justifyContent='space-around'>
                            <Button variant='contained' color='primary'>Купить!</Button>
                        </Stack>
                    </Stack>
                </Paper>
                <Typography variant="h3">Компании</Typography>
                <Paper variant="outlined" style={{padding: '16px'}}>
                    <CompaniesList />
                </Paper>
            </Stack>
        </WithAppBar>
    );
};

export default HomePage;
