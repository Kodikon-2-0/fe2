import {useNavigate} from "react-router-dom";
import {Button, Paper} from "@mui/material";
import {api} from "../index";

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