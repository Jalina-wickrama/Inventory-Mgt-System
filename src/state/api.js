import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers" , "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
          }),
          getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
          }),
          getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
              url: "client/transactions",
              method: "GET",
              params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
          }),

          getGeography: build.query({
            query:() => "client/geography",
            providesTags: ["Geography"],
          }),    

          getSales: build.query({
            query:() => "sales/sales",
            providesTags: ["Sales"],
          }),

          getAdmins: build.query({
            query:() => "management/admins",
            providesTags: ["Admins"],
          }),

          getUserPerformance: build.query({
            query:(id) => `management/performance/${id}`,
            providesTags: ["Performance"],
          }),

          getDashboard: build.query({
            query:() => "general/dashboard",
            providesTags: ["Dashboard"]
          }),
    }),
});

//product functions

export const getProduct = async (id) => {
  id = id || '';
  return await axios.get(`${baseUrl}/api/${id}`);
}

export const addProduct = async (product) => {
  return await axios.post(`${baseUrl}/api/add`, product);
}

export const deleteProduct = async (id) => {
  return await axios.delete(`${baseUrl}/api/${id}`);
}

export const editProduct = async (id, product) => {
  return await axios.put(`${baseUrl}/api/${id}`, product)
}

//user functions

export const getUsers = async (id) => {
  id = id || '';
  return await axios.get(`${baseUrl}/general/user/${id}`);
}

export const addUser = async (user) => {
  return await axios.post(`${baseUrl}/general/add`, user);
}

export const deleteUser = async (id) => {
  return await axios.delete(`${baseUrl}/general/${id}`);
}

export const editUser = async (id, user) => {
  return await axios.put(`${baseUrl}/general/user/${id}`, user)
}

//login signup

export const addLogin = async (inputValue) => {
  return await axios.post(`${baseUrl}/general/login`, inputValue);
}

export const addSignup = async (inputValue) => {
  return await axios.post(`${baseUrl}/general/Signup`, inputValue);
}

export const { useGetUserQuery,useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery}= api;