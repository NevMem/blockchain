import WithAppBar from "../components/WithAppBar";
import { useParams } from "react-router-dom";
import { Stack, Typography, Paper, CircularProgress, Alert, AlertTitle, Divider, Button, TextField, Slider } from "@mui/material";
import companiesService from "../service/CompaniesService";
import { Company } from "../data/Company";
import useAsyncRequest, { RequestError, RequestSuccess } from "../utils/async";
import { useState } from "react";

const AllOkCard = () => {
    return (
        <Alert>
            <AlertTitle>Мы создали транзакцию на покупку 20 токенов</AlertTitle>
            <Stack spacing={0.5}>
                <Typography>Транзакция: 0x0f1a3bbf69ccc6bc3e2f073e9698f69dd933eec880a979f13e5a2e2648872446</Typography>
                <Stack direction='row' spacing={0.5}>
                    <Typography>Проверить состояние транзакции можно по</Typography>
                    <Typography color='primary'>ссылке</Typography>
                </Stack>
            </Stack>
        </Alert>
    );
};

const BuyCompanyTokensCard = (props: { company: Company }) => {

    const [value, setValue] = useState(20);

    const [buying, setBuying] = useState(false);

    const buy = () => {
        setBuying(true);
    };

    return (
        <Stack spacing={2} style={{marginTop: '16px'}}>
            <Typography variant='h3'>Покупка токенов компании {props.company.name}</Typography>
            <Paper variant='outlined' style={{padding: '16px'}}>

                <Stack spacing={2}>
                    
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                        <div style={{width: '120px', height: '120px'}}>
                            <img src={props.company.imageUrl} alt={props.company.id} style={{objectFit: 'contain', width: '120px', height: '120px'}} />
                        </div>
                        <Stack style={{width: '100%'}}>
                            <Typography variant='h4'>{props.company.name}</Typography>
                            <Typography variant='h6'>1 Google token = 0.002ETH</Typography>
                        </Stack>
                    </Stack>

                    <Stack spacing={4} style={{padding: '16px'}} alignItems='center'>
                        
                        <Typography variant='h6'>Выберите кодичество токенов и введите ваш приватный ключ для покупки токенов</Typography>

                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} style={{width: '256px'}} alignItems="center">
                            <Typography>1</Typography>
                            <Slider disabled={buying} aria-label="Volume" value={value} onChange={() => {}} min={1} max={23} valueLabelDisplay="on" />
                            <Typography>23</Typography>
                        </Stack>

                        <TextField disabled={buying} label="Введите ваш приватный ключ" color="secondary" style={{width: '100%'}} rows={3} multiline={true} focused />
                        <Stack>
                            <Button onClick={() => buy()}>Купить</Button>
                        </Stack>

                        {buying && <AllOkCard />}
                    </Stack>

                </Stack>

            </Paper>
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
