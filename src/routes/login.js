import React, { useState } from 'react';
import './../Custom.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';


const LoginUI = () => {

    const [loginid, setLoginid] = useState('');
    const [loginpasswd, setLoginpasswd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post('/process/login', { loginid, loginpasswd });
          if (response.data.isLoggedIn) {
            sessionStorage.setItem('userId', loginid);
            console.log(response.data.userId)
            // 로그인 성공 시 페이지 전환
            window.location.href = '/'; // 다른 페이지로 이동하거나
            // history.push('/otherpage'); // React Router를 사용하여 다른 페이지로 이동할 수도 있습니다.
            
          } else {
            setErrorMessage('Invalid username or password');
          }
        } catch (error) {
          console.error('Error during login:', error);
          setErrorMessage('An error occurred during login');
        }

        let sessionId = sessionStorage.getItem('userId');

    // sessionId가 undefined인 경우에는 빈 문자열로 대체하여 렌더링될 수 있도록 함
    if (!sessionId) {
        sessionId = '';

      };

      
    }

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
            <input type="text" className ="in" value={loginid} onChange={(e) => setLoginid(e.target.value)} placeholder="Username" />
            <input type="password" className ="in" value={loginpasswd} onChange={(e) => setLoginpasswd(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin} id="btn" className="button">Login</button>
            {errorMessage && <p>{errorMessage}</p>}
            <a href="/register">회원가입</a>
            <a href="/findaccount">아이디/비밀번호 찾기</a>
        </div>
    )
}

function RegisterUI(){
    
    return (
        
        <>
        <div> 회원가입 </div>
        <div className="custom-user">
            
            <form action="/userregister" name="registerform" method="POST">
                <div className="left-word">아이디</div>
                <input type="text" name="idinput" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                <div className="left-word">비밀번호</div>
                <input type="password" name="passwdinput" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                <div className="left-word">비밀번호 확인</div>
                <input type="password" name="passwdconfirm" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                <div className="left-word">닉네임</div>
                <input type="text" name="nicknameinput" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                <div className="left-word">이름</div>
                <input type="text" name="nameinput" className="in"/>
                <div className="left-word">이메일</div>
                <input type="text" name="emailinput1" className="in" maxlength="20" width="20"/>
                <input type="text" name="emailinput2" className="in" maxlength="20" width="20"/>
                <div className="left-word">전화번호</div>
                <input type="text" name="telinput1" className="in" maxlength="3" width="3"/>
                <input type="text" name="telinput2" className="in" maxlength="4" width="4"/>
                <input type="text" name="telinput3" className="in" maxlength="4" width="4"/>
                <div className="left-word">프로필 사진</div>
                <input type="file" name="profileinput" placeholder="프로필 사진" className="in"/>
                <img src="/images/default_profile.jpg" width="200px"/>

                
                <input type="submit" id="btn" value="회원가입"/>
                <input type="button" id="btn" value="취소"/>
            </form>
        </div>
        </>
    )
}



function FindAccountUI(){
    return (
        <>
        <div className="custom-user">
            <form action="">
                아이디 찾기
                <div className="left-word">이름</div>
                <input type="text" id="nameInput" className="in"/>
                <div className="left-word">이메일</div>
                <input type="text" id="emailInput1" className="in" maxlength="20" width="20"/>
                <input type="text" id="emailInput2" className="in" maxlength="20" width="20"/>
             
                <input type="submit" id="btn" value="확인"/>
                <input type="button" id="btn" value="취소"/>
            </form>
        </div>

        <div className="custom-user">
            <form action="">
                비밀번호 찾기
                <div className="left-word">아이디</div>
                <input type="text" id="idInput" className="in"/>
                <div className="left-word">이름</div>
                <input type="text" id="nameInput" className="in"/>
                <div className="left-word">이메일</div>
                <input type="text" id="emailInput1" className="in" maxlength="20" width="20"/>
                <input type="text" id="emailInput2" className="in" maxlength="20" width="20"/>
                
                <input type="submit" id="btn" value="확인"/>
                <input type="button" id="btn" value="취소"/>
            </form>
        </div>

        <div className="custom-user">
            <form action="">
                새 비밀번호 입력
                <div className="left-word">새 비밀번호</div>
                <input type="password" id="passwdInput" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                <div className="left-word">새 비밀번호 확인</div>
                <input type="password" id="passwdConfirm" className="in"/>
                <div className="valid-warn"> 유효성 </div>
                
                <input type="submit" id="btn" value="확인"/>
                <input type="button" id="btn" value="취소"/>
            </form>
        </div>
        </>
    )
}


export {LoginUI, RegisterUI, FindAccountUI}