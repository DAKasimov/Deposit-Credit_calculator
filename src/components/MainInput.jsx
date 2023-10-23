import { MyInput } from "./UI/input/MyInput"
import { MyButton } from "./UI/button/MyButton"
import { MyCalendar } from "./UI/calendar/MyCalendar"

export const MainInput = (props) => {
    const {resultSum = Function.prototype, valueMonth, valueSum, valueProcent, valueDate, isValidSum, isValidProcent, isValidMonth, isValidCalendar, handleMonth, handleSum, handleProcent,  handleCalendar, handleBlurCalendar, handleBlurSum, handleBlurMonth, handleBlurProcent } = props

  return (
    <div>
      <div className="Sum">
        {isValidSum ? (
          <MyInput
            className="SumInput"
            onBlur={handleBlurSum}
            onChange={handleSum}
            value={valueSum}
            placeholder="Введите сумму..."
          />
        ) : (
          <div>
            <div style={{ color: "red" }}>Необходимо ввести число!</div>
            <MyInput
              onBlur={handleBlurSum}
              onChange={handleSum}
              value={valueSum}
              placeholder="Введите сумму..."
            />
          </div>
        )}
      </div>

      <div className="Month">
        {isValidMonth ? (
          <MyInput
            onBlur={handleBlurMonth}
            value={valueMonth}
            onChange={handleMonth}
            type="number"
            step="1"
            min="1"
            placeholder="Cрок (в месяцах)..."
          />
        ) : (
          <div>
            <div style={{ color: "red" }}>Необходимо выбрать срок!</div>
            <MyInput
              onBlur={handleBlurMonth}
              value={valueMonth}
              onChange={handleMonth}
              type="number"
              step="1"
              min="1"
              placeholder="Cрок (в месяцах)..."
            />
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "15px 0 0 30px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Выберите дату:
        </div>
        <div style={{ margin: "0 0 0 35px" }}>
          {isValidCalendar ? (
            <MyCalendar
              onBlur={handleBlurCalendar}
              value={valueDate}
              onChange={handleCalendar}
            />
          ) : (
            <div>
              <div style={{ color: "red" }}> Необходимо выбрать число!</div>
              <MyCalendar onChange={handleCalendar} />
            </div>
          )}
        </div>
      </div>

      <div className="Procent">
        {isValidProcent ? (
          <MyInput
            onBlur={handleBlurProcent}
            value={valueProcent}
            onChange={handleProcent}
            type="number"
            step="0.5"
            min="1"
            placeholder="Процентная ставка..."
          />
        ) : (
          <div>
            <div style={{color : 'red'}}>Необходимо выбрать процентную ставку!</div>
            <MyInput
              onBlur={handleBlurProcent}
              value={valueProcent}
              onChange={handleProcent}
              type="number"
              step="0.5"
              min="1"
              placeholder="Процентная ставка..."
            />
          </div>
        )}
      </div>

      <MyButton onClick={resultSum}>Рассчитать</MyButton>
    </div>
  )
}
