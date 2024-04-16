import '../css/Pagination.css';

function Pagination(props) {
    const {total, boardPerPage} = props
    const endPage = Math.ceil(total / boardPerPage)

    let pageNumbers = []

    for (var i = 1; i <= endPage; i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
    const result = pageNumbers.map(
        (page) => (<span id="page" onClick={()=>pageClick(page)}> {page} </span>)
    )

    const pageClick = (page) => {
        alert(page)
        props.setCurrentPage(page)
    }

    return (
        
        <div id='pagination'>
            <div id='pagination-inner'>
                {result}
            </div>
        </div>
    )
}

export default Pagination;