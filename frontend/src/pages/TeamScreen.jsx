import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromTeam,clearTeamMembers } from '../slices/teamSlice';
import { useState } from 'react';
import { useAddTeamMutation } from '../slices/teamsApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



const TeamScreen = () => {
    const [tname,setTname] = useState('');
    const [objective,setObjective] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const[addTeam , {isLoading : loadingAdd}] = useAddTeamMutation();

    const team = useSelector((state) => state.team);
    const { teamMembers } = team;
  
    // NOTE: no need for an async function here as we are not awaiting the
    // resolution of a Promise
     const removeFromTeamHandler = (id) => {
      dispatch(removeFromTeam(id));
    };
  
    const createTeamHandler = async() => {
        try {
            const res = await addTeam({
                name:tname,
                teamMembers,
                objective,
            }).unwrap();
            dispatch(clearTeamMembers());
            navigate(`/team/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    };
  
    return (
      <Row>
        {/* <Meta title = 'cart' /> */}
        <Col md={8}>
          <h1 style={{ marginBottom: '20px' }}>Team</h1>
          {teamMembers.length === 0 ? (
            <Message>
              No user added to the team yet <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {teamMembers.map((member) => (
                <ListGroup.Item key={member._id}>
                  <Row>
                    <Col md={2} >
                      <Image src={member.avatar} alt={member.first_name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/user/${member._id}`}>{`${member.first_name}  ${member.last_name}`}</Link>
                    </Col>
                    <Col md={2}>{member.gender}</Col>
                    <Col md={3}>{member.domain}</Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromTeamHandler(member._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <Form>
                <Form.Group controlId='tname'>
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                    type='name'
                    placeholder='Enter team name'
                    value={tname}
                    required
                    onChange={(e) => setTname(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='objective'>
                    <Form.Label>Objective</Form.Label>
                    <Form.Control
                        as='textarea'
                        row='3'
                        required
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                </Form>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={teamMembers.length === 0}
                    onClick={createTeamHandler}
                    >
                    Create Team
                    </Button>
                    {loadingAdd && <Loader />}
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
}

export default TeamScreen;
