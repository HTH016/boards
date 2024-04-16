
import { useEffect, useState } from 'react';
import './../Custom.css';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios';
import PostDetail from './../components/PostDetail.js';
import CommentList from './../components/CommentList.js';


function PostWriteUI( ){
    
    const navigate = useNavigate();

    const [postData, setPostData] = useState([]);
    let {category} = useParams();

    
    console.log(postData);
    console.log(category);
    return (

<div className="custom-board" style={{width : '60%'}}>
            
            <form action={`/postwrite/${category}`} name="postmodifyform" method="POST">
                <div className="left-word">제목</div>
                <input type="text" name="titleinput" className="in"/>

                <div className="left-word">내용</div>
                <input type="textarea" name="contentinput" className="in"/>
                
                <div className="left-word">첨부 이미지</div>
                <input type="file" name="imageinput" className="in"/>
                {/*
                <img src="/images/default_profile.jpg" width="300px"/>
                */}
                <div className="button-container" style={{width : '30%', alignItems: 'center', margin: '0 auto'}}>
                    <input type="submit" className="button" value="작성완료"/>
                    <input type="button" className="button" value="작성취소" onClick={() => {navigate(`/postlist/${category}`)}}/>
                    </div>
            </form>
        </div>


    )
}


export default PostWriteUI;




