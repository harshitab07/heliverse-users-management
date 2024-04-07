import { Row,Col } from "react-bootstrap"
import { useGetUsersQuery,useCreateUserMutation } from "../slices/usersApiSlice";
import User from "../components/Users";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";
import {Container,Form,Button} from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";



const HomeScreen = () => {
    const {pageNumber,keyword} = useParams()
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');


    const { data , isLoading , refetch , error } = useGetUsersQuery({keyword,pageNumber,selectedDomain,selectedGender,selectedAvailability});

    const [createUser , {isLoading: loadingCreate}] = useCreateUserMutation();

    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
      };

      const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
      };
    
      const handleAvailabilityChange = (e) => {
        setSelectedAvailability(e.target.value);
      };


      const createUserHandler = async() => {
        if(window.confirm(`   are you sure you want to make a new user?
    (sample user will be added as the first position in list)`))
        {
            try{
                await createUser();
                toast.success('user created');
                refetch();
            }catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant = 'danger'>{error?.data?.message || error.error }</Message>) : (
            <>
            <Container className="mt-3">
            <Row className="align-items-start">
                <Col>
                    <Button onClick={createUserHandler} style={{marginTop:'2rem', marginLeft:'-10px'}}>
                     Create User
                    </Button>
                {loadingCreate && <Loader />}
                </Col>
                <Col sm={12} md={6} lg={6} >
                <Row>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Group controlId="domain">
                    <Form.Label>Domain</Form.Label>
                    <Form.Select
                        value={selectedDomain}
                        onChange={handleDomainChange}
                    >
                        <option value=''>None</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="IT">IT</option>
                        <option value="Management">Management</option>
                        <option value="Business Development">Business Development</option>
                        <option value="UI Designing">UI Designing</option>
                        {/* Add more options as needed */}
                    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={selectedGender}
                        onChange={handleGenderChange}
                    >
                        <option value=''>None</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Agender">Agender</option>
                        {/* Add more options as needed */}
                    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Group controlId="availability">
                    <Form.Label>Availablility</Form.Label>
                    <Form.Select
                        value={selectedAvailability}
                        onChange={handleAvailabilityChange}
                    >
                        <option value=''>None</option>
                        <option value='true'>Available</option>
                        <option value='false'>Unavailable</option>
                        {/* Add more options as needed */}
                    </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                </Col>
            </Row>
            </Container>
            {/* <Meta /> */}
            {!data.users[0] && <Message variant = 'danger'> search failed : no user found</Message>}
            <Row>
                {data.users.map((user)=> (
                    <Col key={user._id} md={6} lg={4}>
                        <User user={user} />
                    </Col>
                ))}
            </Row>
            <Container className="d-flex justify-content-center mt-3">
                <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
            </Container>
            </>) }
        </>
    );
};

export default HomeScreen;