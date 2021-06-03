import React from "react";

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    if (totalPosts > 0) {
        const pageNumbers = [];
        let numberOfPages = Math.ceil(totalPosts / postsPerPage);

        pageNumbers.push("<");
        if (currentPage < 5) {
            // Left Endpoint
            for (let i=1; i<=7; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("... ");
            pageNumbers.push(numberOfPages);
        } else if (currentPage > (numberOfPages-5)) {
            // Right Endpoint
            pageNumbers.push(1);
            pageNumbers.push(" ...");
            for (let i=(numberOfPages-6); i<=numberOfPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            //Middle
            pageNumbers.push(1);
            pageNumbers.push("... ");
            for (let i=(currentPage-2); i<=(currentPage+2); i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push(" ...");
            pageNumbers.push(numberOfPages);
        }
        pageNumbers.push(">");
        return (
            <div className="pagination">
                {pageNumbers.map(number =>(
                    <a key={number} href="!#" id={number===currentPage?"selected":"not-selected"} onClick={() => paginate(number)}>
                        {number}
                    </a>
                ))}
            </div>
        );
    } else {
        return (
            <nav />
        );
    }
}

export default Pagination