import { useState } from "react"
import { MyChart } from "../components/UI/chart/MyChart"
import dayjs from "dayjs"
import { MainInput } from "../components/MainInput"
import { MyRadioButton } from "../components/UI/radioButton/MyRadioButton"

export const Credit = () => {
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
  const [valueRadio, setValueRadio] = useState("")
  const [dataForTable, setDataForTable] = useState([])
  const [pereplata, setPereplata] = useState(0)

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
  const handleRadioButton = (event) => {
    setValueRadio(event.target.value)
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
      valueRadio === "" ||
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
      let sum = Number(valueSum)
      let tempSum = sum
      let procent = Number(valueProcent)
      if (valueRadio === "annuetent") {
        let montProcent = procent / 100 / 12
        montProcent = Math.round(montProcent * 10000) / 10000
        let K =
          (montProcent * (1 + montProcent) ** Number(valueMonth)) /
          ((1 + montProcent) ** Number(valueMonth) - 1)
        K = Math.round(K * 100000) / 100000
        let paymentSum = tempSum * K
        let r = 0
        const lstMonth = []
        for (let i = 0; i < Number(valueMonth); i++) {
          let currentMonth = {}
          resObj[i+1] = tempSum
          let tempPaymentSum = paymentSum
          tempPaymentSum = Math.round(tempPaymentSum * 100) / 100

          let procentSum = tempSum * montProcent
          procentSum = Math.round(procentSum * 100) / 100
          currentMonth['procents'] = procentSum
          r += procentSum

          let mainDolg = paymentSum - procentSum
          mainDolg = Math.round(mainDolg * 100) / 100
          currentMonth['mainDolg'] = mainDolg
          currentMonth['number'] = i + 1

          tempSum -= mainDolg
          tempSum = Math.round(tempSum * 100) / 100
          if (tempSum < 0){
            tempSum = 0
          }
          currentMonth['summaPlatezha'] = paymentSum
          lstMonth.push(currentMonth)
          currentMonth['ostatokDolga'] = tempSum
          
          
        }
        r = Math.round(r)
        console.log(resObj)
        setDataForTable(lstMonth)
        setPereplata(r)
        
      }
      else if (valueRadio === 'differ'){
        console.log(lst)
        resObj[dates[0]] = Number(valueSum)
        let sumMonth = Number(valueSum) / Number(valueMonth)
        let s = 0
        procent = Math.round(procent * 100) / 100
        sumMonth = Math.round(sumMonth * 100) / 100
        let allSumProcent = 0
        let lstMonth = []
        for (let i = 0; i < lst.length; i++){
          
          let currentMonth = {}
          let sumProcent = (tempSum * procent) / 1200
          sumProcent = Math.round(sumProcent * 100) / 100
          currentMonth['procents'] = sumProcent
          currentMonth['mainDolg'] = sumMonth
          currentMonth['number'] = i + 1
          
          s += sumProcent
          allSumProcent += (sumMonth + sumProcent)
          allSumProcent = Math.round(allSumProcent * 100) / 100
          currentMonth['summaPlatezha'] = allSumProcent
          tempSum -= sumMonth
          tempSum = Math.round(tempSum * 100) / 100
          currentMonth['ostatokDolga'] = tempSum
          resObj[dates[i+1]] = tempSum
          lstMonth.push(currentMonth)
          
        }
        s = Math.round(s * 100) / 100
        setPereplata(s)
        setDataForTable(lstMonth)
        
        
      }
      setResultDataForChart(resObj)
      setShift(true)
      setViewChart(true)
    }
  }
  

  return (
    <div className={shift ? "shift_conteiner" : "container"}>
      {isNotCorrectData ? (
        <div>
          <h2 style={{ color: "red", marginLeft: "100px" }}>
            Не все данные корректны!
          </h2>
          <div style={{ margin: "10px 0 10px 0" }}>
            <span>
              <input
                type="radio"
                name="paymentSelection"
                onChange={handleRadioButton}
                value="annuetent"
              />{" "}
              <span style={{ color: "teal" }}>Аннуитентный</span>
            </span>
            <span
              style={{ margin: "0 40px", fontWeight: "bold", fontSize: "20px" }}
            >
              Вид платежа
            </span>
            <input
              type="radio"
              name="paymentSelection"
              onChange={handleRadioButton}
              value="differ"
            />{" "}
            <span style={{ color: "teal" }}>Дифференцированный</span>
          </div>
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
            <div style={{ margin: "10px 0 10px 0" }}>
              <span>
                <input
                  type="radio"
                  name="paymentSelection"
                  onChange={handleRadioButton}
                  value="annuetent"
                />{" "}
                <span style={{ color: "teal" }}>Аннуитентный</span>
              </span>
              <span
                style={{
                  margin: "0 40px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Вид платежа
              </span>
              <input
                type="radio"
                name="paymentSelection"
                onChange={handleRadioButton}
                value="differ"
              />{" "}
              <span style={{ color: "teal" }}>Дифференцированный</span>
            </div>
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
              {dataForTable.map((item, index) => {
                return (
                  <div key={index} className="grid-container-credit">
                    <div className="head">Номер платежа</div>
                    <div className="head">Остаток долга</div>
                    <div className="head">Проценты</div>
                    <div className="head">Основной долг</div>
                    <div className="head">Сумма платежа</div>

                    <div className="cell">{item.number}</div>
                    <div className="cell">{item.ostatokDolga}</div>
                    <div className="cell">{item.procents}</div>
                    <div className="cell">{item.mainDolg}</div>
                    <div className="cell">{item.summaPlatezha}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={viewChart ? "viewChart_block" : "viewChart"}>
            <MyChart resultDataForChart={resultDataForChart} />
            <div className="result">
              <h2>
                Переплата: {pereplata}
                <div style={{margin : '10px 0'}}>
                  Общая переплата: {pereplata + Number(valueSum)}
                </div>
                
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
