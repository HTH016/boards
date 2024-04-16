import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';

import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Custom.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
import { useEffect, useState } from 'react';


import PostList from './../components/PostList.js';
import Pagination from './../components/Pagination.js';
import Post from './../components/Post.js';

import NavBar from './../components/navBar.js';
import WithHeaderExample from './../components/footer.js';

import MainUI from './../routes/main.js';
import {LoginUI, RegisterUI, FindAccountUI} from './../routes/login.js';



  // 임시
  //<PostList boardList={currentBoardList(boardList)}/>
  function MyPageUI(){

    let {myid} = useParams();
    console.log(myid);
    const navigate = useNavigate();

    const [myData, setmyData] = useState([]);
    //const [myid, setMyId] = useState('');
 
    //console.log(myid)

    /*
    useEffect(() => {
        const userIdFromSession = sessionStorage.getItem('userId');
        if (userIdFromSession) {
            setMyId(userIdFromSession);
        } else {
            setMyId(' ');
        }
    }, []);
    */
    useEffect(() => {
        if (myid) {
            getMyData();
        }
    }, [myid]);
    console.log(myid);

    const getMyData = async () => {
        try {
            const result = await axios.get(`/mypage/${myid}`);
            console.log(result.data);
            setmyData(result.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    let mydata = myData[0]


    return (
        <Container>
        <Row>
            <Col xs = {4}>
                <Row>
                    <div>
                    <img src="/images/default_profile.jpg" width="200" height="200"/>
                    </div>
                </Row>
                <Row>
                    <div>
                    </div>
                    <div>
                        
                    </div>
                </Row>
                <Row>
                    <div style={ {display : "flex" }}>
                        <div>
                            회원 포인트
                        </div>
                        <div>
                        {mydata?.user_point}
                        </div>
                    </div>
                </Row>
                <Row>
                    <div>
                        <a href="/main">회원탈퇴</a>
                    </div>
                </Row>
            </Col>
            <Col>
                <Row>
                    <div style={ {display : "flex" }}>
                    
        <div> </div>
        <div className="custom-user" style={{width : '80%'}}>
            
            <form action="" name="disables" method="POST">
                <div className="left-word">아이디</div>
                <input type="text" name="idinput" value={mydata?.user_id_name} className="in"/>
                <div className="left-word">닉네임</div>
                <input type="text" name="nicknameinput" value={mydata?.user_nickname} className="in"/>
                <div className="left-word">이름</div>
                <input type="text" name="nameinput" value={mydata?.user_name} className="in"/>
                <div className="left-word">이메일</div>
                <input type="text" name="emailinput1" value={mydata?.user_email} className="in"/>
                <div className="left-word">전화번호</div>
                <input type="text" name="telinput1" value={mydata?.user_tel} className="in"/>

                <Link to="/modifyuserinfo">
                            <input type="button" id="btn" value="회원정보 수정"/>
                        </Link>


            </form>
        </div>
        
                    </div>
                </Row>
                <Row>
                    <div>
                        
                    </div>
                </Row>
                <Row>
                    <div>
                        
                    </div>
                </Row>
            </Col>
        </Row>
        {/*
      <Row>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    */}
    </Container>
    )
    }

export default MyPageUI;




