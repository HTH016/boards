import React, {useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrevPostList from './../components/PrevPostList.js';
import axios from 'axios';
import '../css/Post.css';

function Post(props) {
    return (

        <div>
            {/*
            <div>
            게시물 상세 : 카테고리id, 게시물id 필요
            </div>

            <div>
            댓글 : 게시물id 필요
            </div>
    */}
        
        <div id='post'>
            <span>
                {props.post.board_num}
            </span>
            <span 
        style={{textDecoration: 'underline', cursor: 'pointer'}}
        onClick={() => {
            const url = `/postdetail/${props.post.board_id}`;
            // 페이지를 해당 URL로 이동
            window.location.href = url;
        }}
    >
                {props.post.board_title}
            
            </span>
         
            
            <span>
                {props.post.user_id}
            </span>
            <span>
                {'댓글 수'}
            </span>
            <span>
                {'이미지 그림'}
            </span>
            <span>
                {props.post.board_reg_date}
            </span>
            <span>
                {props.post.board_views}
            </span>
            <span>
                {props.post.board_likes}
            </span>
        </div>
    

        </div>
    )
}

export default Post;