export interface AvaliableProps {
    provider:any
}
 
const Avaliable: React.SFC<AvaliableProps> = ({provider}) => {

    //url base para las imagenes
    const base_Url = 'https://image.tmdb.org/t/p/original/';
    console.log(provider);
    return ( 
        <div>
            {provider?.data.results?.US?.flatrate?.map( e => e.logo_path ? 
                    <li key='f'>
                        <img 
                            key= {e}
                            className= 'providers_logo'
                            src= {`${base_Url}${e?.logo_path}`}
                            alt={e}
                        ></img>     
                    </li>:
                    <></>)}
             <style jsx>{`
                .providers_logo {
                    margin-top: 1vh;
                    border-radius: 10px;
                    object-fit: cover;
                    max-height: 60px;
                    margin-left: 20px;
                  }
                li {
                    list-style: none;
                }
            `}</style>
        </div>
     );
}
 
export default Avaliable;