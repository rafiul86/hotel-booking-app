import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const BookingInfo = () => {
    const [bookingsdata, setBookingsdata] = useState([])
    const [loggedUser ,setLoggedUser] = useContext(UserContext)
    useEffect(()=>{
            fetch('http://localhost:5000/showData?email='+loggedUser.email,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => setBookingsdata(data))

    },[])
    return (
        <div>
            {
                bookingsdata.map(book => <li>Reserved for {book.name}  from   {new Date(book.checkIn).toDateString("dd/MM/yyyy")} to {new Date(book.checkOut).toDateString("dd/MM/yyyy")}</li>)
            }
        </div>
    );
};

export default BookingInfo;