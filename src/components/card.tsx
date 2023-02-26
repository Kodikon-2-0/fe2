import {Card, CardMedia, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import img from "./images/img1.jpg"
import {InfoRounded} from "@mui/icons-material";
export default function ResourceCard({name, available_from, available_to}: {name: string, available_from: Date, available_to: Date}) {
    const format_date = (date: Date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
    return  <Card
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
            {/*<Typography component="div" fontWeight="bold">*/}
            {/*    ₹5000*/}
            {/*</Typography>*/}
            {/*<Typography variant={"body1"}>*/}
            {/*Qty:3*/}
            {/*</Typography>*/}
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
        </Box>
    </Card>
}