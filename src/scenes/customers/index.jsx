import React, {useState} from 'react';
import {Box, useTheme, Button,} from "@mui/material";
import { useGetCustomersQuery, editUser, getUsers} from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { Padding, AddOutlined} from "@mui/icons-material";

import { Link } from 'react-router-dom';

const User = ({
  _id,
  name, 
  email, 
  password, 
  city, 
  state, 
  country, 
  occupation, 
  phoneNumber, 
  transactions, 
  role
}) => {
 const theme = useTheme();
}

const Customers = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetCustomersQuery();
    console.log("data", data);

    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          flex: 0.5,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "phoneNumber",
          headerName: "Phone Number",
          flex: 0.5,
          renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
          },
        },
        {
          field: "country",
          headerName: "Country",
          flex: 0.4,
        },
        {
          field: "occupation",
          headerName: "Occupation",
          flex: 1,
        },
        {
          field: "role",
          headerName: "Role",
          flex: 0.5,
        },
        {
          field: "action",
          headerName: "Action",
          sortable: false,
          renderCell: (params) => {
            return <Button color="secondary" variant="contained" component={Link} to={`/edituser/${params.id}`}>Edit</Button>;
          }
        },
        
      ];
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subtitle="List of customers"/>
        <Button variant="contained" color="secondary" style={{marginTop: 10}} component={Link} to={`/addUser`} startIcon ={<AddOutlined/>}>Add Customer</Button>
        <Box
        mt="40px"
        width="100px"
        // height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >

      </Box>
        <Box>
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
            />
        </Box>
    </Box>
  );
  
};

export default Customers