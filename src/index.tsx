import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './Pages/Login'
import MultipleSelectChip from "./Pages/CustomerDashboard";
import {Configuration, DefaultApi} from "./sdk";
import Dashboard from "./Pages/Dashboard";
import SignUp from "./Pages/SignUp";

export const BASE_PATH= "http://192.168.209.190:8000"
export let api = new DefaultApi(new Configuration({basePath: BASE_PATH}))
const Root = () => {
    return <React.StrictMode>
        {/*<Provider store={store}>*/}
        {/*        <ThemeProvider theme={}>*/}
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"CustomerDashboard"} element={<MultipleSelectChip/>}/>
            </Routes>
        </BrowserRouter>
        {/*</ThemeProvider>*/}
    </React.StrictMode>
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement);
root.render(
    <Root/>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
