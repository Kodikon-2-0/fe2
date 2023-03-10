import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Button, Grid, Select, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select";
import DateSetter from "../components/DateSetter";
import {Configuration, DefaultApi, ResourceGroupInfo} from "../sdk";
import Cookies from "universal-cookie";
import {BASE_PATH} from "../path";
import Toolbar from "@mui/material/Toolbar";
import LogoRect from "../components/logoRect";

type resource = {
    state: string
    district: string
    mandal: string
    details: string
    resourceGroupId: number


}

const api = new DefaultApi(new Configuration({
    basePath: BASE_PATH,
    accessToken: "Bearer " + (new Cookies()).get("token")
}))

export default function AddResource() {
    const [named, setNamed] = useState({nam: "", regno: "", price: 0})
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const navigate = useNavigate()
    const [states, setStates] = useState<Array<string>>([])
    const [state, setState] = useState<string>("default")
    const [resources, setResources] = useState<ResourceGroupInfo[]>([])
    const [resource, setResource] = useState("default")
    useEffect(() => {
        api.getResourceGroupsDataResourceGroupsGet().then(r => {
            setResources(r.resourceGroups)
        })
    }, [])
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
            state: state, district: district
        }).then(result => setMandals(result.names))
    }, [state, district])
    const [mandal, setMandal] = useState("default")
    const onChange_name = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNamed({...named, [e.target.name]: e.target.value})
    }
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
    }

    const addResource = () => {
        const resource_type = resources.find(s => s.name === resource)
        if (!resource_type) {
            return
        }

        api.createResourceDataStateDistrictMandalResourcesPost({
            state: state, district: district, mandal: mandal, resourceCreateDetails: {
                data: JSON.stringify({price: named.price, registration: named.regno, description: named.nam}),
                resourceGroupId: resource_type.id
            }
        }).then(r => {
            api.setResourceRangeResourcesResourceIdSetAvailableRangePost({
                resourceId: r.id,
                resourceAvailabilityDetails: {start: startDate as Date, end: endDate as Date}
            }).then(d => {
                if (d) {
                    alert("Resource successfully listed!")
                }
                navigate("/dashboard/lender")
            })
        }).catch(e => {
            alert(e)
        })
        //
        // api.setResourceRangeResourcesResourceIdSetAvailableRangePost({
        //     resourceId: ,
        //     resourceAvailabilityDetails:
        // })
    }

    return <>
        <AppBar position="fixed" sx={{color: "ffffff", p: 1}}>
            <Toolbar>
                <LogoRect/>
            </Toolbar>
        </AppBar>
        <Grid mt={"15vh"} container direction={"column"} gap={2} alignItems={"center"}>
            <Typography variant={"h5"}>Add a resource</Typography>
            <Grid>
                <Select value={state} onChange={onChange_state} sx={{width: 250}}>
                    <MenuItem value={"default"}>
                        Select State
                    </MenuItem>
                    {states.map((s, i) => {
                        return <MenuItem key={"state_" + i.toString()} value={s}>
                            {s}
                        </MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid>
                <Select value={district} onChange={onChange_districts} sx={{width: 250}}>
                    <MenuItem value={"default"} disabled={true}>
                        Select District
                    </MenuItem>
                    {districts.map((s, i) => {
                        return <MenuItem key={"districts_" + i.toString()} value={s}>
                            {s}
                        </MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid>
                <Select value={mandal} onChange={onChange_mandals} sx={{width: 250}}>
                    <MenuItem value={"default"} disabled={true}>
                        Select Mandal
                    </MenuItem>
                    {mandals.map((s, i) => {
                        return <MenuItem key={"mandals_" + i.toString()} value={s}>
                            {s}
                        </MenuItem>
                    })}
                </Select>
            </Grid>
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
            <Grid>
                <TextField label={"Desciption"} onChange={onChange_name} value={named.nam} name={"nam"}/>
            </Grid>
            <Grid>
                <TextField label={"Registration Number"} onChange={onChange_name} value={named.regno} name={"regno"}/>
            </Grid>
            <Grid>
                <TextField label={"Price (in Indian Rupees)"} sx={{minWidth: 250}} onChange={onChange_name}
                           value={named.price} name={"price"} type={"number"}/>
            </Grid>
            <Grid>
                <DateSetter date={startDate} setDate={setStartDate} label={"Start Date"}/>
            </Grid>
            <Grid>
                <DateSetter date={endDate} setDate={setEndDate} label={"End Date"}/>
            </Grid>
            <Grid>
                <Button variant={"contained"} onClick={addResource}>List Resource</Button>
            </Grid>
        </Grid>
    </>
}