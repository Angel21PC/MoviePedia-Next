
import { useEffect, useState } from "react";

//Icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faEye} from '@fortawesome/free-solid-svg-icons'

export interface M_B_FProps {
    movie:any
}
 
const M_B_F: React.SFC<M_B_FProps> = ({movie}) => {

    const [h, setH] = useState('heart');
    const [b, setB] = useState('bookmark');

    async function handleSelect(e){
        // switch (e) {
        //     case 'heart':
        //         await a_heart();
        //         break;
        //     case 'bookmark':
        //         await a_bookmark();
        //         break;
        //     case 'eye':
        //         console.log(e);
        //         break;
        //     default:
        //         break;
        // }
    }
    return ( 
        <>
            <h3>{movie.title}</h3>
            <FontAwesomeIcon className="icon fa-2x" id={h} name="heart" icon={faHeart} onClick={()=>handleSelect('heart')}/>
            <FontAwesomeIcon className="icon fa-2x" id={b} name="bookmark" icon={faBookmark} onClick={()=>handleSelect('bookmark')}/>
            <FontAwesomeIcon className="icon fa-2x" id="eye" name="eye" icon={faEye} onClick={()=>handleSelect('eye')}/>
        </>
     );
}
 
export default M_B_F;