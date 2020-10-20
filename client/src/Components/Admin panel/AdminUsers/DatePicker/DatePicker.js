import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import './DatePicker.css'
import 'react-nice-dates/build/style.css'

const DatePicker = ({ setDate }) => {
  
  const [startDate] = useState(new Date())
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
    
  }
  
  return (
    <div className="calendarDiv">
      <p>Selected ban expiration date for user with <b>id</b> and username <b>niki</b> .</p>
      <DateRangePickerCalendar
        startDate={startDate}
        minimumDate={startDate}
        endDate={endDate}
        focus={focus}
        onDateChange={setDate(endDate)}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
    </div>
  )
}

export default DatePicker;