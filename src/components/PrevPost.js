import React, {useState} from 'react';
//import styles from "./../cssModules/Tinylists.module.css";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';


function PrevPost(props){

    const category_id = props.category;
    
    
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
    return (

    <div>
        카테고리 아이디 : {props.category}
        <ListGroup as="ol" numbered>

            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            
        </ListGroup>


    </div>
            
    )
}


export default PrevPost;