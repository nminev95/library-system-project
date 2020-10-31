import React, { useState } from "react";
import { MDBBtn } from 'mdbreact';
import { Link, useHistory } from 'react-router-dom';
import './Pagination.css'
import { render } from "react-dom";

const Pagination = ({ stateData }) => {
    const history = useHistory();

    const renderLocation = (location, direction) => {
        const regex = /\d+/g;
        const res = location.pathname + location.search
        let pageNum = location.search.match(regex).join('')
        let newUrl;

        if (direction === 'increase') {
            newUrl = res.replace(regex, ++pageNum)
        }
        if (direction === 'decrease') {
            newUrl = res.replace(regex, --pageNum)
        }
        
        return newUrl;
    }
    return (
        <div style={{textAlign: "center", marginBottom:"40px"}}>
            {renderLocation(history.location)}
        {stateData.hasPrevious ?
            <MDBBtn onClick={() => history.push(renderLocation(history.location, 'decrease'))}>Previous page</MDBBtn>
            : null}
        Page {stateData.currentPage}
        {stateData.hasNext ?
            <MDBBtn onClick={() => history.push(renderLocation(history.location, 'increase'))}>Next page</MDBBtn>
            : null}
    </div>
    )
}

export default Pagination;

// history.push(`/books?page=1&genre=${event.target.name}`)
// updateBooks(`http://localhost:4000/books?page=${props.page}&genre=${event.target.name}`)