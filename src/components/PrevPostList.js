import React, {useState} from 'react';
//import styles from "./../cssModules/Tinylists.module.css";
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import './../Custom.css';
import PrevPost from './PrevPost.js';

function PrevPostList(props){

    /*
    const navigate = useNavigate();
    // 추천글, 각 게시판 순서 차례로 카테고리 번호 
    const [caterory, setCategory] = useState(0)
    // 각 카테고리별로 최근 작성 sort
    const [prevPosts, setPrevPosts] = useState([1, 2, 3, 4, 5, 6])
    
    const moveToList = () => {
        navigate(`/postlist/:${caterory}`);
      };
*/
      const category_id = props.category_id
      const category_name = props.category_name
      console.log(category_id)
      console.log(category_name)
      //let {category} = useParams();
      
    return (

    <div className="var-border">

        <div>
            <Link to={`/postlist/${props.category_id}`}>{props.category_name} </Link>
        </div>
        <div> 
            <PrevPost category={category_id}/>
        </div>


        {/*
        <div onClick={moveToList}>
            {caterory}
        </div>
        <ListGroup>
             {
                    prevPosts.map((post, index) => ( // 함수 본문을 중괄호로 변경
                        <ListGroup.Item key={index} onClick={() => navigate(`/post/${post}`)}>
                            {post}
                        </ListGroup.Item>
                    ))
                }
        </ListGroup>
            */}
    </div>
            
    )
}


export default PrevPostList;