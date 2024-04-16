import React, { useState } from 'react';
import axios from 'axios';
//Routing
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'


// Boot Strap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function NavBar(props){


  const handleLogout = async () => {
    try {
        await axios.post('/logout');
        sessionStorage.removeItem('userId');
        console.log('로그아웃 성공');
        alert('로그아웃 되었습니다.')
        window.location.href = '/';
    } catch (error) {
        console.error('로그아웃 실패:', error);
    }
};
  let sessionId = sessionStorage.getItem('userId');
    const isLoggedIn = props.isLoggedIn;
    console.log(isLoggedIn)
        return (
            (!isLoggedIn) ?
            
            <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">STUDY LAB</Navbar.Brand>
              <Nav className="ms-auto">           
    
                <Nav.Link href="/register">회원가입</Nav.Link>
                <Nav.Link href="/loginform">로그인</Nav.Link>          
              
              </Nav>
            </Container>
          </Navbar>
          :
            <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">STUDY LAB</Navbar.Brand>
              <Nav className="ms-auto">
                
                <div className="show-nickname"> 닉네임 </div>
                <Nav.Link href={`/mypage/${sessionId}`}>마이페이지</Nav.Link>
                <Nav.Link href="/logout" onClick={handleLogout}>로그아웃</Nav.Link>
              
              </Nav>
            </Container>
          </Navbar>
        )
    }



export default NavBar;