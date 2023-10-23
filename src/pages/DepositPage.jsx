import { useState } from "react"
import { MyChart } from "../components/UI/chart/MyChart"
import dayjs from "dayjs"
import { MainInput } from "../components/MainInput"

export const DepositPage = () => {
  const [valueMonth, setValueMonth] = useState("")
  const [valueSum, setValueSum] = useState("")
  const [valueProcent, setValueProcent] = useState("")
  const [valueDate, setValueDate] = useState("")
  const [isValidSum, setIsValidSum] = useState(true)
  const [isValidProcent, setIsValidProcent] = useState(true)
  const [isValidMonth, setIsValidMonth] = useState(true)
  const [isValidCalendar, setIsValidCalendar] = useState(true)
  const [isNotCorrectData, setIsNotCorrectData] = useState(false)
  const [shift, setShift] = useState(false)
  const [resultDataForChart, setResultDataForChart] = useState({})
  const [viewChart, setViewChart] = useState(false)

  const handleMonth = (event) => {
    setValueMonth(event.target.value)
  }
  const handleSum = (event) => {
    setValueSum(event.target.value)
  }
  const handleProcent = (event) => {
    setValueProcent(event.target.value)
  }

  const handleCalendar = (event) => {
    setValueDate(event)
  }
  const handleBlurCalendar = () => {
    if (valueDate === "") {
      setIsValidCalendar(false)
    } else {
      setIsValidCalendar(true)
    }
  }
  const handleBlurSum = (event) => {
    let numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
    if (numberRegex.test(event.target.value) === false) {
      setIsValidSum(false)
    } else {
      setIsValidSum(true)
    }
  }
  const handleBlurMonth = () => {
    if (valueMonth === "") {
      setIsValidMonth(false)
    } else {
      setIsValidMonth(true)
    }
  }
  const handleBlurProcent = () => {
    if (valueProcent === "") {
      setIsValidProcent(false)
    } else {
      setIsValidProcent(true)
    }
  }
  const resultSum = () => {
    if (
      valueSum === "" ||
      valueMonth === "" ||
      valueProcent === "" ||
      valueDate === "" ||
      isValidSum === false ||
      isValidMonth === false ||
      isValidProcent === false
    ) {
      setIsNotCorrectData(true)
    } else {
      setIsNotCorrectData(false)
      let lst = []
      let dates = []
      let tempValueDate = valueDate
      dates.push(
        `${tempValueDate.$D}-${tempValueDate.$M + 1}-${tempValueDate.$y}`
      )
      for (let i = 1; i <= Number(valueMonth); i++) {
        let finishDate = tempValueDate.add(1, "month")
        let date1 = dayjs(
          `${tempValueDate.$y}-${tempValueDate.$M + 1}-${tempValueDate.$D}`
        )
        let date2 = dayjs(
          `${finishDate.$y}-${finishDate.$M + 1}-${finishDate.$D}`
        )
        let res = date2.diff(date1, "day")
        lst.push(res)
        dates.push(`${date2.$D}-${date2.$M + 1}-${date2.$y}`)
        tempValueDate = finishDate
      }

      let resObj = {}
      resObj[dates[0]] = 0
      let sum = Number(valueSum)
      let tempSum = 0
      let procent = Number(valueProcent)
      for (let i = 0; i < lst.length; i++) {
        tempSum = (sum * procent * lst[i]) / 365
        tempSum /= 100
        tempSum = Math.round(tempSum * 100) / 100
        resObj[dates[i + 1]] = tempSum
        sum += tempSum
      }
      setResultDataForChart(resObj)
      setShift(true)
      setViewChart(true)
    }
  }
  const balance = []
  let t = Number(valueSum)
  balance.push(t)
  for (let x in resultDataForChart) {
    t += resultDataForChart[x]
    t = Math.round(t * 100) / 100
    balance.push(t)
  }
  const dataFortable = []
  for (let x in resultDataForChart) {
    dataFortable.push({ date: x, sum: resultDataForChart[x] })
  }
  return (
    <div className={shift ? "shift_conteiner" : "container"}>
      {isNotCorrectData ? (
        <div>
          <h2 style={{ color: "red", marginLeft: "100px" }}>
            Не все данные корректны!
          </h2>
          <MainInput
            resultSum={resultSum}
            valueMonth={valueMonth}
            valueSum={valueSum}
            valueProcent={valueProcent}
            valueDate={valueDate}
            isValidSum={isValidSum}
            isValidProcent={isValidProcent}
            isValidMonth={isValidMonth}
            isValidCalendar={isValidCalendar}
            handleMonth={handleMonth}
            handleSum={handleSum}
            handleProcent={handleProcent}
            handleCalendar={handleCalendar}
            handleBlurCalendar={handleBlurCalendar}
            handleBlurSum={handleBlurSum}
            handleBlurMonth={handleBlurMonth}
            handleBlurProcent={handleBlurProcent}
          />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ height: "650px" }}>
            <MainInput
              resultSum={resultSum}
              valueMonth={valueMonth}
              valueSum={valueSum}
              valueProcent={valueProcent}
              valueDate={valueDate}
              isValidSum={isValidSum}
              isValidProcent={isValidProcent}
              isValidMonth={isValidMonth}
              isValidCalendar={isValidCalendar}
              handleMonth={handleMonth}
              handleSum={handleSum}
              handleProcent={handleProcent}
              handleCalendar={handleCalendar}
              handleBlurCalendar={handleBlurCalendar}
              handleBlurSum={handleBlurSum}
              handleBlurMonth={handleBlurMonth}
              handleBlurProcent={handleBlurProcent}
            />
            <div className="table">
              {dataFortable.map((item, index) => {
                return (
                  <div key={index} className="grid-container">
                    <div className="head">Дата</div>
                    <div className="head">Начислено процентов</div>
                    <div className="head">Изменение баланса</div>

                    <div className="cell">{item.date}</div>
                    <div className="cell">{item.sum}</div>
                    <div className="cell">{balance[index + 1]}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={viewChart ? "viewChart_block" : "viewChart"}>
            <MyChart resultDataForChart={resultDataForChart} />
            <div className="result">
              <h2>
                Итоговая сумма процентов:{" "}
                {dataFortable.reduce((acc, item) => {
                  return Math.round((acc + item.sum) * 100) / 100
                }, 0)}{" "}
                рублей
              </h2>
              <h2>
                Общая сумма к выдаче: {balance[balance.length - 1]} рублей
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
