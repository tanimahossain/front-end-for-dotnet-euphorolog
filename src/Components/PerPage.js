import {
    FaChevronLeft,
    // eslint-disable-next-line prettier/prettier
    FaChevronRight
} from 'react-icons/fa';
import '../App.css';
import '../styles/Pagination.css';
function PerPage(props) {
    const mx = props.mx;
    const currentPage = props.currentPage;
    const pageNo = props.pageNo;
    const prevPage = currentPage - 1 ? currentPage - 1 : 1;
    const nextPage =
        currentPage + 1 <= mx ? currentPage + 1 : mx;

    if (pageNo == currentPage) {
        return (
            <span
                className="page selected"
                onClick={() => props.Paginate(pageNo)}
            >
                {pageNo}
            </span>
        );
    } else if (pageNo === 'Prev') {
        const styleClassName =
            currentPage === 1 ? 'notPage' : 'page';
        return (
            <>
                <span
                    className={styleClassName}
                    onClick={() => props.Paginate(prevPage)}
                >
                    <span className="icon">
                        <FaChevronLeft />
                    </span>
                    {pageNo}
                </span>
            </>
        );
    } else if (pageNo === 'Next') {
        const styleClassName =
            currentPage === mx ? 'notPage' : 'page';
        return (
            <>
                <span
                    className={styleClassName}
                    onClick={() => props.Paginate(nextPage)}
                >
                    {pageNo}
                    <span className="icon">
                        <FaChevronRight />
                    </span>
                </span>
            </>
        );
    } else if (pageNo > mx) {
        return <span className="notPage">{pageNo}</span>;
    } else {
        return (
            <span
                className="page"
                onClick={() => props.Paginate(pageNo)}
            >
                {pageNo}
            </span>
        );
    }
}
export default PerPage;
