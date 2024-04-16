import React, { useState } from 'react';
import './../Custom.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';


const Logout = () => {


    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            sessionStorage.removeItem('userId');
            console.log('로그아웃 성공');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };
    


    /*
    <div>
      <input type="text" value={loginid} onChange={(e) => setLoginid(e.target.value)} placeholder="Username" />
      <input type="password" value={loginpasswd} onChange={(e) => setLoginpasswd(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    */

    /*
    <div className="custom">
            <form action="/process/login" method="POST">
                <input type="text" name="loginid" placeholder="아이디" className="in"/>
                <input type="password" name="loginpasswd" placeholder="비밀번호" className="in"/>
                <input type="submit" id="btn" value="로그인"/>
            </form>
            <a href="/register">회원가입</a>
            <a href="/findaccount">아이디/비밀번호 찾기</a>
        </div>
    */

    return (
        <div className="custom-user">
           
        </div>
    )
}

export default Logout;