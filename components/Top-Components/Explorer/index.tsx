import { useEffect, useState } from "react";
import axios from 'axios';

//Next
import Link from "next/link"

//componentes
import {Container, Row, Form, Button} from 'react-bootstrap';
import Poster from "../../Min-Components/Poster/index";

export interface ExplorerProps {
    URL: string
    api_rutes: any
}
 
const Explorer: React.SFC<ExplorerProps> = ({URL, api_rutes}) => {

    const [fetchUrl, setFetchUrl] = useState(URL+api_rutes.PopularM);// consulta inicial
    const [movies, setMovies] = useState([]); //recoge todos los datos de la consulta
    const [genre, setGenre] = useState([]); //todos los qeneros disponibles para filtrar

    const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga

    const [page, setPage] = useState<number>(1);

    const [target_genre, setTargetGenre] = useState([]); //todos los qeneros disponibles para filtrar
    useEffect(() =>{
           
        //request para extraer las peliculas
        async function fetchData(){
            setMovies([]); //vaciamos el array
            setIsPending(true); //cargamos la animacion

            const request = await axios.get(fetchUrl, {
                params: {
                    p: page,
                    g: target_genre
                }
            });

            setTimeout(()=>{ //ejecutamos
                setIsPending(false)
                setMovies(request.data.data.results);
            },1500)
            console.log(request);
            return request;
        }
        fetchData();


        //request para extraer los generos 
        async function fetchData2(){
            const request = await axios.get(api_rutes.GenreM);
            setGenre(request.data.data.genres);
            return request;
        }
        fetchData2();


    }, [fetchUrl, page]);

    const handleSelect=(e)=>{

        switch (e.currentTarget.value) {
            case 'Popular':
                setFetchUrl(URL+api_rutes.PopularM);
                break;
            case 'Top':
                setFetchUrl(URL+api_rutes.TopM);
                break;
            case 'Upcoming':
                setFetchUrl(URL+api_rutes.UpcomingM);
                break;
            default:
                setTargetGenre(e.currentTarget.value)
                setFetchUrl((URL+api_rutes.DiscoverM))
                break;
        }      
    }

    return ( 
        <>
        <div className='explorer'>           
            <div className='explorer_content'>

                <Container fluid>
                            
                    <div className='explorer_Seach'>
                        <Form>
                        <Form.Group controlId="SelectFilter">
                            <Form.Label>Filtrar por:</Form.Label>
                            <Form.Control as="select" size="sm" custom onChange={handleSelect} className='seach'>
                                <option value='Popular' key='Popular'>Popular</option>
                                <option value='Top' key='Top'>Top</option>
                                <option value='Upcoming' key='Upcoming'>Upcoming</option>
                                {genre.map( //generos de busqueda
                                    (o) => <option value={o.id} key= {o.name}>{o.name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        </Form> 
                    </div>

                <Row className="justify-content-md-center" lg={6} md={4} sm={3} xs={1}>
                {isPending && <div><img src="https://rubico.com.mx/cultivandoelentendimiento_no_PHP/assets/img/demo/loader.gif" alt=""/></div>}
                    {movies.map(movie =>( //saca las peliculas


                        <Link
                            href={{
                            pathname: "/all_pages/Movie_select",
                            query: { id: movie.id },
                            }}
                            key={movie?.name} 
                        >
                            <a key={movie?.name} >
                                <Poster 
                                    c='poster' 
                                    movie={movie}
                                />
                            </a>
                         
                        </Link>     
                        
                    ))}
                </Row>

                <div className= 'explorer_button'>
                        <Button onClick={()=>{
                            if (page > 0){
                            setPage(page - 1);
                            console.log(page)
                            }
                        }}>Dame menos bb</Button>
                        <Button onClick={()=>{
                            
                            setPage(page + 1);
                            console.log(page)
                            
                        }}>Dame mas bb</Button>
                </div>
                </Container>
            </div>
        </div>
        <style jsx>{`
                .explorer{
                    margin-top: 6%;
                    position: relative;
                    height: 100%;
                    width: 100%;
                }
                

                .explorer h1{
                    color: black;
                    text-align: center;
                }
                
                .explorer_content{
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                }
                 
                .seach{
                    background-color: rgba(128, 128, 128, 0.438);
                    width: 125px;
                    text-align: center;
                    margin-left: 10px;
                }
                
                .explorer_Seach{
                    margin-left: 4px;
                }
                
                .explorer_button{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2%;
                    margin-bottom: 1%;
                }
                
            `}</style>
        </>
     );
}
 
export default Explorer;