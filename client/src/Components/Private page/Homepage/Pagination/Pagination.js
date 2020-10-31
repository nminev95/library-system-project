import React, { useState } from "react";
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({ stateData, updateBooks }) => {


    return (
        <div style={{textAlign: "center", marginBottom:"40px"}}>
        {stateData.hasPrevious ?
            <MDBBtn onClick={() => updateBooks(`http://localhost:4000/books?page=${stateData.currentPage - 1}`)}>Previous page</MDBBtn>
            : null}
        Page {stateData.currentPage}
        {stateData.hasNext ?
            <MDBBtn onClick={() => updateBooks(`http://localhost:4000/books?page=${stateData.currentPage + 1}`)}>Next page</MDBBtn>
            : null}
    </div>
    )
}

export default Pagination;

// history.push(`/books?page=1&genre=${event.target.name}`)
// updateBooks(`http://localhost:4000/books?page=${props.page}&genre=${event.target.name}`)