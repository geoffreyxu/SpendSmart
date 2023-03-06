


import React, { useState } from 'react';
import './Calendar.css';



function EventList({ events }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event">
          <div className="event-time">{event.startTime} - {event.endTime}</div>
          <div className="event-title">{event.title}</div>
          <div className="event-description">{event.description}</div>
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


  //new code
  const events = [
    {
      startDate: new Date(2023, 2, 5),
      endDate: new Date(2023, 2, 7),
      description: "Event 1"
    }
  ];


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
      return (event.startDate <= new Date(year, month, day) && event.endDate >= new Date(year, month, day));
    });
    setSelectedEvents(eventsForDay);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setSelectedDate(null);
    setShowPopup(false);
  };



  const isWithinEventRange = (event, date) => {
    const start = event.startDate;
    const end = event.endDate;
    return date >= start && date <= end;
  };
  

  const renderEvents = (date) => {
    return events.map((event) => {
      if (isWithinEventRange(event, selectedDate)) {
        return (
          <div key={event.description}>
            <p>{event.description}</p>
          </div>
        );
      }
      return null;
    });
  };
  

  const renderCalendar = () => {
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
          {days.map((day) => (
            <button key={day} className="day" onClick={() => handleDayClick(day)}>
              {day}
            </button>
          ))}
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
  
  return (
    <div className="calendar">
      {renderCalendar()}
      {showPopup && renderPopup()}
      {renderEvents()}
    </div>
  );
};

export default Calendar;


