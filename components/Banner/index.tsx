import { useEffect, useState } from "react";

//components
import Porter from '../../components/Poster/index';

export interface BannerProps {
    data:any
}
 
const Banner: React.SFC<BannerProps> = ({data}) => {

    const [movie, setMovie] = useState<any>([]); //recoge todos los datos de la consulta
    
    useEffect(() =>{
        
        //request
        async function fetchData(){
            //console.log(request);
            setMovie(data.results[
                Math.floor( Math.random() * data.results.length -1) 
            ]);
            console.log(movie)
        }
        
        fetchData();

    }, []);

   

    return ( 
        <>
            <header className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`, 
                backgroundPosition:'center center',
            }}
            >
          
            <div className='banner_content'>
                <div className='poster_container'>
                    <Porter c='banner_poster' movie={movie}/>
                </div>
               <div className='banner_text'>
                    <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                    <p>{movie?.overview}</p>
               </div>
            </div>
           
            </header>

            <style jsx>{`
                .banner {
                    top: 0px;
                    color: white;
                    object-fit: containt;
                    height: 450px;
                }
                
                .banner_content {
                    display: flex;
                    position: relative;
                }
                
                .poster{
                    /*position*/
                    margin-left: 60%;
                    margin-top: 50%;
                }
                
                .poster_container{
                    scale: 1.1;
                } 
                
                .banner_text {
                    margin-top: 250px;
                    margin-left: 250px;
                    padding-right: 20px;
                }
                
                .banner_text p{
                    font-size: 20px;
                }
            `}</style>
        </>
     );
}
 

export default Banner;