import { useEffect, useState } from 'react';
import './../Custom.css';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios';
import PostDetail from './../components/PostDetail.js';
import CommentList from './../components/CommentList.js';


function PostDetailUI(){
    
    const [postData, setPostData] = useState([]);
    let {post} = useParams();

    useEffect(() => {
        getPostDetail()
    }, []);

    const getPostDetail = async () => {
        try {
            const result = await axios.get(`/postdetail/${post}`);
            console.log(result.data);
            setPostData(result.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(postData);

    return (
        
        <PostDetail
        postdata={postData}
        />


    )
}


export default PostDetailUI;