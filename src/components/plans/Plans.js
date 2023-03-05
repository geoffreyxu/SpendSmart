import React from 'react'
import Header from '../header/Header'
//import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Plans() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState({ date: "", description: "" });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    console.log(event);
    setEvent({ date: "", description: "" });
  };

  return (
    <IntlProvider locale="en">
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <div>
          <input
            type="text"
            placeholder="Event description"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      </div>
    </IntlProvider>
  );
}

export default Plans;






/*
function Plans() {

    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState([
        {
            title: 'Dummy',
            start: new Date(2023, 2, 4, 10, 0),
            end: new Date(2023, 2, 4, 12, 0),
        }

    ]);

    const AddEventForm = () => {
        const [event, setEvent] = useState({ title: '', start: '', end: '' });
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setEvents([...events, event]);
          setEvent({ title: '', start: '', end: '' });
        };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
      </label>
      <label>
        Start Date:
        <input
          type="datetime-local"
          value={event.start}
          onChange={(e) => setEvent({ ...event, start: e.target.value })}
        />
      </label>
      <label>
        End Date:
        <input
          type="datetime-local"
          value={event.end}
          onChange={(e) => setEvent({ ...event, end: e.target.value })}
        />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

    const MyCalendar = () => (
        <div>
        <AddEventForm />
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
        />
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setEvents([...events, ev]);
        setEvent({ title: '', start: '', end: '' });
    };
}
    */
  /*  return(
           
        <div>
                <Header/>
            <h1>Budget Planning Page</h1>
        </div>
    )
    
}*/

//export default Plans