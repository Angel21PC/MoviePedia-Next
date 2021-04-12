import { NextPage } from 'next';

//components 
import NavBar from '../../../components/Top-Components/NavBar/index';
import FormS from '../../../components/Min-Components/Form/Form_singup';

export interface SingUpProps {
    
}
 
const SingUp: NextPage<SingUpProps> = () => {
    return ( 
        <>
         <NavBar />
         <FormS />
        </>
     );
}
 
export default SingUp;