import React, {useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrevPostList from './../components/PrevPostList.js';
import axios from 'axios';

/*
링크 : 오른쪽에 
로그인 : 마이페이지, 로그아웃
로그아웃 : 로그인, 회원가입
*/
function MainUI(){
    

    
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategoryList();
  }, [])

  
  const getCategoryList = async() => {
    try {
      
      const result = await axios.get('/main');
      console.log(result);
      console.log(result.data);
      setCategories(result.data);

  } catch (error) {
      console.error('Error fetching category list:', error);
  }
  };
  let sessionId = sessionStorage.getItem('userId');
  console.log(categories);
  console.log(sessionId)
  
    /*
    const getCategoryCnt = async () => {
        try {
            const result = await axios.get('/postdetail');
            console.log(result.data);
            setCategoryCnt(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    */

    return (

        

        <Container>
            <Row>
                <Col>
                    <div style={{ marginBottom : '20px', marginTop : '20px'}}>
                        <img src="/images/ad.png" width="900" height="400"/>
                    </div>
                </Col>
            </Row>


            <Row>

            <div className="custom-board"> 

            {categories.map(category => (
            
            <div style={{ marginBottom : '20px', marginTop : '20px'}}>
            <PrevPostList
            category_id = {category.category_id}
            category_name = {category.category_name}/>
            
            </div>
            ))}
            </div>
            {/*
            categories.map(function(a, i){
                <Col><PrevPostList/></Col>
            })
        */}         
            </Row>
 

            
        </Container>
    )
}

export default MainUI