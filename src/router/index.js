import { Credit } from "../pages/Credit"
import { DepositPage } from "../pages/DepositPage"

export const Routes = [
  {
    path: "/credit",
    component: Credit,
    exact: true,
  },
  {
    path: "/deposit",
    component: DepositPage,
    exact: true,
  },
]
