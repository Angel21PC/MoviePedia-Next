export interface OverviewProps {
    movie:any
    cast:any
}
 
const Overview: React.SFC<OverviewProps> = ({movie, cast}) => {

    return ( 
        <>
            <p>{movie.overview}</p>
            <h5>Directed by: {cast?.data.crew.map(e => e.known_for_department === "Directing" && e.job === "Director" ? <a key={e.name}>{e.name} </a>:<a key={Math.random()}></a>)}</h5>
        </>
     );
}
 
export default Overview;