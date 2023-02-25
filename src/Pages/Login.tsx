import React from "react";
import {Card, Grid, Paper, TextField} from "@mui/material";

export default function Login() {

    return <Paper>
        <Card sx={{padding: 2}}>
           <Grid container direction={"column"} gap={2} padding={1}>
                <Grid>
                    <TextField label={"Username"}></TextField>
                </Grid>
               <Grid>
                    <TextField label={"Password"} inputProps={{type: "password"}}></TextField>
                </Grid>
           </Grid>
        </Card>
    </Paper>
}