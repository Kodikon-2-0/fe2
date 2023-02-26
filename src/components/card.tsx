import {Button, Card, CardMedia, Dialog, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import img from "./images/img1.jpg"
import {InfoRounded} from "@mui/icons-material";
import {Configuration, DefaultApi} from "../sdk";
import {BASE_PATH} from "../path";
import Cookies from "universal-cookie";
const api = new DefaultApi(new Configuration({
    basePath: BASE_PATH, accessToken: "Bearer " + (new Cookies()).get("token")
}))
export default function ResourceCard({name, available_from, available_to, resource_id, search_from, search_to}: {search_from: Date, search_to: Date,resource_id: number, name: string, available_from: Date, available_to: Date}) {
    const format_date = (date: Date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    const doBook = () => {
        api.createOrderOrderPost({orderCreateDetails: {resourceId: resource_id, fromTime: search_from, toTime: search_to, quantity: 1}})
    }

    return  <>
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                p: 1,
                flexDirection: {
                    xs: 'column', // mobile
                    sm: 'row', // tablet and up
                },
            }}
        >
            <CardMedia
                component="img"
                width="120"
                height="120"
                alt="Mahindra YUVO Tech+ 45Di"
                src={img}
                sx={{
                    borderRadius: 1.0,
                    width: {xs: '100%', sm: 100},
                    mr: {sm: 1.5},
                    mb: {xs: 1.5, sm: 0},
                }}
            />
            <Box sx={{alignSelf: 'center', ml: 2}}>
                <Typography variant="body2" color="text.secondary">
                    {name}
                </Typography>
                <Box
                    sx={{
                        ml: -1,
                        mt: 0.75,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        typography: 'caption',
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#fff' : 'primary.50',
                        color: (theme) =>
                            theme.palette.mode === 'dark' ? '#fff' : 'primary.700',
                    }}
                >
                    <InfoRounded sx={{fontSize: 16, mr: 0.5, mt: '1px'}}/>
                    <Typography>from <b>{format_date(available_from)}</b> to <b>{format_date(available_to)}</b></Typography>
                </Box>
                <Box pt={1}>
                    <Button onClick={doBook}>Book!</Button>
                </Box>
            </Box>
        </Card>
    </>
}