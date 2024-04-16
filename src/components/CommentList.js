import React, {useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrevPostList from './../components/PrevPostList.js';
import axios from 'axios';
import '../css/Post.css';
import './Comment.js';


function CommentList(props) {
/*
    console.log(props.postList)
    const result = props.postList.map(
        (post) => (<Comment
            post = {post}
            />)
    )

    return (
        <div id='post-list'>
            {result}
        </div>
    )
*/
}

export default CommentList;
