import { NextPage } from 'next';
//components 
import NavBar from '../../../components/Top-Components/NavBar/index';
import Graph from '../../../components/Min-Components/Graph/index';

export interface StadsProps {
    
}
 
const Stads: NextPage<StadsProps> = () => {
    return ( 
        <>
            <NavBar />
            <Graph />
        </>
     );
}
 
export default Stads;