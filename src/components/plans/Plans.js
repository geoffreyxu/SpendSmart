import React from 'react'
import Header from '../header/Header'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Plans() {
    
        return(
           
            <div>
                 <Header/>
                <h1>Budget Planning Page</h1>
            </div>
        )
    
}

export default Plans