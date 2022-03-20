import WithAppBar from "../components/WithAppBar";
import { useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const BuyPageImpl = () => {
    const params = useParams();
    const id = params.id;
    return (
        <Stack>
            <Typography>{id}</Typography>
        </Stack>
    );
};

const BuyPage = () => {
    return (
        <WithAppBar>
            <BuyPageImpl />
        </WithAppBar>
    );
};

export default BuyPage;
