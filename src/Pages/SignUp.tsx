import React, {useState} from "react";
import {Button, Card, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import {api} from "../index";
import {Link, useNavigate} from "react-router-dom";
import LogoRect from "../components/logoRect";

type form = {
    username: string
    password: string
    reenter: string
    permissions: number
    lender: boolean
    leaser: boolean
}
export default function SignUp() {
    const [state, setState] = useState<form>({
        username: "",
        password: "",
        reenter: "",
        permissions: 0,
        lender: false,
        leaser: false
    })
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
        if (e.target.name === "lender") {
            setState(s => ({...state, lender: e.target.checked}))
        } else if (e.target.name === "leaser") {
            setState(s => ({...state, leaser: e.target.checked}))
        }
    }
    console.log(state.lender)
    const createaccount = () => {
        if (state.password === state.reenter) {
            let perms = 0
            if (state.lender) {
                 perms = perms | 2
            }
            if (state.leaser) {
                perms = perms |  1
            }
            api.createAccountCreateAccountPost({
                createAccountDetails: {
                    username: state.username,
                    password: state.password,
                    permissions: perms
                }
            }).then(r => {
                navigate("/")
            }).catch(e => {
                alert(e)
            })
        } else {
            alert("passwords do not match!")
        }
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
                    <TextField label={"Reenter Password"} inputProps={{type: "password"}} value={state.reenter}
                               name={"reenter"} onChange={onChange}/>
                </Grid>
                <Grid alignItems={"center"}>
                    <Typography>How to you plan to use the app?</Typography>
                    <FormControlLabel control={<Checkbox name={"lender"} value={state.lender} onChange={onChange}/>}
                                      label={"Lend"}/>
                    <FormControlLabel control={<Checkbox name={"leaser"} value={state.leaser} onChange={onChange}/>}
                                      label={"Lease"}/>
                </Grid>
                <Grid>
                    <Button variant={"contained"} onClick={createaccount}>Sign Up</Button>
                </Grid>
                <Typography>Already have an account? <Link to={"/"}>Sign in</Link> now!</Typography>
            </Grid>
        </Card>
    </Paper>
}
