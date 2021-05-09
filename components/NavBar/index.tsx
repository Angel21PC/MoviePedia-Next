//Next
import { useRouter } from "next/router";
import Link from "next/link";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
// import logo from "../../../public/image.png";

//COMPONENTS
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//firebase
import { useAuth } from "../../firebase/AuthContext";

//style
import style from "./NavBar.module.scss";

export interface NavBarProps {}

const NavBar: React.SFC<NavBarProps> = () => {
  const currentUser = useAuth();
  const { logout } = useAuth();

  const router = useRouter();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      sticky="top"
      className={style.nav}
    >
      <Navbar.Brand href="/">
        <img src="../../../public/image.png" alt="" height="40px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/all_pages/HomeMovies">
            <a>Movies</a>
          </Link>
          <Link href="/all_pages/HomeTvShows">
            <a>Tv Shows</a>
          </Link>
          <Link href="/home">
            <a>Collections</a>
          </Link>
        </Nav>
        <Nav>
          {currentUser.currentUser ? (
            <NavDropdown
              title={currentUser.currentUser.email}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/all_pages/Profile">
                <FontAwesomeIcon icon={faUser} /> Profile{" "}
              </NavDropdown.Item>
              <NavDropdown.Item href="/all_pages/List">List</NavDropdown.Item>
              <NavDropdown.Item href="/all_pages/MyCollections">
                My collections
              </NavDropdown.Item>
              <NavDropdown.Item href="/all_pages/Stads">Stads</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Log out <FontAwesomeIcon icon={faSignInAlt} />
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Link href="/all_pages/SingUp">
                <a>Sing in</a>
              </Link>
              <Link href="/all_pages/LogIn">
                <a>Login</a>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
