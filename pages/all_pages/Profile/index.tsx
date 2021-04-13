import { NextPage } from 'next';
//components 
import NavBar from '../../../components/Top-Components/NavBar/index';

export interface ProfileProps {
    
}

const Profile: NextPage<ProfileProps> = () => {
    return ( 
        <>
        <NavBar />
            {/* imagen de perfil ? */}
            {/* Formulario para cambiar datos */}
        </>
     );
}
 
export default Profile;