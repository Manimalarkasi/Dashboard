import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import state from "./state";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout/Layout";
import Dashboard from "./scenes/dashboard/Dashboard";
import Products from "./scenes/products/Products";
import Customers from "./scenes/customers/Customers";
import Transaction from "./scenes/transaction/Transaction";
import Geography from "./scenes/geography/Geography";
import Registerats from "./components/Register";
import Loginats from "./components/Login";
import Home from "./components/Home";
import Overview from "./scenes/overview/Overview";
import Daily from "./scenes/daily/Daily";



function App() {

  
  const mode = useSelector((state)=>state.global.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode),[mode]));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/register" element={<Registerats/>} />
            <Route path="/" element={<Loginats />} />
            <Route path="/home" element={<Home/>} />

            <Route element={<Layout />} >
            <Route path="/" element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
