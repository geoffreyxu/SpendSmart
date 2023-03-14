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
      date: new Date(2023, 5, 5),
      value: 100
    },
    {
      title: 'Lunch',
      date: new Date(2023, 3, 20),
      value: -55
    },
    {
      title: 'Presentation',
      date: new Date(2023, 3, 20),
      value: 30.94
    },
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

  const renderSquare = (day, month, year) => {
    let test = [];
    
    for (let i = 0; i < events.length; i++){
      if (events[i].date.getFullYear() === year && events[i].date.getMonth() === month + 1 && events[i].date.getDate() === day){
        test.push(events[i].type)
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
          <div className="select-container">
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

            {/* maybe space this out differently for scaling*/}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

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
