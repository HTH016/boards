import '../css/Post.css';

function Post(props) {
    return (
        <div id='post'>
            <span>
                {props.board_num}
            </span>
            <span>
                {props.board_title}
            </span>
        </div>
    )
}

export default Post;