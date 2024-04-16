import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';

import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Custom.css';

import axios from 'axios';
import { useEffect, useState } from 'react';


import PostList from './../components/PostList.js';
import Pagination from './../components/Pagination.js';
import Post from './../components/Post.js';

import NavBar from './../components/navBar.js';
import WithHeaderExample from './../components/footer.js';

import MainUI from './../routes/main.js';
import {LoginUI, RegisterUI, FindAccountUI} from './../routes/login.js';


function PostListUI() {

  const navigate = useNavigate();

  let {category} = useParams();
  


  const [boardList, setBoardList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [boardPerPage, setBoardPerPage] = useState(5)

  /*
  useEffect(() => {
    getBoard()
  }, [])
  */
  const [postList, setpostList] = useState([])

  useEffect(() => {
    getPostList();
  }, [])

  
  const getPostList = async() => {
    try {
      
      const result = await axios.get(`/postlist/${category}`);
      console.log(result);
      console.log(result.data);
      setpostList(result.data);

  } catch (error) {
      console.error('Error fetching category list:', error);
  }
  };

  console.log(postList);
  


  const getBoard = async() => {
    //alert('getboard!')
    const result = await axios('/postlist')
    console.log(result)
    console.log(result.data)
    setBoardList(result.data)
  }

  const currentBoardList = (boardList) => {
    //alert('getboard!')
    const startIndex = (currentPage - 1) * boardPerPage;
    const endIndex = startIndex + boardPerPage;
    const slicedList = boardList.slice(startIndex, endIndex)
    return slicedList;
  }

  // 임시
  //<PostList boardList={currentBoardList(boardList)}/>
  return (
    
    <div className="custom-board">
      {category}
      <PostList postList={postList}/>
      

      <Pagination 
      total={boardList.length} 
      boardPerPage={boardPerPage}
      setCurrentPage={setCurrentPage}/>

<div className="button-container" style={{width : '30%', alignItems: 'center', margin: '0 auto'}}>
                    <input type="button" id="btn" className="button" value="글쓰기" onClick={() => {navigate(`/postwrite/${category}`)}}/>
                    <input type="button" id="btn" className="button" value="메인으로" onClick={() => {navigate("/main")}}/>
            </div>

      </div>
  

  );
}

export default PostListUI;
