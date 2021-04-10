
//components
import Image from 'react-bootstrap/Image';

export interface PosterProps {
    movie: any
}
 
const Poster: React.SFC<PosterProps> = ({movie}) => {

    const base_Url: string = 'https://image.tmdb.org/t/p/original/';

    return ( 
        <>
            <Image 
                className='banner_poster' 
                src={`${base_Url}${movie?.poster_path}`} 
                alt={movie?.name} 
            />    
        </>
     );
}
 
export default Poster;