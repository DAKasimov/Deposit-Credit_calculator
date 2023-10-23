import { Switch, Route } from "react-router-dom"
import { Routes } from "../router/index"
import { Redirect } from "react-router-dom/"

export const AppRouter = () => {
  return (
    <div>
      <Switch>
        {Routes.map((item) => {
          return (
            <Route
              component={item.component}
              path={item.path}
              exact={item.exact}
              key={item.path}
            />
          )
        })}
        <Redirect to="/deposit" />
      </Switch>
    </div>
  )
}
