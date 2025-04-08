import Pagination from "react-bootstrap/Pagination";
import './PaginationControls.css';

const PaginationControls = ({ currentPage, goToPage }) => {
  return (
    <Pagination className="pagination-container">
            <Pagination.Prev
              onClick={() => goToPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={() => goToPage(currentPage + 1)} />
          </Pagination>
  );
};

export default PaginationControls;
