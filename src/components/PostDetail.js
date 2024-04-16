import { useEffect, useState } from 'react';
import './../Custom.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';



function PostDetail(props) {
    
    const navigate = useNavigate();

    // props.postdata가 빈 배열인지 확인하고 처리
    if (props.postdata.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }
    const postdata = props.postdata[0]
    return (
        <>
            <div> 게시물 </div>
            <div className="custom">
                <div>
                    <div style={{ float: 'left' }}>
                        <div>
                            <img src="/images/default_profile.jpg" width="100px" />
                        </div>
                        <div>
                            작성자 : {postdata.user_id}
                        </div>
                    </div>
                    <div>
                        <div>
                            제목 : {postdata.board_title}
                        </div>
                        <div>
                            <div style={{ float: 'left' }}>
                                작성 날짜(수정 날짜) : {postdata.board_title}
                            </div>
                            <div style={{ float: 'left' }}>
                                조회수 : {postdata.board_views}
                            </div>
                            <div style={{ float: 'left' }}>
                                추천수 : {postdata.board_likes}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    글 내용 : {postdata.board_contents}
                </div>
                <div>
                    추천 버튼 :
                </div>

                
            </div>
            <div className="button-container" style={{width : '30%', alignItems: 'center', margin: '0 auto'}}>
                    <input type="button" id="btn" className="button" value="글수정" onClick={() => {navigate(`/postmodify/${postdata.board_id}`)}} />
                    <input type="button" id="btn" className="button" value="글삭제" onClick={() => {navigate(`/postdelete/${postdata.board_id}`)}}/>
                    <input type="button" id="btn" className="button" value="목록으로" onClick={() => {navigate(`/postlist/${postdata.category_id}`)}}/>
            </div>
        </>
    );
}


export default PostDetail;