import { NextPage } from 'next';
//components 
import NavBar from '../../../components/Top-Components/NavBar/index';

export interface StadsProps {
    
}
 
const Stads: NextPage<StadsProps> = () => {
    return ( 
        <>
            <NavBar />
        </>
     );
}
 
export default Stads;