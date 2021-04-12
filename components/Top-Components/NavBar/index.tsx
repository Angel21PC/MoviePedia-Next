
import Link from "next/link"

//Icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../public/image.png';

//COMPONENTS 
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export interface NavBarProps {
    
}
 
const NavBar: React.SFC<NavBarProps> = () => {
    return ( 
        <>
            <Navbar collapseOnSelect expand="lg" bg="" variant="light">
                <Navbar.Brand >
                    <img src={logo} alt="" height="40px"/>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link href="/all_pages/Movies">
                    <a>
                        Movies
                    </a>
                </Link>
                <Link href="/home">
                    <a>
                        Tv Shows
                    </a>
                </Link>
                <Link href="/home">
                    <a>
                        Collections
                    </a>
                </Link>
            </Nav>
            <Nav>
            
                <Link href="/all_pages/SingUp">
                    <a>
                        Sing in
                    </a>
                </Link> 
                <Link href="/all_pages/LogIn">
                    <a>
                        Login
                    </a>
                </Link>
                
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        <style jsx>{`
            img {
                padding-bottom: 7px;
            }
            a{
                text-decoration: none !important;
                margin-right: 12px;
                color: black !important;
                transition: transform 450ms;
            }
            
            a:hover{
                transform: scale(1.02);
            }
      `}</style>
      </>
     );
}
 
export default NavBar;