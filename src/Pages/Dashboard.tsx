import * as React from "react";
import {useEffect, useState} from "react";
import {api} from "../index";
import {Button, Grid, Select, Stack} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import LogoRect from "../components/logoRect";
import {ResourceGroupInfo, SearchDetails, SearchResultsInfo} from "../sdk";
import DateSetter from "../components/DateSetter";
import SearchResults from "../components/SearchResults";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard() {
    const [details, setDetails] = useState<Array<SearchResultsInfo>>([])
    const [data, setData] = useState<SearchDetails>({resourceType: 0, startTime: new Date, endTime: new Date})
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [resources, setResources] = useState<Array<ResourceGroupInfo>>([])
    const [resource, setResource] = useState("default")
    const [states, setStates] = useState<Array<string>>([])
    const [state, setState] = useState<string>("default")
    useEffect(() => {
        api.getStateInfoDataStatesGet().then(result => setStates(result.names))
    }, [])
    const [districts, setDistricts] = useState<Array<string>>([])
    useEffect(() => {
        api.getDistrictInfoDataStateDistrictsGet({state: state}).then(result => setDistricts(result.names))
    }, [state])
    const [district, setDistrict] = useState<string>("default")
    const [mandals, setMandals] = useState<Array<string>>([])
    useEffect(() => {
        api.getMandalInfoDataStateDistrictMandalsGet({
            state: state,
            district: district
        }).then(result => setMandals(result.names))
    }, [state, district])
    const [mandal, setMandal] = useState("default")

    useEffect(() => {
        api.getResourceGroupsDataResourceGroupsGet().then(r => {
            setResources(r.resourceGroups)
        })
    }, [])

    // const search = () => {
    //     api.searchDataStateDistrictMandalSearchPost({
    //         district: district, state: state, mandal: mandal, searchDetails: data
    //     })
    // }

    const onChange_state = (e: SelectChangeEvent<string>) => {
        setState(e.target.value)
    }

    const onChange_districts = (f: SelectChangeEvent<string>) => {
        setDistrict(f.target.value)
    }

    const onChange_mandals = (g: SelectChangeEvent<string>) => {
        setMandal(g.target.value)
    }
    const onChange_resource = (g: SelectChangeEvent<string>) => {
        setResource(g.target.value)
        setDetails([])
    }

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    // const resource_type = resources.find(s => s.name == resource)
    // if (!resource_type) {
    //     return null
    // }
    const onSearch = () => {
        const resource_type = resources.find(s => s.name == resource)
        if (!resource_type) {
            return
        }
        api.searchDataStateDistrictMandalSearchPost({
            state: state,
            district: district,
            mandal: mandal,
            searchDetails: {startTime: startDate as Date, endTime: endDate as Date, resourceType: resource_type.id}
        }).then(r => {
            // setDetails(r)
            setDetails(r.results);
        })
    }

    return <>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{color: "ffffff"}} open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <LogoRect/>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button href={"/dashboard/lender"}>Go to Home</Button>
                        </Stack>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                <Grid container direction={"column"} gap={2} alignItems={"center"}>
                    <Typography variant={"h5"}>Search for a resource</Typography>
                    <Grid>
                        <Select value={state} onChange={onChange_state} sx={{width: 250}}>
                            <MenuItem value={"default"}>
                                Select State
                            </MenuItem>
                            {
                                states.map((s, i) => {
                                    return <MenuItem key={"state_" + i.toString()} value={s}>
                                        {s}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid>
                        <Select value={district} onChange={onChange_districts} sx={{width: 250}}>
                            <MenuItem value={"default"} disabled={true}>
                                Select District
                            </MenuItem>
                            {
                                districts.map((s, i) => {
                                    return <MenuItem key={"districts_" + i.toString()} value={s}>
                                        {s}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid>
                        <Select value={mandal} onChange={onChange_mandals} sx={{width: 250}}>
                            <MenuItem value={"default"} disabled={true}>
                                Select Mandal
                            </MenuItem>
                            {
                                mandals.map((s, i) => {
                                    return <MenuItem key={"mandals_" + i.toString()} value={s}>
                                        {s}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid>
                        <Grid>
                            <Select value={resource} onChange={onChange_resource} sx={{width: 250}}>
                                <MenuItem value={"default"} disabled={true}>
                                    Select Resource
                                </MenuItem>
                                {
                                    resources.map((s, i) => {
                                        return <MenuItem key={"resources_" + i.toString()} value={s.name}>
                                            {s.name}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </Grid>

                    </Grid>
                    <Grid>
                        <DateSetter date={startDate} setDate={setStartDate} label={"Start Date"}/>
                    </Grid>
                    <Grid>
                        <DateSetter date={endDate} setDate={setEndDate} label={"End Date"}/>
                    </Grid>
                    <Grid>
                        <Button onClick={onSearch} variant={"contained"}>Search!</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <SearchResults details={details} search_from={startDate as Date} search_to={endDate as Date}
                                   group_id={resource}/>
                </Grid>
            </Main>
        </Box>
    </>
}