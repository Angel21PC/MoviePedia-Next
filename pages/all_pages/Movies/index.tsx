import { NextPage } from 'next';

//initialprops
import {URL} from '../config/rute_api'



//components 
import NavBar from '../../../components/NavBar/index';
import Banner from '../../../components/Banner/index';

export interface MovieProps {
    data:any
}
 
const Movie: NextPage<MovieProps> = ({data}) => {

    console.log(data)
    return ( 
        <>
            <NavBar />
            <Banner data={data}/>
        </>
     );
}

Movie.getInitialProps = async () => {
    return fetch(URL+`/api/PopularM`)
    .then(res => res.json())
    .then(response => {
        return response
      })
  }

export default Movie;
