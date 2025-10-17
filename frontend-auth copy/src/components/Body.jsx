import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Body = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user);

  const fetchUser= async()=>{
    try {
      const res=await axios.get(
        BASE_URL+'/user/current-user',
        {withCredentials:true}
      );
      dispatch(addUser(res.data));
      
    } catch (error) {
      if(error.response && error.response.status===401){
        navigate('/login');
      }
      console.error("Fetching current user failed:",error);
    }
  }
  useEffect(()=>{
    if(!user){
      fetchUser();
    }
  },[user]);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex-1">
        <Outlet/> {/* This will render the child routes defined in App.jsx such as profile,login etc */}
      </main>
      <Footer/>
    </div>
  )
}

export default Body;
