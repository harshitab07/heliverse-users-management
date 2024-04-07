import { Card,Row,Col,Button, Container } from 'react-bootstrap'
import { addToTeam } from '../slices/teamSlice';
import { useDeleteUserMutation } from '../slices/usersApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'



const User = ({user}) => {
    const cardStyle = {
        // Set a fixed height for the card
        height: '95%', // Adjust this value as needed
      };
    
      const imageStyle = {
        height: '100px',
        width: '100px',
        objectFit: 'contain',
      };
      
      // Add a media query for screens smaller than or equal to 768px wide
      const smallScreenMediaQuery = '@media (max-width: 768px)';
      const smallScreenImageStyle = {
        ...imageStyle,
        [smallScreenMediaQuery]: {
          height: '200px', // Adjust height for smaller screens
          width: '200px',  // Adjust width for smaller screens
        },
      };

      const dispatch = useDispatch();

      const teamHandler = () => {
        dispatch(addToTeam({user}));
    }



    return (
        <Card style={cardStyle} className="my-3 rounded">
      <div className='d-flex flex-row'>
        <div>
        <Link to = {`/user/${user._id}`}>
               <Card.Img style = {smallScreenImageStyle} src={user.avatar} variant='top' />
        </Link>
        </div>
        <div>
          <Card.Body>
            <Link to = {`/user/${user._id}`}>
                <Card.Title as = 'div' className='product-title'>
                    <strong>
                        {user.first_name} {user.last_name}
                    </strong>
                </Card.Title>
            </Link>
            <Card.Text as="p">{user.gender}</Card.Text>
            <Card.Text as="p">{user.domain}</Card.Text>
            {user.available ? (
              <Card.Text as="h6" className="text-success">
                Available
              </Card.Text>
            ) : (
              <Card.Text as="h6" className="text-danger">
                Unavailable
              </Card.Text>
            )}
          </Card.Body>
        </div>
      </div>
    </Card>
    )
}

export default User;
