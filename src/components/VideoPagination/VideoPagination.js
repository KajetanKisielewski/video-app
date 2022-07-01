import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import VideoContext from '../../context/VideoContext';

import './videoPagination.css';

const VideoPagination = () => {
    const { currentPage, pageNumbers, setCurrentPage } = React.useContext(VideoContext);

    const paginate = (pageNum) => setCurrentPage(pageNum);

    const nextPage = () =>
        currentPage === pageNumbers.length ? currentPage : setCurrentPage(currentPage + 1);

    const prevPage = () => (currentPage === 1 ? currentPage : setCurrentPage(currentPage - 1));

    const renderPagination = () => (
        <Pagination aria-label="Page navigation" className="pagination" size="lg">
            <PaginationItem>
                <PaginationLink href="#" previous onClick={() => prevPage()} />
            </PaginationItem>
            {pageNumbers.map((num) => (
                <PaginationItem key={num}>
                    <PaginationLink href="#" onClick={() => paginate(num)}>
                        {num}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink href="#" next onClick={() => nextPage()} />
            </PaginationItem>
        </Pagination>
    );

    return pageNumbers?.length ? renderPagination() : null;
};

export default VideoPagination;
