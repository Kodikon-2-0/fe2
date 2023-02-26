import {SearchResultsInfo} from "../sdk";
import ResourceCard from "./card";
import {Grid} from "@mui/material";

export default function SearchResults({details} : {details: Array<SearchResultsInfo>}) {
    console.log(details)
    return <Grid container direction={"column"} gap={2} padding={1}>
        {details.map((s, n) => {
            return <Grid>
                <ResourceCard name={s.data} available_from={s.availableFrom} available_to={s.availableTill}/>
            </Grid>
        })
        }
    </Grid>
}