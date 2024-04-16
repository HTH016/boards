import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Post from './Post.js';


function PostList(props) {

    console.log(props.postList)
    const result = props.postList.map(
        (post) => (<Post 
            post = {post}
            />)
    )

    return (
        <div id='post-list'>
            {result}
        </div>
    )
}

export default PostList;

