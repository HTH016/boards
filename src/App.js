
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostList from './components/PostList.js';
import Pagination from './components/Pagination.js';
import Post from './components/Post.js';

function App() {
  const [boardList, setBoardList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [boardPerPage, setBoardPerPage] = useState(5)


  useEffect(() => {
    getBoard()
  }, [])

  const selectAll = async() => {
    alert("selectAll!")
    const result = await axios.get('/movies')
    console.log(result)
  }

  const getBoard = async() => {
    //alert('getboard!')
    const result = await axios('/board')
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


  return (
    
    <div className="App">
      {/*
        <h1> React-Express-MySQL 연결 </h1>
        <button onClick={selectAll}> 모두 조회 </button>
  
      <button onClick={getBoard}> 게시판 글 모두 조회 </button>
  */}
      <PostList boardList={currentBoardList(boardList)}/>
      <Pagination 
      total={boardList.length} 
      boardPerPage={boardPerPage}
      setCurrentPage={setCurrentPage}/>
      </div>
  

  );
}

export default App;
