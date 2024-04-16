import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

import axios from 'axios';
import { useEffect, useState } from 'react';


import PostList from './components/PostList.js';
import Pagination from './components/Pagination.js';
import Post from './components/Post.js';

import NavBar from './components/navBar.js';
import WithHeaderExample from './components/footer.js';

import MainUI from './routes/main.js';
import {LoginUI, RegisterUI, FindAccountUI} from './routes/login.js';
import PostListUI from './routes/postlist.js';
import PostWriteUI from './routes/postwrite.js';
import PostDetailUI from './routes/postdetail.js';
import PostModifyUI from './routes/postmodify.js';
import MyPageUI from './routes/mypage.js';


function App() {

  let sessionId = sessionStorage.getItem('userId');
  console.log(sessionStorage.getItem('userId'))
  return (
    
    <div className="App">

      
      
    <NavBar isLoggedIn={sessionId}/>
    
    <Routes>
      <Route path="/" element={ <div><MainUI/></div> } />
      <Route path="/main" element={ <div><MainUI/></div> } />
      
      <Route path="/loginform" element={ <div><LoginUI/></div> } /> 
      <Route path="/register" element={ <div><RegisterUI/></div> } />
      <Route path="/findaccount" element={ <div><FindAccountUI/></div> } />
      <Route path="/mypage/:myid" element={ <div><MyPageUI/></div> } />

      <Route path="/postlist/:category" element={ <div><PostListUI /></div> } />
      <Route path="/postdetail/:post" element={ <div><PostDetailUI/></div> } />
      <Route path="/postwrite/:category" element={ <div><PostWriteUI/></div> } />
      <Route path="/postmodify/:post" element={ <div><PostModifyUI/></div> } />
      {/*
      <Route path="/postdelete/:post" element={ <div><PostDeleteUI/></div> } />
  */}
    </Routes>

    <WithHeaderExample/>
      </div>
  
  );
}

export default App;




