import { useGetTeamsQuery } from "../slices/teamsApiSlice";
import Loader from "../components/Loader";
import Message from '../components/Message';
import {  Button , Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
// import Meta from "../../components/Meta";

const TeamListScreen = () => {
    const { data: teams, isLoading, error } = useGetTeamsQuery();
    
    return (
        <div>
            {/* <Meta title = 'list of orders' /> */}
           { isLoading ? <Loader /> : error ? (<Message variant = 'danger'> {error?.data?.message || error.error}</Message>) : ( 
                 <Table striped hover responsive className = 'table-sm'>
                 <thead>
                     <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>MEMBERS</th>
                     <th>DATE</th>
                     <th></th>
                     </tr> 
                 </thead>
                 <tbody>
                 {teams.map((team) =>
    (
        <tr key = {team._id}>
            <td> {team._id} </td>
            <td> {team.name} </td>
            <td> {team.teamMembers.length} </td>
            <td> {team.createdAt.substring(0,10)} </td>
            <td>
                <LinkContainer to={`/team/${team._id}`}>
                    <Button className = 'btn-sm' variant = 'light'> 
                        Details
                    </Button>
                </LinkContainer>
            </td>
        </tr>
))}
                 </tbody>
                 </Table>
            )}
        </div>
    )
};

export default TeamListScreen;
