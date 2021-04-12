//components
import Image from 'react-bootstrap/Image';

export interface PosterProps {
    c: string
    movie: any
}
 
const Poster: React.SFC<PosterProps> = ({movie, c}) => {

    const base_Url: string = 'https://image.tmdb.org/t/p/original/';

    return ( 
        <Image 
            className={c}
            src={`${base_Url}${movie?.poster_path}`} 
            alt={movie?.name} 
        />    
     );
}
 
export default Poster;