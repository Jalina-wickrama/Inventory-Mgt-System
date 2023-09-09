import React, { useState } from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addProduct } from '../../state/api.js';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddProduct = () => {
    const [product, setProduct] = useState(initialValue);
    const { name, price, description, category, rating, supply } = product;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        await addProduct(product);
        navigate("../products");
        window.location.assign("../products").reload()
    }

    return (
        <Container>
            <Typography variant="h4">Add Product</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Product Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input"  />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='price' value={price} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Category</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='category' value={category} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Rating</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='rating' value={rating} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Supply</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='supply' value={supply} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add Product</Button>
            </FormControl>
        </Container>
    )
}

export default AddProduct;
