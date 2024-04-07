import { Navbar, Nav, Container, NavDropdown,Badge} from 'react-bootstrap';
import { RiTeamFill } from "react-icons/ri";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

// import logo from '../assets/logo.png';


const Header = () => {

//   const brandLogoStyle = {
//     maxWidth: '50px',
//     maxHeight: '50px',
//     height: 'auto',
//     marginRight: '10px',
//     overflow: 'hidden', // This prevents the image from overflowing its container
//   };
    const team = useSelector((state) => state.team);

    const{teamMembers} = team; 

    return(
         <header>
             <Navbar style={{backgroundColor:"#23527e"}} variant="dark" expand="md" collapseOnSelect>
                 <Container>
                     <LinkContainer to="/">
                     <Navbar.Brand>
                        <h1>User Management</h1> 
                     </Navbar.Brand>
                     </LinkContainer>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse id="basic-navbar-nav">
                         <Nav className="ms-auto">
                         <SearchBox />
                             <LinkContainer to="/team">
                             <Nav.Link ><RiTeamFill />Team
                             {
                                 teamMembers.length > 0 && (
                                        <Badge pill bg= 'info' style = {{marginLeft:'5px'}}>
                                            {teamMembers.length}
                                        </Badge>
                                 )
                             }
                             </Nav.Link>
                             </LinkContainer>
                         <NavDropdown title= 'options' id='username'>
                            <LinkContainer to= '/teamlist'>
                            <NavDropdown.Item >
                                team list
                            </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                         </Nav>
                     </Navbar.Collapse>
                 </Container>
             </Navbar>
         </header>
         
    )
}
export default Header;