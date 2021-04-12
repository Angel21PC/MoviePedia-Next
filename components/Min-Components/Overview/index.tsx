import { useEffect, useState } from "react";

export interface OverviewProps {
    movie:any
    cast:any
}
 
const Overview: React.SFC<OverviewProps> = ({movie, cast}) => {

    return ( 
        <>
        <p>{movie.overview}</p>
        <h5>Directed by: {cast?.data.crew.map(e => e.known_for_department === "Directing" && e.job === "Director" ? <>{e.name} </>:<></>)}</h5>
        </>
     );
}
 
export default Overview;