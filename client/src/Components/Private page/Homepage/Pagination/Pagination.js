import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({ paginate, pages, currentPage }) => {


    return (
        <nav>
            <div id="navDiv">
                <ul className="pagination">
                    <button id="prev" onClick={() => paginate(+(currentPage) - 1)}>Previous</button>
                    {pages.map(number => {
                        return (
                           
                                <li className="pageNum" key={number}>
                                    <a onClick={() => paginate(number)} className="pageLink">
                                        {number}
                                    </a>
                                </li>
                            
                        )
                    })}
                    <button id="next" onClick={() => paginate(+(currentPage) + 1)}>Next</button>
                </ul>
            </div>
        </nav>
    )
}

export default Pagination;