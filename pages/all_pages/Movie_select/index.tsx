//next
import { useRouter } from "next/router"

export interface MovieSProps {
    
}

const MovieS: React.SFC<MovieSProps> = () => {

    const router = useRouter()
    const {
        query: { id },
    } = router
    return ( 
        <>
        <h1>Movie_select: {id}</h1>
        </>
     );
}
 
export default MovieS;