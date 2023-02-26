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

    const onClick_OrderBook= () => {
        navigate("/dashboard/OrderBook")
    }
    return <Paper>
            <Grid container>
                <Grid>
                    <Button onClick={onClick_AddResource}>Add Resource</Button>
                </Grid>
                <Grid>
                    <Button onClick={onClick_OrderBook}>View Order Book</Button>
                </Grid>
            </Grid>
    </Paper>}