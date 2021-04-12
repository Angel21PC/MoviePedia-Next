import { useEffect, useState } from "react";

//request
import axios from 'axios';
import {URL, api_rutes} from '../../../pages/all_pages/config/rute_api';

//components-p
import Poster from '../../Min-Components/Poster/index'
import Overview from '../../Min-Components/Overview/index';
import Cast from '../../Min-Components/Cast/index';

//components
import {Container, Row, Col} from 'react-bootstrap';

export interface MovieProps {
    data: any
}
 
const Movie: React.SFC<MovieProps> = ({data}) => {


    const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
    const movie= data; //recoge todos los datos de la consulta
    const [cast, setCast] = useState();

    useEffect(() =>{

        //request para extraer el cast 
        async function fetchDataCast(){
            const request = await axios.get(URL+api_rutes.Cast, {
                params: {
                    id: movie.id
                }
            });
            setCast(request.data)
            return request;
        }

        //request para extraer las peliculas
        async function go(){
            setIsPending(true); //cargamos la animacion
            setTimeout(()=>{ //ejecutamos
                fetchDataCast();
                setIsPending(false);
                console.log(cast)
            },1500)
        }
        go()

    }, []);

    return ( 
        <Container fluid>
            <Row className="justify-content-md-center"  xs={1} md={2}>
            {isPending ? <div className="load"> <img src="https://rubico.com.mx/cultivandoelentendimiento_no_PHP/assets/img/demo/loader.gif" alt=""/></div>
                :
                <>
                <Col className="movie" xs lg="4">
                    <div className="movie_back">
                            <Poster 
                                c='movie_poster' 
                                movie={movie}
                            />
                    </div>
                    <div className="providers_container">
                        {/* Nuevo componente de Avaliable */}
                    </div>
                </Col>
                <Col className="text" xs lg="6">
                    <div className="text_title">
                        <h1>{movie.title}</h1>
                        {/* Nuevo componente que Tiene el titulo y los botones de like, bookmark, eye */}
                    </div>

                    <hr/>
                    <Overview movie={movie} cast={cast}/>
                    <div className="actors_container">
                        <Cast cast={cast}/>
                    {/* componente que mueste los actores */}
                    </div>
                </Col>
                </>
                  } 
            </Row>
            <style jsx>{`

                .load {
                    position: absolute;
                  }
                  
                  .text {
                    margin-top: 7vh;
                    padding-left: 30px;
                  }
                  
                  .actors_container {
                    display: flex;
                    overflow-y: hidden;
                    overflow-x: scroll;
                  }
                  
                  .actor p {
                    padding-top: 5px;
                    padding-left: 15px;
                  }
                  
                  .providers_container {
                    width: 80%;
                    display: flex;
                    justify-content: center;
                  }
                  .movie h5 {
                    margin-top: 2vh;
                    width: 80%;
                    text-align: center;
                  }
                  .providers_logo {
                    border-radius: 10px;
                    object-fit: cover;
                    max-height: 60px;
                  }
                  
                  .text_title {
                    display: flex;
                  }
                  .text_title > .icon {
                    margin-left: 30px;
                    color: grey;
                  }
                  
                  #heart:hover {
                    color: red;
                  }
                  #heartcheck {
                    color: red;
                  }
                  #bookmark:hover {
                    color: blue;
                  }
                  #bookmarkcheck {
                    color: blue;
                  }
                  #eye:hover {
                    color: orange;
                  }
            `}</style>
        </Container>
     );
}
 
export default Movie;