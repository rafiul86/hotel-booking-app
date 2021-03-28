import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import BookingInfo from '../BookingInfo/BookingInfo';

const Book = () => {
    const {type} = useParams();
    const [loggedUser ,setLoggedUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn : new Date(),
        checkOut : new Date ()
    });

  const handleDateChange = (date) => {
      const newDates = {...selectedDate}
      newDates.checkIn = date ;
      newDates.checkOut = date
    setSelectedDate(newDates);
  };
  const handleBooking = () =>{
        const newBooking = {...loggedUser, ...selectedDate}
            fetch('http://localhost:5000/booking',{
                method : 'post',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(newBooking)
            })  
                .then(res => res.json())
                .then(data =>{
                    
                })
             }     
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello <span style={{color : 'purple'}}>{loggedUser.name}</span> Let's book a {type} Room.</h1>
            <p>Want a <Link to="/home">different one?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="check in date"
          value={selectedDate.checkIn}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="checkout date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    <Button onClick={handleBooking} variant="contained" color="primary">
  Book Now
</Button>
<BookingInfo></BookingInfo>
        </div>
    );
};

export default Book;