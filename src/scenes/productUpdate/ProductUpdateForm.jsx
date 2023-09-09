import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, editProduct } from '../../state/api.js';
import Product from "../products/index.jsx";

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
        margin-top: 20px
`;

const EditProduct = () => {
    const [product, setProduct] = useState(initialValue);
    const { name, price, description, category, rating, supply } = product;
    const { id } = useParams();

    console.log(product);
    
    let navigate = useNavigate();

    useEffect(() => {
        loadProductDetails();
    }, []);

    const loadProductDetails = async() => {
        const response = await getProduct(id);
        setProduct(response.data);
    }

    const editProductDetails = async() => {

        const response = await editProduct(id, product);
        navigate("../products");
        window.location.assign("../products").reload()
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setProduct({...product, [e.target.name]: e.target.value})
    }

    return (
        <Container>
            <Typography variant="h4">Edit Product</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Product Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
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
                <Button variant="contained" color="primary" onClick={() => editProductDetails()}>Update Product</Button>
            </FormControl>
        </Container>
    )
}

export default EditProduct;