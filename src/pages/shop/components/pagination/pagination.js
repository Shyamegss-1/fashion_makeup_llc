import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usepagination';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="toolbar bottom">
      <div className="pager">
        <div className="pages">
          <label>Page:</label>
          <ul className="pagination">
            <button disabled={currentPage === 1 ? true : false} onClick={onPrevious}>
              <Link to={'#'}>«</Link>
            </button>
            {paginationRange.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return <li className="pagination-item dots">&#8230;</li>;
              }

              return (
                <li
                  className={classnames('pagination-item', {
                    selected: pageNumber === currentPage,
                  })}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              );
            })}
            <button disabled={currentPage === lastPage ? true : false} onClick={onNext}>
              <Link to={'#'}>»</Link>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
