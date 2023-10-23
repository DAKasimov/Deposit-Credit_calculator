import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MyButton } from "../components/UI/button/MyButton"
import { Link } from "react-router-dom"

export const Header = () => {
  const path = useHistory()
  const [allPath, setAllPath] = useState("/deposit")

  useEffect(() => {
    if (path.location.pathname === "/deposit") {
      setAllPath("/deposit")
    } else {
      setAllPath("/credit")
    }
  }, [path, allPath])
  return (
    <div>
      {allPath === "/deposit" ? (
        <div>
          <h1 className="header">Депозитный калькулятор</h1>
          <Link to="/credit">
            <MyButton
              onClick={() => setAllPath("/credit")}
              style={{
                width: "200px",
                position: "absolute",
                left: "1100px",
                top: "20px",
              }}
            >
              Кредитный калькулятор
            </MyButton>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="header">Кредитный кальнулятор</h1>
          <Link to="/deposit">
            <MyButton
              onClick={() => setAllPath("/deposit")}
              style={{
                width: "200px",
                position: "absolute",
                left: "1100px",
                top: "20px",
              }}
            >
              Депозитный калькулятор
            </MyButton>
          </Link>
        </div>
      )}
    </div>
  )
}
