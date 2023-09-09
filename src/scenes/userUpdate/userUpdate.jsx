import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser ,deleteUser} from '../../state/api.js';

const initialValue = {
    name: '',
    email: '',
    password: '',
    city:'',
    state:'',
    country:'',
    occupation:'',
    phoneNumber: '',
    transactions: '',
    role: '',
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, email, password, city, state, country, occupation, phoneNumber, transactions, role } = user ?? {};
    const { id } = useParams();

    console.log(user);
    
    let navigate = useNavigate();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async() => {
        const response = await editUser(id, user);
        navigate("../customers");
        window.location.assign("../customers").reload() 
    }
    const deleteUserData = async (id) => {
    await deleteUser(id);
    navigate("../customers");
    window.location.assign("../customers").reload() 
    }


    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='password' value={password} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">city</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='city' value={city} id="my-input" aria-describedby="my-helper-text" />
            </FormControl><FormControl>
                <InputLabel htmlFor="my-input">state</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='state' value={state} id="my-input" aria-describedby="my-helper-text" />
            </FormControl><FormControl>
                <InputLabel htmlFor="my-input">country</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='country' value={country} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">occupation</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='occupation' value={occupation} id="my-input" aria-describedby="my-helper-text" />
            </FormControl><FormControl>
                <InputLabel htmlFor="my-input">phoneNumber</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phoneNumber' value={phoneNumber} id="my-input" aria-describedby="my-helper-text" />
            </FormControl><FormControl>
                <InputLabel htmlFor="my-input">transactions</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='transactions' value={transactions} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">role</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='role' value={role} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button><br/>
                <Button variant="contained" color="secondary" onClick={() => deleteUserData(id)}>Delete User</Button> 
            </FormControl>
        </Container>

    )
}

export default EditUser;