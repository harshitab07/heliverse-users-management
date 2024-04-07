import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem ,Container} from "react-bootstrap";
import { useGetUserDetailsQuery , useDeleteUserMutation} from "../slices/usersApiSlice";
import { addToTeam } from "../slices/teamSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { LinkContainer } from "react-router-bootstrap";
// import Meta from "../components/Meta";
// import { FaTrash } from "react-icons/fa";

const UserScreen = () => {
    const { id:userId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const team = useSelector((state) => state.team);

    const{teamMembers} = team;
    
    const { data:user, isLoading , error} = useGetUserDetailsQuery(userId);
    const [deleteUser , {isLoading : loadingDelete}] = useDeleteUserMutation();

    // const {userInfo} = useSelector((state) => state.auth);

    const addToTeamHandler = () => {
        const existMember = teamMembers.find((x) => x._id === userId);
        const existMemberDomain = teamMembers.find((x) => x.domain === user.domain);
        if(existMember){
            toast.info('this user is already added to the team');
        }
        else if(existMemberDomain)
        {
            toast.warning(`user of domain:${user.domain} already added to team`);
        }
        else if(!user.available)
        {
            toast.error(`this user is unavailable right now`);
        }
        else
        {
            dispatch(addToTeam(user));
            toast.success('user added to the team');
        }
    }


    const deleteHandler = async() => {
        if(window.confirm('are you sure you want to delete this user?'))
          {
            try {
              await deleteUser(user._id);
              toast.success('User Deleted');
              navigate('/');
            } catch (err) {
              toast.error(err?.data?.message || err?.error);
            }
          }
      }
    return (
        <>
        <Link className='btn btn-light my-3' to = '/'>
               Go Back
        </Link>
        {isLoading ? (<Loader />) : error ? (<Message variant = 'danger'>{error?.data?.message || error.error }</Message>) : ( 
        <> 
        {/* <Meta title = {product.name} /> */}
           <Row>
               <Col md={3}>
                 <Image src={user.avatar} alt={user.first_name} fluid />
               </Col>
               <Col md={5}>
                <ListGroup variant ='flush'>
                    <ListGroupItem>
                        <h3>{user.first_name} {user.last_name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                       email: <a href={`mailto:${user.email}`}>{user.email}</a>
                    </ListGroupItem>
                    <ListGroupItem>
                      gender : {user.gender}
                    </ListGroupItem>
                </ListGroup>
               </Col>
               <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>Domain:</Col>
                                <Col>
                                    <strong>
                                    {user.domain}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Availability:</Col>
                                <Col>
                                   
                                    {user.available ? (
                                        <strong>
                                        Available
                                        </strong>
                                    ) : (
                                        <strong>
                                        Unavailable
                                        </strong>
                                    )}     
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Container>
                            <Row>
                            {loadingDelete && <Loader />}
                            <Col>
                                <Button className = 'btn-md mx-2' variant="outline-danger" onClick={deleteHandler}>Delete</Button>
                            </Col>
                            <LinkContainer to = {`edit`}>
                            <Col>
                                <Button className = 'btn-md mx-2' variant="outline-primary" >update</Button>
                            </Col>
                            </LinkContainer>
                            </Row>
                        </Container>  
                        </ListGroupItem>
                        <ListGroupItem className="text-center">
                            <Button
                            className='btn-block w-100'
                            type='button'
                            variant="success"
                            onClick = {addToTeamHandler}
                            >
                                Add To Team
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
               </Col>
           </Row>
           </>)}
        </>
    )
}

export default UserScreen;
