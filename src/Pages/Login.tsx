import React from "react";
import {Button, Card, Grid, Paper, TextField} from "@mui/material";

export default function Login() {

    return <Paper>
        <Card sx={{padding: 2, justifyContent: "center"}}>
           <Grid container direction={"column"} gap={2} padding={1}
            justifyContent={"center"}
            alignItems={"center"}
            >
                <Grid>
                    <TextField label={"Username"}></TextField>
                </Grid>
               <Grid>
                    <TextField label={"Password"} inputProps={{type: "password"}}></TextField>
                </Grid>
           <Grid>
               <Button variant="contained">Login</Button>
           </Grid>
           </Grid>
        </Card>
    </Paper>
}