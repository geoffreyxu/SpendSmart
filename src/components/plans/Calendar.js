


import React, { useState, useEffect } from 'react';
import './Calendar.css';
import randomColor from 'randomcolor';



let colors = ["red", `#ff00ff`, `#adff2f`, `#f0fff0`, `#ff69b4`, `#4b0082`, `#f0e68c`, `#ffa07a`, `#20b2aa`]




  //new code
  /*
  const events = [
    {
      startDate: new Date(2023, 2, 5),
      endDate: new Date(2023, 2, 7),
      description: "Event 1",
      title: "Hello",
      color: null
    },
    {
      startDate: new Date(2023, 2, 6),
      endDate: new Date(2023, 2, 8),
      description: "Event 2",
      title: "Hello",
      color: null
    }
  ];


events.forEach((event, index) => {
  event.color = colors[index % colors.length];
});
*/

  function ColoredSquare({backgroundColor}) {

    const style = {
      width: "10px",
      height: "30px",
      //borderRadius: "50%",
      backgroundColor: backgroundColor
    };
  
    return <div style={{ position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", margin: 0, padding: 0 }}>
      <div style={style}></div>
    </div>;
  }


function EventList({ events }) {

  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event">
          <div className="event-time">{event.Date}</div>
          <div className="event-title">{event.title}</div>
          <div className="event-value">{event.value}</div>
        </div>
      ))}
    </div>
  );
}





function Calendar(){
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showPlusPopup, setShowPlusPopup] = useState(false);
  const [events, setEvents] = useState([{
    Date: new Date(2023, 2, 6),
    value: null,
    title: "",
    color: null
  }]);
