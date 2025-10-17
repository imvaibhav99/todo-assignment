import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Body from "./components/Body";
import TaskList from "./components/Tasks/TaskList";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Nested routes under Body layout */}
        <Route element={<Body />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
