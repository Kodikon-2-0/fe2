import React, {useState} from "react";
import {Button, Card, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import {api, BASE_PATH} from "../index";
import {Link, useNavigate} from "react-router-dom";
import {CheckBox} from "@mui/icons-material";

export default function SignUp() {
    const [state, setState] = useState({username: "", password: "", reenter: "", permissions: 0, lender: false, leaser: false})
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const createaccount = () => {
        if(state.password === state.reenter) {
            api.createAccountCreateAccountPost({
                createAccountDetails: {
                    username: state.username,
                    password: state.password,
                    permissions: state.permissions
                }
            }).then(r => {
                navigate("/")
            })
        }
        else {
            alert("passwords not matching!")
        }
    }


    return <Paper>
        <Card sx={{padding: 2, justifyContent: "center"}}>
            <Grid container direction={"column"} gap={2} padding={1}
                  justifyContent={"center"}
                  alignItems={"center"}
            >
                <Grid>
                    <TextField label={"Username"} value={state.username} name={"username"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <TextField label={"Password"} inputProps={{type: "password"}} value={state.password} name={"password"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <TextField label={"Reenter Password"} inputProps={{type: "password"}} value={state.reenter} name={"reenter"} onChange={onChange}/>
                </Grid>
                <Grid>
                    {/*<FormControlLabel control={<CheckBox checked={state.lender}/>} label={"Lend"}>*/}
                    {/*</FormControlLabel>*/}
                    {/*<FormControlLabel control={<CheckBox checked=} label={}></FormControlLabel>*/}
                </Grid>
                <Grid>
                    <Button variant={"contained"} onClick={createaccount}>Sign Up</Button>
                </Grid>
                <Typography>Already have an account? <Link to={"/"}>Sign in</Link> now!</Typography>
            </Grid>
        </Card>
    </Paper>
}
