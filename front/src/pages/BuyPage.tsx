import WithAppBar from "../components/WithAppBar";
import { useParams } from "react-router-dom";
import { Stack, Typography, Paper, CircularProgress, Alert, AlertTitle } from "@mui/material";
import companiesService from "../service/CompaniesService";
import { Company } from "../data/Company";
import useAsyncRequest, { RequestError, RequestSuccess } from "../utils/async";

const BuyCompanyTokensCard = (props: { company: Company }) => {
    return (
        <Stack spacing={2} style={{marginTop: '16px'}}>
            <Typography variant='h3'>Покупка токенов компании {props.company.name}</Typography>
            <Paper variant='outlined' style={{padding: '8px'}}></Paper>
        </Stack>
    );
};

const ErrorBuyCompanyTokensCard = (props: { error: RequestError }) => {
    return (
        <Stack spacing={2} style={{marginTop: '16px'}}>
            <Typography variant='h3'>Ошибка загрузки компании</Typography>
            <Paper variant='outlined' style={{padding: '8px'}}>
                <Alert severity='error'>
                    <AlertTitle>Мы уже работаем над исправлением</AlertTitle>
                    {JSON.stringify(props.error.message)}    
                </Alert>
            </Paper>
        </Stack>
    );
};

const LoadingBuyCompanyTokensCard = () => {
    return (
        <Stack spacing={2} style={{marginTop: '16px'}}>
            <Typography variant='h3'>Загрузка</Typography>
            <Paper variant='outlined' style={{padding: '24px'}}>
                <Stack direction='row' justifyContent='space-around'>
                    <CircularProgress />
                </Stack>
            </Paper>
        </Stack>
    );
};

const BuyPageImpl = () => {
    const params = useParams();
    const id: string = params.id!;

    const request = useAsyncRequest((controller) => {
        return companiesService.company(id);
    });

    if (request instanceof RequestError) {
        return <ErrorBuyCompanyTokensCard error={request} />;
    }

    if (request instanceof RequestSuccess) {
        return (
            <BuyCompanyTokensCard company={request.result} />
        );
    }

    return <LoadingBuyCompanyTokensCard />;
};

const BuyPage = () => {
    return (
        <WithAppBar>
            <BuyPageImpl />
        </WithAppBar>
    );
};

export default BuyPage;
