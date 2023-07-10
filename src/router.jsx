import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import About from './components/views/about';
import Auth from './components/views/auth';

const Router = () => {

  return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Auth/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
  )
};

export default Router;