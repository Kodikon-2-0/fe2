import {api} from "../index";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Grid, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select";
import DateSetter from "../components/DateSetter";

type resource = {
    state: string
    district: string
    mandal: string
    details: string
    resourceGroupId: number


}
export default function AddResource() {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const navigate = useNavigate()
    const [form, setForm] = useState<resource>({
        state: "",
        district: "",
        mandal: "",
        details: "",
        resourceGroupId: 0
    })
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
    const onChange_state = (e: SelectChangeEvent<string>) => {
        setState(e.target.value)
    }

    const onChange_districts = (f: SelectChangeEvent<string>) => {
        setDistrict(f.target.value)
    }

    const onChange_mandals = (g: SelectChangeEvent<string>) => {
        setMandal(g.target.value)
    }
    const addResource = () => {
        api.createResourceDataStateDistrictMandalResourcesPost(
            {
                state: form.state,
                district: form.district,
                mandal: form.mandal,
                resourceCreateDetails: {
                    data: form.details,
                    resourceGroupId: form.resourceGroupId
                }
            }).then(r => {
            navigate("/LenderDashboard")
        }).catch(e => {
            alert(e)
        })
        //
        // api.setResourceRangeResourcesResourceIdSetAvailableRangePost({
        //     resourceId: ,
        //     resourceAvailabilityDetails:
        // })


        return <> <Grid container direction={"column"} gap={2} alignItems={"center"}>
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
                <DateSetter date={startDate} setDate={setStartDate} label={"Start Date"}/>
            </Grid>
            <Grid>
                <DateSetter date={endDate} setDate={setEndDate} label={"End Date"}/>
            </Grid>
            <Grid>
                <Button variant={"contained"}>List Resource</Button>
            </Grid>
        </Grid>
        </>
    }
}