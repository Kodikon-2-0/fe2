import {SearchResultsInfo} from "../sdk";
import ResourceCard from "./card";
import {Grid} from "@mui/material";

export default function SearchResults({details, search_from, search_to} : {details: Array<SearchResultsInfo>,search_from: Date, search_to: Date}) {
    console.log(details)
    return <Grid container direction={"column"} gap={2} padding={1}>
        {details.map((s, n) => {
            return <Grid>
                <ResourceCard resource_id={s.resourceId} search_from={search_from} search_to={search_to} name={s.data} available_from={s.availableFrom} available_to={s.availableTill}/>
            </Grid>
        })
        }
    </Grid>
}