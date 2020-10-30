import React, { useState } from "react";
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({ stateData }) => {


    return (
        <div style={{textAlign: "center", marginBottom:"40px"}}>
        {stateData.hasPrevious ?
            <Link to={`books?page=${stateData.currentPage - 1}`}><MDBBtn>Previous page</MDBBtn></Link>
            : null}
        Page {stateData.currentPage}
        {stateData.hasNext ?
            <Link to={`/books?page=${stateData.currentPage + 1}`}><MDBBtn>Next page</MDBBtn></Link>
            : null}
    </div>
    )
}

export default Pagination;