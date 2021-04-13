import { useEffect, useState } from "react";
import { IListM } from "../../../types";
import axios from 'axios';

//component-p
import Poster from '../Poster/index';

//api
import {URL, api_rutes} from '../../../pages/all_pages/config/rute_api'

export interface LstMProps {
    
}
 
const LstM: React.SFC<LstMProps> = (props: any) => {


    console.log(props)
    const [movie, setMovie]= useState(undefined)
    useEffect(() =>{
        //data
        async function getDataMovie() {
            let id = props.id
            const result =  await axios.get(URL+api_rutes.OneMovie, {
                params: {
                    id:{id}
                }
            })
           
            setMovie(result.data); 
        }
        getDataMovie()

    }, []);
 
   
    return ( 
    
        <Poster 
            c='movie_poster' 
            movie={movie?.data}
        />
        
     );
}
 
export default LstM;