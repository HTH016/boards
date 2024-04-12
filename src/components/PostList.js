import '../css/PostList.css';
import Post from './Post.js';

function PostList(props) {

    const result = props.boardList.map(
        (data) => (<Post 
            board_num = {data.board_num}
            board_title = {data.board_title}
            />)
    )

    return (
        <div id='post-list'>
            {result}
        </div>
    )
}

export default PostList;