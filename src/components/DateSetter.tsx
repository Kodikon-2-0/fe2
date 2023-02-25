import {Dispatch, SetStateAction} from "react";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";

export default function DateSetter({date, setDate, label}: {label: string, date: Date|null, setDate: Dispatch<SetStateAction<Date|null>>}){
    return  <MobileDatePicker
        label={label}
        inputFormat="DD/MM/YYYY"
        value={date}
        onChange={setDate}
        renderInput={(params) => <TextField {...params} />}
    />
}