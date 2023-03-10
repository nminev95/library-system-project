import React, { useEffect, useState } from 'react';
import { MDBCol, MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';
import { Line } from 'react-chartjs-2'

const LineChart = () => {

    const [months, setMonths] = useState([]);
    const [usersCount, setUsersCount] = useState(null)

    useEffect(() => {

        const month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        const months = [];
        const date = new Date();
        const result = date.getMonth();
        for (let i = result; months.length < 6; i--) {
            months.push(i);
            if (i === 0) {
                i = 12;
            }
        }

        const monthsAlph = [];
        months.forEach(monthNum => {
            monthsAlph.push(month[monthNum]);
        })

        setMonths(monthsAlph.reverse())
    }
        , []);

    useEffect(() => {
        fetch(`http://localhost:4000/admin/users/monthly`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setUsersCount(data[0].Count))
    })

    const dataLine = {

        labels: months,
        datasets: [
            {
                label: 'Registered users by months',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0, usersCount]
            }
        ]
    };

    return (
        <MDBCol md="12" lg="4" className="mb-4">
            <MDBCard className="mb-4">
                <MDBCardHeader>Line chart</MDBCardHeader>
                <MDBCardBody>
                    <Line data={dataLine} options={{ responsive: true }} />
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default LineChart;