/*
  const [event, setEvent] = useState({
    startDate: new Date(2023, 2, 5),
    endDate: new Date(2023, 2, 7),
    value: "Event 1",
    title: "Hello",
    color: null
  });*/

  const [eventTitle, setEventTitle] = useState("");
  const [eventValue, setEventValue] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  //const [eventEndDate, setEventEndDate] = useState(null);
  const [colorCount, setColorCount] = useState(0);







  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (year, month, day) => {
    return new Date(year, month, day).getDay();
  };

  const month = date.getMonth();
  const year = date.getFullYear();

  const days = [];
  const numDaysInMonth = daysInMonth(year, month);

  for (let i = 1; i <= numDaysInMonth; i++) {
    days.push(i);
  }

  const firstDayOfWeek = getDayOfWeek(year, month, 1);
  const lastDayOfWeek = getDayOfWeek(year, month, numDaysInMonth);

  const blanksBefore = [];
  const blanksAfter = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    blanksBefore.push(i);
  }

  for (let i = 0; i < 6 - lastDayOfWeek; i++) {
    blanksAfter.push(i);
  }

  const handleDayClick = (day) => {
    setSelectedDate(new Date(year, month, day));
    const eventsForDay = events.filter(event => {
      return (event.Date <= new Date(year, month, day) && event.endDate >= new Date(year, month, day));
    });
    setSelectedEvents(eventsForDay);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setSelectedDate(null);
    setShowPopup(false);
  };

  const handlePlusPopupClose = () => {
    setSelectedDate(null);
    setShowPlusPopup(false);
  };


  const handlePlusClick = () => {
    setShowPlusPopup(true);
  }
  





  const isWithinEventRange = (event, date) => {
    const start = event.Date;
    return date === start;
  };
  

  const renderEvents = (date) => {
    return events.map((event) => {
      if (isWithinEventRange(event, selectedDate)) {
        return (
          <div key={event.value}>
            <p>{event.value}</p>
          </div>
        );
      }
      return null;
    });
  };



  useEffect(() => {
    renderCalendar();
  })



  const renderCalendar = () => {
    const eventMap = {};

    events.forEach((event) => {
      const thisDate = new Date(event.Date);
  
     // if (let date = thisDate; date <= endDate; date.setDate(date.getDate() + 1)) 
        const year = thisDate.getFullYear();
        const month = thisDate.getMonth();
        const day = thisDate.getDate();
  
        if (!eventMap[year]) eventMap[year] = {};
        if (!eventMap[year][month]) eventMap[year][month] = {};
        if (!eventMap[year][month][day]) eventMap[year][month][day] = [];
  
        eventMap[year][month][day].push(event);
    
    });


    return (
      
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>Prev</button>
          <h2>{monthNames[month]} {year}</h2>

          <button onClick={nextMonth}>Next</button>
        </div>
        <div className="days">
          <div className="day">Sun</div>
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day">Fri</div>
          <div className="day">Sat</div>
        </div>
        <div className="calendar-body">
          {blanksBefore.map((_, i) => <div key={`before-${i}`} className="blank"></div>)}
          {days.map((day) => {
            
            const eventsForDay = eventMap[year][month]?.[day];
            return (

              <button key={day} className="day" onClick={() => handleDayClick(day)} style={{ position: 'relative' }}>
  <div className="eventBox" style={{ position: 'absolute', top: 0, left: 0 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {

        eventsForDay && eventsForDay.map((event) => {
          //coloring = colors[index];
          return (
            <div key={event.id} className="event" style={{ marginRight: '2px' }}>
                    <ColoredSquare backgroundColor = {event.color}/>
            </div>
          );
        })
      }
    </div>
    
  </div>
  <div>{day}</div>
</button>
            );
          })}
          {blanksAfter.map((_, i) => <div key={`after-${i}`} className="blank"></div>)}
        </div>
      </div>
    );
  };



  const renderPopup = () => {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="popup-close" onClick={handlePopupClose}>X</button>
          <h3>{selectedDate.toLocaleDateString()}</h3>
          {selectedEvents.length > 0 ? (
          <EventList events={selectedEvents} />
          ) : (
            <p>No events for this day.</p>
          )}
        </div>
      </div>
    );
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  }

  const handleValueChange = (e) => {
    setEventValue(e.target.value);
  }
/*
  const handleStartDateChange = (e) => {
    setEventDate(e.target.value);
  }*/

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  }

  const convertToDate = (dateString) => {
    const date = dateString.split("/");
    const month = parseInt(date[0]);
    const day = parseInt(date[1]);
    const year = parseInt(date[2]);
    const finalDate = new Date(year, month, day);
    return finalDate;
  }

  const plusPopupSubmit = () => {

    //const startDate = convertToDate(eventDate);
   const Date = convertToDate(eventDate);

    const newEvent = {
      Date: Date,
      value: eventValue,
      title: eventTitle,
      color: colors[colorCount]
    }

  setEvents([...events, newEvent]);
  if (colorCount === 8) setColorCount(0);
  else setColorCount(colorCount + 1);

   setShowPlusPopup(false);

  }

  const renderPlusPopup = () => {
    return (
      <div className="popup-overlay">
        <div className="pops">
          <div className="popser">
          <button className="popup-close" onClick={handlePlusPopupClose}>X</button>
            <h3>{"Add Event"}</h3>
            <input type="text" className="event-title" value={eventTitle} placeholder="Title" onChange={handleTitleChange} />
            <input type="text" className="event-value" value={eventValue} placeholder="Value" onChange={handleValueChange} />
            <input type="text" className="event-sDate" value={eventDate} placeholder="Date: MM/DD/YYYY" onChange={handleDateChange} />
            <button className="popup-submit" onClick={plusPopupSubmit}>Add</button>
            </div>
        </div>
      </div>
    );
  };


  
  return (
    <div className="calendar">
      {renderCalendar()}
      {showPopup && renderPopup()}
      {showPlusPopup && renderPlusPopup()}
      {renderEvents()}
      <button className="plusBut" onClick={handlePlusClick}>Add Plan</button>
    </div>
    
  );
  };

export default Calendar;


