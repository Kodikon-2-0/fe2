import {Card, Grid, Typography} from "@mui/material";
import {Configuration, DefaultApi, ResourceGroupInfo} from "../sdk";
import {BASE_PATH} from "../path";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import {OrderInfo} from "../sdk/models/OrderInfo";
import IconButton from "@mui/material/IconButton";
import {Check, Close} from "@mui/icons-material";

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
            setResources(r.resourceGroups)
        })
    }, [reload])

    const doCancel = (oderId: number) => {
      api.updateOrderOrderOrderIdPatch({orderId: oderId, orderAcceptInfo: {newStatus: -1}})
        setReload((s) => !s)
    }

    const doAccept = (oderId: number) => {
        api.updateOrderOrderOrderIdPatch({orderId: oderId, orderAcceptInfo: {newStatus: 2}})
        setReload((s) => !s)

    }

    return <Grid container p={4}>
        {orders.map((o, k) => {
            return <Card key={"orders_" + k} sx={{width: "15em"}}>
                <Grid container direction={"column"} p={2}>
                    <Grid>
                        <Typography>Loan {resources[o.resourceGroup].name} to {o.lessee}</Typography>
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
}