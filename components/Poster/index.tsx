
//components
import Image from 'react-bootstrap/Image';

export interface PosterProps {
    movie:any
}
 
const Poster: React.SFC<PosterProps> = ({movie}) => {

    console.log(movie)
    const base_Url: string = 'https://image.tmdb.org/t/p/original/';

    return ( 
        <>
            <Image 
                className='banner_poster' 
                src={`${base_Url}${movie?.poster_path}`} 
                alt={movie?.name}>
            </Image>

            <style jsx>{`
                .banner_poster{
                    object-fit: contain;
                    max-height: 300px;
                
                    transition: transform 450ms;
                    border-radius: 10px;
                    -webkit-box-shadow: 0 10px 10px 0 rgba(0,0,0,0.3);
                    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.3);
                
                    /*position*/
                    margin-left: 60%;
                    margin-top: 50%;
                }
            `}</style>
        </>
     );
}
 
export default Poster;