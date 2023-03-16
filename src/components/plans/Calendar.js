import React, { useState } from 'react';
import './Calendar.css'

function Calendar(){
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [showCellPopup, setShowCellPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const events = [
    {
      title: 'Meeting',
      date: "05/05/2023",
      value: 100
    },
    {
      title: 'Lunch',
      date: "03/20/2023",
      value: -55
    },
    {
      title: 'Presentation',
      date: "03/20/2023",
      value: 30.94
    },
  ]; 

  function parseDate(dateString) {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }

  function formatDate(dateObject) {
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString();
    return `${month}/${day}/${year}`;
  }  

  function parseAll() {
    for(let i = 0; i < events.length; i++)
    {
      events[i].date = parseDate(events[i].date)
    }
  }

  
  parseAll()
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  const [eventList, setEventList] = useState(events);

  const startIndex = () =>
  {
    let endDate = selectedDate2 >= selectedDate ? selectedDate2 : selectedDate;
    let startDate = selectedDate <= selectedDate2 ? selectedDate : selectedDate2;
    let startIndex = eventList.findIndex((event) => event.date >= startDate && event.date <= endDate);
    return startIndex;
  }
  const endIndex = () =>
  {
    let endDate = selectedDate2 >= selectedDate ? selectedDate2 : selectedDate;
    let endIndex = eventList.findIndex((event) => event.date > endDate);
    if(eventList[eventList.length - 1].date <= endDate)
    {
      return eventList.length;
    }
    return endIndex;
  }

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
    setSelectedDate2(new Date(year, month, day))
    setShowCellPopup(true);
  };

  const handlePopupClose = () => {
    setSelectedDate(null);
    setSelectedDate2(null);
    setShowCellPopup(false) || setShowAddPopup(false);
  };

  const handleAddClick = (year, month) => {
    setSelectedDate(new Date(year, month, 1));
    setShowAddPopup(true);
  };

  const handleRmvClick = (event) => {
    const updatedEvents = [...eventList];
    setEventList(updatedEvents.splice(updatedEvents.indexOf(event), 1));
    console.log(eventList);
    renderEventBoxes(eventList.slice(startIndex(), endIndex()));
  }
  
  function ColoredSquare({backgroundColor, text}) {
    const style = {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: backgroundColor,
      position: "relative",
      top: "-37.5%",
      left: "-50%",
    };
  
    const textStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "14px",
      color: "white",
    };
  
    return (
      <div style={style}>
        <div style={textStyle}>{text}</div>
      </div>
    );
  }

  const renderEventBoxes = (eventList) => {
    return (
      <div className="event-box-list-container">
        {eventList.map((box, index) => (
          <div className="event-box" style={{padding: "1.25vh"}}>
            <div className="event-text" key={index}>
              {box.date.getMonth()}/{box.date.getDate()}/{box.date.getFullYear()} {box.title} {box.value} &nbsp;
              <span onClick={() => handleRmvClick(box)}>X</span>
            </div>
          </div>
        ))}
      </div>
    );
  }


  const renderSquare = (day, month, year) => {
    let test = [];
    
    for (let i = 0; i < eventList.length; i++){
      if (eventList[i].date.getFullYear() === year && eventList[i].date.getMonth() === month && eventList[i].date.getDate() === day){
        test.push(eventList[i].type)
      }
    }

    if (test.length > 0)
    {
      return (
        
        <ColoredSquare backgroundColor="red" text={test.length} />
  
      )
    }
    else
    {
      return null;
    }

  };


  const renderCalendar = () => {
    return (
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>Prev</button>
          <div className="select-container">
            <select value={month} onChange={(e) => setDate(new Date(year, parseInt(e.target.value), 1))}>
              {monthNames.map((name, index) => (
                <option key={index} value={index}>{name}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setDate(new Date(parseInt(e.target.value), month, 1))}>
              {Array.from({length: 21}, (_, i) => year - 10 + i).map((yearValue) => (
                <option key={yearValue} value={yearValue}>{yearValue}</option>
              ))}
            </select>
          </div>
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
              {renderSquare(day, month, year)}
            </button>
          ))}
          {blanksAfter.map((_, i) => <div key={`after-${i}`} className="blank"></div>)}
        </div>
        <button className="add-button" onClick={() => handleAddClick(year, month)}>+</button>
      </div>
    );
  };
  
  const renderCellPopup = () => {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="popup-close" onClick={handlePopupClose}>X</button>
          <div className="popup-header">
            <div>
              <select value={selectedDate.getMonth()} onChange={
                  (e) => setSelectedDate(new Date(selectedDate.getFullYear(), parseInt(e.target.value), selectedDate.getDate()))
                }>
                {monthNames.map((name, index) => (
                  <option key={index} value={index}>{name}</option>
                ))}
              </select>
              <select value={selectedDate.getDate()} onChange={
                (e) => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), parseInt(e.target.value)))
                }>
                {Array.from({length: daysInMonth(selectedDate.getFullYear(), selectedDate.getMonth())}, (_, i) => 1 + i).map((dayValue) => (
                  <option key={dayValue} value={dayValue}>{dayValue}</option>
                ))}
              </select>
              <select value={selectedDate.getFullYear()} onChange={
                (e) => setSelectedDate(new Date(parseInt(e.target.value), selectedDate.getMonth(), selectedDate.getDate()))
                }>
                {Array.from({length: 21}, (_, i) => selectedDate.getFullYear() - 10 + i).map((yearValue) => (
                  <option key={yearValue} value={yearValue}>{yearValue}</option>
                ))}
              </select>
            </div>
            <span>to</span>
            <div>
              <select value={selectedDate2.getMonth()} onChange={
                  (e) => setSelectedDate2(new Date(selectedDate2.getFullYear(), parseInt(e.target.value), selectedDate2.getDate()))
                }>
                {monthNames.map((name, index) => (
                  <option key={index} value={index}>{name}</option>
                ))}
              </select>
              <select value={selectedDate2.getDate()} onChange={
                (e) => setSelectedDate2(new Date(selectedDate2.getFullYear(), selectedDate2.getMonth(), parseInt(e.target.value)))
                }>
                {Array.from({length: daysInMonth(selectedDate2.getFullYear(), selectedDate2.getMonth())}, (_, i) => 1 + i).map((dayValue) => (
                  <option key={dayValue} value={dayValue}>{dayValue}</option>
                ))}
              </select>
              <select value={selectedDate2.getFullYear()} onChange={
                (e) => setSelectedDate2(new Date(parseInt(e.target.value), selectedDate2.getMonth(), selectedDate2.getDate()))
                }>
                {Array.from({length: 21}, (_, i) => selectedDate2.getFullYear() - 10 + i).map((yearValue) => (
                  <option key={yearValue} value={yearValue}>{yearValue}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='popup-body'>
            <div className='section'>
              {renderEventBoxes(eventList.slice(startIndex(), endIndex()))}
            </div>
            <div className='section'>

            </div>
            <div className='section'>
              
            </div>  
          </div>
        </div>
      </div>
    );
  };

  const renderAddPopup = () => {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <button className="popup-close" onClick={handlePopupClose}>X</button>
        </div>
      </div>
    );
  };

  
  return (
    <div className="calendar">
      {renderCalendar()}
      {showCellPopup && renderCellPopup()}
      {showAddPopup && renderAddPopup()}
    </div>
  );
};

export default Calendar;
