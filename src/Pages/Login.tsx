import React, {useState} from "react";
import {Button, Card, Grid, Paper, TextField, Typography} from "@mui/material";
import {Configuration} from "../sdk";
import {api} from "../index";
import {Link, useNavigate} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LogoRect from "../components/logoRect";
import Cookies from "universal-cookie";
import {BASE_PATH} from "../path";

export default function Login() {
    const [state, setState] = useState({username: "", password: ""})
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const login = () => {
        api.loginLoginPost({loginDetails: {username: state.username, password: state.password}}).then(r => {
            api.configuration.config = new Configuration({accessToken: "Bearer " + r.token, basePath: BASE_PATH})
            const cookies = new Cookies()
            cookies.set("token", r.token)
            const permissions = r.usertype
            if (permissions && (1 || 2 || 3)) {
                navigate("/dashboard")
            }
        }).catch(e => {
            alert(e)
        })
    }


    return <Paper>
        <Card sx={{padding: 2, justifyContent: "center"}}>
            <Grid container direction={"column"} gap={2} padding={1}
                  justifyContent={"center"}
                  alignItems={"center"}
            >
                <Grid>
                    <LogoRect/>
                </Grid>
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
