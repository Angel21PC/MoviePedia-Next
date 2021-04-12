import { useEffect, useState } from "react";

//components-p
import Poster from '../../Min-Components/Poster/index'

//components
import {Container, Row, Col} from 'react-bootstrap';

export interface MovieProps {
    data: any
}
 
const Movie: React.SFC<MovieProps> = ({data}) => {


    const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
    const [movie, setMovie] = useState<any>(data); //recoge todos los datos de la consulta

    console.log(movie)
    
    useEffect(() =>{
           
        //request para extraer las peliculas
        async function go(){
            setIsPending(true); //cargamos la animacion
            setTimeout(()=>{ //ejecutamos
                setIsPending(false)
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
                                c='poster' 
                                movie={movie}
                            />
                    </div>
                    <div className="providers_container">
                        {/* Nuevo componente de Avaliable */}
                    </div>
                </Col>
                <Col className="text" xs lg="6">
                    <div className="text_title">
                        {/* Nuevo componente que Tiene el titulo y los botones de like, bookmark, eye */}
                    </div>

                    <hr/>
                    {/* Nuevo componente que muestre la descripcion y el director */}

                    <div className="actors_container">
                    {/* componente que mueste los actores */}
                    </div>
                </Col>
                </>
                  } 
            </Row>
        </Container>
     );
}
 
export default Movie;