import { useEffect, useState } from "react";

//components
import Image from 'react-bootstrap/Image';

export interface BannerProps {
    data:any
}
 
const Banner: React.SFC<BannerProps> = ({data}) => {

    console.log(data)

    const base_Url: string = 'https://image.tmdb.org/t/p/original/';

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
                    <Image className='banner_poster' src={`${base_Url}${movie?.poster_path}`} alt={movie?.name}></Image>
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
            
            .banner::before {
                content: "";
                position: absolute;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: rgba(0,0,0,0.25);
                margin-top: 66px;
                height: 450px;
            }
            
            .banner_content {
                display: flex;
                position: relative;
            }
            
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
            
            .poster_container{
               scale: 1.1;
            }
            
            .banner_poster:hover{
                transform: scale(1.08);
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