import {Button, Grid, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function LenderDashboard() {
    const navigate = useNavigate()
    // const onClick_OrderBook = () => {
    //     navigate()
    // }
    const onClick_AddResource = () => {
        navigate("/dashboard/AddResource")
    }

    return <Paper>
        {/*<Grid container direction={"column"}>*/}
        {/*    <Grid>*/}
        {/*        <Button onClick={onClick_OrderBook}>Order Book</Button>*/}
        {/*    </Grid>*/}
            <Grid>
                <Button onClick={onClick_AddResource}>Add Resource</Button>
            </Grid>
        {/*</Grid>*/}
    </Paper>}