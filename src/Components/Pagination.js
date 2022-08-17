import React from 'react';
import '../App.css';
import '../styles/Pagination.css';
import PerPage from './PerPage';
function Pagination(props) {
    let currentPage = 1;
    let endPage = props.mx;
    let startPage = 1;

    if (props.currentPage) currentPage = props.currentPage;
    if (currentPage + 2 < endPage)
        endPage = currentPage + 2;
    if (endPage < 5) endPage = 5;
    if (
        endPage - 4 > startPage &&
        endPage - 4 <= currentPage
    )
        startPage = endPage - 4;

    const pageNumbers = ['Prev'];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    pageNumbers.push('Next');

    const ViewList = pageNumbers.map((pageNo, i) => (
        <PerPage
            key={i}
            currentPage={currentPage}
            endPage={endPage}
            startPage={startPage}
            pageNo={pageNo}
            Paginate={props.Paginate}
            mx={props.mx}
        />
    ));
    return (
        <div className="pagination">
            <div className="wrapPages">{ViewList}</div>
        </div>
    );
}
export default Pagination;
