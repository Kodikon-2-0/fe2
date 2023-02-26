import {useNavigate} from "react-router-dom";
import {Button, Paper} from "@mui/material";
import {Configuration, DefaultApi} from "../sdk";
import {BASE_PATH} from "../path";
import Cookies from "universal-cookie";
const api = new DefaultApi(new Configuration({basePath: BASE_PATH,accessToken: "Bearer " + (new Cookies()).get("token")}))

export default function OrderBook() {
    const getOrder = () => {
        api.getOrdersOrdersGet({
        }).then(r => {
            console.log(r)
        })
    }
    return <>
        <Button onClick={getOrder}>
            Get
        </Button></>
}