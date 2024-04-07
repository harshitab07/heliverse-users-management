import { useParams,Link } from "react-router-dom";
import Message from "../components/Message";
import { useGetTeamDetailsQuery } from "../slices/teamsApiSlice";
import { Row, Col, ListGroup, Image} from 'react-bootstrap';
import Loader from "../components/Loader";
// import Meta from "../components/Meta";

const TeamIdScreen = () => {
    const {id: teamId} = useParams();

    const { data:team,isLoading,error } = useGetTeamDetailsQuery(teamId);


    return (
        isLoading ?  (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : 
        (<>
        {/* <Meta title = 'T' /> */}
    <Row>
      <Col md={12}>

      <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Team Details</h2>
              <p>
                <strong>Name: </strong> {team.name}
              </p>
              <h3>Objective</h3>
              <p>
                {team.objective}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Team Members</h3>
              {team.teamMembers.length === 0 ? (
                <Message>No member in team</Message>
              ) : (
                <ListGroup variant='flush'>
                  {team.teamMembers.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.avatar}
                            alt={item.first_name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/users/${item.members}`}>
                            {item.first_name} {item.last_name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          {item.gender}
                        </Col>
                        <Col md={2}>
                          {item.domain}
                        </Col>
                        <Col md={3}>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
    </ListGroup> 
    </Col>
    </Row>
        </>)
    );
};

export default TeamIdScreen;

