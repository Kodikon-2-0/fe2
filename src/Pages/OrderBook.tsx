import {AppBar, Card, Grid, Typography} from "@mui/material";
import {Configuration, DefaultApi, ResourceGroupInfo} from "../sdk";
import {BASE_PATH} from "../path";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import {OrderInfo} from "../sdk/models/OrderInfo";
import IconButton from "@mui/material/IconButton";
import {Check, Close} from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import LogoRect from "../components/logoRect";
import * as React from "react";

const api = new DefaultApi(new Configuration({
    basePath: BASE_PATH, accessToken: "Bearer " + (new Cookies()).get("token")
}))

const format_date = (date: Date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

export default function OrderBook() {
    const [orders, setOrders] = useState<OrderInfo[]>([])
    const [resources, setResources] = useState<ResourceGroupInfo[]>([])
    const [reload, setReload] = useState(false)
    useEffect(() => {
        api.getOrdersOrdersGet({}).then(r => {
            setOrders(r.orders)
        })
        api.getResourceGroupsDataResourceGroupsGet().then(r => {
            console.log(r)
            setResources(r.resourceGroups)
        })
    }, [reload])

    const doCancel = (oderId: number) => {
        // alert("You are about to cancel the order request.")
        api.updateOrderOrderOrderIdPatch({orderId: oderId, orderAcceptInfo: {newStatus: -1}})
        setReload((s) => !s)
    }

    const doAccept = (oderId: number) => {
        // alert("You are about to cancel the order request.")
        api.updateOrderOrderOrderIdPatch({orderId: oderId, orderAcceptInfo: {newStatus: 2}})
        setReload((s) => !s)

    }

    return <>
        <AppBar position="fixed" sx={{color: "ffffff", p:1}}>
            <Toolbar>
                <LogoRect/>
            </Toolbar>
        </AppBar>
        <Typography variant={"h5"} mt={"15vh"} textAlign={"center"}>Manage Orders</Typography>

        <Grid container p={4}  gap={2}>
            {orders.map((o, k) => {
                console.log(o.resourceGroup, resources)
                return <Card key={"orders_" + k} sx={{width: "15em"}}>
                    <Grid container direction={"column"} p={2}>
                        <Grid>
                            <Typography>Loan {resources.length && resources[o.resourceGroup-1].name} to {o.lessee}</Typography>
                        </Grid>
                        <Grid>
                            <Typography>from <b>{format_date(o.startTime)}</b> to <b>{format_date(o.endTime)}</b></Typography>
                        </Grid>
                        {
                            o.orderStatus === 1 ? <Grid>
                                <Grid container justifyContent={"space-between"}>
                                    <IconButton onClick={() => doAccept(o.orderid)}><Check/></IconButton>
                                    <IconButton onClick={() => doCancel(o.orderid)}><Close/></IconButton>
                                </Grid>
                            </Grid> : o.orderStatus > 1 ? <Grid>Confirmed</Grid> : <Grid> Cancelled</Grid>
                        }
                    </Grid>
                </Card>
            })}
        </Grid>
    </>
}