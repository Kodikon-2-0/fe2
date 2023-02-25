import {useEffect, useMemo, useState} from "react";
import {api} from "../index";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select";

export default function Dashboard() {
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
        api.getMandalInfoDataStateDistrictMandalsGet({state: state, district: district}).then(result => setMandals(result.names))
    }, [state, district])
    const [mandal, setMandal] = useState("default")

    const onChange_state = (e: SelectChangeEvent<string>) => {
        console.log(e.target.value)
        setState(e.target.value)
    }

    const onChange_districts = (f: SelectChangeEvent<string>) => {
        console.log(f.target.value)
        setDistrict(f.target.value)
    }

    const onChange_mandals = (g: SelectChangeEvent<string>) => {
        console.log(g.target.value)
        setMandal(g.target.value)
    }


    return <>
        <Select value={state} onChange={onChange_state}>
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

        <Select value={district} onChange={onChange_districts}>
            <MenuItem value={"default"} disabled={true}>
                Select District
            </MenuItem>
            {
                districts.map((s, i) => {
                    return <MenuItem key={"state_" + i.toString()} value={s}>
                        {s}
                    </MenuItem>
                })
            }
        </Select>

        <Select value={mandal} onChange={onChange_mandals}>
            <MenuItem value={"default"} disabled={true}>
                Select Mandal
            </MenuItem>
            {
                mandals.map((s, i) => {
                    return <MenuItem key={"state_" + i.toString()} value={s}>
                        {s}
                    </MenuItem>
                })
            }
        </Select>
    </>
}