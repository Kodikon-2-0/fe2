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
import {createTheme, ThemeProvider} from "@mui/material";
import {green} from "@mui/material/colors";
import OrderBook from "./Pages/OrderBook";

import LenderDashboard from "./Pages/LenderDashboard";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import AddResource from "./Pages/AddResource";
import {BASE_PATH} from "./path";
export let api = new DefaultApi(new Configuration({basePath: BASE_PATH}))

const theme = createTheme({
    palette: {
        primary: green,

    }
})

const Root = () => {
    return <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            {/*<Provider store={store}>*/}
            {/*        <ThemeProvider theme={}>*/}
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Login/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route path={"/dashboard"} element={<Dashboard/>}/>
                        <Route path={"/dashboard/lender"} element={<LenderDashboard/>}/>
                        <Route path={"/CustomerDashboard"} element={<MultipleSelectChip/>}/>
                        <Route path={"/dashboard/OrderBook"} element={<OrderBook/>}/>
                        <Route path={"/dashboard/AddResource"} element={<AddResource/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
        {/*</ThemeProvider>*/}
    </React.StrictMode>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root/>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
