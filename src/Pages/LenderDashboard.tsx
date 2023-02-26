import {AppBar, Button, Grid, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoRect from "../components/logoRect";
import * as React from "react";

export default function LenderDashboard() {
    const navigate = useNavigate()
    // const onClick_OrderBook = () => {
    //     navigate()
    // }
    const onClick_AddResource = () => {
        navigate("/dashboard/AddResource")
    }

    const onClick_OrderBook = () => {
        navigate("/dashboard/OrderBook")
    }
    return <>
        <AppBar position="fixed" sx={{color: "ffffff", p:1}}>
            <Toolbar>
                <LogoRect/>
            </Toolbar>
        </AppBar>
        <Paper sx={{mt: "15vh"}}>
            <Grid container direction={"column"} alignItems={"center"} gap={2}>
                <Grid>
                    <Button onClick={onClick_AddResource}>Add Resource</Button>
                </Grid>
                <Grid>
                    <Button onClick={onClick_OrderBook}>View Order Book</Button>
                </Grid>
                <Grid>
                    <Button href={"/dashboard"}>Search for resources</Button>
                </Grid>
            </Grid>
        </Paper>
    </>

}