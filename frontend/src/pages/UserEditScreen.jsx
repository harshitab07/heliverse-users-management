import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery,useUpdateUserMutation,useUploadUserImageMutation } from '../slices/usersApiSlice';
// import Meta from '../../components/Meta';

const UserEditScreen = () => {
      
      const { id: userId } = useParams();
    
      const [fname, setFname] = useState('');
      const [lname, setLname] = useState('');
      const [gender, setGender] = useState(0);
      const [avatar, setAvatar] = useState('');
      const [email, setEmail] = useState('');
      const [domain, setDomain] = useState('');
      const [id, setId] = useState('');
    
      const {
        data: user,
        isLoading,
        refetch,
        error,
      } = useGetUserDetailsQuery(userId);
    
      const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
    
      const [uploadUserImage, { isLoading: loadingUpload }] =
        useUploadUserImageMutation();
    
      const navigate = useNavigate();
    
      const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await updateUser({
            userId,
            first_name:fname,
            last_name:lname,
            email,
            gender,
            domain,
            avatar,
            id,
          }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
          toast.success('user updated');
          refetch();
          navigate(`/user/${userId}`);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    
      useEffect(() => {
        if (user) {
          setFname(user.first_name);
          setLname(user.last_name);
          setEmail(user.email);
          setGender(user.gender);
          setAvatar(user.avatar);
          setDomain(user.domain);
          setId(user.id);
        }
      }, [user]);
    
      const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        try {
          const res = await uploadUserImage(formData).unwrap();
          toast.success(res.message);
          setAvatar(res.avatar);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    
    return (
    <>
        <Link to={`/user/${userId}`} className='btn btn-light my-3'>
        Go Back
        </Link>
        <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
        ) : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='fname'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter first name'
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lname'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter last name'
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='avatar'>
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter avatar url'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                ></Form.Control>
                <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
                ></Form.Control>
                {loadingUpload && <Loader />}
             </Form.Group> 


            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="domain">
                    <Form.Label>Domain</Form.Label>
                    <Form.Select
                        value={domain}
                        placeholder='select domain'
                        onChange={(e) => setDomain(e.target.value)}
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

            <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={gender}
                        placeholder='select gender'
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value=''>None</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Agender">Agender</option>
                        <option value="Other">Other</option>
                        {/* Add more options as needed */}
                    </Form.Select>
            </Form.Group>

            <Form.Group controlId='id'>
                <Form.Label>position - to set position on HomeScreen </Form.Label>
                <Form.Control
                type='number'
                value={id}
                onChange={(e) => setId(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button
                type='submit'
                variant='primary'
                style={{ marginTop: '1rem' }}
            >
                Update
            </Button>
            </Form>
        )}
        </FormContainer>
    </>
    );
};

export default UserEditScreen;

         