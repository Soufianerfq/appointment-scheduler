import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Patients from "../pages/admin/Patients";
import AHome from "../pages/admin/Home";
import Unauthorized from "../pages/Unauthorized";
import PresistLogin from "../components/presistLogin";
import RequireAuth from "../pages/RequireAuth";
import NotFound from "../pages/NotFound";


export default function Routers(){

    const ROLES_LIST = {
        Admin: 5150,
        User: 2001,
    };

    return(
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* protected routes */}
            <Route element={<PresistLogin />}>
                    <Route path="/admin">
                        <Route element={<RequireAuth allowedRoles={[5150]} />} >
                            <Route index element = {<AHome />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[5150]} />} >
                            <Route path="patients" element = {<Patients />}/>
                        </Route>
                    </Route>
            </Route>
        </Routes>
    )
}