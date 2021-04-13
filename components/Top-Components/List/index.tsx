//firebase
import { useAuth } from '../../../firebase/AuthContext';
import { useEffect, useState } from "react";
import { IListM } from '../../../types';

//components-p
import LstM from '../../Min-Components/ListMovie/index'

//COMPONENTS 
import { Tabs, Tab, Container } from 'react-bootstrap';

export interface ListMProps {
    
}
 
const ListM: React.SFC<ListMProps> = (data:IListM) => {

    console.log(data)

    return ( 
        <Container>
            <Tabs className="justify-content-md-center" defaultActiveKey="Liked" id="uncontrolled-tab-example">
                <Tab eventKey="Liked" title="Liked">
                    {data?.Like?.map(movie=>(
                        movie?.id_movie.map(id=>(
                            <LstM {...id}/>
                        ))
                    ))}
                </Tab>
                <Tab eventKey="Pending" title="Pending">
                    {data?.Bookmark?.map(movie=>(
                        movie?.id_movie.map(id=>(
                            <LstM {...id}/>
                        ))
                    ))}
                </Tab>
                <Tab eventKey="Watched" title="Watched" disabled>
                    <p>bihsbbfbsubfsobfobsbfuobsuf</p>
                </Tab>
            </Tabs>
        </Container>
     );
}
 
export default ListM;