import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Auth from "./Auth";
import Layout from "scenes/layout";
import MGLayout from "scenes/MGLayout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import ProductUpdateForm from "scenes/productUpdate/ProductUpdateForm";
import AddProduct from "scenes/productAdd/productAdd";
import EditProduct from "scenes/productUpdate/ProductUpdateForm";
import EditUser from "scenes/userUpdate/userUpdate";
import AddUser from "scenes/userAdd/userAdd";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Login from "scenes/Login/login";
import Signup from "scenes/signup/Signup";
import MGdashboard from "scenes/mgdashboard";
import { AuthProvider } from "authProvider";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
            <Route element={<Layout />}>
              <Route element={<Auth allowedRoles={['admin']}/>}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/productUpdate" element={<ProductUpdateForm/>} />
              <Route path="/addProduct" element={<AddProduct/>} />
              <Route path="/allProducts" element={<allProducts />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/edituser/:id" element={<EditUser />} />
              <Route path="/addUser" element={<AddUser/>} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
            <Route element={<MGLayout />}>
              <Route element={<Auth allowedRoles={['superadmin']}/>}>
                <Route path="/MGdashboard" element={<MGdashboard/>}/>
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;