import React, {useState} from "react";
import {Button, Card, Grid, Paper, TextField, Typography} from "@mui/material";
import {Configuration} from "../sdk";
import {api, BASE_PATH} from "../index";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [state, setState] = useState({username: "", password: ""})
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const login = () => {
        api.loginLoginPost({loginDetails: {username: state.username, password: state.password}}).then(r => {
            api.configuration.config = new Configuration({accessToken: r.token, basePath: BASE_PATH})
            const permissions = r.usertype
            if(permissions && (1 || 2 || 3)) {
                navigate("/dashboard")
            }
            // navigate()
        })
    }


    return <Paper>
        <Grid>Typograhy</Grid>
        <Card sx={{padding: 2, justifyContent: "center"}}>
            <Grid container direction={"column"} gap={2} padding={1}
                  justifyContent={"center"}
                  alignItems={"center"}
            >
                <Grid>
                    <TextField label={"Username"} value={state.username} name={"username"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <TextField label={"Password"} inputProps={{type: "password"}} value={state.password}
                               name={"password"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <Button variant={"contained"} onClick={login}>Sign in</Button>
                </Grid>
                <Typography>Don't have an account? <Link to={"/signup"}>Sign up</Link> for a free account
                    now!</Typography>
            </Grid>
        </Card>
    </Paper>
}
