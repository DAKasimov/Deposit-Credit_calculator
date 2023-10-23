import classes from "./MyCalendar.module.css"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
export const MyCalendar = (props) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          className={classes.myCalendar}
          {...props}
        />
      </LocalizationProvider>
    </div>
  )
}
